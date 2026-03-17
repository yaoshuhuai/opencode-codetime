"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileWatcher = exports.OutputFormatter = exports.CodeCounter = void 0;
exports.activate = activate;
exports.deactivate = deactivate;
const file_watcher_1 = require("./file-watcher");
let watcher = null;
function activate() {
    console.log('🚀 Code Time 插件已激活');
    watcher = new file_watcher_1.FileWatcher({
        watchDir: '.',
        outputFile: 'codetime.json',
        debounceMs: 500
    });
    watcher.start();
}
function deactivate() {
    console.log('👋 Code Time 插件已停用');
    if (watcher) {
        watcher.stop();
        watcher = null;
    }
}
// 导出类型
var code_counter_1 = require("./code-counter");
Object.defineProperty(exports, "CodeCounter", { enumerable: true, get: function () { return code_counter_1.CodeCounter; } });
var output_1 = require("./output");
Object.defineProperty(exports, "OutputFormatter", { enumerable: true, get: function () { return output_1.OutputFormatter; } });
var file_watcher_2 = require("./file-watcher");
Object.defineProperty(exports, "FileWatcher", { enumerable: true, get: function () { return file_watcher_2.FileWatcher; } });
//# sourceMappingURL=index.js.map