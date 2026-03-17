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
export declare class CodeCounter {
    private watchDir;
    constructor(watchDir?: string);
    private shouldExclude;
    private getLanguage;
    countFile(filePath: string): number;
    countDirectory(dirPath?: string): CountResult;
}
//# sourceMappingURL=code-counter.d.ts.map