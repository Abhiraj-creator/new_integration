const mongoose=require('mongoose');

const NoteSchema=mongoose.Schema({
    title:String,
    description:String
});

const NoteModel=mongoose.model("Notes_integration",NoteSchema);

module.exports=NoteModel;