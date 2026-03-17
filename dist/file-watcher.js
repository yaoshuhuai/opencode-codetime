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
exports.FileWatcher = void 0;
const chokidar = __importStar(require("chokidar"));
const code_counter_1 = require("./code-counter");
const output_1 = require("./output");
function normalizeWindowsPath(p) {
    if (!p)
        return '.';
    if (/^\/[a-z]\//i.test(p)) {
        return p.replace(/^\/([a-z])\//i, (m, drive) => drive.toUpperCase() + ':\\');
    }
    if (/^\/[a-z]:/i.test(p)) {
        return p.replace(/^\/([a-z]:)/i, (m, drive) => drive.toUpperCase() + ':');
    }
    return p;
}
class FileWatcher {
    constructor(options = {}) {
        this.watcher = null;
        this.debounceTimer = null;
        this.lastResult = null;
        const normalizedWatchDir = normalizeWindowsPath(options.watchDir || '.');
        const normalizedOutputFile = normalizeWindowsPath(options.outputFile || 'codetime.json');
        this.watchDir = normalizedWatchDir;
        this.counter = new code_counter_1.CodeCounter(this.watchDir);
        this.formatter = new output_1.OutputFormatter(normalizedOutputFile);
        this.debounceMs = options.debounceMs || 500;
    }
    start() {
        console.log('🔄 Code Time: 开始监控文件变化...');
        this.lastResult = this.counter.countDirectory();
        this.formatter.saveToFile(this.lastResult);
        console.log(this.formatter.formatTerminal(this.lastResult));
        this.watcher = chokidar.watch(this.watchDir, {
            ignored: [
                /(^|[\/\\])\../,
                '**/node_modules/**',
                '**/dist/**',
                '**/build/**',
                '**/.git/**'
            ],
            persistent: true,
            ignoreInitial: true
        });
        this.watcher.on('change', (p) => this.handleChange(p));
        this.watcher.on('add', (p) => this.handleChange(p));
        this.watcher.on('unlink', (p) => this.handleChange(p));
    }
    handleChange(filePath) {
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
        }
        this.debounceTimer = setTimeout(() => {
            this.doStat();
        }, this.debounceMs);
    }
    doStat() {
        const newResult = this.counter.countDirectory();
        const delta = {
            added: newResult.totalLines - (this.lastResult?.totalLines || 0),
            deleted: 0,
            modified: 0,
            net: newResult.totalLines - (this.lastResult?.totalLines || 0)
        };
        this.lastResult = newResult;
        this.formatter.saveToFile(newResult, delta);
        console.log('\n' + this.formatter.formatTerminal(newResult, delta));
    }
    stop() {
        if (this.watcher) {
            this.watcher.close();
            this.watcher = null;
        }
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
            this.debounceTimer = null;
        }
    }
}
exports.FileWatcher = FileWatcher;
//# sourceMappingURL=file-watcher.js.map