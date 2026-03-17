import { CountResult, DeltaResult } from './code-counter';
export interface CodeTimeData {
    sessionStart: string;
    lastUpdate: string;
    totalFiles: number;
    totalLines: number;
    byLanguage: Record<string, number>;
    sessionDelta: DeltaResult;
}
export declare class OutputFormatter {
    private outputFile;
    private sessionStart;
    constructor(outputFile?: string);
    formatTerminal(result: CountResult, delta?: DeltaResult): string;
    saveToFile(result: CountResult, delta?: DeltaResult): void;
    private formatNumber;
    private padLang;
}
//# sourceMappingURL=output.d.ts.map