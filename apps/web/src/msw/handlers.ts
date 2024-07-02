import { shortCutsMock } from '@/mocks'
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('http://localhost:3000/api/short-cuts', () => {
    return HttpResponse.json({
      data: shortCutsMock,
      status: 200
    })
  })
]
