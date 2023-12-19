const mockUuid = {
  v4: ((n = 1) => () => `${n++}`)()
}

export {
  mockUuid
}
