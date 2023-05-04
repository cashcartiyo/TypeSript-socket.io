import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { userJoin, userLeft, getUSers } from './util/users'

const app = express()

const server = http.createServer(app)
const io = new Server(server, { cors: { origin: 'http://localhost:3000' } })

io.on('connection', socket => {
  socket.join('typeScript Chat')

  socket.on('handle-connection', (userName: string) => {
    if (!userJoin(socket.id, userName)) {
      socket.emit('username-taken')
    } else {
      socket.emit('username-submitted-successfully')
      io.to('typeScript Chat').emit('get-connected-users', getUSers())
    }
  })

  socket.on('message', (message: { message: string, userName: string }) => {
    socket.broadcast.to('typeScript Chat').emit('recive-message', message)
  })
  socket.on('disconnect', () => {
    userLeft(socket.id)
  })
})

server.listen(4202, () => console.log('server started on port 4202...'))