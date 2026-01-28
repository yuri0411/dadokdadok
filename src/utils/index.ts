export function cls(...args: Array<string | undefined | false | null | Record<string, boolean>>) {
  return args
    .flatMap((arg) => {
      if (typeof arg === "string") return arg;
      if (arg !== null && typeof arg === "object") {
        return Object.entries(arg)
          .filter(([, value]) => Boolean(value))
          .map(([key]) => key);
      }
      return [];
    })
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
