import { getCities, getCityById, getMeetups, getMembers, getNomadStatus } from './data'

const { mockOrder, mockSingle, mockEq, mockSelect, mockFrom } = vi.hoisted(() => ({
  mockOrder: vi.fn(),
  mockSingle: vi.fn(),
  mockEq: vi.fn(),
  mockSelect: vi.fn(),
  mockFrom: vi.fn(),
}))

vi.mock('@/lib/supabase', () => ({
  supabase: { from: mockFrom },
}))

beforeEach(() => {
  vi.clearAllMocks()

  // Default chain: .from().select().order()
  mockOrder.mockResolvedValue({ data: [], error: null })
  mockSingle.mockResolvedValue({ data: null, error: null })
  mockEq.mockReturnValue({ single: mockSingle })
  mockSelect.mockReturnValue({ order: mockOrder, eq: mockEq })
  mockFrom.mockReturnValue({ select: mockSelect })
})

// --- Sample DB rows ---

const cityRow = {
  id: 1,
  rank: 1,
  name: '서울',
  region: '서울특별시',
  score: 9.5,
  monthly_cost: 1500000,
  internet_speed: 500,
  tags: ['대도시', '카페'],
  likes: 100,
  dislikes: 10,
  featured: true,
  tier: 'T1',
  coworking_count: 20,
  budget: '100~200만원',
  district: '수도권',
  environment: ['도심선호'],
  best_season: ['봄', '가을'],
}

const meetupRow = {
  id: 1,
  city: '서울',
  date: '2026-04-01',
  day_of_week: '수요일',
  rsvp: 30,
}

const memberRow = {
  id: 1,
  initial: 'A',
  color: '#ff0000',
}

const nomadStatusRow = {
  city: '서울',
  count: 50,
}

// ---- getCities() ----
describe('getCities()', () => {
  it('returns mapped City[] on success (verify monthlyCost, internetSpeed, bestSeason)', async () => {
    mockOrder.mockResolvedValue({ data: [cityRow], error: null })

    const result = await getCities()

    expect(result).toHaveLength(1)
    expect(result[0].monthlyCost).toBe(1500000)
    expect(result[0].internetSpeed).toBe(500)
    expect(result[0].bestSeason).toEqual(['봄', '가을'])
    expect(result[0].coworkingCount).toBe(20)
  })

  it('returns empty array when data is []', async () => {
    mockOrder.mockResolvedValue({ data: [], error: null })

    const result = await getCities()

    expect(result).toEqual([])
  })

  it('throws when Supabase returns an error', async () => {
    mockOrder.mockResolvedValue({ data: null, error: new Error('DB error') })

    await expect(getCities()).rejects.toThrow('DB error')
  })
})

// ---- getCityById() ----
describe('getCityById()', () => {
  it('returns mapped City on success', async () => {
    mockSingle.mockResolvedValue({ data: cityRow, error: null })

    const result = await getCityById(1)

    expect(result).not.toBeNull()
    expect(result!.id).toBe(1)
    expect(result!.monthlyCost).toBe(1500000)
    expect(result!.internetSpeed).toBe(500)
    expect(result!.bestSeason).toEqual(['봄', '가을'])
  })

  it('returns undefined for coworkingCount when coworking_count is null', async () => {
    mockSingle.mockResolvedValue({
      data: { ...cityRow, coworking_count: null },
      error: null,
    })

    const result = await getCityById(1)

    expect(result).not.toBeNull()
    expect(result!.coworkingCount).toBeUndefined()
  })

  it('returns coworkingCount value when coworking_count has a value', async () => {
    mockSingle.mockResolvedValue({
      data: { ...cityRow, coworking_count: 42 },
      error: null,
    })

    const result = await getCityById(1)

    expect(result).not.toBeNull()
    expect(result!.coworkingCount).toBe(42)
  })

  it('returns null when Supabase returns an error (does NOT throw)', async () => {
    mockSingle.mockResolvedValue({ data: null, error: new Error('DB error') })

    const result = await getCityById(999)

    expect(result).toBeNull()
  })
})

// ---- getMeetups() ----
describe('getMeetups()', () => {
  it('returns mapped Meetup[] on success (verify dayOfWeek from day_of_week)', async () => {
    mockOrder.mockResolvedValue({ data: [meetupRow], error: null })

    const result = await getMeetups()

    expect(result).toHaveLength(1)
    expect(result[0].dayOfWeek).toBe('수요일')
    expect(result[0].city).toBe('서울')
    expect(result[0].date).toBe('2026-04-01')
    expect(result[0].rsvp).toBe(30)
  })

  it('throws when Supabase returns an error', async () => {
    mockOrder.mockResolvedValue({ data: null, error: new Error('DB error') })

    await expect(getMeetups()).rejects.toThrow('DB error')
  })
})

// ---- getMembers() ----
describe('getMembers()', () => {
  it('returns Member[] as-is on success', async () => {
    mockOrder.mockResolvedValue({ data: [memberRow], error: null })

    const result = await getMembers()

    expect(result).toEqual([memberRow])
  })

  it('throws when Supabase returns an error', async () => {
    mockOrder.mockResolvedValue({ data: null, error: new Error('DB error') })

    await expect(getMembers()).rejects.toThrow('DB error')
  })
})

// ---- getNomadStatus() ----
describe('getNomadStatus()', () => {
  it('returns NomadStatus[] on success', async () => {
    mockOrder.mockResolvedValue({ data: [nomadStatusRow], error: null })

    const result = await getNomadStatus()

    expect(result).toEqual([nomadStatusRow])
  })

  it('throws when Supabase returns an error', async () => {
    mockOrder.mockResolvedValue({ data: null, error: new Error('DB error') })

    await expect(getNomadStatus()).rejects.toThrow('DB error')
  })
})
