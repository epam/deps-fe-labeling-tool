import PropTypes from 'prop-types'
import { Feature } from '@/enums/Feature'
import { Panel } from '@/enums/Panel'
import { Tool } from '@/enums/Tool'

class SubSettings {
  constructor (code, data) {
    this.code = code
    this.data = data
  }
}

const subSettingsShape = PropTypes.shape({
  code: PropTypes.oneOf([
    ...Object.values(Panel),
    ...Object.values(Tool),
    ...Object.values(Feature)
  ]).isRequired,
  data: PropTypes.any.isRequired
})

export {
  SubSettings,
  subSettingsShape
}
