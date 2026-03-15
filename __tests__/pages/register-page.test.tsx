import { render, screen } from "@testing-library/react";
import { describe, it, expect, jest } from "@jest/globals";
import RegisterPage from "@/app/register/page";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock("@/app/register/actions", () => ({
  register: jest.fn(),
}));

describe("RegisterPage", () => {
  it("renders register form", () => {
    render(<RegisterPage />);

  expect(screen.getByText("🇰🇷 회원가입")).toBeTruthy();
    expect(screen.getByLabelText("이메일")).toBeTruthy();
    expect(screen.getByLabelText("비밀번호")).toBeTruthy();
  });
});
