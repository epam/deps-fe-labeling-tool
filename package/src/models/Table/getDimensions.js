const getDimensions = (table) => ({
  rows: table.yGuidelines.length - 1,
  columns: table.xGuidelines.length - 1
})

export {
  getDimensions
}
