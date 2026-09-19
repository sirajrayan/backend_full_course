const express = require('express');
const noteModel = require('./models/note.model');
const userModel = require('./models/user.model')
const multer = require('multer');
const ImageKit = require('@imagekit/nodejs');
const app = express();

app.use(express.json());
const upload = multer({
    storage : multer.memoryStorage()
});


app.post('/notes', async (req, res)=> {

    const data = req.body;
    await noteModel.create({
        title : data.title,
        description : data.description
    })
    res.status(201).json({
        message :'Note created successfully'
    })
})

app.get('/notes', async (req, res)=> {
    const notes= await noteModel.find();
    res.status(200).json({
        message : 'Notes fetched successfully',
        notes : notes
    })
})

app.delete('/notes/:id', async(req, res)=> {
    const id = req.params.id;
    await noteModel.findOneAndDelete({
        _id : id 
    })
    res.status(200).json({
        message : "Note deleted successfully"
    })
})

app.patch('/notes/:id', async(req, res)=> {
    const id = req.params.id;
    const description = req.body.description;
    await noteModel.findOneAndUpdate({
        _id : id 
    },{
        description : description
    })
    res.status(200).json({
        message : "Note updated successfully"
    })
})

async function uploadImageToImageKit(buffer){
   const  imageKit = new ImageKit({
    privateKey : 'private_dpsff6ZHQA5GNXoswla3ECihdM8=',
   })
   const result = await imageKit.files.upload({
    file : buffer.toString('base64'),
    fileName : 'iamge.jpg',
   })
   return result.url;
}

/* user apis */
app.post('/users',upload.single('image'), async (req, res)=> {
    console.log(req.body);
    console.log(req.file);

    const name  = req.body.name;
    const imageBuffer  = req.file.buffer; 

    try{
        const imageurl = await uploadImageToImageKit(imageBuffer);
    await userModel.create({
        name : name,
        image : imageurl,
        
    })
    }catch(err){
        console.log(err);
    }
    console.log(res.body);
  res.status(201).json({
    meassage : "user created successfully",
  })




})



module.exports = app ;