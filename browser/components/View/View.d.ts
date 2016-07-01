declare interface IViewState {
    stdout: string;
    stderr: string;
    baseUrl: string;
    scenarios: string[];
    currentScenario: number;
}