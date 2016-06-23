declare interface IToolbarProps {
    baseUrl: string;
    onTouchTapOpenFolder: Function;
    onTouchTapRun: (scenario: number) => void;
    onTouchTapClear: () => void;
    onTouchTapEdit: () => void;
    onBaseUrlChange: (baseUrl: string) => void;
    scenarios: string[];
}

declare interface IToolbarState {
    baseUrl: string;
    currentScenario: number;
    scenarios: string[];
}