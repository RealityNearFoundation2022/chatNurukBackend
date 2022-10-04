const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  _iduser: {
    type: String || Number,
    required: true,
    unique: true,
  },
  online: {
    type: Boolean,
    default: false,
  },
});

UserSchema.method('toJSON', function () {
  const { __v, _id,  ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model('User', UserSchema);