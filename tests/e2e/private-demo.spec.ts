import { expect, test } from "@playwright/test";

test("Doha opportunity moves from decision dossier through tracker archive and restore", async ({ page }) => {
  await page.goto("/app/opportunities");
  await page.getByLabel("City").selectOption({ label: "Doha" });
  await expect(page.getByText("1 roles")).toBeVisible();
  await page.getByRole("link", { name: /Machine Learning Engineer 1001 AI/ }).click();
  await expect(page).toHaveURL(/1001-ml-engineer-doha/);

  await expect(page.getByText("Qatar work permit or sponsorship").first()).toBeVisible();
  await expect(page.getByText("Candidate fit").first()).toBeVisible();
  await expect(page.getByText("Production deployment").first()).toBeVisible();
  await page.getByRole("button", { name: /加入 Tracker/ }).click();
  await expect(page.getByText(/已加入 Tracker/)).toBeVisible();
  await page.getByRole("link", { name: /打开 Tracker/ }).click();

  await page.getByRole("button", { name: "移至 已投递" }).click();
  await expect(page.getByText("已投递", { exact: true }).first()).toBeVisible();
  await expect(page.getByRole("button", { name: "归档" })).toBeEnabled();
  await page.getByRole("button", { name: "归档" }).click();
  await expect(page.getByRole("button", { name: "恢复到研究中" })).toBeVisible();
  await page.getByRole("button", { name: "恢复到研究中" }).click();
  await expect(page.getByText("研究中", { exact: true }).first()).toBeVisible();
});
