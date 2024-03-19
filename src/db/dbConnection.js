const mongoose = require("mongoose")

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connected");
    })
    .catch((err) => {
        console.log("Error In DB Connection : ", err);
    })