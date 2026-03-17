"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeCounter = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const language_map_1 = require("./language-map");
const EXCLUDE_DIRS = ['node_modules', '.git', 'dist', 'build', 'coverage', '.next', '.nuxt'];
const EXCLUDE_EXTENSIONS = ['.exe', '.dll', '.zip', '.tar', '.gz', '.jpg', '.png', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf', '.eot'];
const EXCLUDE_FILES = ['codetime.json', 'codetime.data'];
class CodeCounter {
    constructor(watchDir = '.') {
        this.watchDir = watchDir;
    }
    shouldExclude(filePath) {
        const normalizedPath = filePath.replace(/\\/g, '/');
        const basename = path.basename(filePath);
        // 排除特定文件
        if (EXCLUDE_FILES.includes(basename)) {
            return true;
        }
        // 排除目录
        for (const dir of EXCLUDE_DIRS) {
            if (normalizedPath.includes(`/${dir}/`) || normalizedPath.endsWith(`/${dir}`)) {
                return true;
            }
        }
        // 排除文件类型
        const ext = path.extname(filePath).toLowerCase();
        if (EXCLUDE_EXTENSIONS.includes(ext)) {
            return true;
        }
        return false;
    }
    getLanguage(filePath) {
        const ext = path.extname(filePath);
        const basename = path.basename(filePath);
        // 特殊文件处理
        if (basename === 'Dockerfile')
            return 'Dockerfile';
        const config = (0, language_map_1.getLanguageByExtension)(ext);
        return config?.name || 'Other';
    }
    countFile(filePath) {
        if (this.shouldExclude(filePath)) {
            return 0;
        }
        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            const lines = content.split('\n');
            // 统计非空行
            return lines.filter(line => line.trim().length > 0).length;
        }
        catch {
            return 0;
        }
    }
    countDirectory(dirPath = this.watchDir) {
        const result = {
            totalFiles: 0,
            totalLines: 0,
            byLanguage: {}
        };
        const walk = (dir) => {
            try {
                const entries = fs.readdirSync(dir, { withFileTypes: true });
                for (const entry of entries) {
                    const fullPath = path.join(dir, entry.name);
                    if (entry.isDirectory()) {
                        if (!EXCLUDE_DIRS.includes(entry.name)) {
                            walk(fullPath);
                        }
                    }
                    else if (entry.isFile()) {
                        if (this.shouldExclude(fullPath)) {
                            continue;
                        }
                        const lines = this.countFile(fullPath);
                        if (lines > 0) {
                            const language = this.getLanguage(fullPath);
                            result.totalFiles++;
                            result.totalLines += lines;
                            result.byLanguage[language] = (result.byLanguage[language] || 0) + lines;
                        }
                    }
                }
            }
            catch {
                // 忽略权限错误
            }
        };
        walk(dirPath);
        return result;
    }
}
exports.CodeCounter = CodeCounter;
//# sourceMappingURL=code-counter.js.map