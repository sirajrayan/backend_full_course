const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true, 'please provide a title for the note']
    },
    description : {
        type : String,
        required : [true, 'please provide a description for the note']
    }
})

const noteModel = mongoose.model('Note', noteSchema);
module.exports = noteModel;