export default class WebsocketHB {
  constructor({
    url,
    pingTimeout = 8000, // 发送心跳包间隔，默认 8000 毫秒
    reconnectLimit = 10, // 最大重连次数
    pingMsg, // 心跳包的消息内容
  }) {
    // 初始化配置
    this.url = url;
    this.pingTimeout = pingTimeout;
    this.reconnectLimit = reconnectLimit;
    this.pingMsg = pingMsg;

    // 实例变量
    this.ws = null;
    this.pingTimer = null; // 心跳包定时器
    this.reconnectCount = 0; // 当前的重连次数
    this.forbidReconnect = false; // 禁止重连

    this.createWebSocket();
  }

  // 创建 WS
  createWebSocket() {
    try {
      this.ws = new WebSocket(this.url);
      this.ws.onclose = () => {
        this.onclose();
        this.reconnect();
      };
      this.ws.onerror = () => {
        this.onerror();
      };
      this.ws.onopen = () => {
        this.onopen();
        this.resetStatus();
      };
      this.ws.onmessage = (event) => {
        this.onmessage(event);
      };
    } catch (error) {
      console.error("websocket 连接失败!", error);
      throw error;
    }
  }

  // 连接成功
  resetStatus() {
    this.clearAllTimer();
    this.heartBeat();
    this.reconnectCount = 0;
  }

  // 重连
  reconnect() {
    this.clearAllTimer();
    if (this.forbidReconnect) return;
    if (this.reconnectCount > this.reconnectLimit) return;
    this.reconnectCount += 1;
    this.createWebSocket();
  }

  // 发送心跳包
  heartBeat() {
    this.pingTimer = setTimeout(() => {
      this.send(this.pingMsg);
      this.heartBeat();
    }, this.pingTimeout);
  }

  // 发送消息
  send(msg) {
    this.ws.send(msg);
  }

  // 清空所有定时器
  clearAllTimer() {
    clearTimeout(this.pingTimer);
    this.pingTimer = null;
  }

  // 销毁 ws
  destroyed() {
    this.forbidReconnect = true;
    this.clearAllTimer();
    this.ws && this.ws.close();
    this.ws = null;
  }
}
