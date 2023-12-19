import { Point } from '@/models/Point'

const Orientation = {
  COLINEAR: 0,
  CLOCKWISE: 1,
  COUNTER_CLOCKWISE: 2
}

const getOrientation = (p, q, r) => {
  const determinant = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y)
  if (determinant === 0) {
    return Orientation.COLINEAR
  }

  return determinant > 0 ? Orientation.CLOCKWISE : Orientation.COUNTER_CLOCKWISE
}

const onLine = (p, q, r) => (
  Math.min(p.x, r.x) <= q.x && q.x <= Math.max(p.x, r.x) &&
  Math.min(p.y, r.y) <= q.y && q.y <= Math.max(p.y, r.y)
)

class Line {
  constructor (p1, p2) {
    this.p1 = p1
    this.p2 = p2
  }

  static toPoints = (line) => [
    line.p1,
    line.p2
  ]

  static equal = (a, b) => (
    Math.min(a.p1.x, a.p2.x) === Math.min(b.p1.x, b.p2.x) &&
    Math.min(a.p1.y, a.p2.y) === Math.min(b.p1.y, b.p2.y) &&
    Math.max(a.p1.x, a.p2.x) === Math.max(b.p1.x, b.p2.x) &&
    Math.max(a.p1.y, a.p2.y) === Math.max(b.p1.y, b.p2.y)
  )

  static intersecting = (a, b) => {
    const o1 = getOrientation(a.p1, a.p2, b.p1)
    const o2 = getOrientation(a.p1, a.p2, b.p2)
    const o3 = getOrientation(b.p1, b.p2, a.p1)
    const o4 = getOrientation(b.p1, b.p2, a.p2)
    return o1 !== o2 && o3 !== o4
  }

  static colinear = (a, b) => {
    if (Line.intersecting(a, b)) {
      return false
    }

    const o1 = getOrientation(a.p1, a.p2, b.p1)
    const o2 = getOrientation(a.p1, a.p2, b.p2)
    const o3 = getOrientation(b.p1, b.p2, a.p1)
    const o4 = getOrientation(b.p1, b.p2, a.p2)
    return (
      (o1 === Orientation.COLINEAR && onLine(a.p1, b.p1, a.p2)) ||
      (o2 === Orientation.COLINEAR && onLine(a.p1, b.p2, a.p2)) ||
      (o3 === Orientation.COLINEAR && onLine(b.p1, a.p1, b.p2)) ||
      (o4 === Orientation.COLINEAR && onLine(b.p1, a.p2, b.p2))
    )
  }

  static transpose = (line) => (
    new Line(
      Point.transpose(line.p2),
      Point.transpose(line.p1)
    )
  )
}

export {
  Line
}
