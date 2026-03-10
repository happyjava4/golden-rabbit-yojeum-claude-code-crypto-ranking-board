import { Button } from "@/components/ui/button";

export function ReviewCTA() {
  return (
    <section className="border-t border-[rgb(var(--border))] bg-[rgb(var(--panel))] py-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-4 text-2xl font-bold text-[rgb(var(--green))] md:text-3xl">
          워케이션 다녀오셨나요?
        </h2>
        <p className="mb-6 text-lg text-[rgb(var(--text))]">
          실제 경험을 공유해 주세요. 다른 노마드들에게 큰 도움이 됩니다.
        </p>
        <Button
          size="lg"
          className="bg-[rgb(var(--green))] text-[rgb(var(--bg))] hover:bg-[rgb(var(--green-dim))] text-lg font-bold"
        >
          무료로 리뷰 작성하기 →
        </Button>
      </div>
    </section>
  );
}
