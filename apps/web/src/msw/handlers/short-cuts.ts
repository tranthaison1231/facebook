import { shortCutsMock } from '@/mocks'
import { HttpResponse, http } from 'msw'

const BASE_URL = 'http://localhost:3000/api'

const getShortCuts = http.get(BASE_URL + '/short-cuts', () => {
  return HttpResponse.json({
    status: 200,
    data: shortCutMock
  })
})

const followHandlers = [getShortCuts]

export default followHandlers
