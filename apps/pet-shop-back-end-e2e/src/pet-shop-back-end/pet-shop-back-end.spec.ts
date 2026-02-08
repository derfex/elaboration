import axios from 'axios'

describe('GET /api', (): void => {
  it('should return a message', async (): Promise<void> => {
    const res = await axios.get(`/api`)

    expect(res.status).toBe(200)
    expect(res.data).toEqual({ message: 'Hello API' })
  })
})
