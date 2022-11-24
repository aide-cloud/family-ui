import { Avatar, ConfigProvider, Layout, Space, theme } from 'antd'
import { Design, SiderMenuType } from '@hubiao/family-ui'
import React, { useState } from 'react'
import { UserOutlined } from '@ant-design/icons'

import './app.css'
type Props = {}

const items = [
  {
    label: '菜单项一',
    icon: <UserOutlined />,
    key: '/',
    component: <div>home</div>,
  },
  {
    label: '菜单项二',
    icon: <UserOutlined />,
    component: <div>test</div>,
    key: '/test',
  },
  {
    label: '子菜单',
    icon: <UserOutlined />,
    children: [
      {
        label: '子菜单项',
        key: '/test1',
        component: <div>child test</div>,
        children: [
          {
            label: 'test11',
            key: '/test11',
            component: <div>child test 11</div>,
          },
        ],
      },
    ],
    key: '/submenu',
    // component: <div>子菜单</div>,
  },
] as SiderMenuType[]

const HeaderRight = () => {
  return (
    <Space size='small'>
      <Avatar icon={<UserOutlined />} />
    </Space>
  )
}

const App: React.FC = (props: Props) => {
  return (
    <div>
      <Design
        openDesignSetting
        menuItem={items}
        logo={'xxx'}
        headerRight={<HeaderRight />}
        // header={<div>1234</div>}
      >
        my layout
      </Design>
    </div>
  )
}

export default App
