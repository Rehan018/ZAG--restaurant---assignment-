const express = require('express');
const businessController = require('../controllers/business.controller');
const authenticateToken=require('../middlewares/auth.middleware');
const { isBusinessOwner, isAdmin } = require('../middlewares/role.middleware');

const router = express.Router();

// Create a new business listing (requires business owner role)
router.post('/', authenticateToken, isBusinessOwner, businessController.createBusiness);

// Get all business listings
router.get('/', businessController.getAllBusinesses);

// Get a specific business listing
router.get('/:id', businessController.getBusinessById);

// Update a business listing (requires business owner role or admin role)
router.put('/:id', authenticateToken, async(req,res,next)=>{
    if (req.userRole === 'businessOwner' || req.userRole === 'admin') {
        next();
      } else{
        res.status(403).send({ message: 'Requires business owner or admin role' });
      }
},businessController.updateBusiness);

// Delete a business listing (requires admin role)
router.delete('/:id', authenticateToken, isAdmin, businessController.deleteBusiness);

module.exports = router;