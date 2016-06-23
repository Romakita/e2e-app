import * as std from "./std";
import {ROOT} from "./path";
import * as Fs from "fs";

const baseUrlConf = ROOT + "/conf/.baseurl.json";
let baseUrl = require(baseUrlConf).url;

export function get(){
    return baseUrl;
}

export function set(url: string) {
    baseUrl = url;
    Fs.writeFile(baseUrlConf, JSON.stringify({url:url}), {encoding:'utf8'});
}

export function send(){
    std.send('baseUrl', get());
}