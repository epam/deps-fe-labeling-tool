const toAbsolute = (table, scale, image) => ({
  ...table,
  xGuidelines: table.xGuidelines.map((x) => x * scale * image.width),
  yGuidelines: table.yGuidelines.map((y) => y * scale * image.height)
})

const toRelative = (table, scale, image) => ({
  ...table,
  xGuidelines: table.xGuidelines.map((x) => x / scale / image.width),
  yGuidelines: table.yGuidelines.map((y) => y / scale / image.height)
})

export {
  toAbsolute,
  toRelative
}
