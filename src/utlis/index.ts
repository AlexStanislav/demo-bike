import type { Bike } from '@/types'

export function flattenBikes(allBikes: Record<string, object[]>): Bike[] {
  const flattenedBikes: Bike[] = []
  for (const bikeBrand in allBikes) {
    const bikes = allBikes[bikeBrand] as Bike[]
    if (bikes) {
      flattenedBikes.push(...bikes)
    }
  }

  return flattenedBikes
}
