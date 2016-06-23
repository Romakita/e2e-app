declare interface IViewState {
    
    console: {
        stdout: string;
        stderr: string;
    },

    toolbar:{
        baseUrl: string;
        scenarios: string[];
    }

}