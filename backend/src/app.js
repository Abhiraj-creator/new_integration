/*
app.js creates the server and configure it


*/
const express = require('express')

const app = express();
const NoteModel = require('./model/note.model');
const cors=require('cors')
const path=require('path');
app.use(express.json());
app.use(express.static('./public'));

app.use(cors());

/*
POST api to create an resource at server
api:-/api/notes
*/

app.post('/api/notes', async (req, res) => {
    const { title, description } = req.body

    const Note = await NoteModel.create({
        title, description
    })
    res.status(201).json({
        "message": "note created successfully",
        Note

    })
})

/*
GET api to fetch all resources from server
api:-/api/notes
*/
app.get('/api/notes',async(req,res)=>{
    const Notes=await NoteModel.find()
    res.status(200).json({
        "message":"Note Fetched Successfully",
        Notes
    })
})

/*
DELETE api to delete an resource from server
api:-/api/notes/:id
*/
app.delete('/api/notes/:id',async(req,res)=>{
    const id=req.params.id;
    await NoteModel.findByIdAndDelete(id)
    //  })
     res.status(200).json({
        "message":"Note Deleted successfully",
     })
})

/*
PATCH api to update an resource
api:- /api/notes/:id
*/
app.patch('/api/notes/:id',async(req,res)=>{
    const id=req.params.id
    const {description}=req.body;
    console.log(description);
    await NoteModel.findByIdAndUpdate(id,{description});
    res.status(200).json({
        "message":"note updated successfully"
    })
})
app.use("*name",(req,res)=>{
    res.sendFile(path.join(__dirname,'..','/public/index.html'));
})
module.exports = app