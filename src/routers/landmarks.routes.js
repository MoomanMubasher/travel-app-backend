const router = require("express").Router();
const {
    createLandmark,
    getAllLandmarks,
    getLandmarkById,
    deleteLandmarkById,
    updateLandmarkById,
    getLandmarksByLocation,
    addCommentToLandmark,
    addRatingToLandmark,
    updateLandmarkComments,
    deleteLandmarkComment,
    updateLandmarkRating
} = require("../controllers/landmark.controller");
const uploadMiddleware = require("../middlewares/lib/upload");

router.get("/landmarks",getAllLandmarks);

router.get("/specific-landmarks",getLandmarksByLocation);

router.post('/landmarks/:id/comments', addCommentToLandmark);

router.put('/landmarks/:id/comments/:commentId', updateLandmarkComments);

router.put('/landmarks/:id/ratings/:ratingId', updateLandmarkRating);

router.delete('/landmarks/:id/comments/:commentId', deleteLandmarkComment);

router.post('/landmarks/:id/ratings', addRatingToLandmark);

router.post("/landmarks",uploadMiddleware,createLandmark);

router.get("/landmarks/:id", getLandmarkById);

router.put('/landmarks/:id', updateLandmarkById);

router.delete('/landmarks/:id', deleteLandmarkById);



module.exports = router;
