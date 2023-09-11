import memoize from 'lodash/memoize'
import { Placement } from '@/enums/Placement'
import { Angle } from '@/enums/Rotation'

const loadImage = memoize(
  async (imageURL, imageGetter) => {
    const src = imageGetter ? await imageGetter(imageURL) : imageURL
    return new Promise((resolve, reject) => {
      const image = new Image()
      image.onload = () => resolve({ image, imageURL })
      image.onerror = reject
      image.src = src
    })
  }
)

const getImagePosition = (angle) => {
  switch (angle) {
    case Angle.D_0:
      return ({
        originX: Placement.LEFT,
        originY: Placement.TOP
      })

    case Angle.D_90:
      return ({
        originX: Placement.LEFT,
        originY: Placement.BOTTOM
      })

    case Angle.D_180:
      return ({
        originX: Placement.RIGHT,
        originY: Placement.BOTTOM
      })

    case Angle.D_270:
      return ({
        originX: Placement.RIGHT,
        originY: Placement.TOP
      })

    default:
      throw new Error(`Unsupported angle: ${angle}`)
  }
}

export {
  loadImage,
  getImagePosition
}
