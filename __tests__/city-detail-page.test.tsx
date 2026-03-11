import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Page from "../app/cities/[id]/page";
import { cities } from "@/lib/data/cities";

jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

describe("City detail page", () => {
  it("renders city metadata", () => {
    const city = cities[0];
    render(<Page params={{ id: city.id.toString() }} />);

    expect(screen.getByText(city.name)).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.includes(city.region))
    ).toBeInTheDocument();
    expect(screen.getByText(city.budget)).toBeInTheDocument();
    expect(screen.getAllByText(city.bestSeason).length).toBeGreaterThan(0);
  });

  it("shows recommendation highlights", () => {
    const city = cities[1];
    render(<Page params={{ id: city.id.toString() }} />);

    expect(screen.getByText(/추천 이유/)).toBeInTheDocument();
    expect(screen.getAllByText(city.bestSeason).length).toBeGreaterThan(0);
  });
});
