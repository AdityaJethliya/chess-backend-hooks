const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const cors = require('cors')

// const { joinGame, updatePosition } = require('./games.js')

const PORT = process.env.PORT || 5000;

const router = require('./router')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(router)
app.use(cors)

io.on('connection', (socket) => {
    socket.on('join', ({ id }, callback) => {
        // const { error, user } = addUser({ id: socket.id, name, room })
        // if (error) {
        //     return callback(error)
        // }

        // socket.emit('message', { user: 'admin', text: `${user.name}, Welcome to the room ${user.room}` })
        // socket.broadcast.to(id).emit('', { user: 'admin', text: `${user.name}, has joined.` })

        socket.join(id.toString())
        // console.log(id, player, position)
        callback()
    })

    socket.on('move', (move) => {
        io.to(move.gameId.toString()).emit('position', { position: move.position })
    })

    socket.on('startgame', (id) => {
        io.to(id.gameId.toString()).emit('startgame')
    })

    socket.on('disconnect', () => {
        console.log('user has left')
    })
})




server.listen(PORT, () => console.log(`server has started on port ${PORT}`))