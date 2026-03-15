import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, jest } from "@jest/globals";
import { CityCard } from "@/components/city-card";
import { cities } from "@/lib/data/cities";

jest.mock("@/lib/hooks/useRealtimeCityStats", () => ({
  useRealtimeCityStats: () => ({
    stats: { city_id: 1, likes: 12, dislikes: 3, total_interactions: 15 },
    userInteraction: null,
    isLoading: false,
    error: null,
    refetch: jest.fn(),
  }),
  useToggleCityInteraction: () => ({
    toggle: (jest.fn() as any).mockResolvedValue(true),
    isToggling: false,
    error: null,
  }),
}));

jest.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    auth: {
      getUser: (jest.fn() as any).mockResolvedValue({ data: { user: { id: "user-1" } }, error: null }),
      onAuthStateChange: jest.fn(() => ({ data: { subscription: { unsubscribe: jest.fn() } } })),
    },
  }),
}));

describe("CityCard", () => {
  it("renders city name and stats", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    await act(async () => {
      render(<CityCard city={cities[0]} />);
    });

    expect(screen.getByText(cities[0].name)).toBeTruthy();
    expect(screen.getByText("12")).toBeTruthy();
    expect(screen.getByText("3")).toBeTruthy();
    consoleSpy.mockRestore();
  });
});
