import { beforeEach, describe, expect, it, vi } from 'vitest'

const { HomePageMock } = vi.hoisted(() => {
  return {
    HomePageMock: vi.fn(() => <div data-testid="home" />),
  }
})

vi.mock('../ui/pages/home.js', () => {
  return {
    HomePage: HomePageMock,
  }
})

describe('GET /', () => {
  beforeEach(() => {
    HomePageMock.mockClear()
  })

  it('returns 200 and calls HomePage with expected props', async () => {
    const { app } = await import('../app.js')

    const res = await app.request('/')

    expect(res.status).toBe(200)
    expect(HomePageMock).toHaveBeenCalledWith({})
  })
})
