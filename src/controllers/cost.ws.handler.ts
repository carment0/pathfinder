export const CostWebSocketHandler = (ws, req) => {
  ws.on('message', (msg) => {
    console.log(msg)
    ws.send("hi there")
  })
};