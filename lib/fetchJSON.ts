import * as https from "https";
import { PackageJSON } from "./package-json.type";
import { progress } from "./log";
import * as fs from "fs";
import * as path from "path";

export function fetchOriginJSON(): Promise<PackageJSON> {
  let received_bytes = 0;
  let total_bytes = 0;
  return new Promise((resolve, reject) => {
    const req = https.get(
      "https://gitee.com/hbyunzai/ng-yunzai/raw/master/package.json"
    );
    let data = "";
    req.on("response", (response) => {
      total_bytes = parseInt(response.headers["content-length"]!);
      response.on("data", (chunk) => {
        received_bytes += chunk.length;
        progress(received_bytes, total_bytes);
        data += chunk;
      });
      response.on("error", (error) => {
        reject(error);
        throw error;
      });
      response.on("end", () => {
        resolve(JSON.parse(data));
      });
    });
  });
}

export function fetchLocalJSON(): Promise<PackageJSON> {
  const cwd = process.cwd();
  const fileExists = fs.existsSync(path.join(cwd, "package.json"));
  if (!fileExists)
    throw new Error(
      "the command must be executed in the directory containing package.json"
    );

  const local = import(path.join(cwd, "package.json"));
  return local;
}
