const User = require('../models/user');
const Message = require('../models/messaje');

const userConnected = async( uid ) => {
    const user = await User.findById(uid);
    user.online = true;
    await user.save();
    return user;
}

const userDisconnect = async( uid ) => {
    const user = await User.findById(uid);
    user.online = false;
    await user.save();
    return user;
}

// get all users in MongoDB in online status
const getUsers = async() => {
<<<<<<< HEAD
    const usuarios = await Usuario
=======
    const users = await User
>>>>>>> fdf7e09d94b820d96906e72e49353a8bcf26b1ea
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
