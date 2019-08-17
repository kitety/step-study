import React from 'react'
import SiderMenu from './SiderMenu'
import { Drawer } from 'antd'
import styles from './index.less'


const SiderMenuWrapper = (props) => {
  const { isMobile, collapsed, onClose } = props
  return (
    isMobile ? <Drawer
      closable={true}
      onClose={onClose}
      visible={!collapsed}
      placement='left'
      className={styles.nopadding}
    ><SiderMenu {...props} /> </Drawer> : <SiderMenu {...props} />
  )
}

export default SiderMenuWrapper

