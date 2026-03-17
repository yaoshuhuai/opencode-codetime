export interface LanguageConfig {
  name: string;
  extensions: string[];
  category: 'frontend' | 'backend' | 'script' | 'data' | 'other';
}

export const LANGUAGE_MAP: Record<string, LanguageConfig> = {
  // 前端
  javascript: { name: 'JavaScript', extensions: ['.js', '.mjs', '.cjs'], category: 'frontend' },
  typescript: { name: 'TypeScript', extensions: ['.ts', '.mts', '.cts'], category: 'frontend' },
  tsx: { name: 'TSX', extensions: ['.tsx'], category: 'frontend' },
  jsx: { name: 'JSX', extensions: ['.jsx'], category: 'frontend' },
  vue: { name: 'Vue', extensions: ['.vue'], category: 'frontend' },
  svelte: { name: 'Svelte', extensions: ['.svelte'], category: 'frontend' },
  html: { name: 'HTML', extensions: ['.html', '.htm'], category: 'frontend' },
  css: { name: 'CSS', extensions: ['.css'], category: 'frontend' },
  scss: { name: 'SCSS', extensions: ['.scss', '.sass'], category: 'frontend' },
  less: { name: 'Less', extensions: ['.less'], category: 'frontend' },
  
  // 后端
  python: { name: 'Python', extensions: ['.py'], category: 'backend' },
  java: { name: 'Java', extensions: ['.java'], category: 'backend' },
  go: { name: 'Go', extensions: ['.go'], category: 'backend' },
  rust: { name: 'Rust', extensions: ['.rs'], category: 'backend' },
  c: { name: 'C', extensions: ['.c', '.h'], category: 'backend' },
  cpp: { name: 'C++', extensions: ['.cpp', '.cc', '.cxx', '.hpp'], category: 'backend' },
  csharp: { name: 'C#', extensions: ['.cs'], category: 'backend' },
  php: { name: 'PHP', extensions: ['.php'], category: 'backend' },
  ruby: { name: 'Ruby', extensions: ['.rb'], category: 'backend' },
  kotlin: { name: 'Kotlin', extensions: ['.kt', '.kts'], category: 'backend' },
  scala: { name: 'Scala', extensions: ['.scala'], category: 'backend' },
  
  // 脚本
  shell: { name: 'Shell', extensions: ['.sh', '.bash'], category: 'script' },
  powershell: { name: 'PowerShell', extensions: ['.ps1', '.psm1'], category: 'script' },
  batch: { name: 'Batch', extensions: ['.bat', '.cmd'], category: 'script' },
  
  // 数据
  json: { name: 'JSON', extensions: ['.json'], category: 'data' },
  yaml: { name: 'YAML', extensions: ['.yaml', '.yml'], category: 'data' },
  xml: { name: 'XML', extensions: ['.xml'], category: 'data' },
  toml: { name: 'TOML', extensions: ['.toml'], category: 'data' },
  csv: { name: 'CSV', extensions: ['.csv'], category: 'data' },
  
  // 其他
  markdown: { name: 'Markdown', extensions: ['.md', '.mdx'], category: 'other' },
  sql: { name: 'SQL', extensions: ['.sql'], category: 'other' },
  dockerfile: { name: 'Dockerfile', extensions: ['Dockerfile'], category: 'other' },
  terraform: { name: 'Terraform', extensions: ['.tf'], category: 'other' },
};

export function getLanguageByExtension(ext: string): LanguageConfig | undefined {
  const normalizedExt = ext.startsWith('.') ? ext : `.${ext}`;
  for (const config of Object.values(LANGUAGE_MAP)) {
    if (config.extensions.includes(normalizedExt) || config.extensions.includes(normalizedExt.replace(/^\./, ''))) {
      return config;
    }
  }
  return undefined;
}
