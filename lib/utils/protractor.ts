import {spawn} from "./spawn";
import {ChildProcess} from "child_process";
import {PROTRACTOR, sanitize, ROOT, PROTRACTOR_INSTALL} from "./path";
import * as std from "./std";
import * as Promise from "bluebird";
import * as Fs from "fs";

export function install(){
    return new Promise<any>((resolve: Function, reject: Function) => {
        const chromeDriver = `${ROOT}\node_modules\protractor\selenium\chromedriver_2.21.exe`;

        if(!Fs.existsSync(chromeDriver)){

            let childProcess: ChildProcess = spawn("node", [PROTRACTOR_INSTALL, "update"]);

            childProcess.stdout.on("data", (data) => {
                std.log(data.toString());
            });

            childProcess.stderr.on("data", (data) => {
                std.error('[INSTALL] '+data.toString());
            });

            childProcess.on("error", (data) => {
                std.error('[INSTALL] '+data.toString());
            });

            childProcess.on('close', resolve);

        } else {
            resolve();
        }
    });

}

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
    });
}

export function protractor(protractorFile: string){

    return new Promise((resolve, reject) => {

        let childProcess: ChildProcess = spawn("node", [PROTRACTOR, protractorFile]);

        childProcess.stdout.on("data", (data) => {
            std.log(data.toString());
        });

        childProcess.stderr.on("data", (data) => {
            std.error(data.toString());
        });

        childProcess.on("error", (data) => {
            std.error(data.toString());
        });

        childProcess.on('close', resolve);
    });

}