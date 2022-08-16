const Usuario = require('../models/usuario');
const Mensaje = require('../models/mensaje');


const userConnected = async( uid ) => {
    const user = await Usuario.findById(uid);
    user.online = true;
    await user.save();
    
    return user;
}

const userDisconnect = async( uid ) => {
    const user = await Usuario.findById(uid);
    user.online = false;
    await user.save();
    
    return user;
}

// get all users in MongoDB in online status
const getUsuarios = async() => {
    const usuarios = await Usuario
        .find()
        .sort('-online');
    return usuarios;
}

const saveMessage = async( payload ) => {
    try {
        const message = new Mensaje( payload );
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
    getUsuarios, 
    saveMessage,
}
