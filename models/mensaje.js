const MensajeSchema = Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario', 
    required: true,
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario', 
    required: true,
  },
  message: {
    type: String,
    required: true,
  },  
},
{
  timestamps: true,
});

MensajeSchema.method('toJSON', function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = mode('Mensaje', MensajeSchema);