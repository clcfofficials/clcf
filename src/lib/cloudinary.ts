
import { v2 as cloudinary } from "cloudinary";

// if (!process.env.CLOUDINARY_CLOUD_NAME) {
//     throw new Error('CLOUDINARY_CLOUD_NAME is not set');
// }
// if (!process.env.CLOUDINARY_API_KEY) {
//     throw new Error('CLOUDINARY_API_KEY is not set');
// }
// if (!process.env.CLOUDINARY_API_SECRET) {
//     throw new Error('CLOUDINARY_API_SECRET is not set');
// }


cloudinary.config({
  cloud_name: "dtkqa91mj",
  api_key: "854212421361812",
  api_secret: "raV9CI-XsbMMkBQ_zcSfl9g0fnw",
});

export default cloudinary;
