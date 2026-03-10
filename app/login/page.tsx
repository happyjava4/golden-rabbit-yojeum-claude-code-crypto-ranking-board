import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
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
            <span className="text-xs text-[rgb(var(--dim))]">auth_login.sys</span>
          </div>

          <CardTitle className="text-2xl font-bold text-[rgb(var(--green))]">
            🇰🇷 로그인
          </CardTitle>
          <CardDescription className="text-[rgb(var(--text))]">
            워케이션 코리아 계정으로 로그인하세요
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[rgb(var(--text))]">
              이메일
            </Label>
            <Input
              id="email"
              type="email"
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
              type="password"
              placeholder="••••••••"
              className="border-[rgb(var(--border))] bg-[rgb(var(--bg))] text-[rgb(var(--text))] placeholder:text-[rgb(var(--dim))]"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-[rgb(var(--text))]">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-[rgb(var(--border))] bg-[rgb(var(--bg))]"
              />
              로그인 상태 유지
            </label>
            <Link
              href="/forgot-password"
              className="text-[rgb(var(--cyan))] hover:text-[rgb(var(--green))] transition-colors"
            >
              비밀번호 찾기
            </Link>
          </div>

          <Button
            className="w-full bg-[rgb(var(--green))] text-[rgb(var(--bg))] hover:bg-[rgb(var(--green-dim))] font-bold"
            size="lg"
          >
            [ LOGIN ]
          </Button>

          {/* 구분선 */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-[rgb(var(--border))]" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[rgb(var(--panel))] px-2 text-[rgb(var(--dim))]">
                또는
              </span>
            </div>
          </div>

          {/* 소셜 로그인 */}
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full border-[rgb(var(--border))] bg-[rgb(var(--bg))] text-[rgb(var(--text))] hover:bg-[rgb(var(--panel))] hover:text-[rgb(var(--green))]"
            >
              카카오로 로그인
            </Button>
            <Button
              variant="outline"
              className="w-full border-[rgb(var(--border))] bg-[rgb(var(--bg))] text-[rgb(var(--text))] hover:bg-[rgb(var(--panel))] hover:text-[rgb(var(--green))]"
            >
              구글로 로그인
            </Button>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2 border-t border-[rgb(var(--border))] pt-4">
          <p className="text-center text-sm text-[rgb(var(--text))]">
            아직 계정이 없으신가요?{" "}
            <Link
              href="/register"
              className="font-bold text-[rgb(var(--cyan))] hover:text-[rgb(var(--green))] transition-colors"
            >
              무료 회원가입
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
