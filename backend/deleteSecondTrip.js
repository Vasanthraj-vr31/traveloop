const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Trip = require('./models/Trip');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/traveloop');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const manageTrips = async () => {
  await connectDB();
  try {
    // Fetch all trips, sorted by creation date descending (newest first)
    const trips = await Trip.find().sort({ createdAt: -1 });
    
    console.log('Current Trips (Newest First):');
    trips.forEach((t, i) => {
      console.log(`${i + 1}. [${t._id}] ${t.title} - ${t.destination}`);
    });

    // If there are at least 2 trips, delete the 2nd one (index 1)
    if (trips.length >= 2) {
      const tripToDelete = trips[1];
      console.log(`\nDeleting 2nd trip: ${tripToDelete.title}`);
      await Trip.findByIdAndDelete(tripToDelete._id);
      console.log('Trip deleted successfully.');
    } else {
      console.log('Not enough trips to delete the 2nd one.');
    }
    
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

manageTrips();
