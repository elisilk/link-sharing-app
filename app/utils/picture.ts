export const PICTURE_MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const PICTURE_MIN_DIMENSIONS = { width: 200, height: 200 };
export const PICTURE_MAX_DIMENSIONS = { width: 6000, height: 6000 };
export const PICTURE_ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png"]; // "image/webp"
export const PICTURE_FINAL_DIMENSIONS = { width: 400, height: 400 };

export const formattedPictureAcceptedTypes = PICTURE_ACCEPTED_TYPES
  .map(type => type.replace("image/", "").toUpperCase())
  .join(", ");

export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0)
    return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Number.parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
}

export function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    // Ensure the file is an image
    if (!file.type.startsWith("image/")) {
      reject(new Error("File is not an image."));
      return;
    }

    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      const img = new Image();

      img.onload = () => {
        // Access the natural dimensions of the image
        resolve({
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
      };

      img.onerror = () => {
        reject(new Error("Could not load image."));
      };

      // The result is the data URL of the image
      if (event.target && typeof event.target.result === "string") {
        img.src = event.target.result;
      }
      else {
        reject(new Error("FileReader could not read file."));
      }
    };

    reader.onerror = () => {
      reject(new Error("FileReader error."));
    };

    // Read the image file as a Data URL (Base64 string)
    reader.readAsDataURL(file);
  });
}

export async function preProcessNewPicture(newPicture: File) {
  const { width, height } = await getImageDimensions(newPicture);

  // Resize image
  let resizedImage;
  if (width > height) {
    const resizeWidth = Math.min(PICTURE_FINAL_DIMENSIONS.width, width);
    resizedImage = await createImageBitmap(newPicture, {
      resizeWidth,
    });
  }
  else {
    const resizeHeight = Math.min(PICTURE_FINAL_DIMENSIONS.height, height);
    resizedImage = await createImageBitmap(newPicture, {
      resizeHeight,
    });
  }

  // Convert image to JPEG
  const canvas = new OffscreenCanvas(resizedImage.width, resizedImage.height);
  canvas.getContext("bitmaprenderer")?.transferFromImageBitmap(resizedImage);
  const newPictureProcessedBlob = await canvas.convertToBlob({
    type: "image/jpeg",
    quality: 0.9,
  });

  // Convert back to a File
  const newPictureProcessed = new File([newPictureProcessedBlob], `${newPicture.name}.jpg`, {
    type: "image/jpeg",
  });

  // return newPicture;
  return newPictureProcessed;
}
