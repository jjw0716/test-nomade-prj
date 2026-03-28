const { mockRpc } = vi.hoisted(() => ({
  mockRpc: vi.fn().mockResolvedValue({ error: null })
}))

vi.mock('@/lib/supabase', () => ({
  supabase: { rpc: mockRpc }
}))

import { incrementLikes, incrementDislikes } from './actions'

describe('actions', () => {
  beforeEach(() => {
    mockRpc.mockClear()
  })

  it('incrementLikes calls supabase.rpc with increment_likes and city_id', async () => {
    await incrementLikes(1)
    expect(mockRpc).toHaveBeenCalledWith('increment_likes', { city_id: 1 })
  })

  it('incrementDislikes calls supabase.rpc with increment_dislikes and city_id', async () => {
    await incrementDislikes(1)
    expect(mockRpc).toHaveBeenCalledWith('increment_dislikes', { city_id: 1 })
  })
})
