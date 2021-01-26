import { config } from "dotenv";
config();

export const port = Number(process.env.PORT);
export const mongo_url = process.env.MONGO_URL as string;
export const secret = process.env.SECRET as string;
export const secret_refresh = process.env.SECRET_REFRESH as string;
export const google_id = process.env.GOOGLE_ID as string;
export const google_secret = process.env.GOOGLE_SECRET as string;
export const facebook_id = process.env.FACEBOOK_ID as string;
export const facebook_secret = process.env.FACEBOOK_SECRET as string;
export const github_id = process.env.GITHUB_ID as string;
export const github_secret = process.env.GITHUB_SECRET as string;
export const cloudinary_name = process.env.CLOUDINARY_NAME as string;
export const cloudinary_api_key = process.env.CLOUDINARY_API_KEY as string;
export const cloudinary_api_secret = process.env.CLOUDINARY_API_SECRET as string;
