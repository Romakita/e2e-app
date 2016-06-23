
import * as Path from "path";

export const ROOT = sanitize(Path.resolve(__dirname + '/../../'));

export const TSC = sanitize(Path.resolve(`${ROOT}/node_modules/typescript/bin/tsc`));

export const PROTRACTOR = sanitize(Path.resolve(`${ROOT}/node_modules/protractor/bin/protractor`));

export function sanitize(str){
    return str.replace(/\\\\/gi,'/').replace(/\\/gi, '/');
}