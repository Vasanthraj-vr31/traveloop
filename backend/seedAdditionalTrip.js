const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Trip = require('./models/Trip');
const Stop = require('./models/Stop');
const Activity = require('./models/Activity');
const Budget = require('./models/Budget');
const PackingList = require('./models/PackingList');
const Note = require('./models/Note');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/traveloop');
    console.log('MongoDB connected for additional seeding...');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const seedAdditionalTrip = async () => {
  await connectDB();

  try {
    const user = await User.findOne();
    if (!user) {
      console.log('No user found.');
      process.exit(1);
    }

    console.log(`Adding an additional mock trip for: ${user.name}`);

    // DO NOT delete existing trips

    // 1. Create Trip
    const trip = await Trip.create({
      userId: user._id,
      title: 'Kyoto Zen Experience',
      description: 'A 5-day cultural immersion in Japan, exploring ancient temples, bamboo forests, and traditional tea ceremonies.',
      destination: 'Kyoto, Japan',
      emoji: '🌸',
      startDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      endDate: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
      budget: 200000, // ₹2,00,000
      currency: 'INR',
      coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=2000',
      isPublic: true,
      tags: ['Culture', 'Nature', 'Food']
    });

    console.log(`Created Trip: ${trip.title}`);

    // 2. Create Itinerary Stops
    await Stop.insertMany([
      {
        tripId: trip._id,
        cityName: 'Kyoto',
        country: 'Japan',
        name: 'Arashiyama Bamboo Grove',
        location: 'Ukyo Ward, Kyoto',
        date: new Date(Date.now() + 31 * 24 * 60 * 60 * 1000),
        notes: 'Arrive early at 7 AM to avoid crowds.'
      },
      {
        tripId: trip._id,
        cityName: 'Kyoto',
        country: 'Japan',
        name: 'Fushimi Inari Shrine',
        location: 'Fushimi Ward, Kyoto',
        date: new Date(Date.now() + 32 * 24 * 60 * 60 * 1000),
        notes: 'Hike to the top takes about 2 hours.'
      }
    ]);

    // 3. Create Activities
    await Activity.insertMany([
      {
        tripId: trip._id,
        title: 'Traditional Tea Ceremony',
        category: 'Culture',
        cost: 3500,
        date: new Date(Date.now() + 31 * 24 * 60 * 60 * 1000),
        isBooked: true
      },
      {
        tripId: trip._id,
        title: 'Omakase Sushi Dinner',
        category: 'Food',
        cost: 12000,
        date: new Date(Date.now() + 33 * 24 * 60 * 60 * 1000),
        isBooked: false
      }
    ]);

    // 4. Create Budget
    await Budget.create({
      tripId: trip._id,
      totalBudget: 200000,
      transportCost: 80000, // Flights + Bullet train
      stayCost: 50000, // Ryokan
      foodCost: 40000,
      activityCost: 15500,
      dailyAverage: 37100
    });

    // 5. Create Packing List
    await PackingList.create({
      tripId: trip._id,
      items: [
        { name: 'Japan Rail Pass', category: 'Essentials', isPacked: false },
        { name: 'Comfortable Walking Shoes', category: 'Clothing', isPacked: true },
        { name: 'Portable Wi-Fi', category: 'Electronics', isPacked: false }
      ]
    });

    // 6. Create Notes
    await Note.create({
      tripId: trip._id,
      title: 'Etiquette Guide',
      content: 'Always take shoes off before entering a ryokan or temple. Do not leave tips at restaurants.',
      category: 'Culture'
    });

    console.log('Additional seeding completed successfully! 🌸');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedAdditionalTrip();
