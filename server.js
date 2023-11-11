const express = require('express')
const app = express()
const http = require('http').createServer(app)
const path = require('path')
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})


http.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})


// sockets
// sending server to the socket.io so that if there are any changes in server it'll let us know
const io = require('socket.io')(http)

const users = {}

io.on('connection', (socket) => {
    console.log('user connected')

    socket.on('new-user-joined', (Name) => {
        users[socket.id] = Name
        socket.broadcast.emit('user-joined', Name)
    })

    // sending message to client if any
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', {message: msg, Name: users[socket.id]})
    })

    socket.on('disconnect', (Name) => {
        socket.broadcast.emit('user-left', users[socket.id])
        delete users[socket.id]
    })
})