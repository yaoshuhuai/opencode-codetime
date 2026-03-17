import * as chokidar from 'chokidar';
import { CodeCounter, CountResult, DeltaResult } from './code-counter';
import { OutputFormatter } from './output';

export interface FileWatcherOptions {
  watchDir?: string;
  outputFile?: string;
  debounceMs?: number;
}

export class FileWatcher {
  private watcher: chokidar.FSWatcher | null = null;
  private counter: CodeCounter;
  private formatter: OutputFormatter;
  private debounceMs: number;
  private debounceTimer: NodeJS.Timeout | null = null;
  private lastResult: CountResult | null = null;
  
  constructor(options: FileWatcherOptions = {}) {
    this.counter = new CodeCounter(options.watchDir || '.');
    this.formatter = new OutputFormatter(options.outputFile || 'codetime.json');
    this.debounceMs = options.debounceMs || 500;
  }
  
  start(): void {
    console.log('🔄 Code Time: 开始监控文件变化...');
    
    // 初始统计
    this.lastResult = this.counter.countDirectory();
    this.formatter.saveToFile(this.lastResult);
    console.log(this.formatter.formatTerminal(this.lastResult));
    
    this.watcher = chokidar.watch('.', {
      ignored: [
        /(^|[\/\\])\../, // 隐藏文件
        '**/node_modules/**',
        '**/dist/**',
        '**/build/**',
        '**/.git/**'
      ],
      persistent: true,
      ignoreInitial: true
    });
    
    this.watcher.on('change', (path) => this.handleChange(path));
    this.watcher.on('add', (path) => this.handleChange(path));
    this.watcher.on('unlink', (path) => this.handleChange(path));
  }
  
  private handleChange(filePath: string): void {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    
    this.debounceTimer = setTimeout(() => {
      this.doStat();
    }, this.debounceMs);
  }
  
  private doStat(): void {
    const newResult = this.counter.countDirectory();
    
    // 计算增量
    const delta: DeltaResult = {
      added: newResult.totalLines - (this.lastResult?.totalLines || 0),
      deleted: 0,
      modified: 0,
      net: newResult.totalLines - (this.lastResult?.totalLines || 0)
    };
    
    this.lastResult = newResult;
    this.formatter.saveToFile(newResult, delta);
    
    console.log('\n' + this.formatter.formatTerminal(newResult, delta));
  }
  
  stop(): void {
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
