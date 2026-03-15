import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, jest } from "@jest/globals";
import { FilterBar } from "@/components/filter-bar";
import type { Budget, Region, Environment, BestSeason } from "@/types/city";

const noop = () => undefined;

describe("FilterBar", () => {
  it("calls onBudgetChange when budget button clicked", () => {
    const onBudgetChange = jest.fn();
    render(
      <FilterBar
        selectedBudget={null}
        onBudgetChange={onBudgetChange}
        selectedRegion={"전체" as Region}
        onRegionChange={noop}
        selectedEnvironments={[] as Environment[]}
        onEnvironmentsChange={noop}
        selectedSeason={null as BestSeason | null}
        onSeasonChange={noop}
        resultCount={3}
      />
    );

    const budgetButton = screen.getByText("100만원 이하");
    fireEvent.click(budgetButton);

    expect(onBudgetChange).toHaveBeenCalledWith("100만원 이하" as Budget);
  });
});
