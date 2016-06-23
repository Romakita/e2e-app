import {spawn} from "child_process";
import {ChildProcess} from "child_process";
import {PROTRACTOR, sanitize, ROOT} from "./path";
import * as std from "./std";
import * as Promise from "bluebird";
import * as Fs from "fs";

export function writeConfig(path, options: any){

    return new Promise<any>((resolve: Function, reject: Function) => {

        const protractorConf = Object.assign(options, require(`${ROOT}/conf/.protractor.json`));

        const pcStr: string = sanitize(JSON.stringify(protractorConf));

        Fs.writeFile(path, `exports.config = ${pcStr}`, {encoding: "utf8"}, (err: NodeJS.ErrnoException) => {

            if(err){
                reject(err);
            }else{
                resolve();
            }

        });
    })
}

export function protractor(protractorFile: string){

    return new Promise((resolve, reject) => {

        let childProcess: ChildProcess = spawn(PROTRACTOR, [protractorFile]);

        childProcess.stdout.on("data", (data) => {
            std.log(data.toString());
        });

        childProcess.stderr.on("data", (data) => {
            std.error(data.toString());
        });

        childProcess.on('close', resolve);
    });

}