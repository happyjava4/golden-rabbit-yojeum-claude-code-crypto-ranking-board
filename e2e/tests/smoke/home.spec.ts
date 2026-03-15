import { test, expect } from "@playwright/test";
import { cities } from "@/lib/data/cities";

const totalCities = cities.length;

test.describe("홈페이지 기본 상태", () => {
  test("로고, 도시 카드, 기본 필터 상태를 확인한다", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    await expect(page.getByText("워케이션 코리아")).toBeVisible();
    const main = page.locator("main");
    await expect(main).toContainText("도시 리스트");

    for (const city of cities) {
      await expect(main).toContainText(city.name);
    }

    await expect(
      main
    ).toContainText(`${totalCities}개의 도시가 검색되었습니다.`);
  });
});
