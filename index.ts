#! /usr/bin/env node

import { fetchLocalJSON, fetchOriginJSON } from "./lib/fetchJSON";
import * as fs from "fs";
import * as path from "path";

export async function bootstrap() {
  const origin = await fetchOriginJSON();
  const local = await fetchLocalJSON();
  Object.keys(local.dependencies).map((packageName) => {
    if (origin.dependencies[packageName]) {
      local.dependencies[packageName] = origin.dependencies[packageName];
    }
  });

  Object.keys(local.devDependencies).map((packageName) => {
    if (origin.devDependencies[packageName]) {
      local.devDependencies[packageName] = origin.devDependencies[packageName];
    }
  });
  const jsonStr = JSON.stringify(local.default);
  fs.writeFileSync(
    path.join(process.cwd(), "package.json"),
    Buffer.from(jsonStr)
  );
}

bootstrap();
