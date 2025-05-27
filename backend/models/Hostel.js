
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  id: String,
  userName: String,
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  comment: String,
  date: {
    type: Date,
    default: Date.now
  }
});

const hostelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  pricePerNight: {
    type: Number,
    required: true,
    min: 0
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  image: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  amenities: [{
    type: String
  }],
  reviews: [reviewSchema],
  totalBeds: {
    type: Number,
    default: 50
  },
  availableBeds: {
    type: Number,
    default: 50
  }
}, {
  timestamps: true
});

// Update rating when reviews change
hostelSchema.methods.updateRating = function() {
  if (this.reviews.length === 0) {
    this.rating = 0;
  } else {
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    this.rating = Math.round((sum / this.reviews.length) * 10) / 10;
  }
};

module.exports = mongoose.model('Hostel', hostelSchema);
