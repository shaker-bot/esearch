// Global test setup for Vitest

// Ensure localStorage is available and clean between tests
beforeEach(() => {
  localStorage.clear()
})

afterEach(() => {
  localStorage.clear()
})
