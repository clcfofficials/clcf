
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const file = data.get("file") as File | null;

    if (!file) {
        return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    // We need to wrap this in a Promise because Cloudinary's Node.js SDK uses callbacks
    const result: any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "clcf-products" }, 
        (error, result) => {
            if (error) {
                console.error("Cloudinary Error:", error);
                reject(error);
            } else {
                resolve(result);
            }
        }
      );
      uploadStream.end(buffer);
    });

    // Return the secure URL
    return NextResponse.json({ url: result.secure_url });
  } catch (err: any) {
    console.error("Upload API Error:", err);
    return NextResponse.json({ error: err.message || "An unknown error occurred" }, { status: 500 });
  }
}
