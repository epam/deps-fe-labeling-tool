const move = (table, deltaX = 0, deltaY = 0) => ({
  ...table,
  xGuidelines: table.xGuidelines.map((x) => x + deltaX),
  yGuidelines: table.yGuidelines.map((y) => y + deltaY)
})

export {
  move
}
