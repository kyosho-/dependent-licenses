import * as child from 'child_process';

export class LicenseGenerator {
    static readonly NPMLS_REGEX: RegExp = /^.* (.+@.+)$/;

    npmls() {
        const childProcess = child.exec('npm ls --depth=0 --prod=true --parseable=false');
        childProcess.stdout.on('data', (chunk) => {
            const packageParam = this.covert(chunk.toString().split('\n'));
            this.convert2(packageParam);
        });
    }

    covert(npmlsResult: string[]): string {
        let result = '';
        for (const line of npmlsResult) {
            const matched: string[] | null = line.match(LicenseGenerator.NPMLS_REGEX);
            if (matched === null) {
                continue;
            }

            result += result.length !== 0 ? ';' : '';
            result += matched[1];
        }

        return result;
    }

    convert2(packageParame: string) {
        const cmd = `npx license-checker --direct --json --packages ${packageParame}`;

        const childProcess = child.exec(cmd);
        childProcess.stdout.on('data', (chunk) => {
            const checkResult = JSON.parse(chunk.toString());
            for (const key in checkResult) {
                if (checkResult.hasOwnProperty(key)) {
                    const element = checkResult[key];
                    for (const paramKey in element) {
                        if (paramKey !== 'licenses' && paramKey !== 'repository') {
                            delete element[paramKey];
                        }
                    }
                }
            }
            console.log(JSON.stringify(checkResult, null, 4));
        });
    }
}