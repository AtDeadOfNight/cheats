import fastify from 'fastify'

const app = fastify()

let wsConnection: null | import('@fastify/websocket').SocketStream = null

app.register(async function (fastify) {
  fastify.get('/', { websocket: true }, (connection, req) => {
    wsConnection = connection
  })
})

app.setErrorHandler((error, request, reply) => {
  console.error(error)
})

app.listen({ host: '0.0.0.0', port: 6616 }, err => {
  if (err) {
    console.error(1)
  }
})