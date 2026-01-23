import { H3Error } from "h3";

export default defineEventHandler(async (event) => {
  type UploadedFile = {
    filename: string;
    url: string;
  };

  const routerParamId = getRouterParam(event, "id");

  if (!routerParamId) {
    throw createError({
      statusCode: 400,
      statusMessage: "User ID is required",
    });
  }

  const userId: number = Number(routerParamId);

  // Parse multipart form data
  const formData = await readMultipartFormData(event);

  if (!formData || formData.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "No files uploaded",
    });
  }

  // Get storage instance
  const storage = useStorage("uploads");
  const uploadedFiles: UploadedFile[] = [];

  try {
    // Process each file in the form data
    for (const file of formData) {
      // Validate file size (5MB limit)
      const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
      if (file.data.length > MAX_FILE_SIZE) {
        throw createError({
          statusCode: 400,
          statusMessage: `File ${file.filename} exceeds maximum size of 5MB`,
        });
      }

      // Validate file type
      const allowedTypes = [
        "image/jpg",
        "image/jpeg",
        "image/png",
      ];

      if (!file.type || !allowedTypes.includes(file.type)) {
        throw createError({
          statusCode: 400,
          statusMessage: `File type ${file.type || "unknown"
          } not allowed. Allowed types: ${allowedTypes.join(", ")}`,
        });
      }

      if (!file || !file.filename) {
        console.warn("Skipping invalid file entry");
        continue;
      }

      // Store file using useStorage
      const fileName = `user-${userId}-${crypto.randomUUID()}.jpg`;
      // const fileName = `user-${userId}-${Date.now()}.jpg`;

      await storage.setItemRaw(`${fileName}`, file.data);
      uploadedFiles.push({
        filename: fileName,
        url: `/uploads/${fileName}`,
      });
    }

    return {
      files: uploadedFiles,
    };
  }
  catch (error) {
    console.error("(server) error");
    if (error instanceof H3Error) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Error uploading files",
    });
  }
});
