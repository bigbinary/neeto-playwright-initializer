import { cpSync, existsSync, rmSync, readFile, writeFileSync } from "fs";
import readline from "readline-sync";
import { FILES_TO_REPLACE } from "./constants";

interface AppDetails {
  name: string;
  port: string;
  fullName: string;
  productKey: string;
  currentsId: string;
}

if (existsSync("playwright-tests/node_modules")) {
  rmSync("playwright-tests/node_modules", { recursive: true });
}

cpSync("playwright-tests", "playwright-tests-starter", {
  recursive: true,
  force: true,
});

const appDetails: Partial<AppDetails> = {};

appDetails.fullName = readline.question(
  "Enter product name? (eg: neetoDesk, neetoRecord, neetoPlanner):"
);

appDetails.name = appDetails.fullName.replace("neeto", "");

appDetails.port = readline.question(
  "Enter product port number? (eg: 9001, 9002):"
);

appDetails.productKey = readline.question(
  `Create a new project for this product in neetoPlaydash.
  Visit https://neeto-engineering.neetoplaydash.com to create a new project.
  Enter the project key for the product:`
);

appDetails.currentsId = readline.question(
  `Create a new project for this product in https://app.currents.dev.
  Enter the project id for the product:`
);

Promise.all(
  FILES_TO_REPLACE.map(async (path) =>
    readFile(path, (error, data) => {
      error && console.error(error);

      writeFileSync(
        path,
        data
          .toString()
          .replaceAll("<PRODUCT_PORT>", appDetails.port)
          .replaceAll("<PLAYDASH_PROJECT_KEY>", appDetails.productKey)
          .replaceAll("<PRODUCT_FULL_NAME>", appDetails.fullName.toLowerCase())
          .replaceAll("<PRODUCT_NAME>", appDetails.name)
          .replaceAll("<CURRENTS_PROJECT_ID>", appDetails.currentsId)
      );
    })
  )
).then(
  () => console.log("Completed generating files"),
  (reason) => console.log(`Error generating files. ${reason}`)
);

console.log(`Next steps:
  1. Copy the newly generated playwright-tests-starter on to the neeto product.
  2. Rename the directory to playwright-tests.
  3. Execute \`yarn install\` and \`yarn playwright install\` within the playwright-tests directory.`);
