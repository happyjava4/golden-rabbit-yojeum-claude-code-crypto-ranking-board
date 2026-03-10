/**
 * ASCII 유틸리티 함수
 * Phase 3: 사용하지 않는 함수 제거됨 (asciiBar, stars, getNomadScoreBg, getMetricColor)
 */

/**
 * 노마드 점수에 따른 색상 클래스 반환
 * @param score 노마드 점수 (0~100)
 */
export function getNomadScoreColor(score: number): string {
  if (score >= 80) return "text-[rgb(var(--green))]";
  if (score >= 70) return "text-[rgb(var(--cyan))]";
  if (score >= 60) return "text-[rgb(var(--amber))]";
  return "text-[rgb(var(--dim))]";
}
