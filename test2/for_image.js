// routes/product.routes.js
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/', auth, upload.single('image'), validateProduct, handleValidationErrors, async (req, res) => {
  try {
    const productData = req.body;
    if (req.file) {
      productData.imageUrl = `/uploads/${req.file.filename}`;
    }
    const product = new Product(productData);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});