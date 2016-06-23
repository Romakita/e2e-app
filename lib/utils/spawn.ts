
import {ChildProcess, spawn as cSpawn} from "child_process";
import {env} from "./env";
import * as os from "os";

export function spawn(cmd: string, args: string[] = [], cwd: string = '.'): ChildProcess {
    if (os.type() == 'Darwin') {
        return cSpawn(cmd, args, {
            cwd: cwd,
            env: env()
        });
    } else if (os.type() == 'Linux') {
        if (os.arch() == 'x64') {

        } else {

        }
    } else if (os.type() == 'Windows_NT') {

        let cmdArgs = [ '/s', '/c', `cd ${cwd} && `].concat([cmd]).concat(args);

        //console.log(cmdArgs.join(' '));

        return cSpawn('cmd', cmdArgs, {
            env: env()
        });
    }
}