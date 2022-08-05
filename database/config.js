const mongoose = require('mongoose');

const dbConnection = async () => {
  try{
    await mongoose.connect(process.env.DB_CNN_STRING, {
    // useNewUrlParser: true,
    // userUnifiedTopology:true,
    // useCreateIndex: true,
  });
    console.log('Connected to Mongose')
  } catch(error){
    console.log(error);
    throw new Error('Couldn\'t connect to MongoDB');
  }
}

module.exports = {
  dbConnection
}