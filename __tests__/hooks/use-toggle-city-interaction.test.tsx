import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, jest } from "@jest/globals";
import { useToggleCityInteraction } from "@/lib/hooks/useRealtimeCityStats";

jest.mock("@/lib/services/city-interactions", () => ({
  toggleCityInteraction: jest.fn(),
}));

const { toggleCityInteraction } = jest.requireMock("@/lib/services/city-interactions") as {
  toggleCityInteraction: jest.Mock;
};

describe("useToggleCityInteraction", () => {
  it("returns true on success", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    (toggleCityInteraction as any).mockResolvedValue({
      success: true,
      interaction: null,
      stats: { city_id: 1, likes: 0, dislikes: 0, total_interactions: 0 },
    });

    const { result } = renderHook(() => useToggleCityInteraction());

    let response = false;
    await act(async () => {
      response = await result.current.toggle(1, "like");
    });

    expect(response).toBe(true);
    expect(result.current.error).toBeNull();
    consoleSpy.mockRestore();
  });

  it("sets error on failure", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    (toggleCityInteraction as any).mockResolvedValue({
      success: false,
      interaction: null,
      stats: { city_id: 1, likes: 0, dislikes: 0, total_interactions: 0 },
    });

    const { result } = renderHook(() => useToggleCityInteraction());

    let response = true;
    await act(async () => {
      response = await result.current.toggle(1, "dislike");
    });

    expect(response).toBe(false);
    expect(result.current.error).toBeTruthy();
    consoleSpy.mockRestore();
  });
});
