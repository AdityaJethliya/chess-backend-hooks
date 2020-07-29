const users = []

const addUser = ({ id, gameId, name }) => {
    name = name.trim().toLowerCase();

    const user = { id, gameId, name }

    users.push(user)

    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)
    if (index !== -1) {
        //should we update users here?
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => users.find((user) => user.id === id)

// const getUsersInRoom = (room) => users.filter((user) => user.room === room)

module.exports = { addUser, removeUser, getUser }