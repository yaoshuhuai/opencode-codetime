import * as path from 'path';
import * as os from 'os';
import { FileWatcher } from './file-watcher';

let watcher: FileWatcher | null = null;

function normalizePath(p: string): string {
  if (!p) return process.cwd();
  if (/^\/[a-z]\//i.test(p)) {
    return p.replace(/^\/([a-z])\//i, (m, drive) => drive + ':\\');
  }
  if (/^\/[a-z]:/i.test(p)) {
    return p.replace(/^\/([a-z]:)/i, '$1');
  }
  return path.resolve(p);
}

export const CodeTimePlugin = async (ctx: { directory: string }) => {
  const workDir = normalizePath(ctx.directory || process.cwd());
  console.log('🚀 Code Time 插件已激活');
  console.log('📁 工作目录:', workDir);
  
  watcher = new FileWatcher({
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
