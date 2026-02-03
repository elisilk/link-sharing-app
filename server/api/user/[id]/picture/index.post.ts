import { H3Error } from "h3";

const STORAGE_BASE = "uploads";

export default defineEventHandler(async (event) => {
  type UploadedFile = {
    filename: string;
    url: string;
  };

  // restrict api only to logged in users
  const { user: loggedInUser } = await requireUserSession(event);

  const routerParamId = getRouterParam(event, "id");

  if (!routerParamId) {
    throw createError({
      status: 400,
      statusText: "User ID is required",
    });
  }

  const userId: number = Number(routerParamId);

  if (loggedInUser.id !== userId) {
    throw createError({
      status: 400,
      statusText: "User/data mismatch.",
    });
  }

  // Parse multipart form data
  const formData = await readMultipartFormData(event);

  if (!formData || formData.length === 0) {
    throw createError({
      status: 400,
      statusText: "No files uploaded",
    });
  }

  // Get storage instance
  // const storage = useStorage("uploads");
  // const storage = useStorage(STORAGE_BASE);
  const storage = useStorage();
  const uploadedFiles: UploadedFile[] = [];

  try {
    // Process each file in the form data
    for (const file of formData) {
      // Validate file size (5MB limit)
      const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
      if (file.data.length > MAX_FILE_SIZE) {
        throw createError({
          status: 400,
          statusText: `File ${file.filename} exceeds maximum size of 5MB`,
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
          status: 400,
          statusText: `File type ${file.type || "unknown"
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

      await storage.setItemRaw(`${STORAGE_BASE}:${fileName}`, file.data);
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
      status: 500,
      statusText: "Error uploading files",
    });
  }
});
