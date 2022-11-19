import {
  Avatar,
  Button,
  Col,
  ConfigProvider,
  Drawer,
  FloatButton,
  Layout,
  Menu,
  Row,
  Space,
  Switch,
  theme,
} from 'antd'
import { RightOutlined, LeftOutlined, SettingOutlined } from '@ant-design/icons'
import React from 'react'
import { ItemType } from 'antd/es/menu/hooks/useItems'
import { MappingAlgorithm, ThemeConfig } from 'antd/es/config-provider/context'
const { darkAlgorithm, compactAlgorithm, defaultAlgorithm } = theme

type DesignProps = {
  openDesignSetting?: boolean
  menuItem?: ItemType[]
  children?: React.ReactNode
  header?: React.ReactNode
  logo?: React.ReactNode
  headerRight?: React.ReactNode
  headerStyle?: React.CSSProperties
}

type DefaultHeaderProps = {
  logo?: React.ReactNode
  children?: React.ReactNode
}

/**
 * 构造默认的header
 * @param props 默认头部参数
 * @returns 返回默认头部ReactNode
 */
const DefaultHeader = (props: DefaultHeaderProps) => {
  return (
    <Row>
      <Col span={4}>{props.logo}</Col>
      <Col span={20} style={{ textAlign: 'right' }}>
        <Space size='small'>{props.children}</Space>
      </Col>
    </Row>
  )
}

type DesignSelectorProps = {
  open?: boolean
  setTheme?: (theme: ThemeConfig) => void
  themecfg?: ThemeConfig
}

type primaryColorType = {
  color: string
  name: string
}

type ThemeType = {
  name: string
  url?: string
  value: ThemeConfig
}

/**
 * 构造设计选择器
 * @param props 设计选择器参数
 * @returns 设计选择器ReactNode
 */
const DesignSelector = (props: DesignSelectorProps) => {
  const { open, setTheme, themecfg } = props
  const [selectedTheme, setSelectedTheme] = React.useState<number>(0)

  const [openDesignSelect, setOpenDesignSelect] = React.useState(false)

  const handSlectDesign = () => {
    setOpenDesignSelect(!openDesignSelect)
  }

  const primaryColorList: primaryColorType[] = [
    {
      color: '#1890ff',
      name: '蓝色',
    },
    {
      color: '#f5222d',
      name: '红色',
    },
    {
      color: '#fa541c',
      name: '橙色',
    },
    {
      color: '#fa8c16',
      name: '黄色',
    },
    {
      color: '#52c41a',
      name: '绿色',
    },
    {
      color: '#13c2c2',
      name: '青色',
    },
    {
      color: '#722ed1',
      name: '紫色',
    },
    {
      color: '#eb2f96',
      name: '粉色',
    },
  ]

  const themeList: ThemeType[] = [
    {
      name: '默认',
      url: 'https://gw.alipayobjects.com/zos/bmw-prod/ae669a89-0c65-46db-b14b-72d1c7dd46d6.svg',
      value: {
        algorithm: defaultAlgorithm,
      },
    },
    {
      name: '暗黑',
      url: 'https://gw.alipayobjects.com/zos/bmw-prod/0f93c777-5320-446b-9bb7-4d4b499f346d.svg',
      value: {
        algorithm: darkAlgorithm,
      },
    },
    {
      name: '默认紧凑',
      url: 'https://gw.alipayobjects.com/zos/bmw-prod/ae669a89-0c65-46db-b14b-72d1c7dd46d6.svg',
      value: {
        algorithm: [defaultAlgorithm, compactAlgorithm],
      },
    },
    {
      name: '暗黑紧凑',
      url: 'https://gw.alipayobjects.com/zos/bmw-prod/0f93c777-5320-446b-9bb7-4d4b499f346d.svg',
      value: {
        algorithm: [darkAlgorithm, compactAlgorithm],
      },
    },
  ]

  return (
    <>
      {open && (
        <>
          <FloatButton
            icon={<SettingOutlined />}
            type='primary'
            shape={'circle'}
            onClick={handSlectDesign}
          />
          <Drawer
            open={openDesignSelect}
            title='选择主题'
            placement='right'
            width={300}
            onClose={handSlectDesign}
          >
            <Space direction='vertical'>
              <Space direction='horizontal' wrap>
                {themeList.map((item, index) => {
                  return (
                    <Avatar
                      size={120}
                      shape='square'
                      key={index}
                      style={{
                        border:
                          selectedTheme == index
                            ? `2px ${
                                themecfg?.token?.colorPrimary || '#1890ff'
                              } solid`
                            : '',
                      }}
                      src={item.url}
                      onClick={() => {
                        if (setTheme && themecfg) {
                          setSelectedTheme(index)
                          setTheme({
                            ...themecfg,
                            algorithm: item?.value?.algorithm,
                          })
                        }
                      }}
                    />
                  )
                })}
              </Space>

              <Space direction='horizontal' wrap>
                {primaryColorList.map(
                  (color: primaryColorType, index: number) => {
                    return (
                      <ConfigProvider
                        key={index}
                        theme={{
                          token: {
                            colorPrimary: color.color,
                          },
                        }}
                      >
                        <Button
                          type='primary'
                          onClick={() =>
                            setTheme &&
                            setTheme({
                              ...themecfg,
                              token: {
                                ...themecfg?.token,
                                colorPrimary: color.color,
                              },
                            })
                          }
                        >
                          {color.name}
                        </Button>
                      </ConfigProvider>
                    )
                  }
                )}
              </Space>
            </Space>
          </Drawer>
        </>
      )}
    </>
  )
}

/**
 * Design组件，用于构造页面基础布局
 * @param props Design组件参数
 * @returns 返回Design组件ReactNode
 */
export const Design = (props: DesignProps) => {
  const [collapsed, setCollapsed] = React.useState(false)
  const {
    menuItem,
    children,
    header,
    headerStyle,
    headerRight,
    logo,
    openDesignSetting,
  } = props

  const buildHeader = () => {
    return (
      <Layout.Header
        style={
          !!headerStyle
            ? { ...headerStyle }
            : { background: 'none', padding: 0, margin: '0 8px' }
        }
      >
        {!!header ? (
          header
        ) : (
          <DefaultHeader logo={logo}>{headerRight}</DefaultHeader>
        )}
      </Layout.Header>
    )
  }

  const [theme, setTheme] = React.useState<ThemeConfig>({
    algorithm: [darkAlgorithm, defaultAlgorithm],
    token: {
      colorPrimary: '#1890ff',
    },
  })

  return (
    <ConfigProvider theme={theme}>
      <DesignSelector
        open={openDesignSetting}
        setTheme={setTheme}
        themecfg={theme}
      />
      <Layout style={{ height: '100vh', width: '100vw' }}>
        {buildHeader()}
        <Layout>
          <Layout.Sider
            collapsed={collapsed}
            style={{ position: 'relative', background: 'none' }}
          >
            <Menu style={{ height: '100%' }} mode='inline' items={menuItem} />
            <Button
              type='primary'
              style={{ width: '100%', position: 'absolute', bottom: 0 }}
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <RightOutlined /> : <LeftOutlined />}
            </Button>
          </Layout.Sider>
          <Layout>
            <Layout.Content>{children}</Layout.Content>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}

Design.displayName = 'Design'
