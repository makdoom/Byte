import multer from "multer";

const storage = multer.diskStorage({
  destination: function (_, __, cb) {
    cb(null, "./public/temp");
  },
  filename: function (_, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage });
