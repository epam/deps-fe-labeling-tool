class Point {
  constructor (x, y) {
    this.x = x
    this.y = y
  }

  static equal = (a = {}, b = {}) => (
    a.x === b.x &&
    a.y === b.y
  )

  static transpose = (p) => (
    new Point(
      p.y,
      p.x
    )
  )

  static getDistance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y)
}

export {
  Point
}
