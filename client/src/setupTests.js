const localStorageMock = {
  getItem: function (key) {
    return this[key]
  },
  setItem: function (key, value) {
    this[key] = value
  },
  clear: jest.fn()
}
global.localStorage = localStorageMock
