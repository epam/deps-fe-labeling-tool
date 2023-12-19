const getIntersectingMerges = (table, guideline1, guideline2 = guideline1) => {
  return table.merges.filter((cm) => {
    const mergeX1 = table.xGuidelines[cm.column]
    const mergeX2 = table.xGuidelines[cm.column + cm.colspan]
    return mergeX1 < guideline1 && guideline2 < mergeX2
  })
}

export {
  getIntersectingMerges
}
