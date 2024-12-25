export function toCamelCase<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map(toCamelCase) as unknown as T;
  } else if (obj !== null && typeof obj === "object") {
    return Object.entries(obj).reduce(
      (acc, [key, value]) => {
        const camelKey = key.replace(/_(\w)/g, (match, char, offset) =>
          offset === 0 ? char : char.toUpperCase(),
        );
        acc[camelKey] = toCamelCase(value);
        return acc;
      },
      {} as Record<string, unknown>,
    ) as T;
  }
  return obj;
}
