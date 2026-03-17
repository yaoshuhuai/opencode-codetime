import * as fs from 'fs';
import * as path from 'path';
import { getLanguageByExtension, LanguageConfig } from './language-map';

export interface CountResult {
  totalFiles: number;
  totalLines: number;
  byLanguage: Record<string, number>;
}

export interface DeltaResult {
  added: number;
  deleted: number;
  modified: number;
  net: number;
}

const EXCLUDE_DIRS = ['node_modules', '.git', 'dist', 'build', 'coverage', '.next', '.nuxt'];
const EXCLUDE_EXTENSIONS = ['.exe', '.dll', '.zip', '.tar', '.gz', '.jpg', '.png', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf', '.eot'];
const EXCLUDE_FILES = ['codetime.json', 'codetime.data'];

export class CodeCounter {
  private watchDir: string;
  
  constructor(watchDir: string = '.') {
    this.watchDir = watchDir;
  }
  
  private shouldExclude(filePath: string): boolean {
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
  
  private getLanguage(filePath: string): string {
    const ext = path.extname(filePath);
    const basename = path.basename(filePath);
    
    // 特殊文件处理
    if (basename === 'Dockerfile') return 'Dockerfile';
    
    const config = getLanguageByExtension(ext);
    return config?.name || 'Other';
  }
  
  countFile(filePath: string): number {
    if (this.shouldExclude(filePath)) {
      return 0;
    }
    
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split('\n');
      // 统计非空行
      return lines.filter(line => line.trim().length > 0).length;
    } catch {
      return 0;
    }
  }
  
  countDirectory(dirPath: string = this.watchDir): CountResult {
    const result: CountResult = {
      totalFiles: 0,
      totalLines: 0,
      byLanguage: {}
    };
    
    const walk = (dir: string) => {
      try {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          
          if (entry.isDirectory()) {
            if (!EXCLUDE_DIRS.includes(entry.name)) {
              walk(fullPath);
            }
          } else if (entry.isFile()) {
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
      } catch {
        // 忽略权限错误
      }
    };
    
    walk(dirPath);
    return result;
  }
}
