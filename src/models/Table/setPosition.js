const setPosition = (table, { x, y }) => {
  let xGuidelines = [...table.xGuidelines]
  let yGuidelines = [...table.yGuidelines]

  if (x !== undefined) {
    const tableShift = xGuidelines[0] - x
    xGuidelines = xGuidelines.map((guideline) => guideline - tableShift)
  }

  if (y !== undefined) {
    const tableShift = yGuidelines[0] - y
    yGuidelines = yGuidelines.map((guideline) => guideline - tableShift)
  }

  return ({
    ...table,
    xGuidelines,
    yGuidelines
  })
}

export {
  setPosition
}
