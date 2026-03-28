import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

vi.mock('next/navigation', () => ({ redirect: vi.fn() }))
vi.mock('next/cache', () => ({ revalidatePath: vi.fn() }))
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn()
}))

import { signup } from './actions'

describe('signup action', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('on success: calls revalidatePath and redirect to /signup?success=true', async () => {
    const mockSignUp = vi.fn().mockResolvedValue({ error: null })
    ;(createClient as any).mockResolvedValue({
      auth: { signUp: mockSignUp }
    })

    const formData = new FormData()
    formData.set('email', 'test@example.com')
    formData.set('password', 'password123')

    await signup(formData)

    expect(revalidatePath).toHaveBeenCalledWith('/', 'layout')
    expect(redirect).toHaveBeenCalledWith('/signup?success=true')
  })

  it('on failure: calls redirect with error message', async () => {
    const errorMessage = 'User already registered'
    const mockSignUp = vi.fn().mockResolvedValue({ error: { message: errorMessage } })
    ;(createClient as any).mockResolvedValue({
      auth: { signUp: mockSignUp }
    })

    const formData = new FormData()
    formData.set('email', 'test@example.com')
    formData.set('password', 'password123')

    await signup(formData)

    expect(redirect).toHaveBeenCalledWith(`/signup?error=${encodeURIComponent(errorMessage)}`)
  })

  it('passes email and password from FormData to signUp', async () => {
    const mockSignUp = vi.fn().mockResolvedValue({ error: null })
    ;(createClient as any).mockResolvedValue({
      auth: { signUp: mockSignUp }
    })

    const formData = new FormData()
    formData.set('email', 'newuser@example.com')
    formData.set('password', 'securepassword')

    await signup(formData)

    expect(mockSignUp).toHaveBeenCalledWith({
      email: 'newuser@example.com',
      password: 'securepassword'
    })
  })
})
