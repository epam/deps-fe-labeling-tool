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

  getHeight = jest.fn(() => this.height)

  setDimensions = jest.fn(({ width = this.width, height = this.height }) => {
    this.width = width
    this.height = height
  })

  getZoom = jest.fn(() => this.zoom)

  setZoom = jest.fn((zoom) => {
    this.zoom = zoom
  })

  getCenterPoint = jest.fn(() => ({
    x: this.width / 2,
    y: this.height / 2
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
    removeAll: jest.fn(() => ['testEl']),
    getObjects: jest.fn(() => ['testEl'])
  }])

  requestRenderAll = jest.fn()

  renderAll = jest.fn()

  add = jest.fn()

  remove = jest.fn()

  fxRemove = jest.fn()

  findTarget = jest.fn(() => ({}))

  _resetTransformEventData = jest.fn()

  discardActiveObject = jest.fn()

  setCursor = jest.fn()

  add = jest.fn()

  sendObjectToBack = jest.fn()

  setActiveObject = jest.fn()

  getActiveObject = jest.fn()

  getActiveObjects = jest.fn(() => [])

  fire = jest.fn()

  getScenePoint = jest.fn()
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

  set = jest.fn((props) => {
    Object.assign(this, props)
  })

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

const fabricClasses = {
  Text: MockText,
  FabricText: MockText,
  Image: MockImage,
  FabricImage: MockImage,
  Canvas: MockCanvas,
  Point: MockPoint,
  Group: MockGroup,
  Textbox: MockTextbox,
  Rect: MockRect,
  Circle: MockCircle,
  ActiveSelection: MockActiveSelection
}

const mockFabric = {
  ...fabricClasses,
  fabric: fabricClasses
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
