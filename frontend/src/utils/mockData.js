// Mock data for all Traveloop features

export const mockUser = {
  id: 'u1',
  name: 'Arjun Mehta',
  email: 'arjun.mehta@email.com',
  avatar: 'AM',
  location: 'Chennai, India',
  joinedDate: '2024-01-15',
  bio: 'Adventure seeker | 23 countries visited | Food & culture explorer',
  tripsCount: 12,
  photosCount: 847,
  countriesVisited: 23,
  badges: ['Explorer', 'Foodie', 'Backpacker', 'Planner'],
  points: 4280,
  level: 'Gold Traveler',
};

export const mockTrips = [
  {
    id: 't1',
    title: 'Tokyo & Kyoto Adventure',
    destination: 'Japan',
    startDate: '2025-03-10',
    endDate: '2025-03-22',
    status: 'completed',
    coverImage: null,
    coverGradient: 'from-[#7C9D96] to-[#A5C9CA]',
    emoji: '🗾',
    days: 12,
    budget: 2500,
    spent: 2180,
    currency: 'USD',
    collaborators: ['AM', 'SK', 'RP'],
    tags: ['Culture', 'Food', 'City'],
    rating: 5,
  },
  {
    id: 't2',
    title: 'Bali Paradise Retreat',
    destination: 'Indonesia',
    startDate: '2025-06-05',
    endDate: '2025-06-15',
    status: 'upcoming',
    coverGradient: 'from-[#F2C6A0] to-[#e8a47a]',
    emoji: '🏝️',
    days: 10,
    budget: 1800,
    spent: 450,
    currency: 'USD',
    collaborators: ['AM', 'NP'],
    tags: ['Beach', 'Wellness', 'Nature'],
    rating: null,
  },
  {
    id: 't3',
    title: 'Swiss Alps Explorer',
    destination: 'Switzerland',
    startDate: '2025-08-20',
    endDate: '2025-08-30',
    status: 'planning',
    coverGradient: 'from-[#A5C9CA] to-[#7C9D96]',
    emoji: '🏔️',
    days: 10,
    budget: 4000,
    spent: 200,
    currency: 'USD',
    collaborators: ['AM'],
    tags: ['Mountains', 'Adventure', 'Skiing'],
    rating: null,
  },
  {
    id: 't4',
    title: 'Rajasthan Royal Tour',
    destination: 'India',
    startDate: '2024-12-18',
    endDate: '2024-12-28',
    status: 'completed',
    coverGradient: 'from-[#F2C6A0] to-[#7C9D96]',
    emoji: '🏯',
    days: 10,
    budget: 900,
    spent: 820,
    currency: 'USD',
    collaborators: ['AM', 'SK', 'RP', 'NP'],
    tags: ['Heritage', 'Culture', 'Luxury'],
    rating: 4,
  },
];

export const mockItinerary = [
  {
    id: 'day1',
    day: 1,
    date: '2025-03-10',
    title: 'Arrival in Tokyo',
    activities: [
      { id: 'a1', time: '14:00', title: 'Land at Narita Airport', type: 'transport', duration: '30 min', notes: 'Pick up JR Pass', icon: '✈️' },
      { id: 'a2', time: '16:30', title: 'Check in - Shinjuku Hotel', type: 'accommodation', duration: '1 hr', notes: 'Superior room booked', icon: '🏨' },
      { id: 'a3', time: '19:00', title: 'Dinner at Ichiran Ramen', type: 'food', duration: '1 hr', notes: 'Famous solo ramen booths', icon: '🍜' },
      { id: 'a4', time: '20:30', title: 'Shinjuku Night Walk', type: 'activity', duration: '1.5 hrs', notes: 'Golden Gai area', icon: '🌃' },
    ],
  },
  {
    id: 'day2',
    day: 2,
    date: '2025-03-11',
    title: 'Shibuya & Harajuku',
    activities: [
      { id: 'a5', time: '09:00', title: 'Meiji Shrine', type: 'sightseeing', duration: '1.5 hrs', notes: 'Peaceful morning', icon: '⛩️' },
      { id: 'a6', time: '11:00', title: 'Harajuku Takeshita Street', type: 'shopping', duration: '2 hrs', notes: 'Quirky fashion street', icon: '🛍️' },
      { id: 'a7', time: '14:00', title: 'Lunch at Omotesando', type: 'food', duration: '1 hr', notes: 'Try the crepes!', icon: '🥐' },
      { id: 'a8', time: '17:00', title: 'Shibuya Crossing', type: 'activity', duration: '1 hr', notes: 'Iconic scramble crossing', icon: '🚦' },
    ],
  },
  {
    id: 'day3',
    day: 3,
    date: '2025-03-12',
    title: 'Asakusa & Akihabara',
    activities: [
      { id: 'a9', time: '08:30', title: 'Senso-ji Temple', type: 'sightseeing', duration: '2 hrs', notes: 'Tokyo\'s oldest temple', icon: '🏮' },
      { id: 'a10', time: '11:00', title: 'Nakamise Shopping Street', type: 'shopping', duration: '1 hr', notes: 'Traditional souvenirs', icon: '🎎' },
      { id: 'a11', time: '14:00', title: 'Akihabara Electric Town', type: 'activity', duration: '3 hrs', notes: 'Anime & electronics', icon: '🤖' },
    ],
  },
];

export const mockBudget = {
  total: 2500,
  spent: 2180,
  currency: 'USD',
  categories: [
    { name: 'Accommodation', budget: 800, spent: 720, color: '#7C9D96', icon: '🏨' },
    { name: 'Food & Dining', budget: 450, spent: 510, color: '#A5C9CA', icon: '🍽️' },
    { name: 'Transport', budget: 400, spent: 380, color: '#F2C6A0', icon: '🚂' },
    { name: 'Activities', budget: 350, spent: 290, color: '#e8a47a', icon: '🎯' },
    { name: 'Shopping', budget: 300, spent: 180, color: '#9db89b', icon: '🛍️' },
    { name: 'Miscellaneous', budget: 200, spent: 100, color: '#c8dcd8', icon: '💰' },
  ],
  dailySpending: [
    { day: 'Mar 10', amount: 180 },
    { day: 'Mar 11', amount: 220 },
    { day: 'Mar 12', amount: 165 },
    { day: 'Mar 13', amount: 310 },
    { day: 'Mar 14', amount: 190 },
    { day: 'Mar 15', amount: 240 },
    { day: 'Mar 16', amount: 175 },
  ],
  aiPrediction: {
    estimatedTotal: 2350,
    confidence: 87,
    savings: ['Cook 2 meals/week → Save $180', 'Use JR Pass wisely → Save $60', 'Book activities in advance → Save $45'],
  },
};

export const mockPackingList = {
  categories: [
    {
      id: 'docs',
      name: 'Documents',
      icon: '📄',
      items: [
        { id: 'p1', item: 'Passport', packed: true, essential: true },
        { id: 'p2', item: 'Travel Insurance', packed: true, essential: true },
        { id: 'p3', item: 'Hotel Confirmations', packed: false, essential: true },
        { id: 'p4', item: 'JR Pass', packed: false, essential: true },
        { id: 'p5', item: 'Emergency Contacts', packed: true, essential: false },
      ],
    },
    {
      id: 'clothing',
      name: 'Clothing',
      icon: '👕',
      items: [
        { id: 'p6', item: 'T-Shirts (5)', packed: true, essential: false },
        { id: 'p7', item: 'Jeans (2)', packed: true, essential: false },
        { id: 'p8', item: 'Warm Jacket', packed: false, essential: true },
        { id: 'p9', item: 'Comfortable Walking Shoes', packed: false, essential: true },
        { id: 'p10', item: 'Rain Jacket', packed: false, essential: false },
      ],
    },
    {
      id: 'electronics',
      name: 'Electronics',
      icon: '🔌',
      items: [
        { id: 'p11', item: 'Phone Charger', packed: true, essential: true },
        { id: 'p12', item: 'Power Bank', packed: false, essential: false },
        { id: 'p13', item: 'Travel Adapter (Type A)', packed: false, essential: true },
        { id: 'p14', item: 'Camera', packed: true, essential: false },
        { id: 'p15', item: 'Laptop', packed: false, essential: false },
      ],
    },
    {
      id: 'health',
      name: 'Health & Hygiene',
      icon: '💊',
      items: [
        { id: 'p16', item: 'Medications', packed: true, essential: true },
        { id: 'p17', item: 'Sunscreen', packed: false, essential: false },
        { id: 'p18', item: 'Hand Sanitizer', packed: true, essential: false },
        { id: 'p19', item: 'First Aid Kit', packed: false, essential: true },
      ],
    },
  ],
  aiSuggestions: [
    { icon: '☂️', text: 'Pack an umbrella – March is rainy season in Tokyo' },
    { icon: '🧴', text: 'Bring biodegradable toiletries for eco-friendly travel' },
    { icon: '🔋', text: 'Portable charger essential – lots of navigation needed' },
    { icon: '🧢', text: 'Light layers work best for Japan spring weather' },
    { icon: '💴', text: 'Carry some Yen cash – many places are cash-only' },
  ],
};

export const mockNotes = [
  {
    id: 'n1',
    title: 'Tokyo Food Hunt List',
    content: 'Must try: Ichiran Ramen in Shinjuku, Tsukiji Outer Market sushi for breakfast, Conveyor belt sushi at Uobei...',
    date: '2025-03-10',
    tags: ['Food', 'Tokyo'],
    color: '#F2C6A0',
    pinned: true,
  },
  {
    id: 'n2',
    title: 'Temple Etiquette Notes',
    content: 'Bow at torii gate, wash hands at temizuya, be quiet and respectful, no flash photography...',
    date: '2025-03-11',
    tags: ['Culture', 'Tips'],
    color: '#A5C9CA',
    pinned: false,
  },
  {
    id: 'n3',
    title: 'Day 3 Reflections',
    content: 'Senso-ji was breathtaking at dawn. The paper lanterns, the incense, the old wooden structure... Nakamise was touristy but fun...',
    date: '2025-03-12',
    tags: ['Journal', 'Memories'],
    color: '#E8F0E8',
    pinned: false,
  },
  {
    id: 'n4',
    title: 'Transport Tips',
    content: 'Get Suica card for JR trains, use HyperDia app for routes, avoid rush hours 7:30-9:30am...',
    date: '2025-03-10',
    tags: ['Transport', 'Tips'],
    color: '#7C9D96',
    pinned: true,
  },
];

export const mockPhotos = [
  { id: 'ph1', title: 'Senso-ji at Dawn', location: 'Asakusa, Tokyo', date: '2025-03-12', emoji: '🏮', tags: ['Temple', 'Morning'] },
  { id: 'ph2', title: 'Shibuya Crossing Night', location: 'Shibuya, Tokyo', date: '2025-03-11', emoji: '🌃', tags: ['Night', 'City'] },
  { id: 'ph3', title: 'Mount Fuji View', location: 'Hakone', date: '2025-03-14', emoji: '🗻', tags: ['Nature', 'Mountain'] },
  { id: 'ph4', title: 'Kyoto Bamboo Grove', location: 'Arashiyama, Kyoto', date: '2025-03-16', emoji: '🎋', tags: ['Nature', 'Kyoto'] },
  { id: 'ph5', title: 'Tsukiji Market', location: 'Tsukiji, Tokyo', date: '2025-03-13', emoji: '🐟', tags: ['Food', 'Market'] },
  { id: 'ph6', title: 'Fushimi Inari Gates', location: 'Kyoto', date: '2025-03-17', emoji: '⛩️', tags: ['Shrine', 'Kyoto'] },
  { id: 'ph7', title: 'Ramen Dinner', location: 'Shinjuku, Tokyo', date: '2025-03-10', emoji: '🍜', tags: ['Food', 'Night'] },
  { id: 'ph8', title: 'Cherry Blossoms', location: 'Ueno Park, Tokyo', date: '2025-03-15', emoji: '🌸', tags: ['Nature', 'Spring'] },
  { id: 'ph9', title: 'Bullet Train', location: 'Tokyo to Kyoto', date: '2025-03-15', emoji: '🚅', tags: ['Transport'] },
];

export const mockWeather = {
  city: 'Tokyo',
  current: { temp: 18, condition: 'Partly Cloudy', humidity: 65, wind: 12, icon: '⛅' },
  forecast: [
    { day: 'Today', high: 18, low: 12, icon: '⛅', condition: 'Partly Cloudy' },
    { day: 'Tue', high: 20, low: 13, icon: '☀️', condition: 'Sunny' },
    { day: 'Wed', high: 15, low: 10, icon: '🌧️', condition: 'Rainy' },
    { day: 'Thu', high: 17, low: 11, icon: '⛅', condition: 'Cloudy' },
    { day: 'Fri', high: 22, low: 14, icon: '☀️', condition: 'Sunny' },
    { day: 'Sat', high: 19, low: 12, icon: '🌤️', condition: 'Mostly Sunny' },
    { day: 'Sun', high: 16, low: 10, icon: '🌦️', condition: 'Light Rain' },
  ],
};

export const mockCollaborators = [
  { id: 'c1', initials: 'AM', name: 'Arjun Mehta', role: 'Owner', color: '#7C9D96', online: true },
  { id: 'c2', initials: 'SK', name: 'Sneha Kumar', role: 'Editor', color: '#A5C9CA', online: true },
  { id: 'c3', initials: 'RP', name: 'Rahul Patel', role: 'Viewer', color: '#F2C6A0', online: false },
  { id: 'c4', initials: 'NP', name: 'Nisha Pillai', role: 'Editor', color: '#e8a47a', online: true },
];

export const mockActivityFeed = [
  { id: 'af1', user: 'Sneha Kumar', initials: 'SK', action: 'added Fushimi Inari to Day 7', time: '2 min ago', icon: '➕' },
  { id: 'af2', user: 'Rahul Patel', initials: 'RP', action: 'updated budget for Accommodation', time: '15 min ago', icon: '✏️' },
  { id: 'af3', user: 'Arjun Mehta', initials: 'AM', action: 'uploaded 12 photos', time: '1 hr ago', icon: '📸' },
  { id: 'af4', user: 'Nisha Pillai', initials: 'NP', action: 'added note: Temple Etiquette', time: '3 hrs ago', icon: '📝' },
  { id: 'af5', user: 'Sneha Kumar', initials: 'SK', action: 'marked Senso-ji as visited', time: '1 day ago', icon: '✅' },
];

export const mockStats = {
  totalTrips: 12,
  countriesVisited: 23,
  citiesExplored: 67,
  totalDays: 148,
  photosUploaded: 847,
  totalBudget: 18400,
  avgRating: 4.7,
  badges: [
    { id: 'b1', name: 'First Adventure', icon: '🎒', earned: true, description: 'Complete your first trip' },
    { id: 'b2', name: 'Globe Trotter', icon: '🌍', earned: true, description: 'Visit 10+ countries' },
    { id: 'b3', name: 'Foodie Explorer', icon: '🍜', earned: true, description: 'Try 50+ local dishes' },
    { id: 'b4', name: 'Budget Master', icon: '💰', earned: true, description: 'Stay within budget 5 trips in a row' },
    { id: 'b5', name: 'Planner Pro', icon: '📋', earned: false, description: 'Create 15+ detailed itineraries' },
    { id: 'b6', name: 'Social Butterfly', icon: '🦋', earned: false, description: 'Collaborate on 10+ trips' },
    { id: 'b7', name: 'Photo Journalist', icon: '📸', earned: true, description: 'Upload 500+ photos' },
    { id: 'b8', name: 'Asia Explorer', icon: '🗺️', earned: true, description: 'Visit 5+ Asian countries' },
  ],
  monthlyTrips: [
    { month: 'Jan', trips: 1 },
    { month: 'Feb', trips: 0 },
    { month: 'Mar', trips: 2 },
    { month: 'Apr', trips: 1 },
    { month: 'May', trips: 0 },
    { month: 'Jun', trips: 2 },
    { month: 'Jul', trips: 1 },
    { month: 'Aug', trips: 1 },
    { month: 'Sep', trips: 2 },
    { month: 'Oct', trips: 0 },
    { month: 'Nov', trips: 1 },
    { month: 'Dec', trips: 1 },
  ],
};

export const mockCities = [
  { id: 'ci1', name: 'Tokyo', country: 'Japan', emoji: '🗾', rating: 4.9, activities: 234, weather: '18°C ⛅', tags: ['Culture', 'Food', 'Tech'] },
  { id: 'ci2', name: 'Paris', country: 'France', emoji: '🗼', rating: 4.8, activities: 312, weather: '14°C ☁️', tags: ['Romance', 'Art', 'Food'] },
  { id: 'ci3', name: 'Bali', country: 'Indonesia', emoji: '🏝️', rating: 4.7, activities: 189, weather: '28°C ☀️', tags: ['Beach', 'Wellness', 'Nature'] },
  { id: 'ci4', name: 'New York', country: 'USA', emoji: '🗽', rating: 4.6, activities: 428, weather: '16°C 🌤️', tags: ['City', 'Culture', 'Shopping'] },
  { id: 'ci5', name: 'Santorini', country: 'Greece', emoji: '🏛️', rating: 4.8, activities: 98, weather: '22°C ☀️', tags: ['Romance', 'Beach', 'Views'] },
  { id: 'ci6', name: 'Kyoto', country: 'Japan', emoji: '⛩️', rating: 4.9, activities: 167, weather: '16°C ⛅', tags: ['Temple', 'Culture', 'Heritage'] },
];

export const mockActivities = [
  { id: 'ac1', name: 'Senso-ji Temple Tour', city: 'Tokyo', category: 'Sightseeing', price: 0, rating: 4.9, duration: '2h', emoji: '🏮' },
  { id: 'ac2', name: 'Ramen Making Class', city: 'Tokyo', category: 'Food', price: 65, rating: 4.8, duration: '3h', emoji: '🍜' },
  { id: 'ac3', name: 'Mount Fuji Day Trip', city: 'Tokyo', category: 'Nature', price: 85, rating: 4.9, duration: '10h', emoji: '🗻' },
  { id: 'ac4', name: 'Tsukiji Market Walk', city: 'Tokyo', category: 'Food', price: 45, rating: 4.7, duration: '2.5h', emoji: '🐟' },
  { id: 'ac5', name: 'Shibuya Night Tour', city: 'Tokyo', category: 'City', price: 30, rating: 4.6, duration: '3h', emoji: '🌃' },
  { id: 'ac6', name: 'Tea Ceremony', city: 'Kyoto', category: 'Culture', price: 40, rating: 4.8, duration: '1.5h', emoji: '🍵' },
];

export const mockEmergencyInfo = {
  country: 'Japan',
  police: '110',
  ambulance: '119',
  fire: '119',
  embassy: '+81-3-3224-5000',
  hospitals: [
    { name: 'Tokyo Medical University Hospital', distance: '2.3 km', address: '6-7-1 Nishishinjuku, Shinjuku' },
    { name: 'St. Luke\'s International Hospital', distance: '4.1 km', address: '9-1 Akashicho, Chuo' },
  ],
  tips: [
    'Japan is very safe – violent crime is extremely rare',
    'Carry your passport or a copy at all times',
    'Download Google Translate offline for Japanese',
    'Most Japanese police speak limited English – show them your hotel card',
  ],
};

export const mockMapRoute = [
  { id: 'm1', name: 'Narita Airport', coords: [35.7647, 140.3864], type: 'transport', day: 1, emoji: '✈️' },
  { id: 'm2', name: 'Shinjuku', coords: [35.6897, 139.7006], type: 'accommodation', day: 1, emoji: '🏨' },
  { id: 'm3', name: 'Asakusa', coords: [35.7148, 139.7967], type: 'sightseeing', day: 3, emoji: '🏮' },
  { id: 'm4', name: 'Shibuya', coords: [35.6580, 139.7016], type: 'activity', day: 2, emoji: '🚦' },
  { id: 'm5', name: 'Harajuku', coords: [35.6702, 139.7028], type: 'shopping', day: 2, emoji: '🛍️' },
  { id: 'm6', name: 'Kyoto Station', coords: [34.9858, 135.7587], type: 'transport', day: 5, emoji: '🚅' },
  { id: 'm7', name: 'Fushimi Inari', coords: [34.9671, 135.7727], type: 'sightseeing', day: 6, emoji: '⛩️' },
];

export const mockAdminStats = {
  totalUsers: 12847,
  activeTrips: 3241,
  monthlyRevenue: 48200,
  avgSessionTime: '14 min',
  userGrowth: [
    { month: 'Jan', users: 8200 },
    { month: 'Feb', users: 9100 },
    { month: 'Mar', users: 9800 },
    { month: 'Apr', users: 10500 },
    { month: 'May', users: 11200 },
    { month: 'Jun', users: 12847 },
  ],
  topDestinations: [
    { name: 'Tokyo', trips: 1248, percentage: 28 },
    { name: 'Paris', trips: 987, percentage: 22 },
    { name: 'Bali', trips: 756, percentage: 17 },
    { name: 'New York', trips: 634, percentage: 14 },
    { name: 'Santorini', trips: 489, percentage: 11 },
  ],
  recentUsers: [
    { name: 'Priya Sharma', email: 'priya@email.com', joined: '2 hrs ago', trips: 2 },
    { name: 'Karan Singh', email: 'karan@email.com', joined: '4 hrs ago', trips: 1 },
    { name: 'Meera Nair', email: 'meera@email.com', joined: '1 day ago', trips: 5 },
  ],
};
