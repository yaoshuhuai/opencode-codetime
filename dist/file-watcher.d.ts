import { OutputFormatter } from './output';
export interface FileWatcherOptions {
    watchDir?: string;
    outputFile?: string;
    debounceMs?: number;
}
export declare class FileWatcher {
    private watcher;
    private counter;
    formatter: OutputFormatter;
    private debounceMs;
    private debounceTimer;
    private lastResult;
    private watchDir;
    constructor(options?: FileWatcherOptions);
    start(): void;
    private handleChange;
    private doStat;
    stop(): void;
}
//# sourceMappingURL=file-watcher.d.ts.map