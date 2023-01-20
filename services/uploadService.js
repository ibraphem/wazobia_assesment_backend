import { v2 as cloudinary } from "cloudinary";

export const uploads = async(payload, res) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
    
      try {
        await cloudinary.uploader.upload(
            payload.image,
          {
            folder: payload.folderName,
            // width: payload.width,
            crop: "scale",
          },
    
          function (error, result) {
            res.send({ status: true, message: "Upload Successful", data: result });
          }
        );
      } catch (error) {
        res.send({ status: false, message: "Upload Failed", data: error });
      }
}


