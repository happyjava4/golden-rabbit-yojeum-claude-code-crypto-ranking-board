"use client";

import { useState } from "react";
import { City } from "@/types/city";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { asciiBar, stars } from "@/lib/ascii-utils";
import { Star } from "lucide-react";

interface CityModalProps {
  city: City | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CityModal({ city, isOpen, onClose }: CityModalProps) {
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!city) return null;

  const handleSubmitReview = () => {
    // 실제로는 여기서 API 호출
    console.log("Review submitted:", { rating: selectedRating, text: reviewText });
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setSelectedRating(0);
      setReviewText("");
    }, 3000);
  };

  const quickStats = [
    { label: "월 생활비", value: city.monthlyRent },
    { label: "인터넷 속도", value: city.mbps },
    { label: "코워킹", value: `${city.coworking}개` },
    { label: "카페", value: `${city.cafes}개` },
    { label: "최적 시즌", value: city.bestSeason },
    { label: "지역", value: city.region },
  ];

  const metrics = [
    { label: "생활비 합리성", value: city.cost },
    { label: "인터넷 속도", value: city.internet },
    { label: "카페 인프라", value: city.cafe },
    { label: "안전", value: city.safety },
    { label: "전체 분위기", value: city.vibe },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto border-2 border-[rgb(var(--border))] bg-[rgb(var(--panel))] text-[rgb(var(--text))]">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-[rgb(var(--green))]">
            {city.name}
          </DialogTitle>
          <div className="flex items-center gap-4 text-sm text-[rgb(var(--dim))]">
            <span>📍 {city.region}</span>
            <span>🗓️ {city.bestSeason}</span>
            <span className="text-[rgb(var(--amber))]">{stars(city.score)} {city.score}</span>
          </div>
        </DialogHeader>

        <Tabs defaultValue="info" className="mt-4">
          <TabsList className="grid w-full grid-cols-2 bg-[rgb(var(--bg))]">
            <TabsTrigger
              value="info"
              className="data-[state=active]:bg-[rgb(var(--green))] data-[state=active]:text-[rgb(var(--bg))]"
            >
              📊 정보
            </TabsTrigger>
            <TabsTrigger
              value="review"
              className="data-[state=active]:bg-[rgb(var(--green))] data-[state=active]:text-[rgb(var(--bg))]"
            >
              ✍️ 리뷰쓰기
            </TabsTrigger>
          </TabsList>

          {/* 정보 탭 */}
          <TabsContent value="info" className="space-y-6">
            {/* 퀵 스탯 그리드 */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {quickStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded border border-[rgb(var(--border))] bg-[rgb(var(--bg))] p-3"
                >
                  <div className="text-xs text-[rgb(var(--dim))]">{stat.label}</div>
                  <div className="mt-1 font-bold text-[rgb(var(--green))]">{stat.value}</div>
                </div>
              ))}
            </div>

            {/* 5개 지표 상세 바 */}
            <div className="space-y-3">
              <h4 className="font-bold text-[rgb(var(--cyan))]">상세 지표</h4>
              {metrics.map((metric) => (
                <div key={metric.label} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-[rgb(var(--text))]">{metric.label}</span>
                    <span className="font-mono text-[rgb(var(--green))]">
                      {metric.value}/100
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 flex-1 overflow-hidden rounded-sm bg-[rgb(var(--bg))]">
                      <div
                        className="h-full bg-[rgb(var(--green))] transition-all duration-500"
                        style={{ width: `${metric.value}%` }}
                      />
                    </div>
                    <span className="font-mono text-xs text-[rgb(var(--dim))]">
                      {asciiBar(metric.value, 10)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* 장점/단점 */}
            <div className="grid gap-4 md:grid-cols-2">
              {/* 장점 */}
              <div>
                <h4 className="mb-2 font-bold text-[rgb(var(--green))]">✅ 장점</h4>
                <ul className="space-y-2">
                  {city.pros.map((pro, idx) => (
                    <li key={idx} className="flex gap-2 text-sm text-[rgb(var(--text))]">
                      <span className="text-[rgb(var(--green))]">+</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 단점 */}
              <div>
                <h4 className="mb-2 font-bold text-[rgb(var(--red))]">⚠️ 단점</h4>
                <ul className="space-y-2">
                  {city.cons.map((con, idx) => (
                    <li key={idx} className="flex gap-2 text-sm text-[rgb(var(--text))]">
                      <span className="text-[rgb(var(--red))]">−</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>

          {/* 리뷰 작성 탭 */}
          <TabsContent value="review" className="space-y-4">
            {!isSubmitted ? (
              <>
                {/* 별점 선택 */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-[rgb(var(--text))]">
                    별점 선택
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setSelectedRating(rating)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`h-8 w-8 ${
                            rating <= selectedRating
                              ? "fill-[rgb(var(--amber))] text-[rgb(var(--amber))]"
                              : "text-[rgb(var(--dim))]"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* 리뷰 텍스트 */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-[rgb(var(--text))]">
                    경험 공유
                  </label>
                  <Textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="이 도시에서의 워케이션 경험을 자유롭게 공유해주세요..."
                    className="min-h-[150px] border-[rgb(var(--border))] bg-[rgb(var(--bg))] text-[rgb(var(--text))] placeholder:text-[rgb(var(--dim))]"
                  />
                </div>

                {/* 제출 버튼 */}
                <Button
                  onClick={handleSubmitReview}
                  disabled={selectedRating === 0 || reviewText.trim() === ""}
                  className="w-full bg-[rgb(var(--green))] text-[rgb(var(--bg))] hover:bg-[rgb(var(--green-dim))] disabled:opacity-50"
                >
                  리뷰 제출하기
                </Button>
              </>
            ) : (
              <div className="rounded border-2 border-[rgb(var(--green))] bg-[rgb(var(--bg))] p-8 text-center">
                <div className="mb-2 text-4xl">✅</div>
                <h3 className="mb-2 text-xl font-bold text-[rgb(var(--green))]">
                  리뷰가 등록되었습니다!
                </h3>
                <p className="text-sm text-[rgb(var(--dim))]">
                  소중한 경험을 공유해주셔서 감사합니다.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
