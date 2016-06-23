import * as Path from "path";

export class Scenario {
    private _label: string;
    private _path: string;

    constructor(
        filePath: string
    ) {
        this._label = Path.basename(filePath).replace('.ts', '');
        this._path = Path.resolve(filePath.replace('.ts', '.js'));
    }


    get label(): string {
       return this._label;
    }

    get path(): string {
        return this._path;
    }
}