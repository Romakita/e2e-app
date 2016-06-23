import {Scenario} from "./Scenario";
import * as Promise from "bluebird";
import {ROOT, sanitize} from "./utils/path";
import compile from "./utils/tsc";
import inspect from "./utils/inspect";
import {protractor, writeConfig} from "./utils/protractor";
import * as std from "./utils/std";
import * as baseUrl from "./utils/baseUrl";

export class Project {

    private _scenarios: Scenario[] = [];
    private protractorFile: string = sanitize(`${ROOT}/conf/protractor.conf.js`);

    constructor(
        private _directory: string
    ) {

        std.log('[OPEN] project : ' + _directory);
        this.inspect();
    }

    /**
     *
     */
    public inspect() {
        this._scenarios = inspect(this._directory)
            .map((path: string) => {
                return new Scenario(path);
            });
    }

    /**
     *
     */
    public compile(): Promise<any> {
        return compile(this._directory);
    }

    /**
     *
     */
    public run(index: number): Promise<any> {
        return this
            .compile()
            .then(() => {
                std.log("[RUN] Write scenario config");
                return Project.Write(this.protractorFile, [this.scenarios[index]]);
            })
            .then(() => {
                std.log("[RUN] Start protractor on address : " + baseUrl.get());
                return protractor(this.protractorFile);
            })
            .then(() => {
                std.log("[RUN] End");
            })
            .catch((err) => {
                std.error(`[ERROR] ${err}`);
                return Promise.reject(err);
            });
    }

    /**
     *
     * @returns {Promise<TResult>|Promise<U>}
     */
    public runAll(): Promise<any> {
        return this
            .compile()
            .then(() => {
                std.log("[RUN] Write scenario config");
                return Project.Write(this.protractorFile, this.scenarios);
            })
            .then(() => {
                std.log("[RUN] Start protractor on address : " + baseUrl.get());
                return protractor(this.protractorFile);
            })
            .then(() => {
                std.log("[RUN] End");
            })
            .catch((err) => {
                console.error(err);
            });
    }

    /**
     *
     * @returns {Scenario[]}
     */
    get scenarios(): Scenario[] {
        return this._scenarios;
    }

    get directory(): string {
        return this._directory;
    }

    /**
     *
     * @param scenarios
     */
    static Write(path, scenarios: Scenario[]): Promise<any> {

        return writeConfig(path, {
            baseUrl: baseUrl.get(),
            specs: Project.ScenariosToSpecs(scenarios)
        });

    }

    /**
     *
     * @param scenarios
     * @returns {*[]}
     * @constructor
     */
    static ScenariosToSpecs(scenarios: Scenario[]): string[] {
        return scenarios.map((scenario: Scenario) => (sanitize(scenario.path)));
    }
}