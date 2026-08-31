import { expect, test } from "@playwright/test";

test("public product story connects thesis, case study and official demo source", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.goto("/");
  await expect(page.getByRole("heading", { name: "把分散的岗位信息，变成更清晰的职业决策。" })).toBeVisible();
  await page.getByRole("link", { name: "阅读产品案例" }).click();
  await expect(page.getByRole("heading", { name: "Career Decision OS" })).toBeVisible();
  await page.getByRole("link", { name: "Open interactive demo" }).click();
  const official = page.getByRole("link", { name: "Official JD / 官方 JD" });
  await expect(official).toHaveAttribute("href", "https://careers.1001.ai/machine-learning-engineer");
  expect(errors).toEqual([]);
});
