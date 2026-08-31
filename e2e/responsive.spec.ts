import { expect, test } from "@playwright/test";

for (const viewport of [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
]) {
  test(`${viewport.name} workspace keeps sources accessible without body overflow`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/app/opportunities");
    const bodyOverflow = await page.evaluate(() => document.body.scrollWidth > document.body.clientWidth);
    expect(bodyOverflow).toBe(false);
    await expect(page.getByRole("button", { name: /工作台菜单|Workspace menu/ })).toBeVisible();
    await page.getByRole("button", { name: /工作台菜单|Workspace menu/ }).click();
    await expect(page.getByRole("navigation", { name: /工作台导航|Workspace navigation/ })).toBeVisible();
    const sourceLink = page.getByRole("link", { name: "JD ↗" }).first();
    await expect(sourceLink).toBeVisible();
    const sourceBounds = await sourceLink.boundingBox();
    expect(sourceBounds).not.toBeNull();
    expect(sourceBounds!.x + sourceBounds!.width).toBeLessThanOrEqual(viewport.width);
  });
}
