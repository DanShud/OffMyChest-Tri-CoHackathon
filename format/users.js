const users = [];

function userJoin( id ,username, room) {
    const user = {id, username, room }
    console.log(id)
    users.push(user)
    return user
}


module.exports = userJoin;