import { Avatar, Space } from 'antd'
import { Design } from '@hubiao/family-ui'
import React from 'react'
import { ItemType } from 'antd/es/menu/hooks/useItems'
import { UserOutlined } from '@ant-design/icons'

type Props = {}

const items: ItemType[] = [
  { label: '菜单项一', key: 'item-1', icon: <UserOutlined /> },
  { label: '菜单项二', key: 'item-2', icon: <UserOutlined /> },
  {
    label: '子菜单',
    key: 'submenu',
    icon: <UserOutlined />,
    children: [{ label: '子菜单项', key: 'submenu-item-1' }],
  },
]

const HeaderRight = () => {
  return (
    <Space size='small'>
      <Avatar icon={<UserOutlined />} />
    </Space>
  )
}

const App: React.FC = (props: Props) => {
  return (
    <Design
      openDesignSetting
      menuItem={items}
      logo={'xxx'}
      headerRight={<HeaderRight />}
    >
      my layout
    </Design>
  )
}

export default App
