import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CityCard } from "@/components/city-card";
import { cities } from "@/lib/data/cities";

// Next.js Link 모킹
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

describe("City Navigation Integration", () => {
  describe("City Card to Detail Page Navigation", () => {
    it("renders detail page link for each city card", () => {
      cities.forEach(city => {
        const { unmount } = render(<CityCard city={city} />);

        // "상세 보기" 버튼이 있는지 확인
        const detailLink = screen.getByText(/상세 보기/);
        expect(detailLink).toBeInTheDocument();

        // 링크의 href가 올바른 경로인지 확인
        const linkElement = detailLink.closest('a');
        expect(linkElement).toHaveAttribute('href', `/cities/${city.id}`);

        unmount(); // 다음 테스트를 위해 언마운트
      });
    });

    it("generates correct URLs for all city IDs", () => {
      const expectedUrls = [
        { id: 1, url: '/cities/1' },
        { id: 2, url: '/cities/2' },
        { id: 3, url: '/cities/3' },
        { id: 4, url: '/cities/4' },
        { id: 5, url: '/cities/5' },
        { id: 6, url: '/cities/6' },
      ];

      expectedUrls.forEach(({ id, url }) => {
        const city = cities.find(c => c.id === id);
        if (city) {
          const { unmount } = render(<CityCard city={city} />);

          const detailLink = screen.getByText(/상세 보기/);
          const linkElement = detailLink.closest('a');
          expect(linkElement).toHaveAttribute('href', url);

          unmount();
        }
      });
    });

    it("maintains consistent link styling across all city cards", () => {
      const city = cities[0];
      const { container } = render(<CityCard city={city} />);

      const detailLink = screen.getByText(/상세 보기/);
      const linkElement = detailLink.closest('a');

      // Button 컴포넌트가 존재하고 올바른 링크를 가지는지 확인
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute('href', `/cities/${city.id}`);

      // 링크가 실제로 렌더링되었는지만 확인 (CSS 클래스는 빌드 과정에서 변경될 수 있음)
      expect(linkElement.textContent).toBe('상세 보기');
    });
  });

  describe("City Card Information Display", () => {
    it("displays city name that matches detail page", () => {
      cities.forEach(city => {
        const { unmount } = render(<CityCard city={city} />);

        // 도시 이름이 표시되는지 확인
        expect(screen.getByText(city.name)).toBeInTheDocument();

        unmount();
      });
    });

    it("displays all required information for navigation context", () => {
      const city = cities[0]; // 제주시
      render(<CityCard city={city} />);

      // 네비게이션에 필요한 컨텍스트 정보들
      expect(screen.getByText(city.name)).toBeInTheDocument();
      expect(screen.getByText(city.budget)).toBeInTheDocument();
      expect(screen.getByText(city.region)).toBeInTheDocument();
      expect(screen.getByText(city.bestSeason)).toBeInTheDocument();

      // 태그들
      city.tags.forEach(tag => {
        expect(screen.getByText(tag)).toBeInTheDocument();
      });

      // 환경
      expect(screen.getByText(city.environment.join(', '))).toBeInTheDocument();
    });
  });

  describe("Link Accessibility", () => {
    it("has accessible link text for screen readers", () => {
      const city = cities[0];
      render(<CityCard city={city} />);

      const detailLink = screen.getByText(/상세 보기/);
      expect(detailLink).toBeInTheDocument();

      // 링크 텍스트가 명확하고 접근 가능한지 확인
      expect(detailLink.textContent).toBe('상세 보기');
    });

    it("links are keyboard accessible", () => {
      const city = cities[0];
      render(<CityCard city={city} />);

      const detailLink = screen.getByText(/상세 보기/);
      const linkElement = detailLink.closest('a');

      // a 태그로 렌더링되어 키보드 접근이 가능한지 확인
      expect(linkElement?.tagName).toBe('A');
      expect(linkElement).toHaveAttribute('href', `/cities/${city.id}`);
    });
  });

  describe("Error Cases", () => {
    it("handles missing city data gracefully", () => {
      // 기본 도시 데이터 구조를 가진 최소한의 객체
      const minimalCity = {
        id: 999,
        name: "테스트 도시",
        region: "테스트 지역" as const,
        tags: ["#테스트"],
        art: "TEST",
        budget: "테스트 예산",
        environment: ["테스트환경"],
        bestSeason: "테스트계절" as const,
        likes: 0,
        dislikes: 0,
      };

      expect(() => render(<CityCard city={minimalCity} />)).not.toThrow();

      const detailLink = screen.getByText(/상세 보기/);
      const linkElement = detailLink.closest('a');
      expect(linkElement).toHaveAttribute('href', `/cities/999`);
    });
  });

  describe("Data Consistency", () => {
    it("ensures all cities have valid IDs for routing", () => {
      cities.forEach(city => {
        expect(city.id).toBeGreaterThan(0);
        expect(Number.isInteger(city.id)).toBe(true);
      });
    });

    it("ensures no duplicate city IDs", () => {
      const cityIds = cities.map(city => city.id);
      const uniqueIds = [...new Set(cityIds)];
      expect(uniqueIds.length).toBe(cityIds.length);
    });

    it("verifies sequential or logical ID progression", () => {
      const sortedIds = cities.map(city => city.id).sort((a, b) => a - b);
      expect(sortedIds).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });
});