import {
  Button,
  Col,
  ConfigProvider,
  Drawer,
  FloatButton,
  Input,
  Layout,
  Menu,
  Popover,
  Row,
  Space,
  theme,
  Tooltip,
} from 'antd'
import { RightOutlined, LeftOutlined, SettingOutlined } from '@ant-design/icons'
import React, {
  createContext,
  ReactNode,
  Suspense,
  useContext,
  useEffect,
} from 'react'
import { ItemType, MenuItemType } from 'antd/es/menu/hooks/useItems'
import { ThemeConfig } from 'antd/es/config-provider/context'
import {
  HashRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { HexColorPicker } from 'react-colorful'

const { darkAlgorithm, compactAlgorithm, defaultAlgorithm, useToken } = theme

const DesignContext = createContext({} as DesignProps)

// export type SiderMenuType = MenuItemType | RouteType
export type SiderMenuType = {
  key: string
  label: string
  icon?: React.ReactNode
  component?: React.ReactNode
  children?: SiderMenuType[]
}

type DesignProps = {
  openDesignSetting?: boolean
  menuItem?: SiderMenuType[]
  children?: React.ReactNode
  header?: React.ReactNode
  logo?: React.ReactNode
  headerRight?: React.ReactNode
  headerStyle?: React.CSSProperties
  loading?: ReactNode
}

type DefaultHeaderProps = {
  logo?: React.ReactNode
  children?: React.ReactNode
}

export interface DesignLayoutProps {
  loading?: ReactNode
}

const DefaultLoading = () => {
  return <>loading</>
}

const DesignLayout = () => {
  const { token } = useToken()
  const [collapsed, setCollapsed] = React.useState(false)
  const props = useContext(DesignContext)
  const {
    headerStyle,
    header,
    logo,
    headerRight,
    menuItem,
    children,
    loading = <DefaultLoading />,
  } = props
  return (
    <Layout
      style={{
        height: '100%',
        width: '100%',
        color: token.colorText,
      }}
    >
      <Layout.Header style={{ ...headerStyle, background: token.colorBgBase }}>
        {!!header ? (
          header
        ) : (
          <DefaultHeader logo={logo}>{headerRight}</DefaultHeader>
        )}
      </Layout.Header>
      <Layout>
        <Layout.Sider
          collapsed={collapsed}
          style={{ position: 'relative', background: token.colorBgBase }}
          className='site-layout-background'
        >
          <ThisMenu menuItems={menuItem || []} />
          <Button
            type='primary'
            style={{ width: '100%', position: 'absolute', bottom: 0 }}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <RightOutlined /> : <LeftOutlined />}
          </Button>
        </Layout.Sider>
        <Layout>
          <Layout.Content>
            <Suspense fallback={loading}>
              {children}
              <Routes>{getRoutes(menuItem || [], '')}</Routes>
            </Suspense>
          </Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

// ??????items????????????
const getRoutes = (items: SiderMenuType[], parentRoutePath: string) => {
  const routes: React.ReactNode[] = []
  items.forEach((item) => {
    // ????????????????????????/??????
    const path = item.key.replace(/^\//, '')
    const routePath = `${parentRoutePath}/${path}`

    if (item.children && item.children.length > 0) {
      routes.push(
        ...getRoutes(item.children, routePath).map((route) => {
          return route
        })
      )
    }
    if (item.component) {
      routes.push(
        <Route key={routePath} path={routePath} element={item.component} />
      )
    }
  })

  return routes
}

/**
 * ???????????????header
 * @param props ??????????????????
 * @returns ??????????????????ReactNode
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

type presetColorsType = {
  HEX: '#1890ff'
}

/**
 * ?????????????????????
 * @param props ?????????????????????
 * @returns ???????????????ReactNode
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
      name: '??????',
    },
    {
      color: '#f5222d',
      name: '??????',
    },
    {
      color: '#fa541c',
      name: '??????',
    },
    {
      color: '#fa8c16',
      name: '??????',
    },
    {
      color: '#52c41a',
      name: '??????',
    },
    {
      color: '#13c2c2',
      name: '??????',
    },
    {
      color: '#722ed1',
      name: '??????',
    },
    {
      color: '#eb2f96',
      name: '??????',
    },
  ]

  const themeList: ThemeType[] = [
    {
      name: '??????',
      url: 'https://gw.alipayobjects.com/zos/bmw-prod/ae669a89-0c65-46db-b14b-72d1c7dd46d6.svg',
      value: {
        algorithm: defaultAlgorithm,
      },
    },
    {
      name: '??????',
      url: 'https://gw.alipayobjects.com/zos/bmw-prod/0f93c777-5320-446b-9bb7-4d4b499f346d.svg',
      value: {
        algorithm: darkAlgorithm,
      },
    },
    {
      name: '????????????',
      url: 'https://gw.alipayobjects.com/zos/bmw-prod/ae669a89-0c65-46db-b14b-72d1c7dd46d6.svg',
      value: {
        algorithm: [defaultAlgorithm, compactAlgorithm],
      },
    },
    {
      name: '????????????',
      url: 'https://gw.alipayobjects.com/zos/bmw-prod/0f93c777-5320-446b-9bb7-4d4b499f346d.svg',
      value: {
        algorithm: [darkAlgorithm, compactAlgorithm],
      },
    },
  ]

  const { token } = useToken()
  const [myColorPrimary, setMyColorPrimary] = React.useState<string>(
    token.colorPrimary
  )
  const setMyTheme = (color: string) => {
    setMyColorPrimary(color)
    setTheme &&
      setTheme({
        ...themecfg,
        token: {
          ...themecfg?.token,
          colorPrimary: color,
        },
      })
  }

  const content = (
    <div>
      <HexColorPicker
        color={myColorPrimary}
        onChange={(color) => setMyTheme(color)}
      />
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          marginTop: 10,
          width: 200,
        }}
      >
        {primaryColorList.map((color: primaryColorType, index: number) => {
          return (
            <Tooltip placement='bottom' title={color.name} key={index}>
              <button
                style={{
                  backgroundColor: color.color,
                  margin: 4,
                  width: 20,
                  height: 20,
                  border: 'none',
                  borderRadius: 4,
                  cursor: 'pointer',
                  boxShadow:
                    ' 0 2px 3px -1px rgb(0 0 0 / 20%), inset 0 0 0 1px rgb(0 0 0 / 9%)',
                }}
                onClick={() => setMyTheme(color.color)}
              />
            </Tooltip>
          )
        })}
      </div>
    </div>
  )
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
            title='????????????'
            placement='right'
            width={300}
            onClose={handSlectDesign}
            style={{ color: token.colorText }}
          >
            <Space direction='vertical'>
              <div>?????????</div>
              <Space direction='horizontal' wrap>
                {themeList.map((item, index) => {
                  return (
                    <div style={{ marginRight: 20 }} key={index}>
                      <button
                        style={{
                          background: `url(${item.url})`,
                          width: 100,
                          height: 100,
                          borderRadius: token.borderRadius,
                          border:
                            selectedTheme == index
                              ? `2px ${
                                  themecfg?.token?.colorPrimary || '#1890ff'
                                } solid`
                              : '',
                        }}
                        onClick={() => {
                          setSelectedTheme(index)
                          if (setTheme && themecfg) {
                            setTheme({
                              ...themecfg,
                              algorithm: item?.value?.algorithm,
                            })
                          }
                        }}
                      />
                      <div style={{ textAlign: 'center', marginTop: 4 }}>
                        {item.name}
                      </div>
                    </div>
                  )
                })}
              </Space>
              <Row>
                <Col span={8} style={{ lineHeight: 2 }}>
                  ???????????????
                </Col>
                <Col span={14}>
                  <Input
                    placeholder={token.colorPrimary}
                    value={myColorPrimary}
                    onChange={(
                      e: React.ChangeEvent<
                        HTMLInputElement | HTMLTextAreaElement
                      >
                    ) => {
                      const colorPrimary = e.target.value
                      setMyTheme(colorPrimary)
                    }}
                  />
                </Col>
              </Row>
              <Space direction='horizontal' wrap>
                {primaryColorList.map(
                  (color: primaryColorType, index: number) => {
                    return (
                      <Tooltip
                        placement='bottom'
                        title={color.name}
                        key={index}
                      >
                        <button
                          style={{
                            height: 30,
                            width: 30,
                            borderRadius: '50%',
                            background: color.color,
                            border: 'none',
                            cursor: 'pointer',
                          }}
                          onClick={() => setMyTheme(color.color)}
                        />
                      </Tooltip>
                    )
                  }
                )}
                <Popover
                  placement='top'
                  title='??????'
                  content={content}
                  trigger='click'
                >
                  <Tooltip placement='bottom' title='??????'>
                    <button
                      style={{
                        height: 30,
                        width: 30,
                        borderRadius: '50%',
                        cursor: 'pointer',
                        background:
                          ' conic-gradient(red, yellow, lime, aqua, blue, magenta, red)',
                        border: 'none',
                      }}
                    />
                  </Tooltip>
                </Popover>
              </Space>
            </Space>
          </Drawer>
        </>
      )}
    </>
  )
}

type MenuProps = {
  menuItems: ItemType[]
}

/**
 * ????????????
 * @param param  MenuProps ??????
 * @returns ??????ReactNode
 */
const ThisMenu: React.FC<MenuProps> = ({ menuItems }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([])
  const [openKeys, setOpenKeys] = React.useState<string[]>([])

  useEffect(() => {
    const menuKeys = location.pathname.split('/')
    setOpenKeys([])
    if (menuKeys.length > 2) {
      setOpenKeys([
        ...menuKeys.map((item) => '/' + item).slice(0, menuKeys.length - 1),
      ])
    }

    setSelectedKeys(['/' + menuKeys[menuKeys.length - 1]])
  }, [location.pathname])

  return (
    <Menu
      style={{ height: '100%' }}
      mode='inline'
      items={menuItems}
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      theme='light'
      onSelect={({ keyPath }) => {
        navigate(keyPath.reverse().join(''))
      }}
      onOpenChange={(openKeys) => {
        setOpenKeys(openKeys)
      }}
    />
  )
}

/**
 * Design???????????????????????????????????????
 * @param props Design????????????
 * @returns ??????Design??????ReactNode
 */
export const Design = (props: DesignProps) => {
  const { openDesignSetting } = props
  const [myTheme, setTheme] = React.useState<ThemeConfig>({
    algorithm: [defaultAlgorithm],
  })

  return (
    <ConfigProvider theme={myTheme}>
      <HashRouter>
        <DesignSelector
          open={openDesignSetting}
          setTheme={setTheme}
          themecfg={myTheme}
        />
        <DesignContext.Provider value={props}>
          <DesignLayout />
        </DesignContext.Provider>
      </HashRouter>
    </ConfigProvider>
  )
}

Design.displayName = 'Design'
