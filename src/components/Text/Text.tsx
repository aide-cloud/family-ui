import React, { FC } from 'react'
type TextProps = {
  name: string
}

export const Text: FC<TextProps> = (props) => {
  return <div>{props.name}+xxxx</div>
}

// 重要: 模板使用的 标签名 <Text name={'xhh'} />
Text.displayName = 'Text'
