import { storage } from "./firebase";
import { ref, deleteObject } from "firebase/storage";

export async function deleteImg(imageUrl) {
  try {
    if (!storage) {
      throw new Error("Firebase Storage not initialized");
    }

    const path = getPathFromUrl(imageUrl);
    if (!path) {
      throw new Error("Invalid image URL");
    }

    const imageRef = ref(storage, path);
    await deleteObject(imageRef);
    console.log('Image deleted successfully:', path);
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
}

export async function deleteBlogFolder(slug) {
  try {
    if (!storage) {
      throw new Error("Firebase Storage not initialized");
    }

    const folderRef = ref(storage, `blogs/${slug}`);
    await deleteObject(folderRef);
    console.log('Blog folder deleted successfully:', slug);
  } catch (error) {
    console.error("Error deleting blog folder:", error);
    throw error;
  }
}

function getPathFromUrl(url) {
  try {
    const baseUrl = `https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/`;
    const path = url.replace(baseUrl, '');
    return decodeURIComponent(path.split('?')[0]);
  } catch (error) {
    console.error('Error extracting path:', error);
    return null;
  }
}