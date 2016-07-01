declare interface IToolbarProps {
    baseUrl: string;
    currentScenario: number;
    onTouchTapOpenFolder: Function;
    onTouchTapRun: () => void;
    onTouchTapClear: () => void;
    onTouchTapEdit: () => void;
    onCurrentScenarioChange: (scenario: number) => void;
    onBaseUrlChange: (baseUrl: string) => void;
    scenarios: string[];
}
