import {
  CHANGELOG_BASE_URL,
  CHAT_API_BASE_URL,
  KB_DOCS_BASE_URL,
} from "@constants/routes";
import test from "@fixtures";
import {
  CustomCommands,
  HelpAndProfilePage,
  STORAGE_STATE,
  USER_AGENTS,
  skipTest,
} from "@neetoplaywright";

test.describe("Navigation pane", () => {
  test("should verify chat widget", async ({ helpAndProfilePage }) => {
    skipTest.forDevelopmentEnv();
    await helpAndProfilePage.openAndVerifyChatWidgetV2();
  });

  test("should verify help articles", async ({ helpAndProfilePage }) => {
    await helpAndProfilePage.openAndVerifyHelpArticlesV2();
  });

  test("should verify changelog", async ({ helpAndProfilePage }) => {
    skipTest.forDevelopmentEnv();
    await helpAndProfilePage.openAndVerifyChangelogV2();
  });

  test("should verify keyboard shortcuts in non-mac environment", async ({
    browser,
    request,
  }) => {
    const context = await browser.newContext({
      userAgent: USER_AGENTS.windows,
      storageState: STORAGE_STATE,
    });
    const page = await context.newPage();
    const neetoPlaywrightUtilities = new CustomCommands(page, request);
    const helpAndProfilePage = new HelpAndProfilePage({
      page,
      neetoPlaywrightUtilities,
      chatApiBaseURL: CHAT_API_BASE_URL,
      kbDocsBaseURL: KB_DOCS_BASE_URL,
      changelogBaseURL: CHANGELOG_BASE_URL,
    });

    await page.goto("/", { waitUntil: "load" });
    await helpAndProfilePage.openAndVerifyKeyboardShortcutsPaneV2(
      [],
      "windows"
    );
  });

  test("should verify keyboard shortcuts in mac environment", async ({
    browser,
    request,
  }) => {
    const context = await browser.newContext({
      userAgent: USER_AGENTS.mac,
      storageState: STORAGE_STATE,
    });
    const page = await context.newPage();
    const neetoPlaywrightUtilities = new CustomCommands(page, request);
    const helpAndProfilePage = new HelpAndProfilePage({
      page,
      neetoPlaywrightUtilities,
      chatApiBaseURL: CHAT_API_BASE_URL,
      kbDocsBaseURL: KB_DOCS_BASE_URL,
      changelogBaseURL: CHANGELOG_BASE_URL,
    });

    await page.goto("/", { waitUntil: "load" });
    await helpAndProfilePage.openAndVerifyKeyboardShortcutsPaneV2([], "mac");
  });

  test("should verify app switcher", async ({ helpAndProfilePage }) => {
    await helpAndProfilePage.openAppSwitcherAndVerifyV2();
  });

  test("should verify profile links", async ({ helpAndProfilePage }) => {
    skipTest.forAllExceptStagingEnv();
    await helpAndProfilePage.verifyProfileAndOrganizationLinksV2();
  });
});
