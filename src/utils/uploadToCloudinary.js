const v2 = require('cloudinary');
const cloudinary = v2

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET
  });
  
 async function uploadToCloudinary(filePath){
      try {
           if(!filePath) return null
           const response = await cloudinary.uploader.upload(filePath,{ resource_type: "auto" });
           console.log("File Successfully Uploaded");
           return response;
      } catch (error) {
          fs.unlinkSync(filePath)
          return null;
      }
     
}


module.exports = {
    uploadToCloudinary,
}