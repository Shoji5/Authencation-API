import { cloudinary_api_key, cloudinary_api_secret, cloudinary_name } from "./../config/index.config";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: cloudinary_name,
  api_key: cloudinary_api_key,
  api_secret: cloudinary_api_secret,
});

export function uploadImage(path: string) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(path, { folder: "Auth" }, function (error, result) {
      resolve(result?.url);
    });
  });
}
