const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { chromium } = require("playwright");

const edgePath =
  process.env.CRM_BROWSER ||
  "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe";

(async () => {
  const browser = await chromium.launch({
    executablePath: edgePath,
    headless: true,
  });
  const context = await browser.newContext({
    viewport: { width: 390, height: 1000 },
    deviceScaleFactor: 1,
    isMobile: true,
  });
  const page = await context.newPage();
  const pageUrl =
    pathToFileURL(path.resolve(__dirname, "..", "index.html")).href + `?pw=${Date.now()}`;

  await page.goto(pageUrl);
  await page.fill("#dishNameInput", "Блюдо 11");
  await page.getByRole("button", { name: "Добавить" }).click();

  const detailName = await page.locator("#detailName").inputValue();
  const createdDishSelected = detailName === "Блюдо 11";

  await page.fill("#detailNextStep", "Сделать первую пробу");
  await page.fill("#detailBlocker", "Ждем продукты");
  await page.fill("#detailNotes", "Черновая карточка создана");
  await page.getByRole("button", { name: "Сохранить карточку" }).click();

  await page.selectOption("#commentAuthor", "Эльдар");
  await page.fill("#commentText", "Тестовый комментарий сохранения");
  await page.getByRole("button", { name: "Оставить комментарий" }).click();

  await page.getByRole("button", { name: "Показать зависшие" }).click();
  const blockedVisibleText = await page.locator("#boardColumns").textContent();
  const blockedFilterWorks =
    blockedVisibleText.includes("Блюдо 11") && blockedVisibleText.includes("Ждем продукты");

  await page.reload();

  const commentText = await page.locator("#commentList").textContent();
  const savedComment = commentText.includes("Тестовый комментарий сохранения");
  const savedStep = (await page.locator("#detailNextStep").inputValue()) === "Сделать первую пробу";
  const savedBlocker = (await page.locator("#detailBlocker").inputValue()) === "Ждем продукты";
  const layout = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
  }));

  await page.screenshot({
    path: path.resolve(__dirname, "..", "verification-mobile-playwright.png"),
    fullPage: false,
  });
  await browser.close();

  console.log(
    JSON.stringify(
      { createdDishSelected, savedStep, savedBlocker, blockedFilterWorks, savedComment, ...layout },
      null,
      2,
    ),
  );

  if (
    !createdDishSelected ||
    !savedStep ||
    !savedBlocker ||
    !blockedFilterWorks ||
    !savedComment ||
    layout.overflow
  ) {
    process.exit(1);
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
