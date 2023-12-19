
import { loadImage } from '@/utils/image'

describe('util: image', () => {
  let onLoadRef
  const src = 'pathToFile'
  Object.defineProperty(Image.prototype, 'onload', {
    get () {
      return this._onload
    },
    set (onload) {
      this._onload = onload
      onLoadRef = onload
    }
  })
  Object.defineProperty(Image.prototype, 'src', {
    get () {
      return this._src
    },
    set (src) {
      this._src = src
      onLoadRef()
    }
  })

  it('should call imgGeter with correct args', async () => {
    const getterFunc = jest.fn((src) => Promise.resolve(src))
    await loadImage(src, getterFunc)
    expect(getterFunc).toBeCalledWith(src)
  })

  it('should resolve with imageGetter', async () => {
    const getterFunc = jest.fn((src) => Promise.resolve(src))
    const { image } = await loadImage(src, getterFunc)
    expect(image).toBeInstanceOf(Image)
  })

  it('should resolve with coorect img.src', async () => {
    const { image } = await loadImage(src)
    expect(image.src).toBe(src)
  })

  it('should resolve without imageGetter', async () => {
    const { image } = await loadImage(src)
    expect(image).toBeInstanceOf(Image)
  })
})
