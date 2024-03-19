const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const landmarkSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  longitude:{
    type: Number,
    required:true
  },
  latitude:{
    type: Number,
    required:true
  },
  averageRating:{
    type: Number,
    required:false,
    default:5
  },
//   location: {
//     type: { type: String, default: 'Point' },
//     coordinates: { type: [Number], required: false } // [longitude, latitude]
//   },
  pictures: [
    {
      name: {
        type: String,
        required:true
      },
      url: {
        type: String,
        required:true
      }
    }
  ],
  ratings: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      rating: {
        type: Number,
        min: 1,
        max: 5
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      comment: {
        type: String,
        required: true
      }
    }
  ]
},{timestamps:true});

// Create a 2dsphere index for location field for geospatial queries
landmarkSchema.index({ location: '2dsphere' });

const Landmark = mongoose.model('landmark', landmarkSchema);

module.exports = Landmark;
