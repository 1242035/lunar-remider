var mongoose = require('mongoose'), Schema = mongoose.Schema;

var EventSchema = new mongoose.Schema({
    name: String,
    desc: String,
    notification_date:{ type: Date, default: Date.now },
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Events', EventSchema);
