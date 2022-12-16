import { Avatar, ConfigProvider, Layout, Space, theme } from 'antd'
import { Design, SiderMenuType } from '@hubiao/family-ui'
import React, { useState, lazy } from 'react'
import { UserOutlined } from '@ant-design/icons'

import './app.css'
type Props = {}

const items: SiderMenuType[] = [
  {
    label: '菜单项一',
    icon: <UserOutlined />,
    key: '/',
    component: React.createElement(lazy(() => import('./pages/home'))),
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
    <div>
      <Design
        openDesignSetting
        menuItem={items}
        logo={'xx'}
        headerRight={<HeaderRight />}
        loading={false}
        // header={<div>1234</div>}
      >
        <p>xxx</p>
        my layout
      </Design>
    </div>
  )
}

export default App
