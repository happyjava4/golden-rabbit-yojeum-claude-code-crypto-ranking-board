import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 border-b border-[rgb(var(--border))] bg-[rgb(var(--bg))]/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="text-2xl">🇰🇷</span>
          <span className="text-xl font-bold text-[rgb(var(--green))]">
            워케이션 코리아
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="hidden sm:inline-flex text-[rgb(var(--text))] hover:text-[rgb(var(--green))] hover:bg-[rgb(var(--panel))]"
          >
            로그인
          </Button>
          <Button
            size="sm"
            className="bg-[rgb(var(--green))] text-[rgb(var(--bg))] hover:bg-[rgb(var(--green-dim))] font-bold"
          >
            무료 가입
          </Button>
        </div>
      </div>
    </nav>
  );
}
