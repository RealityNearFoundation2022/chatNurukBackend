const User = require('../models/user');
const Message = require('../models/messaje');


// const userSave = async( _iduser = '' ) => {
//     const user = await User.findOne({"_iduser": _iduser});
//     if(!user){
//         const userSave = new User();
//         userSave._iduser = _iduser;
//         await userSave.save()
//         console.log('user guardado', userSave._iduser);
//         return userSave;
//     }
//     // console.log('user ya existe', user._iduser);
//     return user;
// }

const userConnected = async( _iduser) => {
    try {
        const user = await User.findOne({"_iduser": _iduser});
        if(!user){
            const userSave = new User();
            userSave._iduser = _iduser;
            await userSave.save()
            console.log('user guardado', userSave._iduser);
            userSave.online = true;
            return userSave;
        }
        // user.online = true;
        await User.updateOne({"_iduser": _iduser}, {online: true});
        return user;
    }  catch (error) {
        console.log(error);
    }
}

// const userConnect = async( id = '') => {
//     // findOneandupdate user moongose with user mongodb
//     const user = await User.findOneAndUpdate({"_iduser": id}, {online: true} , {new: true});
//     // console.log('user connect', user._iduser);
//     return user;
// }

const userDisconnect = async( id = '') => {
    // findOneandupdate user moongose with user mongodb
    const user = await User.findOneAndUpdate({"_iduser": id}, {online: false} , {new: true});
    // console.log('user disconnect', user._iduser);
    return user;
}

// get all users in MongoDB in online status
const getUsersConected = async() => {
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
    // userSave,
    // userConnect,
    userDisconnect,
    getUsersConected, 
    saveMessage,
}
