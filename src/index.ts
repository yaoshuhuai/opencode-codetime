import { FileWatcher } from './file-watcher';

let watcher: FileWatcher | null = null;

export function activate() {
  console.log('🚀 Code Time 插件已激活');
  
  watcher = new FileWatcher({
    watchDir: '.',
    outputFile: 'codetime.json',
    debounceMs: 500
  });
  
  watcher.start();
}

export function deactivate() {
  console.log('👋 Code Time 插件已停用');
  
  if (watcher) {
    watcher.stop();
    watcher = null;
  }
}

// 导出类型
export { CodeCounter, CountResult, DeltaResult } from './code-counter';
export { OutputFormatter, CodeTimeData } from './output';
export { FileWatcher, FileWatcherOptions } from './file-watcher';
