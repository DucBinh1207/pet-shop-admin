export function toSnakeCase(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map(toSnakeCase);
  } else if (obj !== null && typeof obj === "object") {
    return Object.entries(obj).reduce(
      (acc, [key, value]) => {
        const snakeKey = key.replace(
          /([A-Z])/g,
          (_, char) => `_${char.toLowerCase()}`,
        );
        acc[snakeKey] = toSnakeCase(value);
        return acc;
      },
      {} as Record<string, unknown>,
    );
  }
  return obj;
}
