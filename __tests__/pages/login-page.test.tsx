import { render, screen } from "@testing-library/react";
import { describe, it, expect, jest } from "@jest/globals";
import LoginPage from "@/app/login/page";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock("@/app/login/actions", () => ({
  login: jest.fn(),
}));

describe("LoginPage", () => {
  it("renders login form", () => {
    render(<LoginPage />);

    expect(screen.getByText("🇰🇷 로그인")).toBeTruthy();
    expect(screen.getByLabelText("이메일")).toBeTruthy();
    expect(screen.getByLabelText("비밀번호")).toBeTruthy();
  });
});
