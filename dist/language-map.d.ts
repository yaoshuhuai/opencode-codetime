export interface LanguageConfig {
    name: string;
    extensions: string[];
    category: 'frontend' | 'backend' | 'script' | 'data' | 'other';
}
export declare const LANGUAGE_MAP: Record<string, LanguageConfig>;
export declare function getLanguageByExtension(ext: string): LanguageConfig | undefined;
//# sourceMappingURL=language-map.d.ts.map