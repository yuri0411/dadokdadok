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
