import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { signup } from "./actions";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[rgb(var(--bg))] p-4">
      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 20px,
              rgb(var(--green)) 20px,
              rgb(var(--green)) 21px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 20px,
              rgb(var(--green)) 20px,
              rgb(var(--green)) 21px
            )`,
          }}
        />
      </div>

      <Card className="relative w-full max-w-md border-2 border-[rgb(var(--border))] bg-[rgb(var(--panel))]">
        <CardHeader className="space-y-1">
          {/* 터미널 스타일 헤더 */}
          <div className="mb-4 flex items-center gap-2 border-b border-[rgb(var(--border))] pb-3">
            <div className="flex gap-1">
              <div className="h-3 w-3 rounded-full bg-[rgb(var(--red))]" />
              <div className="h-3 w-3 rounded-full bg-[rgb(var(--amber))]" />
              <div className="h-3 w-3 rounded-full bg-[rgb(var(--green))]" />
            </div>
            <span className="text-xs text-[rgb(var(--dim))]">auth_register.sys</span>
          </div>

          <CardTitle className="text-2xl font-bold text-[rgb(var(--green))]">
            🇰🇷 회원가입
          </CardTitle>
          <CardDescription className="text-[rgb(var(--text))]">
            무료로 워케이션 코리아에 가입하세요
          </CardDescription>
        </CardHeader>

        <form action={signup}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[rgb(var(--text))]">
                이름
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                placeholder="홍길동"
                className="border-[rgb(var(--border))] bg-[rgb(var(--bg))] text-[rgb(var(--text))] placeholder:text-[rgb(var(--dim))]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[rgb(var(--text))]">
                이메일
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="example@workcation.kr"
                className="border-[rgb(var(--border))] bg-[rgb(var(--bg))] text-[rgb(var(--text))] placeholder:text-[rgb(var(--dim))]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[rgb(var(--text))]">
                비밀번호
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                placeholder="6자 이상 입력해주세요"
                className="border-[rgb(var(--border))] bg-[rgb(var(--bg))] text-[rgb(var(--text))] placeholder:text-[rgb(var(--dim))]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password-confirm" className="text-[rgb(var(--text))]">
                비밀번호 확인
              </Label>
              <Input
                id="password-confirm"
                name="confirmPassword"
                type="password"
                required
                minLength={6}
                placeholder="비밀번호를 다시 입력해주세요"
                className="border-[rgb(var(--border))] bg-[rgb(var(--bg))] text-[rgb(var(--text))] placeholder:text-[rgb(var(--dim))]"
              />
            </div>

            {/* 약관 동의 */}
            <div className="space-y-2 rounded border border-[rgb(var(--border))] bg-[rgb(var(--bg))] p-3">
              <label className="flex items-start gap-2 text-sm text-[rgb(var(--text))]">
                <input
                  type="checkbox"
                  required
                  className="mt-0.5 h-4 w-4 rounded border-[rgb(var(--border))]"
                />
                <span>
                  <span className="text-[rgb(var(--green))]">[필수]</span> 서비스 이용약관 및 개인정보 처리방침에 동의합니다
                </span>
              </label>
              <label className="flex items-start gap-2 text-sm text-[rgb(var(--text))]">
                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 rounded border-[rgb(var(--border))]"
                />
                <span>
                  <span className="text-[rgb(var(--dim))]">[선택]</span> 마케팅 정보 수신에 동의합니다
                </span>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full bg-[rgb(var(--green))] text-[rgb(var(--bg))] hover:bg-[rgb(var(--green-dim))] font-bold"
              size="lg"
            >
              [ SIGN UP ]
            </Button>

            {/* 구분선 */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-[rgb(var(--border))]" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[rgb(var(--panel))] px-2 text-[rgb(var(--dim))]">
                  소셜 가입 (준비중)
                </span>
              </div>
            </div>
          </CardContent>
        </form>

        <CardFooter className="flex flex-col gap-2 border-t border-[rgb(var(--border))] pt-4">
          <p className="text-center text-sm text-[rgb(var(--text))]">
            이미 계정이 있으신가요?{" "}
            <Link
              href="/login"
              className="font-bold text-[rgb(var(--cyan))] hover:text-[rgb(var(--green))] transition-colors"
            >
              로그인
            </Link>
          </p>
          <Link href="/" className="text-center text-sm text-[rgb(var(--dim))] hover:text-[rgb(var(--text))] transition-colors">
            ← 홈으로 돌아가기
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
