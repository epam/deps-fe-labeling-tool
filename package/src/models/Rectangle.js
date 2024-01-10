import PropTypes from 'prop-types'
import { Line } from '@/models/Line'
import { Point } from '@/models/Point'

class Rectangle {
  constructor (x, y, w, h) {
    this.x = Math.min(x, x + w)
    this.y = Math.min(y, y + h)
    this.w = w
    this.h = h
  }

  static equal = (a = {}, b = {}) => {
    const [pa1, pa2] = Rectangle.getPoints(a)
    const [pb1, pb2] = Rectangle.getPoints(b)
    return (
      Point.equal(pa1, pb1) &&
      Point.equal(pa2, pb2)
    )
  }

  static fromFabric = (rectangle) => new Rectangle(
    rectangle.left,
    rectangle.top,
    rectangle.width,
    rectangle.height
  )

  static scale = (rectangle, scale) => new Rectangle(
    rectangle.x * scale,
    rectangle.y * scale,
    rectangle.w * scale,
    rectangle.h * scale
  )

  static toRelative = (rectangle, image) => new Rectangle(
    rectangle.x / image.width,
    rectangle.y / image.height,
    rectangle.w / image.width,
    rectangle.h / image.height
  )

  static transpose = (rectangle) => new Rectangle(
    rectangle.y,
    rectangle.x,
    rectangle.h,
    rectangle.w
  )

  static getPoints = (rectangle) => {
    const x1 = rectangle.x
    const y1 = rectangle.y
    const x2 = rectangle.x + rectangle.w
    const y2 = rectangle.y + rectangle.h
    return [
      new Point(Math.min(x1, x2), Math.min(y1, y2)),
      new Point(Math.max(x1, x2), Math.max(y1, y2))
    ]
  }

  static getCorners = (rectangle) => {
    const [p1, p2] = Rectangle.getPoints(rectangle)
    return [
      new Point(p1.x, p1.y),
      new Point(p2.x, p1.y),
      new Point(p1.x, p2.y),
      new Point(p2.x, p2.y)
    ]
  }

  static getLines = (rectangle) => {
    const [p1, p2, p3, p4] = Rectangle.getCorners(rectangle)
    return [
      new Line(p1, p2),
      new Line(p3, p4),
      new Line(p1, p3),
      new Line(p2, p4)
    ]
  }

  static inside = (rectangle, point) => {
    const [
      { x: x1, y: y1 },
      { x: x2, y: y2 }
    ] = Rectangle.getPoints(rectangle)
    return (
      x1 <= point.x && point.x <= x2 &&
      y1 <= point.y && point.y <= y2
    )
  }

  static intersecting = (rectangle, line) => {
    const lines = Rectangle.getLines(rectangle)
    return (
      Rectangle.inside(rectangle, line.p1) ||
      Rectangle.inside(rectangle, line.p2) ||
      lines.some((l) => Line.intersecting(l, line))
    )
  }

  static getEdgeMidPoints = (rectangle) => {
    const { x, y, w, h } = rectangle
    return ([
      new Point(x, y + h / 2),
      new Point(x + w, y + h / 2),
      new Point(x + w / 2, y),
      new Point(x + w / 2, y + h)
    ])
  }

  static getRectangleWithinImage = (rectangle) => {
    const imageRect = new Rectangle(0, 0, 1, 1)
    const [p1, p2] = Rectangle.getPoints(rectangle)

    const x = Math.max(p1.x, imageRect.x)
    const y = Math.max(p1.y, imageRect.y)

    return (
      new Rectangle(
        x,
        y,
        Math.min(p2.x - x, imageRect.w - x),
        Math.min(p2.y - y, imageRect.h - y)
      )
    )
  }
}

const rectangleShape = PropTypes.shape({
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  w: PropTypes.number.isRequired,
  h: PropTypes.number.isRequired
})

export {
  rectangleShape,
  Rectangle
}
