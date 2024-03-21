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
const { verifyToken } = require("../middlewares/tokenVerfiy");


router.get("/landmarks",verifyToken,getAllLandmarks);

router.get("/specific-landmarks",verifyToken,getLandmarksByLocation);

router.post('/landmarks/:id/comments',verifyToken,addCommentToLandmark);

router.put('/landmarks/:id/comments/:commentId',verifyToken,updateLandmarkComments);

router.put('/landmarks/:id/ratings/:ratingId',verifyToken, updateLandmarkRating);

router.delete('/landmarks/:id/comments/:commentId',verifyToken, deleteLandmarkComment);

router.post('/landmarks/:id/ratings',verifyToken,addRatingToLandmark);

router.post("/landmarks",uploadMiddleware,verifyToken,createLandmark);

router.get("/landmarks/:id",verifyToken,getLandmarkById);

router.put('/landmarks/:id',verifyToken, updateLandmarkById);

router.delete('/landmarks/:id',verifyToken, deleteLandmarkById);



module.exports = router;
