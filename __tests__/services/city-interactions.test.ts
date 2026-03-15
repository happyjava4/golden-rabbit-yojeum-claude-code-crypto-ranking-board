import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import type { CityStats, CityInteraction } from "@/types/database";

jest.mock("@/lib/supabase/client", () => {
  const supabaseMock = {
    auth: {
      getUser: jest.fn(),
    },
    from: jest.fn(),
  };

  return {
    createClient: jest.fn(() => supabaseMock),
    __supabaseMock: supabaseMock,
  };
});

const createQueryBuilder = () => {
  const builder: any = {
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    in: jest.fn().mockReturnThis(),
    single: jest.fn(),
    maybeSingle: jest.fn(),
    delete: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis(),
  };
  return builder;
};

const mockStats = (overrides?: Partial<CityStats>): CityStats => ({
  city_id: 1,
  likes: 10,
  dislikes: 3,
  total_interactions: 13,
  ...overrides,
});

const mockInteraction = (overrides?: Partial<CityInteraction>): CityInteraction => ({
  id: "interaction-1",
  user_id: "user-1",
  city_id: 1,
  interaction_type: "like",
  created_at: "2024-01-01",
  updated_at: "2024-01-01",
  ...overrides,
});

describe("city-interactions service", () => {
  let supabaseMock: any;
  let consoleSpy: ReturnType<typeof jest.spyOn>;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    jest.resetAllMocks();
    const supabaseModule = jest.requireMock("@/lib/supabase/client") as any;
    supabaseMock = supabaseModule.__supabaseMock;
    supabaseMock.from.mockImplementation(() => createQueryBuilder());
    (supabaseModule.createClient as jest.Mock).mockReturnValue(supabaseMock);
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it("returns failure when user is not authenticated", async () => {
  supabaseMock.auth.getUser.mockResolvedValue({ data: { user: null }, error: null });

    const { toggleCityInteraction } = await import("@/lib/services/city-interactions");
    const result = await toggleCityInteraction(1, "like");

    expect(result.success).toBe(false);
    expect(result.stats.likes).toBe(0);
  });

  it("inserts new interaction when none exists", async () => {
  supabaseMock.auth.getUser.mockResolvedValue({ data: { user: { id: "user-1" } }, error: null });

    const query = createQueryBuilder();
    query.single
      .mockResolvedValueOnce({ data: null }) // existing interaction
      .mockResolvedValueOnce({ data: mockInteraction() }) // insert
      .mockResolvedValueOnce({ data: mockStats() }); // stats
  supabaseMock.from.mockReturnValue(query);

    const { toggleCityInteraction } = await import("@/lib/services/city-interactions");
    const result = await toggleCityInteraction(1, "like");

    expect(query.insert).toHaveBeenCalled();
    expect(result.success).toBe(true);
    expect(result.stats.likes).toBe(10);
  });

  it("updates interaction when switching type", async () => {
  supabaseMock.auth.getUser.mockResolvedValue({ data: { user: { id: "user-1" } }, error: null });

    const query = createQueryBuilder();
    query.single
      .mockResolvedValueOnce({ data: mockInteraction({ interaction_type: "like" }) }) // existing
      .mockResolvedValueOnce({ data: mockInteraction({ interaction_type: "dislike" }) }) // update
      .mockResolvedValueOnce({ data: mockStats({ dislikes: 4 }) }); // stats
  supabaseMock.from.mockReturnValue(query);

    const { toggleCityInteraction } = await import("@/lib/services/city-interactions");
    const result = await toggleCityInteraction(1, "dislike");

    expect(query.update).toHaveBeenCalled();
    expect(result.stats.dislikes).toBe(4);
  });

  it("getCityStatsClient returns fallback when error occurs", async () => {
  supabaseMock.auth.getUser.mockResolvedValue({ data: { user: { id: "user-1" } }, error: null });

    const query = createQueryBuilder();
    query.single.mockResolvedValue({ data: null, error: { code: "PGRST116" } });
  supabaseMock.from.mockReturnValue(query);

    const { getCityStatsClient } = await import("@/lib/services/city-interactions");
    const result = await getCityStatsClient(99);

    expect(result.city_id).toBe(99);
    expect(result.likes).toBe(0);
  });

  it("getUserInteractionForCityClient returns null without user", async () => {
  supabaseMock.auth.getUser.mockResolvedValue({ data: { user: null }, error: null });

    const { getUserInteractionForCityClient } = await import("@/lib/services/city-interactions");
    const result = await getUserInteractionForCityClient(1);

    expect(result).toBeNull();
  });
});
