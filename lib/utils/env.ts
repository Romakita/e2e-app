import {ROOT} from "./path";
import * as os from "os";

export function env(): any {
    let env = Object.assign({}, process.env);

    if (os.type() == 'Darwin') {
        env.PATH = `${ROOT}/bin:${env.PATH}`;
    } else if (os.type() == 'Linux') {
        if (os.arch() == 'x64') {

        } else {

        }
    } else if (os.type() == 'Windows_NT') {
        env.Path =  `${ROOT}/bin;${env.Path}`;
    }

    return env;
}
