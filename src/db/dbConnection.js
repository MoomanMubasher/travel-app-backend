const mongoose = require("mongoose");
const user = require("../models/user.model");

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        
        console.log("Connected");
        user.findOne({ email: 'admin@gmail.com' }, (err, admin) => {
            if (err) {
              console.error('Error checking admin user:', err);
              return;
            }
      
            if (!admin) {
              // Create admin user
              const newAdmin = new user({
                email: 'admin@gmail.com',
                password: 'admin123', // Use secure password hashing in a real-world scenario
                role: 'admin',
              });
      
              newAdmin.save((err, savedAdmin) => {
                if (err) {
                  console.error('Error creating admin user:', err);
                  return;
                }
                console.log('Admin user created:', savedAdmin);
              });
            } else {
              console.log('Admin user already exists:');
            }
          });
    })
    .catch((err) => {
        console.log("Error In DB Connection : ", err);
    })