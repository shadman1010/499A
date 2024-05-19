// routes/product.routes.js
const express = require('express');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();
const productController = require('../controllers/product.controller');

// rules to see if boxes are filled properly
const validateProduct = [
  body('name').isString().notEmpty().withMessage('Name is required'),
  body('description').isString().notEmpty().withMessage('Description is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be a number greater than 0'),
  body('category').isString().notEmpty().withMessage('Category is required'),
  body('stock').isInt({ gt: -1 }).withMessage('Stock must be a non-negative integer'),
  body('imageUrl').isURL().withMessage('Image URL must be valid'),
];

const validateId = [
  param('id').isMongoId().withMessage('Invalid product ID'),
];

// error handling middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Create a new product
router.post('/', validateProduct, handleValidationErrors, productController.createProduct);

// Get all products
router.get('/', productController.getProducts);

// Get a product by ID
router.get('/:id', validateId, handleValidationErrors, productController.getProductById);

// Update a product by ID
router.put('/:id', validateId, validateProduct, handleValidationErrors, productController.updateProductById);

// Delete a product by ID
router.delete('/:id', validateId, handleValidationErrors, productController.deleteProductById);

module.exports = router;

//For validing boxes, ID, handling middleware, create/veiw/delete products individually or togeather