import { isEqual } from '@/utils/isEqual'

class ObjectForTest {
  constructor (x, y, z) {
    this.x = x
    this.y = y
    this.z = z
  }
}

describe('util: isEqual', () => {
  let objA, sameObjA, anotherObject

  beforeEach(() => {
    objA = new ObjectForTest(1, 2, 77)
    sameObjA = new ObjectForTest(1, 2, 77)
    anotherObject = new ObjectForTest(12, 5656, 'Peter')
  })

  it('should return true for same objects', () => {
    expect(isEqual(objA, sameObjA)).toBe(true)
    expect(isEqual(10, 10)).toBe(true)
    expect(isEqual('10', '10')).toBe(true)
  })

  it('should return false for different objects', () => {
    expect(isEqual(objA, anotherObject)).toBe(false)
    expect(isEqual(44, 12)).toBe(false)
    expect(isEqual('44', '12')).toBe(false)
  })
})
