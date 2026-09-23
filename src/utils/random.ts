export function randomInt(
  min: number,
  max: number,
): number {
  if (
    !Number.isInteger(min) ||
    !Number.isInteger(max)
  ) {
    throw new Error(
      'randomInt requires integer boundaries.',
    )
  }

  if (min > max) {
    throw new Error(
      'randomInt requires min to be less than or equal to max.',
    )
  }

  return (
    Math.floor(
      Math.random() * (max - min + 1),
    ) + min
  )
}

export function randomItem<T>(
  items: readonly T[],
): T {
  if (items.length === 0) {
    throw new Error(
      'randomItem cannot be used with an empty array.',
    )
  }

  return items[
    randomInt(0, items.length - 1)
  ]
}