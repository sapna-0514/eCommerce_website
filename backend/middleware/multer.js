
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        const uniqueName = Date.now() + "-" + file.originalname;
        callback(null, uniqueName);
    }
});

const upload = multer({
    storage
});

export default upload;
