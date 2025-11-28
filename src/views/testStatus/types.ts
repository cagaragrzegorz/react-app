export interface TestRunOutcome {
    passed: number;
    failed: number;
    skipped: number;
    flaky: number;
    total: number;
}

export interface SBuild {
    date: string;
    id: string;
    name: string;
    duration: string;
    result: string;
    url: string;
    testRunOutcome?: TestRunOutcome;
}

export interface SBuildHistory {
    count: number;
    name: string;
    project: string;
    runType: string;
    history: Array<SBuild | undefined>;
}

export interface PipelineDefinitions {
    [key: string]: string;
}
