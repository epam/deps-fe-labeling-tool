import { resetDefault, setZoom, setRotationAngle } from '@/actions/canvas'
import { Angle } from '@/enums/Rotation'

const MOCK_ZOOM_LEVEL = 4
const MOCK_ROTATION_PAYLOAD = {
  page: 1,
  angle: Angle.D_90
}

describe('Actions: canvas', () => {
  it('should create setZoom action with correct type and payload', () => {
    const action = setZoom(MOCK_ZOOM_LEVEL)

    expect(action).toEqual({
      type: setZoom.toString(),
      payload: MOCK_ZOOM_LEVEL
    })
  })

  it('should create resetDefault action with correct type', () => {
    const action = resetDefault()
    expect(action).toEqual({
      type: resetDefault.toString()
    })
  })

  it('should create setRotationAngle action with correct type and payload', () => {
    const { page, angle } = MOCK_ROTATION_PAYLOAD
    const action = setRotationAngle(page, angle)

    expect(action).toEqual({
      type: setRotationAngle.toString(),
      payload: MOCK_ROTATION_PAYLOAD
    })
  })
})
