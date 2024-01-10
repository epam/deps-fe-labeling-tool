
import React, { PureComponent } from 'react'
import { Drawer as AntdDrawer } from 'antd'
import 'antd/lib/drawer/style/index.less'
import PropTypes from 'prop-types'
import { Placement } from '@/enums/Placement'

class Drawer extends PureComponent {
  static propTypes = {
    bodyStyle: PropTypes.shape({
      [PropTypes.string]: PropTypes.string
    }),
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
      PropTypes.element
    ]).isRequired,
    className: PropTypes.string,
    hasCloseIcon: PropTypes.bool,
    height: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    headerStyle: PropTypes.shape({
      [PropTypes.string]: PropTypes.string
    }),
    onClose: PropTypes.func,
    placement: PropTypes.oneOf(
      Object.values(Placement)
    ),
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    visible: PropTypes.bool,
    width: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  }

  render = () => (
    <AntdDrawer
      bodyStyle={this.props.bodyStyle}
      className={this.props.className}
      closable={this.props.hasCloseIcon}
      getContainer={false}
      height={this.props.height}
      headerStyle={this.props.headerStyle}
      onClose={this.props.onClose}
      placement={this.props.placement}
      title={this.props.title}
      visible={this.props.visible}
      width={this.props.width}
    >
      {this.props.children}
    </AntdDrawer>
  )
}

export {
  Drawer
}
