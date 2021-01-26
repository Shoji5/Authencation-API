import { Request } from "express";
import multer, { FileFilterCallback } from "multer";

const fileFilter = (req: any, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowedTypes = ["image/jpg", "image/jpeg", "image/png"];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(null, false);
  }
  cb(null, true);
};

const upload = multer({ dest: "src/images/", fileFilter });
export default upload;
