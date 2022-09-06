const User = require('../models/user');
const Message = require('../models/messaje');


const userConnected = async( id ) => {
    const user = await User.findById(id);
    const userExist = await User.findOne(user._iduser);
    if(!userExist){
        console.log('user not exist');
        const userSave = new User(user._iduser);
        await userSave.save()
    }
    user.online = true;
    await user.save();
    return user;
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
