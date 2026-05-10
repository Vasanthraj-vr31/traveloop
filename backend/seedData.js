const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Trip = require('./models/Trip');
const Stop = require('./models/Stop');
const Activity = require('./models/Activity');
const Budget = require('./models/Budget');
const Packing = require('./models/PackingList');
const Note = require('./models/Note');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/traveloop');
    console.log('MongoDB connected for seeding...');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const seedData = async () => {
  await connectDB();

  try {
    // 1. Get the first user
    const user = await User.findOne();
    if (!user) {
      console.log('No user found in the database. Please sign up first.');
      process.exit(1);
    }

    console.log(`Seeding data for user: ${user.name}`);

    // Clean existing data for this user to avoid duplicates
    const existingTrips = await Trip.find({ userId: user._id });
    const tripIds = existingTrips.map(t => t._id);

    await Trip.deleteMany({ userId: user._id });
    await Stop.deleteMany({ tripId: { $in: tripIds } });
    await Activity.deleteMany({ tripId: { $in: tripIds } });
    await Budget.deleteMany({ tripId: { $in: tripIds } });
    await Packing.deleteMany({ tripId: { $in: tripIds } });
    await Note.deleteMany({ tripId: { $in: tripIds } });

    // 2. Create Trip
    const trip = await Trip.create({
      userId: user._id,
      title: 'Bali Serenity Retreat',
      description: 'A 7-day luxury escape to the Island of Gods, focusing on wellness, culture, and coastal relaxation.',
      destination: 'Bali, Indonesia',
      emoji: '🌿',
      startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      budget: 150000, // ₹1,50,000
      currency: 'INR',
      coverImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=2000',
      isPublic: true,
      tags: ['Luxury', 'Wellness', 'Culture']
    });

    console.log(`Created Trip: ${trip.title}`);

    // 3. Create Itinerary Stops
    const stops = await Stop.insertMany([
      {
        tripId: trip._id,
        cityName: 'Ubud',
        country: 'Indonesia',
        name: 'Viceroy Bali Resort',
        location: 'Ubud, Bali',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        notes: 'Check-in at 2 PM. Infinity pool valley view suite.'
      },
      {
        tripId: trip._id,
        cityName: 'Seminyak',
        country: 'Indonesia',
        name: 'Potato Head Beach Club',
        location: 'Seminyak, Bali',
        date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        notes: 'Reserved daybed by the ocean. Sunset at 6:15 PM.'
      }
    ]);

    // 4. Create Activities
    await Activity.insertMany([
      {
        tripId: trip._id,
        title: 'Sacred Monkey Forest Sanctuary',
        category: 'Culture',
        cost: 400,
        date: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
        isBooked: true
      },
      {
        tripId: trip._id,
        title: 'Private Ubud Cooking Class',
        category: 'Food',
        cost: 3500,
        date: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000),
        isBooked: true
      },
      {
        tripId: trip._id,
        title: 'Mount Batur Sunrise Trek',
        category: 'Adventure',
        cost: 4500,
        date: new Date(Date.now() + 11 * 24 * 60 * 60 * 1000),
        isBooked: false
      }
    ]);

    // 5. Create Budget
    await Budget.create({
      tripId: trip._id,
      totalBudget: 150000,
      transportCost: 45000, // Flights + local
      stayCost: 65000, // Viceroy
      foodCost: 20000,
      activityCost: 8400,
      dailyAverage: 19700
    });

    // 6. Create Packing List
    await Packing.create({
      tripId: trip._id,
      items: [
        { name: 'Passport & Visa', category: 'Essentials', isPacked: true },
        { name: 'Travel Insurance', category: 'Essentials', isPacked: true },
        { name: 'Sony A7IV Camera', category: 'Electronics', isPacked: false },
        { name: 'Universal Adapter', category: 'Electronics', isPacked: true },
        { name: 'Linen Shirts', category: 'Clothing', isPacked: false },
        { name: 'Swimwear', category: 'Clothing', isPacked: false },
        { name: 'Sunscreen SPF 50', category: 'Toiletries', isPacked: false }
      ]
    });

    // 7. Create Notes
    await Note.create({
      tripId: trip._id,
      title: 'Visa on Arrival Requirements',
      content: 'Need to pay 500,000 IDR (approx ₹2,700) at the airport. They accept cash (USD/EUR/IDR) or credit cards. Make sure passport is valid for at least 6 months.',
      category: 'Logistics'
    });

    console.log('Seeding completed successfully! 🌿');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
