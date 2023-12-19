import { Line } from '@/models/Line'
import { Point } from '@/models/Point'
import { Cell } from '@/models/Table/Cell'
import { getCells } from '@/models/Table/getCells'

const getKey = (border) => (
  `${border.p1.x}.${border.p1.y} -> ${border.p2.x}.${border.p2.y}`
)

const getBorders = (table) => {
  const borders = {}

  getCells(table).forEach((cell) => {
    Cell.getBorders(cell).forEach((cellBorder) => {
      const key = getKey(cellBorder)
      if (borders[key]) {
        borders[key].mergeable = true
        borders[key].cells.push(cell)
      }

      const exists = Object.values(borders).find((border) => {
        const colinear = Line.colinear(cellBorder, border)
        const chain = Point.equal(cellBorder.p1, border.p2) + Point.equal(cellBorder.p2, border.p1) === 1
        return colinear && !chain
      })

      if (!exists) {
        borders[key] = cellBorder
      }
    })
  })

  return Object.values(borders)
}

export {
  getBorders
}
