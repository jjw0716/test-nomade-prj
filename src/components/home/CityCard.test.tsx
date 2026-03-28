import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CityCard } from './CityCard'
import { createMockCity } from '@/tests/fixtures/city'

const { mockIncrementLikes, mockIncrementDislikes } = vi.hoisted(() => ({
  mockIncrementLikes: vi.fn(),
  mockIncrementDislikes: vi.fn(),
}))

vi.mock('@/app/actions', () => ({
  incrementLikes: mockIncrementLikes,
  incrementDislikes: mockIncrementDislikes,
}))

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: any) => <a href={href} {...props}>{children}</a>
}))

beforeEach(() => {
  vi.clearAllMocks()
})

describe('CityCard', () => {
  // --- Rendering ---

  it('renders city rank and name', () => {
    const city = createMockCity({ rank: 1, name: '서울' })
    render(<CityCard city={city} />)
    expect(screen.getByText('#1 서울')).toBeInTheDocument()
  })

  it('renders city region', () => {
    const city = createMockCity({ region: '서울특별시' })
    render(<CityCard city={city} />)
    expect(screen.getByText(/서울특별시/)).toBeInTheDocument()
  })

  it('renders budget, district, environment, bestSeason values', () => {
    const city = createMockCity({
      budget: '100~200만원',
      district: '수도권',
      environment: ['도심선호', '카페작업'],
      bestSeason: ['봄', '가을'],
    })
    render(<CityCard city={city} />)
    expect(screen.getByText('100~200만원')).toBeInTheDocument()
    expect(screen.getByText('수도권')).toBeInTheDocument()
    expect(screen.getByText('도심선호, 카페작업')).toBeInTheDocument()
    expect(screen.getByText('봄, 가을')).toBeInTheDocument()
  })

  it('renders initial likes count', () => {
    const city = createMockCity({ likes: 120 })
    render(<CityCard city={city} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons[0]).toHaveTextContent('120')
  })

  it('renders initial dislikes count', () => {
    const city = createMockCity({ dislikes: 10 })
    render(<CityCard city={city} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons[1]).toHaveTextContent('10')
  })

  it('renders a link to /city/${city.id}', () => {
    const city = createMockCity({ id: 42 })
    render(<CityCard city={city} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/city/42')
  })

  it('featured=true → card has a class containing border-violet-600', () => {
    const city = createMockCity({ featured: true })
    render(<CityCard city={city} />)
    const link = screen.getByRole('link')
    expect(link.className).toContain('border-violet-600')
  })

  it('featured=false → card has a class containing border-zinc-800', () => {
    const city = createMockCity({ featured: false })
    render(<CityCard city={city} />)
    const link = screen.getByRole('link')
    expect(link.className).toContain('border-zinc-800')
  })

  it('T1 tier → tier badge has class containing text-violet-400', () => {
    const city = createMockCity({ tier: 'T1' })
    render(<CityCard city={city} />)
    const badge = screen.getByText('T1')
    expect(badge.className).toContain('text-violet-400')
  })

  it('T2 tier → tier badge has class containing text-blue-400', () => {
    const city = createMockCity({ tier: 'T2' })
    render(<CityCard city={city} />)
    const badge = screen.getByText('T2')
    expect(badge.className).toContain('text-blue-400')
  })

  it('T3 tier → tier badge has class containing text-zinc-400', () => {
    const city = createMockCity({ tier: 'T3' })
    render(<CityCard city={city} />)
    const badge = screen.getByText('T3')
    expect(badge.className).toContain('text-zinc-400')
  })

  // --- Like interaction ---

  it('clicking like button increments displayed like count by 1', async () => {
    const user = userEvent.setup()
    const city = createMockCity({ likes: 120 })
    render(<CityCard city={city} />)
    const likeButton = screen.getAllByRole('button')[0]
    await user.click(likeButton)
    expect(likeButton).toHaveTextContent('121')
  })

  it('clicking like button calls incrementLikes(city.id)', async () => {
    const user = userEvent.setup()
    const city = createMockCity({ id: 1 })
    render(<CityCard city={city} />)
    const likeButton = screen.getAllByRole('button')[0]
    await user.click(likeButton)
    expect(mockIncrementLikes).toHaveBeenCalledWith(1)
  })

  it('clicking like button twice (toggle off) → count returns to original, incrementLikes called only once', async () => {
    const user = userEvent.setup()
    const city = createMockCity({ likes: 120 })
    render(<CityCard city={city} />)
    const likeButton = screen.getAllByRole('button')[0]
    await user.click(likeButton)
    await user.click(likeButton)
    expect(likeButton).toHaveTextContent('120')
    expect(mockIncrementLikes).toHaveBeenCalledTimes(1)
  })

  it('clicking like then dislike → like count returns to original, dislike count increments', async () => {
    const user = userEvent.setup()
    const city = createMockCity({ likes: 120, dislikes: 10 })
    render(<CityCard city={city} />)
    const [likeButton, dislikeButton] = screen.getAllByRole('button')
    await user.click(likeButton)
    await user.click(dislikeButton)
    expect(likeButton).toHaveTextContent('120')
    expect(dislikeButton).toHaveTextContent('11')
  })

  // --- Dislike interaction ---

  it('clicking dislike button calls incrementDislikes(city.id)', async () => {
    const user = userEvent.setup()
    const city = createMockCity({ id: 1 })
    render(<CityCard city={city} />)
    const dislikeButton = screen.getAllByRole('button')[1]
    await user.click(dislikeButton)
    expect(mockIncrementDislikes).toHaveBeenCalledWith(1)
  })
})
