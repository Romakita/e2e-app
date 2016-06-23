
import * as Fs from "fs";

export default function inspect(directory: string, filesMatched: string[] = []): string[] {

    let files = Fs.readdirSync(directory);

    return files
        .filter((file: string) => {
            let name: string = directory + '/' + file;

            if (!Fs.statSync(name).isDirectory()){
                return !!name.match(/scenario-(.*)\.ts$/);
            } else{
                if (!name.match(/typings$|utils$/)){
                    inspect(name, filesMatched);
                }
            }

            return false;
        })
        .map<string>((path: string) => {
            return `${directory}/${path}`;
        });
}