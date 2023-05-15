const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname))
    }
  })
  
// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     if (file.fieldname === 'pdfFileUrl') {
//       cb(null, 'upload/');
//     } else if (file.fieldname === 'imageUrl') {
//       cb(null, 'upload/');
//     } else {
//       cb(new Error('Invalid field name'));
//     }
//   },
//   filename: function(req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });
//const upload = multer({ storage: storage })
const upload = multer({storage: storage,});
module.exports = upload