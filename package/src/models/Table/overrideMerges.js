const overrideMerges = (mergesToOverride, mergeOverrides) => {
  const merges = [...mergesToOverride]

  mergeOverrides.forEach((mo) => {
    const intersectingOverrides = merges.filter((cm) => {
      const columnDistance = mo.column - cm.column
      const xLength = columnDistance <= 0 ? mo.colspan : cm.colspan
      const xDistance = Math.abs(columnDistance)
      const rowDistance = mo.row - cm.row
      const yLength = rowDistance <= 0 ? mo.rowspan : cm.rowspan
      const yDistance = Math.abs(rowDistance)
      return (
        xDistance < xLength &&
        yDistance < yLength
      )
    })

    if (intersectingOverrides.length) {
      intersectingOverrides.forEach((o) => {
        merges.splice(merges.indexOf(o), 1)
      })
    }

    merges.push(mo)
  })

  return merges
}

export {
  overrideMerges
}
