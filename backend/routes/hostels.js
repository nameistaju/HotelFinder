
const express = require('express');
const Hostel = require('../models/Hostel');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Get all hostels with optional city filter
router.get('/', async (req, res) => {
  try {
    const { city, page = 1, limit = 10 } = req.query;
    
    const query = city ? { city: new RegExp(city, 'i') } : {};
    
    const hostels = await Hostel.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ rating: -1 });

    const total = await Hostel.countDocuments(query);

    res.json({
      hostels,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get hostels error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get hostel by ID
router.get('/:id', async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id);
    
    if (!hostel) {
      return res.status(404).json({ message: 'Hostel not found' });
    }

    res.json(hostel);
  } catch (error) {
    console.error('Get hostel error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Hostel not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Add review to hostel
router.post('/:id/reviews', auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const hostel = await Hostel.findById(req.params.id);
    if (!hostel) {
      return res.status(404).json({ message: 'Hostel not found' });
    }

    const newReview = {
      id: Date.now().toString(),
      userName: req.user.name,
      rating,
      comment: comment || '',
      date: new Date()
    };

    hostel.reviews.push(newReview);
    hostel.updateRating();
    await hostel.save();

    res.status(201).json({ message: 'Review added successfully', review: newReview });
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Inside your hostels route file (./routes/hostels.js or similar)
router.get('/test', (req, res) => {
  res.json({ message: 'Hostels route works!' });
});

module.exports = router;
