/**
 * ASCII 진행 바 생성
 * @param value 0~100 사이의 값
 * @param width 바의 길이 (기본 14)
 */
export function asciiBar(value: number, width: number = 14): string {
  const filled = Math.round((value / 100) * width);
  const empty = width - filled;
  return "[" + "#".repeat(filled) + "-".repeat(empty) + "]";
}

/**
 * 별점을 ASCII 별로 변환
 * @param score 1~5 사이의 별점
 */
export function stars(score: number): string {
  const full = Math.floor(score);
  const half = score % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  
  return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(empty);
}

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

/**
 * 노마드 점수에 따른 배경 색상 클래스 반환
 */
export function getNomadScoreBg(score: number): string {
  if (score >= 80) return "bg-[rgb(var(--green))]";
  if (score >= 70) return "bg-[rgb(var(--cyan))]";
  if (score >= 60) return "bg-[rgb(var(--amber))]";
  return "bg-[rgb(var(--dim))]";
}

/**
 * 지표값에 따른 바 색상 반환
 */
export function getMetricColor(value: number): string {
  if (value >= 90) return "rgb(var(--green))";
  if (value >= 75) return "rgb(var(--cyan))";
  if (value >= 60) return "rgb(var(--amber))";
  return "rgb(var(--dim))";
}
