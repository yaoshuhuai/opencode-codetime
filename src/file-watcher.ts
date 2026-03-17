import * as chokidar from 'chokidar';
import * as path from 'path';
import { CodeCounter, CountResult, DeltaResult } from './code-counter';
import { OutputFormatter } from './output';

export interface FileWatcherOptions {
  watchDir?: string;
  outputFile?: string;
  debounceMs?: number;
}

function normalizeWindowsPath(p: string): string {
  if (!p) return '.';
  if (/^\/[a-z]\//i.test(p)) {
    return p.replace(/^\/([a-z])\//i, (m, drive) => drive.toUpperCase() + ':\\');
  }
  if (/^\/[a-z]:/i.test(p)) {
    return p.replace(/^\/([a-z]:)/i, (m, drive) => drive.toUpperCase() + ':');
  }
  return p;
}

export class FileWatcher {
  private watcher: chokidar.FSWatcher | null = null;
  private counter: CodeCounter;
  public formatter: OutputFormatter;
  private debounceMs: number;
  private debounceTimer: NodeJS.Timeout | null = null;
  private lastResult: CountResult | null = null;
  private watchDir: string;
  
  constructor(options: FileWatcherOptions = {}) {
    const normalizedWatchDir = normalizeWindowsPath(options.watchDir || '.');
    const normalizedOutputFile = normalizeWindowsPath(options.outputFile || 'codetime.json');
    this.watchDir = normalizedWatchDir;
    this.counter = new CodeCounter(this.watchDir);
    this.formatter = new OutputFormatter(normalizedOutputFile);
    this.debounceMs = options.debounceMs || 500;
  }
  
  start(): void {
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
