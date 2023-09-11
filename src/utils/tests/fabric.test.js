import { Rectangle } from '@/models/Rectangle'
import {
  FABRIC_MIN_SIZE,
  applyScale,
  atSameSpot,
  ensureMinSize,
  getAbsoluteCanvasPosition,
  getActiveDataObjects,
  getPositionAndSizeBeforeScaling,
  getPositionInsideGroup,
  hasSameSize,
  saveSelection,
  withSuppressedSelectionEvents
} from '@/utils/fabric'

describe('util: fabric hasSameSize', () => {
  let left1, left2, right1, right2

  beforeEach(() => {
    left1 = {
      w: 10,
      h: 15
    }
    right1 = {
      w: 10,
      h: 15
    }
    left2 = {
      width: 12,
      height: 14
    }
    right2 = {
      width: 12,
      height: 77
    }
  })

  it('should return true', () => {
    expect(hasSameSize(left1, right1)).toBe(true)
  })

  it('should return false', () => {
    expect(hasSameSize(left2, right2)).toBe(false)
  })
})

describe('util: fabric atSameSpot', () => {
  let left1, left2, right1, right2

  beforeEach(() => {
    left1 = {
      x: 10,
      y: 15
    }
    right1 = {
      x: 10,
      y: 15
    }
    left2 = {
      left: 12,
      right: 14
    }
    right2 = {
      left: 12,
      right: 77
    }
  })

  it('should return true', () => {
    expect(atSameSpot(left1, right1)).toBe(true)
  })

  it('should return false', () => {
    expect(atSameSpot(left2, right2)).toBe(false)
  })
})

describe('util: fabric ensureMinSize', () => {
  const objWithBigParameters = {
    w: 10,
    h: 10
  }

  const objToChangeParameters = {
    w: 0,
    h: 0
  }

  it('should break if no params', () => {
    expect(ensureMinSize()).toBeUndefined()
  })

  it('should mutate obj', () => {
    ensureMinSize(objToChangeParameters)
    expect(objToChangeParameters).toStrictEqual({ w: FABRIC_MIN_SIZE, h: FABRIC_MIN_SIZE })
  })

  it('should not mutate obj', () => {
    ensureMinSize(objWithBigParameters)
    expect(objWithBigParameters).toStrictEqual({ w: 10, h: 10 })
  })
})

describe('util: fabric getAbsoluteCanvasPosition', () => {
  const fakeFabricObjectWithGroup = {
    left: 10,
    top: 50,
    group: {
      getCenterPoint: jest.fn(() => ({
        x: 1,
        y: 1
      }))
    }
  }

  const fakeFabricObjectWithoutGroup = {
    left: 10,
    top: 50,
    group: null
  }
  it('should return expected coords if group exists', () => {
    expect(getAbsoluteCanvasPosition(fakeFabricObjectWithGroup)).toStrictEqual({ x: 11, y: 51 })
  })
  it('should return target coords if group not exists', () => {
    expect(getAbsoluteCanvasPosition(fakeFabricObjectWithoutGroup)).toStrictEqual({ x: 10, y: 50 })
  })
})

describe('util: fabric getActiveDataObjects', () => {
  const mockCanvas = {
    getActiveObjects: () => {
      return [
        {
          data: {
            props: 'prop 1'
          }
        },
        {
          data: {
            props: 'prop 2'
          }
        },
        {
          data: {
            props: 'prop 3'
          }
        },
        {
          data: null
        }
      ]
    }
  }

  const expectedArray = [
    {
      props: 'prop 1'
    },
    {
      props: 'prop 2'
    },
    {
      props: 'prop 3'
    }
  ]

  it('should return correct array', () => {
    expect(getActiveDataObjects(mockCanvas)).toEqual(expectedArray)
  })
})

describe('util: fabric getPositionAndSizeBeforeScaling', () => {
  it('should return expected Rectangle', () => {
    const mockOptions = {
      transform: {
        original: {
          top: 100,
          left: 100
        },
        target: {
          width: 500,
          height: 500
        }
      }
    }
    const expectedRectangle = new Rectangle(100, 100, 500, 500)
    expect(getPositionAndSizeBeforeScaling(mockOptions)).toEqual(expectedRectangle)
  })
})

describe('util: fabric getPositionInsideGroup', () => {
  const object = {
    x: 100,
    y: 200
  }
  const mockGroup = {
    getCenterPoint: () => ({
      x: 50,
      y: 50
    })
  }

  it('should return expected values with groupedObject', () => {
    expect(getPositionInsideGroup(object, mockGroup)).toEqual({ x: 50, y: 150 })
  })

  it('should return expected values without groupedObject', () => {
    expect(getPositionInsideGroup(object)).toEqual({ x: 100, y: 200 })
  })
})

describe('util: fabric applyScale', () => {
  let fakeFabricObject
  beforeEach(() => {
    fakeFabricObject = {
      scaleX: 2,
      scaleY: 3,
      width: 20,
      height: 30,
      getScaledWidth: jest.fn(),
      getScaledHeight: jest.fn(),
      set: jest.fn(),
      setCoords: jest.fn()
    }
  })

  it('should call getScaledWidth', () => {
    applyScale(fakeFabricObject)
    expect(fakeFabricObject.getScaledWidth).toHaveBeenCalled()
  })

  it('should call getScaledHeight', () => {
    applyScale(fakeFabricObject)
    expect(fakeFabricObject.getScaledHeight).toHaveBeenCalled()
  })

  it('should call set func two times', () => {
    applyScale(fakeFabricObject)
    expect(fakeFabricObject.set).toHaveBeenCalledTimes(2)
  })

  it('should call setCoords', () => {
    applyScale(fakeFabricObject)
    expect(fakeFabricObject.setCoords).toHaveBeenCalled()
  })

  it('should not call getScaledHeight and getScaledHeight if scales is equal to 1', () => {
    fakeFabricObject.scaleX = 1
    fakeFabricObject.scaleY = 1
    expect(fakeFabricObject.getScaledHeight).not.toHaveBeenCalled()
    expect(fakeFabricObject.getScaledWidth).not.toHaveBeenCalled()
    expect(fakeFabricObject.set).not.toHaveBeenCalled()
  })
})

describe('util: fabric withSuppressedSelectionEvents', () => {
  const mockFn = jest.fn()
  const target = {
    __eventListeners: {
      'selection:created': [1, 2, 3],
      'selection:updated': [1, 2, 3],
      'selection:cleared': [1, 2, 3]
    }
  }

  const targetCopy = {
    __eventListeners: {
      'selection:created': [1, 2, 3],
      'selection:updated': [1, 2, 3],
      'selection:cleared': [1, 2, 3]
    }
  }

  it('should execute func and return the same object', () => {
    withSuppressedSelectionEvents(target, mockFn)
    expect(target).toEqual(targetCopy)
    expect(mockFn).toHaveBeenCalled()
  })
})

describe('util: fabric saveSelection', () => {
  let fakeActiveObject

  let fakeCanvas

  beforeEach(() => {
    fakeActiveObject = {
      on: jest.fn()
    }
    fakeCanvas = {
      getActiveObject: jest.fn(() => fakeActiveObject),
      setActiveObject: jest.fn()
    }
  })

  it('should return a function', () => {
    expect(saveSelection(fakeCanvas)).toBeInstanceOf(Function)
  })

  it('returned function should call setActiveObject', () => {
    saveSelection(fakeCanvas)()
    expect(fakeCanvas.setActiveObject).toHaveBeenCalled()
  })

  it('should call on function', () => {
    saveSelection(fakeCanvas)
    expect(fakeActiveObject.on).toHaveBeenCalled()
  })

  it('should call getActiveObject', () => {
    saveSelection(fakeCanvas)
    expect(fakeCanvas.getActiveObject).toHaveBeenCalled()
  })

  it('should return undefined if no active object', () => {
    fakeCanvas.getActiveObject = jest.fn(() => null)
    expect(saveSelection(fakeCanvas)).toBeUndefined()
  })

  it('should call function on removed event', () => {
    fakeActiveObject.on = jest.fn((str, callback) => {
      callback()
    })
    expect(saveSelection(fakeCanvas)()).toBeUndefined()
  })
})
