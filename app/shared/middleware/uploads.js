const multer = require("multer");
const fs = require("fs");

const ENUM_FILE_IMAGE_MIME = {
  JPG: "image/jpg",
  JPEG: "image/jpeg",
  PNG: "image/png",
  WEBP: "image/webp",
  X_PNG: "image/x-png",
  OCTET_STREAM: "application/octet-stream", // Sometimes browsers send this for images
};

const imageFilter = function (req, file, cb) {
  console.log("Uploaded file MIME type:", file.mimetype); // Debugging line
  if (!Object.values(ENUM_FILE_IMAGE_MIME).includes(file.mimetype.toLowerCase())) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const pdfFilter = function (req, file, cb) {
  console.log("Uploaded file MIME type:", file.mimetype); // Debugging line
  if (file.mimetype.toLowerCase() !== "application/pdf") {
    return cb(new Error("Only PDF files are allowed!"), false);
  }
  cb(null, true);
};

const uploadFile = (folder) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = `uploads/${folder}`;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  return multer({
    storage,
    fileFilter: imageFilter,
    limits: { fileSize: 100 * 1024 * 1024 }, // ✅ 100 MB limit
  });
};

const uploadpdf = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = `uploads/pdfs`;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  return multer({
    storage,
    fileFilter: pdfFilter,
    limits: { fileSize: 100 * 1024 * 1024 }, // ✅ 100 MB limit
  });
};

module.exports = { uploadFile, uploadpdf };