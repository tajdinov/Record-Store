const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://tajdinov:Taj3112143@cluster0.myt9aui.mongodb.net/record-store?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
});

module.exports = mongoose.connection;
