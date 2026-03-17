import * as fs from 'fs';
import { CountResult, DeltaResult } from './code-counter';

export interface CodeTimeData {
  sessionStart: string;
  lastUpdate: string;
  totalFiles: number;
  totalLines: number;
  byLanguage: Record<string, number>;
  sessionDelta: DeltaResult;
}

export class OutputFormatter {
  private outputFile: string;
  private sessionStart: Date;
  
  constructor(outputFile: string = 'codetime.json') {
    this.outputFile = outputFile;
    this.sessionStart = new Date();
  }
  
  formatTerminal(result: CountResult, delta?: DeltaResult): string {
    const lines: string[] = [];
    
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
  
  saveToFile(result: CountResult, delta?: DeltaResult): void {
    const data: CodeTimeData = {
      sessionStart: this.sessionStart.toISOString(),
      lastUpdate: new Date().toISOString(),
      totalFiles: result.totalFiles,
      totalLines: result.totalLines,
      byLanguage: result.byLanguage,
      sessionDelta: delta || { added: 0, deleted: 0, modified: 0, net: 0 }
    };
    
    fs.writeFileSync(this.outputFile, JSON.stringify(data, null, 2), 'utf-8');
  }
  
  private formatNumber(num: number): string {
    return num.toLocaleString();
  }
  
  private padLang(lang: string): string {
    return lang.padEnd(12);
  }
}
