import type { City, Budget, District, Environment, Season } from '@/lib/data'

export function createMockCity(overrides?: Partial<City>): City {
  return {
    id: 1,
    rank: 1,
    name: '서울',
    region: '서울특별시',
    score: 92,
    monthlyCost: 1500000,
    internetSpeed: 200,
    tags: ['도심', '카페', '코워킹'],
    likes: 120,
    dislikes: 10,
    featured: true,
    tier: 'T1',
    coworkingCount: 50,
    budget: '100~200만원',
    district: '수도권',
    environment: ['도심선호', '카페작업'],
    bestSeason: ['봄', '가을'],
    ...overrides,
  }
}

export function createMockCityList(): City[] {
  return [
    createMockCity({
      id: 1,
      rank: 1,
      name: '서울',
      region: '서울특별시',
      score: 92,
      monthlyCost: 1500000,
      budget: '100~200만원',
      district: '수도권',
      environment: ['도심선호', '카페작업'],
      bestSeason: ['봄', '가을'],
      tier: 'T1',
      featured: true,
    }),
    createMockCity({
      id: 2,
      rank: 2,
      name: '제주시',
      region: '제주특별자치도',
      score: 85,
      monthlyCost: 900000,
      budget: '100만원이하',
      district: '제주도',
      environment: ['자연친화', '카페작업'],
      bestSeason: ['봄', '여름'],
      tier: 'T2',
      featured: false,
      coworkingCount: 15,
    }),
    createMockCity({
      id: 3,
      rank: 3,
      name: '부산',
      region: '부산광역시',
      score: 80,
      monthlyCost: 2200000,
      budget: '200만원이상',
      district: '경상도',
      environment: ['코워킹 필수', '도심선호'],
      bestSeason: ['여름', '겨울'],
      tier: 'T2',
      featured: false,
      coworkingCount: 30,
    }),
  ]
}
