export interface FileWatcherOptions {
    watchDir?: string;
    outputFile?: string;
    debounceMs?: number;
}
export declare class FileWatcher {
    private watcher;
    private counter;
    private formatter;
    private debounceMs;
    private debounceTimer;
    private lastResult;
    constructor(options?: FileWatcherOptions);
    start(): void;
    private handleChange;
    private doStat;
    stop(): void;
}
//# sourceMappingURL=file-watcher.d.ts.map