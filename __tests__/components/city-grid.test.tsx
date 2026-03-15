import { render, screen } from "@testing-library/react";
import { describe, it, expect, jest } from "@jest/globals";
import { CityGrid } from "@/components/city-grid";
import { cities } from "@/lib/data/cities";

jest.mock("@/components/filter-bar", () => ({
  FilterBar: () => <div data-testid="filter-bar" />,
}));

jest.mock("@/components/city-card", () => ({
  CityCard: ({ city }: { city: { id: number; name: string } }) => (
    <div data-testid={`city-card-${city.id}`}>{city.name}</div>
  ),
}));

describe("CityGrid", () => {
  it("renders city cards", () => {
    render(<CityGrid cities={cities.slice(0, 2)} />);

    expect(screen.getByTestId("city-card-1")).toBeTruthy();
    expect(screen.getByTestId("city-card-2")).toBeTruthy();
  });
});
