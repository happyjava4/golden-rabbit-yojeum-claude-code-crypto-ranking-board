import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Page from "../app/cities/[id]/page";
import { cities } from "@/lib/data/cities";

// Next.js navigation mocks
jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

describe("City Detail Page", () => {
  const { notFound } = require("next/navigation");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Valid City ID", () => {
    it("renders city metadata correctly", () => {
      const city = cities[0]; // 제주시
      render(<Page params={{ id: city.id.toString() }} />);

      expect(screen.getByText(city.name)).toBeInTheDocument();
      expect(
        screen.getByText((content) => content.includes(city.region))
      ).toBeInTheDocument();
      expect(screen.getByText(city.budget)).toBeInTheDocument();
      expect(screen.getAllByText(city.bestSeason).length).toBeGreaterThan(0);
    });

    it("displays all required city information (name/tags/budget/environment/season/likes)", () => {
      const city = cities[1]; // 부산
      render(<Page params={{ id: city.id.toString() }} />);

      // 이름
      expect(screen.getByText(city.name)).toBeInTheDocument();

      // 태그
      city.tags.forEach(tag => {
        expect(screen.getByText(tag)).toBeInTheDocument();
      });

      // 예산
      expect(screen.getByText(city.budget)).toBeInTheDocument();

      // 환경
      expect(screen.getByText(city.environment.join(" · "))).toBeInTheDocument();

      // 계절
      expect(screen.getAllByText(city.bestSeason).length).toBeGreaterThan(0);

      // 좋아요/싫어요
      expect(screen.getByText(city.likes.toString())).toBeInTheDocument();
      expect(screen.getByText(city.dislikes.toString())).toBeInTheDocument();
    });

    it("displays ASCII art for the city", () => {
      const city = cities[2]; // 강릉
      const { container } = render(<Page params={{ id: city.id.toString() }} />);

      // ASCII 아트는 pre 태그 내부에 있어야 함
      const preElements = container.querySelectorAll('pre');
      expect(preElements.length).toBeGreaterThan(0);

      // pre 태그 중 하나가 도시의 ASCII 아트를 포함하고 있는지 확인
      const hasAsciiArt = Array.from(preElements).some(pre =>
        pre.textContent?.includes('[G]') // 강릉의 ASCII 아트에 포함된 특징적인 부분
      );
      expect(hasAsciiArt).toBe(true);
    });

    it("shows recommendation highlights section", () => {
      const city = cities[3]; // 경주
      render(<Page params={{ id: city.id.toString() }} />);

      expect(screen.getByText(/추천 이유/)).toBeInTheDocument();
      expect(screen.getAllByText(city.bestSeason).length).toBeGreaterThan(0);
    });

    it("displays community reactions (likes/dislikes)", () => {
      const city = cities[4]; // 전주
      render(<Page params={{ id: city.id.toString() }} />);

      expect(screen.getByText(/커뮤니티 반응/)).toBeInTheDocument();
      expect(screen.getByText(/👍 좋아요/)).toBeInTheDocument();
      expect(screen.getByText(/👎 싫어요/)).toBeInTheDocument();
      expect(screen.getByText(city.likes.toString())).toBeInTheDocument();
      expect(screen.getByText(city.dislikes.toString())).toBeInTheDocument();
    });

    it("includes back navigation link to city list", () => {
      const city = cities[5]; // 성수
      render(<Page params={{ id: city.id.toString() }} />);

      const backLink = screen.getByText(/← 도시 리스트로/);
      expect(backLink).toBeInTheDocument();
      expect(backLink.closest('a')).toHaveAttribute('href', '/');
    });
  });

  describe("Invalid City ID - 404 Handling", () => {
    it("calls notFound() for non-existent numeric ID", () => {
      expect(() => render(<Page params={{ id: "999" }} />)).toThrow();
      expect(notFound).toHaveBeenCalled();
    });

    it("calls notFound() for non-numeric ID", () => {
      expect(() => render(<Page params={{ id: "invalid" }} />)).toThrow();
      expect(notFound).toHaveBeenCalled();
    });

    it("calls notFound() for empty ID", () => {
      expect(() => render(<Page params={{ id: "" }} />)).toThrow();
      expect(notFound).toHaveBeenCalled();
    });

    it("calls notFound() for negative ID", () => {
      expect(() => render(<Page params={{ id: "-1" }} />)).toThrow();
      expect(notFound).toHaveBeenCalled();
    });

    it("calls notFound() for zero ID", () => {
      expect(() => render(<Page params={{ id: "0" }} />)).toThrow();
      expect(notFound).toHaveBeenCalled();
    });
  });

  describe("All Cities Coverage", () => {
    it("renders correctly for all cities in the dataset", () => {
      cities.forEach(city => {
        const { unmount } = render(<Page params={{ id: city.id.toString() }} />);

        // 각 도시의 필수 정보가 표시되는지 확인
        expect(screen.getByText(city.name)).toBeInTheDocument();
        expect(screen.getByText(city.budget)).toBeInTheDocument();
        expect(screen.getAllByText(city.bestSeason).length).toBeGreaterThan(0);

        unmount(); // 다음 테스트를 위해 언마운트
      });
    });
  });

  describe("UI Components and Layout", () => {
    it("renders with proper page structure", () => {
      const city = cities[0];
      const { container } = render(<Page params={{ id: city.id.toString() }} />);

      // 메인 컨테이너
      expect(container.querySelector('main')).toBeInTheDocument();

      // 네비게이션
      expect(container.querySelector('nav')).toBeInTheDocument();

      // 섹션들
      const sections = container.querySelectorAll('section');
      expect(sections.length).toBeGreaterThanOrEqual(1);
    });

    it("displays proper page title and breadcrumb", () => {
      const city = cities[0];
      render(<Page params={{ id: city.id.toString() }} />);

      expect(screen.getByText(/도시 상세 페이지/)).toBeInTheDocument();
      expect(screen.getByText(city.name)).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper heading hierarchy", () => {
      const city = cities[0];
      render(<Page params={{ id: city.id.toString() }} />);

      // H1이 존재해야 함
      const h1Element = screen.getByRole('heading', { level: 1 });
      expect(h1Element).toBeInTheDocument();
      expect(h1Element).toHaveTextContent(city.name);
    });

    it("has semantic HTML structure", () => {
      const city = cities[0];
      const { container } = render(<Page params={{ id: city.id.toString() }} />);

      expect(container.querySelector('main')).toBeInTheDocument();
      expect(container.querySelector('section')).toBeInTheDocument();
    });
  });
});
