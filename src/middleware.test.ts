import { middleware } from '../middleware'
import { NextRequest, NextResponse } from 'next/server'

const mockGetUser = vi.fn()
vi.mock('@supabase/ssr', () => ({
  createServerClient: vi.fn(() => ({
    auth: { getUser: mockGetUser },
  })),
}))

function createMockRequest(pathname: string) {
  const url = `http://localhost${pathname}`
  return {
    nextUrl: { pathname },
    url,
    headers: new Headers(),
    cookies: {
      getAll: vi.fn().mockReturnValue([]),
      set: vi.fn(),
    },
  } as unknown as NextRequest
}

describe('middleware', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('redirects unauthenticated user from /dashboard to /login', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null }, error: null })

    const req = createMockRequest('/dashboard')
    const res = await middleware(req)

    expect(res.status).toBeGreaterThanOrEqual(300)
    expect(res.status).toBeLessThan(400)
    expect(res.headers.get('location')).toContain('/login')
  })

  it('redirects unauthenticated user from /dashboard/settings to /login', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null }, error: null })

    const req = createMockRequest('/dashboard/settings')
    const res = await middleware(req)

    expect(res.status).toBeGreaterThanOrEqual(300)
    expect(res.status).toBeLessThan(400)
    expect(res.headers.get('location')).toContain('/login')
  })

  it('redirects authenticated user from /login to /', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: 'user-1' } }, error: null })

    const req = createMockRequest('/login')
    const res = await middleware(req)

    expect(res.status).toBeGreaterThanOrEqual(300)
    expect(res.status).toBeLessThan(400)
    expect(res.headers.get('location')).toMatch(/\/$/)
  })

  it('redirects authenticated user from /signup to /', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: 'user-1' } }, error: null })

    const req = createMockRequest('/signup')
    const res = await middleware(req)

    expect(res.status).toBeGreaterThanOrEqual(300)
    expect(res.status).toBeLessThan(400)
    expect(res.headers.get('location')).toMatch(/\/$/)
  })

  it('passes through unauthenticated user accessing /', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null }, error: null })

    const req = createMockRequest('/')
    const res = await middleware(req)

    // Should NOT be a redirect
    expect(res.status).not.toBeGreaterThanOrEqual(300)
    // Or check it's the next-response (status 200)
  })

  it('passes through authenticated user accessing /', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: 'user-1' } }, error: null })

    const req = createMockRequest('/')
    const res = await middleware(req)

    expect(res.status).not.toBeGreaterThanOrEqual(300)
  })

  it('treats getUser() throwing as unauthenticated and passes through for /', async () => {
    mockGetUser.mockRejectedValue(new Error('network error'))

    const req = createMockRequest('/')
    // Should not throw
    const res = await middleware(req)

    expect(res.status).not.toBeGreaterThanOrEqual(300)
  })
})
