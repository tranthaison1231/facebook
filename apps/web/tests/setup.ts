import { expect, afterEach, beforeAll, afterAll } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'
import '@testing-library/jest-dom/vitest'
import { serviceWorker } from '@/msw/worker'

expect.extend(matchers)

// Start worker before all tests
beforeAll(() => {
  serviceWorker.listen()
})

//  Close worker after all tests
afterAll(() => {
  serviceWorker.close()
})

// Reset handlers after each test `important for test isolation`
afterEach(() => {
  serviceWorker.resetHandlers()
  cleanup()
})
