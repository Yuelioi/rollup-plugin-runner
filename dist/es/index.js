import * as child_process from "child_process";
import * as fs from "fs";
import * as path from "path";
const win32 = process.platform === "win32";

export default function runner(options = {}) {
    const { programName = "", cmd = "" } = options;
    return {
        name: "rollup-plugin-runner",
        version: "0.0.1",
        async buildEnd(error) {
            await new Promise((resolve, reject) => {
                if (win32) {
                    if (programName) {
                        const ps = child_process.spawn("powershell.exe", [
                            "-Command",
                            `(Get-WmiObject -class Win32_Process -Filter 'Name="${programName}"').path`,
                        ]);
                        let output = "";

                        ps.stdout.on("data", (chunk) => {
                            output += chunk.toString();
                        });

                        ps.on("exit", () => {
                            const programPaths = output.split(/\r\n|\r|\n/).filter((programPath) => programPath.trim());
                            if (programPaths.length) {
                                const programPath = programPaths[0];
                                child_process.exec(`"${programPath}" ${cmd}`, (err) => {
                                    reject(err);
                                });
                                resolve("runner success");
                            } else {
                                reject("can not find application");
                            }
                        });
                        ps.on("error", (err) => {
                            reject(err);
                        });
                        ps.stdin.end();
                    } else {
                        child_process.exec(`${cmd}`, (err) => {
                            reject(err);
                        });
                    }
                } else {
                    reject(`only support windows`);
                }
            });
        },
    };
}
