const router = require("express").Router();
const {
  login,
  register,
  adminLogin,
  me,
  forgetPassword,
  resetCodeCheck,
  resetPassword
} = require("../controllers/auth.controller");

// router.post("/login", authValidation.login, login);
router.post("/login",login);

router.post("/admin-login",adminLogin);

router.post("/register", register);

// router.get("/me", me);

// router.post("/forget-password", forgetPassword);

// router.post("/reset-code-check", resetCodeCheck);

// router.post("/reset-password", resetPassword)

module.exports = router;
