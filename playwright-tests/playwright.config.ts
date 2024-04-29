// @ts-check
import { definePlaywrightConfig } from "@neetoplaywright";

export default definePlaywrightConfig({
  currentsOverrides: { projectId: "<CURRENTS_PROJECT_ID>" },
  playdashProductionOverrides: { projectKey: "<PLAYDASH_PROJECT_KEY>" },
});
