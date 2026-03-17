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
exports.CodeTimePlugin = void 0;
const path = __importStar(require("path"));
const file_watcher_1 = require("./file-watcher");
let watcher = null;
function normalizePath(p) {
    if (!p)
        return process.cwd();
    if (/^\/[a-z]\//i.test(p)) {
        return p.replace(/^\/([a-z])\//i, (m, drive) => drive + ':\\');
    }
    if (/^\/[a-z]:/i.test(p)) {
        return p.replace(/^\/([a-z]:)/i, '$1');
    }
    return path.resolve(p);
}
const CodeTimePlugin = async (ctx) => {
    const workDir = normalizePath(ctx.directory || process.cwd());
    console.log('🚀 Code Time 插件已激活');
    console.log('📁 工作目录:', workDir);
    watcher = new file_watcher_1.FileWatcher({
        watchDir: workDir,
        outputFile: path.join(workDir, 'codetime.json'),
        debounceMs: 500
    });
    watcher.start();
    return {
        close: () => {
            console.log('👋 Code Time 插件已停用');
            if (watcher) {
                watcher.stop();
                watcher = null;
            }
        }
    };
};
exports.CodeTimePlugin = CodeTimePlugin;
//# sourceMappingURL=index.js.map