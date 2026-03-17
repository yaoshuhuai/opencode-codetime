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
exports.OutputFormatter = void 0;
const fs = __importStar(require("fs"));
class OutputFormatter {
    constructor(outputFile = 'codetime.json') {
        this.outputFile = outputFile;
        this.sessionStart = new Date();
    }
    formatTerminal(result, delta) {
        const lines = [];
        lines.push('📊 Code Time 统计');
        lines.push('=================');
        lines.push(`📁 总文件数: ${result.totalFiles}`);
        lines.push(`📝 总代码行数: ${this.formatNumber(result.totalLines)}`);
        lines.push('');
        lines.push('按语言分类:');
        // 按行数排序
        const sorted = Object.entries(result.byLanguage)
            .sort((a, b) => b[1] - a[1]);
        for (const [lang, count] of sorted) {
            const percent = ((count / result.totalLines) * 100).toFixed(1);
            lines.push(`  ${this.padLang(lang)} ${this.formatNumber(count)} (${percent}%)`);
        }
        if (delta) {
            lines.push('');
            lines.push('本次会话增量:');
            lines.push(`  ➕ 新增: ${this.formatNumber(delta.added)} 行`);
            lines.push(`  ➖ 删除: ${this.formatNumber(delta.deleted)} 行`);
            lines.push(`  ✏️ 修改: ${this.formatNumber(delta.modified)} 行`);
            lines.push(`  📈 净增: ${this.formatNumber(delta.net)} 行`);
        }
        return lines.join('\n');
    }
    saveToFile(result, delta) {
        const data = {
            sessionStart: this.sessionStart.toISOString(),
            lastUpdate: new Date().toISOString(),
            totalFiles: result.totalFiles,
            totalLines: result.totalLines,
            byLanguage: result.byLanguage,
            sessionDelta: delta || { added: 0, deleted: 0, modified: 0, net: 0 }
        };
        fs.writeFileSync(this.outputFile, JSON.stringify(data, null, 2), 'utf-8');
    }
    formatNumber(num) {
        return num.toLocaleString();
    }
    padLang(lang) {
        return lang.padEnd(12);
    }
}
exports.OutputFormatter = OutputFormatter;
//# sourceMappingURL=output.js.map