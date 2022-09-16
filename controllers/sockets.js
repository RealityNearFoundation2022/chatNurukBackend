const User = require('../models/user');
const Message = require('../models/messaje');


const userConnected = async( id ) => {
    const user = await User.findById(id);
    if (!user) {
        console.log('User does not exist in DB');
        user.online = true;
        await user.save();
        return user;
    }
}

const userDisconnect = async( id ) => {
    const user = await User.findById(id);
    user.online = false;
    await user.save();
    return user;
}

// get all users in MongoDB in online status
const getUsers = async() => {
    const users = await User
        .find()
        .sort('-online');
    return users;
}

const saveMessage = async( payload ) => {
    try {
        const message = new Message( payload );
        await message.save();
        return message;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    userConnected,
    userDisconnect,
    getUsers, 
    saveMessage,
}
