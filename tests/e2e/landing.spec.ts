import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("calculator submits a valid mock lead", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /Рассчитать стоимость/ }).first().click();
  const calculator = page.locator("#cost");
  for (let index = 0; index < 4; index += 1) {
    await calculator.getByRole("button", { name: "Продолжить" }).click();
  }
  await calculator.getByRole("button", { name: "Показать расчет" }).click();
  await calculator.getByLabel("Имя").fill("Анна");
  await calculator.getByLabel("Телефон").fill("89991234567");
  await calculator.getByRole("checkbox").check();
  await calculator.getByRole("button", { name: "Получить подробную смету" }).click();
  await expect(calculator.getByText(/Заявка принята в демонстрационном режиме/)).toBeVisible({ timeout: 20_000 });
});

test("empty lead form shows accessible validation errors", async ({ page }) => {
  await page.goto("/#contact");
  const form = page.locator("#contact form");
  await form.getByRole("button", { name: "Получить расчет" }).click();
  await expect(form.getByText("Укажите имя")).toBeVisible();
  await expect(form.getByText("Введите российский номер полностью")).toBeVisible();
  await expect(form.getByText("Нужно согласие на обработку данных")).toBeVisible();
});

test("mobile menu navigates to projects and opens details", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes("mobile"), "mobile-only scenario");
  await page.goto("/");
  await page.getByRole("button", { name: "Открыть меню" }).click();
  await page.getByRole("navigation", { name: "Мобильная навигация" }).getByRole("link", { name: "Проекты" }).click();
  await expect(page.locator("#projects")).toBeInViewport();
  await page.locator("#projects").getByRole("button", { name: "Подробнее" }).first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByText("Демонстрационный проект").last()).toBeVisible();
});

test("home and project dialog have no serious axe violations", async ({ page }) => {
  await page.goto("/");
  const homeResults = await new AxeBuilder({ page }).analyze();
  expect(homeResults.violations.filter((item) => ["serious", "critical"].includes(item.impact ?? ""))).toEqual([]);
  await page.locator("#projects").getByRole("button", { name: "Подробнее" }).first().click();
  const dialogResults = await new AxeBuilder({ page }).include('[role="dialog"]').analyze();
  expect(dialogResults.violations.filter((item) => ["serious", "critical"].includes(item.impact ?? ""))).toEqual([]);
});
