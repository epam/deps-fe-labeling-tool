class MockPoint {
  static instance

  x

  y

  constructor (x, y) {
    this.x = x
    this.y = y
    MockPoint.instance = this
  }

  static getLastCreatedInstance () {
    return MockPoint.instance
  }
}

class MockCanvas {
  ref

  width = 1366

  height = 768

  zoom = 1

  backgroundColor = '#ffffff'

  backgroundImage = {}

  viewportTransform = [0, 0, 0, 0, 0, 0]

  selection = true

  listeners = {}

  static instance

  constructor (ref = undefined) {
    this.ref = ref
    MockCanvas.instance = this
  }

  static getLastCreatedInstance () {
    return MockCanvas.instance
  }

  on = jest.fn((eventName, callback) => {
    this.listeners[eventName] = this.listeners[eventName] || []
    this.listeners[eventName].push(callback)
  })

  off = jest.fn((eventName, callback) => {
    this.listeners[eventName] = this.listeners[eventName].filter((registeredCallback) => registeredCallback !== callback)
  })

  setViewportTransform = jest.fn((vpt) => {
    this.viewportTransform = vpt
  })

  getWidth = jest.fn(() => this.width)

  setWidth = jest.fn((width) => {
    this.width = width
  })

  getHeight = jest.fn(() => this.height)

  setHeight = jest.fn((height) => {
    this.height = height
  })

  getZoom = jest.fn(() => this.zoom)

  setZoom = jest.fn((zoom) => {
    this.zoom = zoom
  })

  getCenter = jest.fn(() => ({
    left: this.width / 2,
    top: this.height / 2
  }))

  setBackgroundColor = jest.fn((backgroundColor) => {
    this.backgroundColor = backgroundColor
  })

  setBackgroundImage = jest.fn((backgroundImage) => {
    this.backgroundImage = backgroundImage
  })

  zoomToPoint = jest.fn((point, zoom) => {
    this.viewportTransform[4] = point.x
    this.viewportTransform[5] = point.y
    this.zoom = zoom
  })

  getObjects = jest.fn(() => [{
    data: {
      uid: '1'
    },
    ungroupOnCanvas: jest.fn(() => ({ getObjects: jest.fn(() => ['testEl']) })),
    getObjects: jest.fn(() => ['testEl'])
  }])

  requestRenderAll = jest.fn()

  renderAll = jest.fn()

  add = jest.fn()

  remove = jest.fn()

  fxRemove = jest.fn()

  findTarget = jest.fn()

  discardActiveObject = jest.fn()

  setCursor = jest.fn()

  add = jest.fn()

  sendToBack = jest.fn()

  setActiveObject = jest.fn()

  getActiveObject = jest.fn()

  getActiveObjects = jest.fn(() => [])

  fire = jest.fn()

  getPointer = jest.fn()
}

class MockImage {
  width = 0

  height = 0

  src = '';

  constructor (image) {
    this.src = (image && image.src) || 'MOCK_SRC'
    this.width = 288
    this.height = 512
  }

  static fromURL = jest.fn().mockImplementation((src, callback) => {
    const image = new MockImage()
    image.src = src
    callback(image)
  })

  getSrc () {
    return this.src
  }
}

class MockActiveSelection {
  set = jest.fn()

  on = jest.fn()
}

class MockGroup {

}

class MockText {

}

const MockTextbox = jest.fn(() => ({
  set: jest.fn(),

  setCoords: jest.fn()
}))

class MockRect {
  on = jest.fn()

  set = jest.fn()

  setCoords = jest.fn(() => this)

  getScaledWidth = jest.fn()

  getScaledHeight = jest.fn()

  setControlsVisibility = jest.fn()

  left = 10

  top = 10

  height = 10

  width = 10

  selectable = true

  name = 'mockRect'

  content = 'mockRect'

  data = {
    uid: 0
  }
}

class MockCircle {
  set = jest.fn()
}

const mockFabric = {
  fabric: {
    Text: MockText,
    Image: MockImage,
    Canvas: MockCanvas,
    Point: MockPoint,
    Group: MockGroup,
    Textbox: MockTextbox,
    Rect: MockRect,
    Circle: MockCircle,
    ActiveSelection: MockActiveSelection
  }
}

class MockTable {
  set = jest.fn()

  on = jest.fn()
}

class MockCell {
  set = jest.fn()

  on = jest.fn()
}

class MockBorder {
  set = jest.fn()
}

class MockSplitProjection {
  set = jest.fn()
}

class MockFabricArrow {
  set = jest.fn()

  setCoords = jest.fn()
}

export {
  MockText,
  MockPoint,
  MockCanvas,
  MockImage,
  MockRect,
  mockFabric,
  MockCell,
  MockTable,
  MockBorder,
  MockSplitProjection,
  MockActiveSelection,
  MockFabricArrow
}
