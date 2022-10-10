const Message = require('../models/messaje');
const User      = require('../models/user');

const getChat =  async (req, res) => {
  // const userUid = await User
  //       .find({_iduser: req.uid })
        
  // const myId = userUid[0]._id;
  // const messagesTo = req.params.to;
  const myId = req.uid;
  const messagesTo = req.params.to;
  
  const last50 = await Message.find({
    $or: [
      { from: myId, to: messagesTo},
      { from: messagesTo, to: myId}
    ]
  })
  .sort({ createdAt: 'desc'})
  .limit(50);

  res.json({
    ok:true,
    // myId,
    // messagesTo,
    messages: last50
  });

}

module.exports = { getChat }