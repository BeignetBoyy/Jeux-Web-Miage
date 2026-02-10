// src/routes/mongoRoutes.js

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/all', async (req, res) => {
  try {
    const users = await Emargement.find().sort({ date: -1 });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' }); 
  }
});

router.get('/all/year/:date', async (req, res) => {
  try {
    const inputDate = req.params.date;

    // Subtract 1 year from the given date
    const splitDate = inputDate.split("-");
    splitDate[0] = Number(splitDate[0]) - 1
    const newDate = splitDate.join("-")

    console.log(newDate)

    // Assuming your documents have a 'createdAt' or similar date field
    const users = await Emargement.find({
      date: { $gte: newDate, $lte : inputDate}
    }).sort({ date: -1 });

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' }); 
  }
});

router.get('/open/:date', async (req, res) => {

  const date = req.params.date

  try {
    const users = await Emargement.find({date: { $eq: date }, heureDepart: { $eq: null}}).sort({ heureArrivee: 1 });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' }); 
  }
});

router.get('/id/:id', async (req, res) => {

  const id = req.params.id

  try {
    const users = await Emargement.findById(id);
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' }); 
  }
});


router.post('/insert', async (req, res) => {
  try {

    console.log(req.body);

    const newEmargement = await Emargement.create(req.body);
    
    res.json({ message: "Nouvel emargement inséré avec succés"});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Internal Server Error : ${err}` }); 
  }
})

router.patch('/update/:id', async (req, res) => {
  const { id } = req.params;

  // Optional: validate ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid document ID' });
  }

  try {
    const updatedDoc = await Emargement.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,            // Return the updated document
        runValidators: true,  // Run schema validations
      }
    );

    if (!updatedDoc) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.json({ message: '✅ Updated successfully', data: updatedDoc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `❌ Update failed : ${err.message}` });
  }
});

router.delete('/delete/date/:date', async (req, res) => {
  try {

    const inputDate = req.params.date

    // Subtract 1 year from the given date
    const splitDate = inputDate.split("-");
    splitDate[0] = Number(splitDate[0]) - 1
    const newDate = splitDate.join("-")


    const result = await Emargement.deleteMany({ date : { $lt: newDate }});

    if (!result) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.json({ message: '✅ Document deleted successfully', deleted: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '❌ Failed to delete document' });
  }
});

module.exports = router;