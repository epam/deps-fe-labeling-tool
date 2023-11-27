import React, { PureComponent } from 'react'
import { Menu, Dropdown } from 'antd'
import 'antd/lib/menu/style/index.less'
import 'antd/lib/dropdown/style/index.less'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { optionShape } from '@/models/Option'
import { DropdownPosition } from './ContextMenu.styles'

const DEFAULT_ANIMATION_TIME = 300

class ContextMenu extends PureComponent {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    options: PropTypes.arrayOf(optionShape).isRequired,
    context: PropTypes.any,
    onSelection: PropTypes.func.isRequired,
    unmount: PropTypes.func.isRequired
  }

  state = {
    visible: true
  }

  componentDidUpdate = () => {
    if (this.state.visible) {
      return
    }

    setTimeout(this.props.unmount, DEFAULT_ANIMATION_TIME)
  }

  close = () => this.setState({
    visible: false
  })

  onClick = (e) => {
    this.props.onSelection(e.key, this.props.context)
    this.close()
  }

  onVisibleChange = (visible) => {
    !visible && this.close()
  }

  getMenu = () => (
    <Menu
      onClick={this.onClick}
    >
      {
        this.props.options.map((option) => (
          <Menu.Item
            key={option.value}
            disabled={option.disabled}
          >
            {option.text}
          </Menu.Item>
        ))
      }
    </Menu>
  )

  render = () => this.state.visible && (
    <DropdownPosition
      x={this.props.x}
      y={this.props.y}
    >
      <Dropdown
        trigger="click"
        visible={this.state.visible}
        overlay={this.getMenu()}
        onVisibleChange={this.onVisibleChange}
      >
        <div />
      </Dropdown>
    </DropdownPosition>
  )
}

const openMenu = (x, y, options, context, onSelection) => {
  const root = document.getRootNode()

  const menu = document.createElement('div')
  menu.setAttribute('style', 'position: absolute; top: 0; left: 0')

  root.body.appendChild(menu)

  const unmount = () => {
    ReactDOM.unmountComponentAtNode(menu)
    menu.remove()
  }

  ReactDOM.render(
    <ContextMenu
      x={x}
      y={y}
      options={options}
      onSelection={onSelection}
      context={context}
      unmount={unmount}
    />,
    menu
  )
}

export {
  openMenu
}
