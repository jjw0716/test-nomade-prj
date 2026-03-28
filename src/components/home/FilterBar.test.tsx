import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FilterBar } from './FilterBar'
import type { FilterState } from '@/lib/data'

const emptyFilters: FilterState = {
  budget: null,
  district: null,
  environment: [],
  bestSeason: [],
}

describe('FilterBar', () => {
  describe('Rendering', () => {
    it('renders all 3 budget option buttons', () => {
      render(<FilterBar filters={emptyFilters} onChange={vi.fn()} />)

      expect(screen.getByRole('button', { name: '100만원이하' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '100~200만원' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '200만원이상' })).toBeInTheDocument()
    })

    it('renders "전체" button and all 6 district options', () => {
      render(<FilterBar filters={emptyFilters} onChange={vi.fn()} />)

      expect(screen.getByRole('button', { name: '전체' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '수도권' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '경상도' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '전라도' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '강원도' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '제주도' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '충청도' })).toBeInTheDocument()
    })

    it('renders all 4 environment options', () => {
      render(<FilterBar filters={emptyFilters} onChange={vi.fn()} />)

      expect(screen.getByRole('button', { name: '자연친화' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '도심선호' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '카페작업' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '코워킹 필수' })).toBeInTheDocument()
    })

    it('renders all 4 season options', () => {
      render(<FilterBar filters={emptyFilters} onChange={vi.fn()} />)

      expect(screen.getByRole('button', { name: '봄' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '여름' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '가을' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '겨울' })).toBeInTheDocument()
    })

    it('active budget button has the active class (border-violet-500)', () => {
      const filters: FilterState = { ...emptyFilters, budget: '100만원이하' }
      render(<FilterBar filters={filters} onChange={vi.fn()} />)

      const activeBtn = screen.getByRole('button', { name: '100만원이하' })
      expect(activeBtn.className).toContain('border-violet-500')
    })

    it('inactive budget buttons have the inactive class (border-zinc-700)', () => {
      const filters: FilterState = { ...emptyFilters, budget: '100만원이하' }
      render(<FilterBar filters={filters} onChange={vi.fn()} />)

      const inactiveBtn1 = screen.getByRole('button', { name: '100~200만원' })
      const inactiveBtn2 = screen.getByRole('button', { name: '200만원이상' })
      expect(inactiveBtn1.className).toContain('border-zinc-700')
      expect(inactiveBtn2.className).toContain('border-zinc-700')
    })
  })

  describe('Budget interaction (single select + toggle)', () => {
    it('clicking a budget button calls onChange with the selected budget', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<FilterBar filters={emptyFilters} onChange={onChange} />)

      await user.click(screen.getByRole('button', { name: '100만원이하' }))

      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ budget: '100만원이하' })
      )
    })

    it('clicking the already-selected budget button calls onChange with budget: null (toggle off)', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      const filters: FilterState = { ...emptyFilters, budget: '100만원이하' }
      render(<FilterBar filters={filters} onChange={onChange} />)

      await user.click(screen.getByRole('button', { name: '100만원이하' }))

      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ budget: null })
      )
    })
  })

  describe('District interaction (single select)', () => {
    it('clicking a district button calls onChange with the selected district', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<FilterBar filters={emptyFilters} onChange={onChange} />)

      await user.click(screen.getByRole('button', { name: '제주도' }))

      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ district: '제주도' })
      )
    })

    it('clicking "전체" button calls onChange with district: null', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      const filters: FilterState = { ...emptyFilters, district: '제주도' }
      render(<FilterBar filters={filters} onChange={onChange} />)

      await user.click(screen.getByRole('button', { name: '전체' }))

      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ district: null })
      )
    })
  })

  describe('Environment interaction (multi-select)', () => {
    it('clicking an environment button adds it to the environment array', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<FilterBar filters={emptyFilters} onChange={onChange} />)

      await user.click(screen.getByRole('button', { name: '자연친화' }))

      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ environment: ['자연친화'] })
      )
    })

    it('clicking an already-selected environment button removes it from the array', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      const filters: FilterState = { ...emptyFilters, environment: ['자연친화', '카페작업'] }
      render(<FilterBar filters={filters} onChange={onChange} />)

      await user.click(screen.getByRole('button', { name: '자연친화' }))

      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ environment: ['카페작업'] })
      )
    })
  })

  describe('Season interaction (multi-select)', () => {
    it('clicking a season button adds it to the bestSeason array', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<FilterBar filters={emptyFilters} onChange={onChange} />)

      await user.click(screen.getByRole('button', { name: '봄' }))

      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ bestSeason: ['봄'] })
      )
    })

    it('clicking an already-selected season button removes it from the array', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      const filters: FilterState = { ...emptyFilters, bestSeason: ['봄', '가을'] }
      render(<FilterBar filters={filters} onChange={onChange} />)

      await user.click(screen.getByRole('button', { name: '봄' }))

      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ bestSeason: ['가을'] })
      )
    })
  })
})
