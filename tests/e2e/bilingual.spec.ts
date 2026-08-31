import { expect, test } from "@playwright/test";

test("locale selection persists across reload", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "EN", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Turn scattered job signals into clearer career decisions." })).toBeVisible();
  await page.reload();
  await expect(page.getByRole("button", { name: "EN", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("heading", { name: "Turn scattered job signals into clearer career decisions." })).toBeVisible();
  await page.getByRole("button", { name: "中文" }).click();
  await expect(page.getByRole("heading", { name: "把分散的岗位信息，变成更清晰的职业决策。" })).toBeVisible();
});
