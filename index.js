const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const cors = require('cors')

// const { joinGame, updatePosition } = require('./games.js')

const PORT = process.env.PORT || 5000;

const router = require('./router')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(router)
app.use(cors)

io.on('connection', (socket) => {
    socket.on('join', ({ id, name }, callback) => {
        const { error, user } = addUser({ id: socket.id, gameId: id, name })
        if (error) {
            return callback(error)
        }

        // socket.broadcast.to(id.toString()).emit('message', { user: 'admin', text: `${user.name}, has joined.` })

        socket.join(id.toString())
        // console.log(id, player, position)
        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        socket.broadcast.to(user.gameId.toString()).emit('message', { user: user.name, text: message })
        callback()
    })

    socket.on('move', (move) => {
        io.to(move.gameId.toString()).emit('position', { move: move.move })
    })

    socket.on('startgame', (id) => {
        io.to(id.gameId.toString()).emit('startgame')
    })

    socket.on('disconnect', () => {
        console.log('user has left')
    })
})




server.listen(PORT, () => console.log(`server has started on port ${PORT}`))