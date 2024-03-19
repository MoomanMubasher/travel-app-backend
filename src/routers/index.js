const router = require("express").Router()
const multer = require("multer")
const upload = require("../middlewares/lib/upload")
const APIError = require("../utils/errors")
const Response = require("../utils/response")
const { uploadToCloudinary } = require("../utils/uploadToCloudinary")
const auth = require("./auth.routes")
const landmark = require("./landmarks.routes")

router.use(auth)
router.use(landmark)





module.exports = router