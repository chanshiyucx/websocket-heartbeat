# websockethb

[![Author](https://img.shields.io/badge/author-chanshiyucx-blue.svg?style=flat-square)](https://chanshiyu.com) [![QQ](https://img.shields.io/badge/QQ-1124590931-blue.svg?style=flat-square)](http://wpa.qq.com/msgrd?v=3&uin=&site=qq&menu=yes) [![Email](https://img.shields.io/badge/Emali%20me-me@chanshiyu.com-green.svg?style=flat-square)](me@chanshiyu.com)

## 食用方式

## 安装

```bash
npm install websockethb
```

## 引入与使用

```javascript
import WebsocketHB from 'websockethb'

const ws = new WebsocketHB({
  url: 'ws://xxx'
})

ws.onopen = () => {
  console.log('connect success')
}
ws.onmessage = e => {
  console.log(`onmessage: ${e.data}`)
}
ws.onerror = () => {
  console.log('connect onerror')
}
ws.onclose = () => {
  console.log('connect onclose')
}
```

## API

### 属性

| 属性             | 必填  | 类型   | 默认值      | 描述                                  |
| ---------------- | ----- | ------ | ----------- | ------------------------------------- |
| url              | true  | string | none        | websocket 服务端接口地址              |
| pingTimeout      | false | number | 8000        | 心跳包发送间隔                        |
| pongTimeout      | false | number | 15000       | 15 秒内没收到后端消息便会认为连接断开 |
| reconnectTimeout | false | number | 4000        | 尝试重连的间隔时间                    |
| reconnectLimit   | false | number | 15          | 重连尝试次数                          |
| pingMsg          | false | string | "heartbeat" | 心跳包消息                            |

```javascript
const opts = {
  url: 'ws://xxx',
  pingTimeout: 8000, // 发送心跳包间隔，默认 8000 毫秒
  pongTimeout: 15000, // 最长未接收消息的间隔，默认 15000 毫秒
  reconnectTimeout: 4000, // 每次重连间隔
  reconnectLimit: 15, // 最大重连次数
  pingMsg: 'heartbeat' // 心跳包的消息内容
}
const ws = new WebsocketHB(opts)
```

### 方法

#### 发送消息

```javascript
ws.send('Hello World')
```

#### 断开连接

```javascript
ws.destroyed()
```

#### 获取实例

获取创建的 websocket 实例，一般情况下不推荐使用该方法。

```javascript
ws.getWSInstance()
```
