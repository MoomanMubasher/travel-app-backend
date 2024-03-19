const Landmark = require('../models/landmark.model');
const { uploadToCloudinary } = require('../utils/uploadToCloudinary');

// Controller function to create a new landmark
const createLandmark = async (req, res) => {
  try {
    const { name, latitude, longitude, ratings, comments } = req.body;
    let pictures = [];
    if (!req.files) {
      return res.status(400).send('Pictures File Required!!!');
    }

    // Upload all pictures to Cloudinary
    const uploadPromises = req.files.map(async file => {
      const { path, filename } = file;
      const { url } = await uploadToCloudinary(path);
      return { name:filename, url };
    });

    // Wait for all picture uploads to complete
    const uploadedPictures = await Promise.all(uploadPromises);
    pictures.push(...uploadedPictures);
    const landmark = new Landmark({
      name,
      latitude,
      longitude,
      ratings:JSON.parse(ratings),
      comments:JSON.parse(comments),
      pictures
    });
    // console.log(landmark,'landmark')
    const savedLandmark = await landmark.save();
    res.status(201).json(savedLandmark);
  } catch (error) {
    console.error('Error creating landmark:', error);
    res.status(500).json({ error: 'Error creating landmark' });
  }
};


// Controller function to retrieve all landmarks
const getAllLandmarks = async (req, res) => {
  try {
    const landmarks = await Landmark.find();
    res.json(landmarks);
  } catch (error) {
    console.error('Error retrieving landmarks:', error);
    res.status(500).json({ error: 'Error retrieving landmarks' });
  }
};

// Controller function to retrieve a single landmark by ID
const getLandmarkById = async (req, res) => {
  try {
    const landmark = await Landmark.findById(req.params.id);
    if (!landmark) {
      return res.status(404).json({ error: 'Landmark not found' });
    }
    res.json(landmark);
  } catch (error) {
    console.error('Error retrieving landmark by ID:', error);
    res.status(500).json({ error: 'Error retrieving landmark by ID' });
  }
};

// Controller function to update a landmark by ID
const updateLandmarkById = async (req, res) => {
  try {
    const updatedLandmark = await Landmark.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedLandmark) {
      return res.status(404).json({ error: 'Landmark not found' });
    }
    res.json(updatedLandmark);
  } catch (error) {
    console.error('Error updating landmark by ID:', error);
    res.status(500).json({ error: 'Error updating landmark by ID' });
  }
};

// Controller function to delete a landmark by ID
const deleteLandmarkById = async (req, res) => {
  try {
    const deletedLandmark = await Landmark.findByIdAndDelete(req.params.id);
    if (!deletedLandmark) {
      return res.status(404).json({ error: 'Landmark not found' });
    }
    res.json(deletedLandmark);
  } catch (error) {
    console.error('Error deleting landmark by ID:', error);
    res.status(500).json({ error: 'Error deleting landmark by ID' });
  }
};


// Controller function to get landmarks based on latitude and longitude
const getLandmarksByLocation = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    // Convert latitude and longitude to numbers
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    // Query landmarks with matching latitude and longitude
    const landmarks = await Landmark.find({ latitude: lat, longitude: lng });
    res.status(201).json(landmarks);
  } catch (error) {
    console.error('Error retrieving landmarks by location:', error);
    res.status(500).json({ error: 'Error retrieving landmarks by location' });
  }
};

const addCommentToLandmark = async (req, res) => {
  try {
    const { id } = req.params; // Landmark ID
    const { user, comment } = req.body; // User ID and comment data

    // Find the landmark by ID and update its comments array
    const landmark = await Landmark.findByIdAndUpdate(id, {
      $push: { comments: { user, comment } }
    }, { new: true });

    res.status(201).json(landmark);
  } catch (error) {
    console.error('Error adding comment to landmark:', error);
    res.status(500).json({ error: 'Error adding comment to landmark' });
  }
};


// Controller function to add a rating to a specific landmark
const addRatingToLandmark = async (req, res) => {
  try {
    const { id } = req.params; // Landmark ID
    const { user, rating } = req.body; // User ID and rating value

    // Find the landmark by ID
    let landmark = await Landmark.findById(id);

    // Add the new rating to the landmark's ratings array
    landmark.ratings.push({ user, rating });

    // Calculate the average rating
    const totalRatings = landmark.ratings.length;
    const totalRatingSum = landmark.ratings.reduce((sum, rating) => sum + rating.rating, 0);
    const averageRating = totalRatingSum / totalRatings;

    // Update the landmark's average rating
    landmark.averageRating = averageRating;

    // Save the updated landmark
    landmark = await landmark.save();

    res.status(201).json(landmark);
  } catch (error) {
    console.error('Error adding rating to landmark:', error);
    res.status(500).json({ error: 'Error adding rating to landmark' });
  }
};

const updateLandmarkComments = async (req, res) => {
  try {
    const { id } = req.params; // Landmark ID
    const { commentId, comment } = req.body; // Comment ID and updated comment text

    // Find the landmark by ID
    let landmark = await Landmark.findById(id);

    // Find the index of the comment to update
    const commentIndex = landmark.comments.findIndex(c => c._id.toString() === commentId);

    // Update the comment if found
    if (commentIndex !== -1) {
      landmark.comments[commentIndex].comment = comment;
      // Save the updated landmark
      landmark = await landmark.save();
      res.json(landmark);
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }
  } catch (error) {
    console.error('Error updating landmark comments:', error);
    res.status(500).json({ error: 'Error updating landmark comments' });
  }
};

const deleteLandmarkComment = async (req, res) => {
  try {
    const { id, commentId } = req.params; // Landmark ID and Comment ID

    // Find the landmark by ID
    let landmark = await Landmark.findById(id);

    // Find the index of the comment to delete
    const commentIndex = landmark.comments.findIndex(c => c._id.toString() === commentId);

    // Delete the comment if found
    if (commentIndex !== -1) {
      landmark.comments.splice(commentIndex, 1);
      // Save the updated landmark
      landmark = await landmark.save();
      res.json(landmark);
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }
  } catch (error) {
    console.error('Error deleting landmark comment:', error);
    res.status(500).json({ error: 'Error deleting landmark comment' });
  }
};

// Controller function to update a landmark's rating
const updateLandmarkRating = async (req, res) => {
  try {
    const { id } = req.params; // Landmark ID
    const { ratingId, rating } = req.body; // Rating ID and updated rating value

    // Find the landmark by ID
    let landmark = await Landmark.findById(id);

    // Find the index of the rating to update
    const ratingIndex = landmark.ratings.findIndex(r => r._id.toString() === ratingId);

    // Update the rating if found
    if (ratingIndex !== -1) {
      landmark.ratings[ratingIndex].rating = rating;
      // Calculate average rating (optional)
      const avgRating = calculateAverageRating(landmark.ratings);
      landmark.averageRating = avgRating;
      // Save the updated landmark
      landmark = await landmark.save();
      res.json(landmark);
    } else {
      res.status(404).json({ error: 'Rating not found' });
    }
  } catch (error) {
    console.error('Error updating landmark rating:', error);
    res.status(500).json({ error: 'Error updating landmark rating' });
  }
};

// Function to calculate average rating
const calculateAverageRating = (ratings) => {
  const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
  return totalRating / ratings.length;
};





module.exports = {
createLandmark,
getAllLandmarks,
getLandmarkById,
updateLandmarkById,
deleteLandmarkById,
getLandmarksByLocation,
addCommentToLandmark,
addRatingToLandmark,
updateLandmarkComments,
deleteLandmarkComment,
updateLandmarkRating
  };