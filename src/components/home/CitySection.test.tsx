import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CitySection } from './CitySection'
import { createMockCityList } from '@/tests/fixtures/city'

vi.mock('@/app/actions', () => ({
  incrementLikes: vi.fn(),
  incrementDislikes: vi.fn(),
}))

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: any) => <a href={href} {...props}>{children}</a>
}))

// Mock city list:
// 서울:    budget='100~200만원', district='수도권',  environment=['도심선호','카페작업'],      bestSeason=['봄','가을']
// 제주시:  budget='100만원이하',  district='제주도',  environment=['자연친화','카페작업'],      bestSeason=['봄','여름']
// 부산:    budget='200만원이상',  district='경상도',  environment=['코워킹 필수','도심선호'],   bestSeason=['여름','겨울']

describe('CitySection', () => {
  it('with no filters, all cities are rendered', () => {
    const cities = createMockCityList()
    render(<CitySection cities={cities} />)
    expect(screen.getByText('#1 서울')).toBeInTheDocument()
    expect(screen.getByText('#2 제주시')).toBeInTheDocument()
    expect(screen.getByText('#3 부산')).toBeInTheDocument()
  })

  it('budget filter: only cities matching the budget are shown', async () => {
    const user = userEvent.setup()
    const cities = createMockCityList()
    render(<CitySection cities={cities} />)

    // Click '100만원이하' budget filter button
    await user.click(screen.getByRole('button', { name: '100만원이하' }))

    expect(screen.queryByText('#1 서울')).not.toBeInTheDocument()
    expect(screen.getByText('#2 제주시')).toBeInTheDocument()
    expect(screen.queryByText('#3 부산')).not.toBeInTheDocument()
  })

  it('district filter: only cities matching the district are shown', async () => {
    const user = userEvent.setup()
    const cities = createMockCityList()
    render(<CitySection cities={cities} />)

    // Click '경상도' district filter button
    await user.click(screen.getByRole('button', { name: '경상도' }))

    expect(screen.queryByText('#1 서울')).not.toBeInTheDocument()
    expect(screen.queryByText('#2 제주시')).not.toBeInTheDocument()
    expect(screen.getByText('#3 부산')).toBeInTheDocument()
  })

  it('environment single filter: only cities containing that environment are shown', async () => {
    const user = userEvent.setup()
    const cities = createMockCityList()
    render(<CitySection cities={cities} />)

    // '자연친화' is only in 제주시
    await user.click(screen.getByRole('button', { name: '자연친화' }))

    expect(screen.queryByText('#1 서울')).not.toBeInTheDocument()
    expect(screen.getByText('#2 제주시')).toBeInTheDocument()
    expect(screen.queryByText('#3 부산')).not.toBeInTheDocument()
  })

  it('environment multi-filter: only cities containing ALL selected environments are shown (AND logic)', async () => {
    const user = userEvent.setup()
    const cities = createMockCityList()
    render(<CitySection cities={cities} />)

    // '카페작업' is in 서울 and 제주시 (not 부산)
    // '도심선호' is in 서울 and 부산 (not 제주시)
    // AND: only 서울 has BOTH '카페작업' AND '도심선호'
    await user.click(screen.getByRole('button', { name: '카페작업' }))
    await user.click(screen.getByRole('button', { name: '도심선호' }))

    expect(screen.getByText('#1 서울')).toBeInTheDocument()
    expect(screen.queryByText('#2 제주시')).not.toBeInTheDocument()
    expect(screen.queryByText('#3 부산')).not.toBeInTheDocument()
  })

  it('bestSeason multi-filter: only cities containing ALL selected seasons are shown (AND logic)', async () => {
    const user = userEvent.setup()
    const cities = createMockCityList()
    render(<CitySection cities={cities} />)

    // '봄' is in 서울 and 제주시 (not 부산)
    // '가을' is only in 서울
    // AND: only 서울 has BOTH '봄' AND '가을'
    await user.click(screen.getByRole('button', { name: '봄' }))
    await user.click(screen.getByRole('button', { name: '가을' }))

    expect(screen.getByText('#1 서울')).toBeInTheDocument()
    expect(screen.queryByText('#2 제주시')).not.toBeInTheDocument()
    expect(screen.queryByText('#3 부산')).not.toBeInTheDocument()
  })

  it('budget + district combined filter: only cities matching both conditions are shown', async () => {
    const user = userEvent.setup()
    const cities = createMockCityList()
    render(<CitySection cities={cities} />)

    // budget='100만원이하' matches 제주시 only
    // district='제주도' matches 제주시 only
    // Combined: only 제주시
    await user.click(screen.getByRole('button', { name: '100만원이하' }))
    await user.click(screen.getByRole('button', { name: '제주도' }))

    expect(screen.queryByText('#1 서울')).not.toBeInTheDocument()
    expect(screen.getByText('#2 제주시')).toBeInTheDocument()
    expect(screen.queryByText('#3 부산')).not.toBeInTheDocument()
  })

  it('no matching cities → no city cards rendered', async () => {
    const user = userEvent.setup()
    const cities = createMockCityList()
    render(<CitySection cities={cities} />)

    // budget='100만원이하' matches 제주시; district='경상도' matches 부산
    // Combined: no city matches both
    await user.click(screen.getByRole('button', { name: '100만원이하' }))
    await user.click(screen.getByRole('button', { name: '경상도' }))

    expect(screen.queryByText('#1 서울')).not.toBeInTheDocument()
    expect(screen.queryByText('#2 제주시')).not.toBeInTheDocument()
    expect(screen.queryByText('#3 부산')).not.toBeInTheDocument()
  })
})
