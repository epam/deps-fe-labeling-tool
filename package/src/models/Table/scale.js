const scale = (table, scale) => ({
  ...table,
  xGuidelines: table.xGuidelines.map((x) => x * scale),
  yGuidelines: table.yGuidelines.map((x) => x * scale)
})

export {
  scale
}
