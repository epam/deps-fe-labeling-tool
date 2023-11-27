const getSize = (table) => {
  const { xGuidelines, yGuidelines } = table
  return {
    w: xGuidelines[xGuidelines.length - 1] - xGuidelines[0],
    h: yGuidelines[yGuidelines.length - 1] - yGuidelines[0]
  }
}

export {
  getSize
}
