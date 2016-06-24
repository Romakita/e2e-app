import * as Promise from "bluebird";
import * as std from "./std";
import {spawn} from "./spawn";
import {TSC} from "./path";
import {ChildProcess} from "child_process";

export default function compile(path: string): Promise<any> {

    return new Promise((resolve: Function, reject: Function): void => {

        std.log('[TSC] compile => ' + path);

            let childProcess: ChildProcess = spawn('tsc', [], path);

            childProcess.stdout.on('data', (data: Buffer) => {
                std.log('[TSC] ' + data.toString());
            });

            childProcess.stderr.on('error', (data: Buffer) => {
                std.error('[TSC] ' + data.toString());
            });

            childProcess.on('error', reject);

            childProcess.on('close', (code) => {

                if (code !== 0) {
                    std.error(`[TSC] process exited with code ${code}`);
                } else {
                    std.log('[TSC] Files compiled');
                }

                resolve();
            });

    });
}
