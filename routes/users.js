const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
// const product = require("../data");
const mongoose = require("mongoose");
const Notes = require("../models/Notes")

dotenv.config();


//get all notes
router.get("/notes", async (req, res) => {
  try {
    // finding all notes including all the users.
    const allnotes = await Notes.find();
    res.json({allnotes});
  } catch (err) {
    res.status(500).json(err);
  }
});


//get notes for a particular user
router.get("/notes/:id", authenticateToken, async (req, res) => {
  const userId=req.params.id;
  try {
    // finding notes of a particular user by the userif from the userdb using _id
    const user = await User.findById(userId).populate("notes")
    res.json({notes:user.notes});
  } catch (err) {
    res.status(500).json(err);
  }
});

// add note for a particular user
router.post("/notes", authenticateToken, async (req, res) => {
    const urlnote = req.body.note;
    const urluser = req.body.user;
    const user = await User.findById(urluser);
    const notess= new Notes({
       note:urlnote,
       user:urluser,
    });
    //start the session
  try{
    const session = await mongoose.startSession();
    session.startTransaction();
    await notess.save({session});
    user.notes.push(notess);
    await user.save({session})
    await session.commitTransaction();
    return res.json(notess);
    // ending of the session
  }catch(err){
      console.log(err);
      return res.status(500).json({message:err});
  }
});

// update note for a particular user
router.put("/notes/:id", authenticateToken, async (req, res) => {
  const newnote=req.body.note;
  const noteid=req.params.id;
  let usernote;
  try {
    // find the respective note by id and then update it using mongodb operations
    usernote = await Notes.findByIdAndUpdate(noteid,{
         note:newnote,
    })
     res.json("Updated Sucessfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete from notes
router.delete("/notes/:id", authenticateToken, async (req, res) => {
  const noteid=req.params.id;
  try {
    // find the Note which the respective id and remote it from the Note database
    const usernote = await Notes.findByIdAndRemove(noteid).populate('user');
    // also we need to delete it from the user database as well
    await usernote.user.notes.pull(usernote);
    // we have to save the note to the user database as well
    await usernote.user.save();
    res.json("deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

// searching for a note
router.get("/search", async (req, res) => {
  const search=req.body.search;
  try {
    // find the similar notes data which matches
    const note_data = await Notes.find({"note":{  $regex: ".*"+search+".*"} });
    // if the similar notes are not present just return notes not found
    if(note_data.length>0){
      res.json({note_data});
    }
    else{
      res.json("Not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// share a note with another user for the authenticated user.
router.post('/api/notes/:id/share',authenticateToken, async (req, res) => {
  try {
    const noteId = req.params.id;
    const { sharedUserId } = req.body;

    if (!sharedUserId) {
      return res.status(400).json({ error: 'sharedUserId is required in the request body' });
    }

    // Check if the note exists
    const note = await Notes.findById(noteId);

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Assuming you have a user authentication system in place
    // and each note is associated with a userId
    if (note.user !== req.user) {
      return res.status(403).json({ error: 'You are not authorized to share this note' });
    }

    // Perform the sharing action, update the note with the shared user
    note.sharedUserId = sharedUserId;
    await note.save();

    res.json({ message: 'Note shared successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = router;
