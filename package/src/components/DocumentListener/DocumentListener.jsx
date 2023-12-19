import { PureComponent } from 'react'
import PropTypes from 'prop-types'

class DocumentListener extends PureComponent {
  static propTypes = {
    onContextMenu: PropTypes.func
  }

  componentDidMount = () => {
    document.addEventListener('contextmenu', this.props.onContextMenu)
  }

  componentWillUnmount = () => {
    document.removeEventListener('contextmenu', this.props.onContextMenu)
  }

  render = () => null
}

export {
  DocumentListener
}
