export function cls(...args: any[]) {
  return args
    .flatMap((arg) =>
      typeof arg === "string"
        ? arg
        : typeof arg === "object" && arg !== null
          ? Object.entries(arg)
              .filter(([_, value]) => Boolean(value))
              .map(([key]) => key)
          : []
    )
    .join(" ");
}

export function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds / 60) % 60;
  const secs = seconds % 60;

  const result = [hours > 0 && `${hours}시간`, minutes > 0 && `${minutes}분`, `${secs}초`]
    .filter(Boolean)
    .join(" ");

  return seconds === 0 ? `0초` : result;
}
