import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

vi.mock('next/navigation', () => ({ redirect: vi.fn() }))
vi.mock('next/cache', () => ({ revalidatePath: vi.fn() }))
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn()
}))

import { login } from './actions'

describe('login action', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('on success: calls revalidatePath and redirect to /', async () => {
    const mockSignIn = vi.fn().mockResolvedValue({ error: null })
    ;(createClient as any).mockResolvedValue({
      auth: { signInWithPassword: mockSignIn }
    })

    const formData = new FormData()
    formData.set('email', 'test@example.com')
    formData.set('password', 'password123')

    await login(formData)

    expect(revalidatePath).toHaveBeenCalledWith('/', 'layout')
    expect(redirect).toHaveBeenCalledWith('/')
  })

  it('on failure: calls redirect with error message', async () => {
    const errorMessage = 'Invalid login credentials'
    const mockSignIn = vi.fn().mockResolvedValue({ error: { message: errorMessage } })
    ;(createClient as any).mockResolvedValue({
      auth: { signInWithPassword: mockSignIn }
    })

    const formData = new FormData()
    formData.set('email', 'test@example.com')
    formData.set('password', 'wrongpassword')

    await login(formData)

    expect(redirect).toHaveBeenCalledWith(`/login?error=${encodeURIComponent(errorMessage)}`)
  })

  it('passes email and password from FormData to signInWithPassword', async () => {
    const mockSignIn = vi.fn().mockResolvedValue({ error: null })
    ;(createClient as any).mockResolvedValue({
      auth: { signInWithPassword: mockSignIn }
    })

    const formData = new FormData()
    formData.set('email', 'user@example.com')
    formData.set('password', 'mypassword')

    await login(formData)

    expect(mockSignIn).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'mypassword'
    })
  })
})
