
export interface Hostel {
  _id: string;
  name: string;
  city: string;
  address: string;
  description: string;
  pricePerNight: number;
  rating: number;
  image: string;
  images: string[];
  amenities: string[];
  reviews: Review[];
  totalBeds: number;
  availableBeds: number;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export const mockHostels: Hostel[] = [
  {
    _id: "1",
    name: "Zostel Delhi",
    city: "Delhi",
    address: "123 Paharganj, New Delhi, India",
    description: "A vibrant backpacker hostel in the heart of Delhi, perfect for exploring India's capital city with easy access to Red Fort and India Gate.",
    rating: 4.5,
    pricePerNight: 800,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Free WiFi", "Breakfast included", "24/7 Reception", "Common Room", "Kitchen"],
    totalBeds: 60,
    availableBeds: 32,
    reviews: [
      {
        id: "1",
        userName: "Rahul S.",
        rating: 5,
        comment: "Amazing location and friendly staff! Perfect for exploring Old Delhi.",
        date: "2024-01-15"
      },
      {
        id: "2",
        userName: "Priya M.",
        rating: 4,
        comment: "Great value for money. Clean rooms and good atmosphere.",
        date: "2024-01-10"
      }
    ]
  },
  {
    _id: "2",
    name: "Mad Monkey Hostel Goa",
    city: "Goa",
    address: "456 Anjuna Beach Road, Goa, India",
    description: "Beachside hostel in Anjuna with direct beach access, perfect for party lovers and beach enthusiasts in North Goa.",
    rating: 4.7,
    pricePerNight: 1200,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Free WiFi", "Beach Access", "Pool", "Bar", "Bike Rental"],
    totalBeds: 40,
    availableBeds: 15,
    reviews: [
      {
        id: "3",
        userName: "Alex D.",
        rating: 5,
        comment: "Amazing beach vibes and great party atmosphere!",
        date: "2024-01-12"
      }
    ]
  },
  {
    _id: "3",
    name: "Zostel Rishikesh",
    city: "Rishikesh",
    address: "789 Laxman Jhula Road, Rishikesh, Uttarakhand, India",
    description: "Spiritual backpacker hub near the Ganges, perfect for yoga enthusiasts and adventure seekers in the yoga capital of the world.",
    rating: 4.6,
    pricePerNight: 700,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["River Views", "Free WiFi", "Yoga Classes", "Cafe", "Adventure Sports"],
    totalBeds: 50,
    availableBeds: 25,
    reviews: [
      {
        id: "4",
        userName: "Meditation Mike",
        rating: 5,
        comment: "Perfect place for spiritual journey and river rafting!",
        date: "2024-01-08"
      }
    ]
  },
  {
    _id: "4",
    name: "Backpacker Panda Manali",
    city: "Manali",
    address: "321 Mall Road, Manali, Himachal Pradesh, India",
    description: "Mountain hostel with stunning Himalayan views, perfect for trekkers and mountain lovers in the beautiful hill station.",
    rating: 4.4,
    pricePerNight: 600,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Mountain Views", "Free WiFi", "Trekking Tours", "Bonfire", "Common Room"],
    totalBeds: 35,
    availableBeds: 18,
    reviews: [
      {
        id: "5",
        userName: "Himalayan Hiker",
        rating: 4,
        comment: "Great base for Himalayan treks and beautiful mountain views.",
        date: "2024-01-05"
      }
    ]
  },
  {
    _id: "5",
    name: "Zostel Jaipur",
    city: "Jaipur",
    address: "654 Pink City, Jaipur, Rajasthan, India",
    description: "Heritage-style hostel in the Pink City, perfect for exploring palaces, forts, and experiencing royal Rajasthani culture.",
    rating: 4.5,
    pricePerNight: 900,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Heritage Decor", "Free WiFi", "City Tours", "Rooftop Terrace", "Traditional Food"],
    totalBeds: 55,
    availableBeds: 42,
    reviews: [
      {
        id: "6",
        userName: "Royal Traveler",
        rating: 5,
        comment: "Beautiful heritage property with amazing Rajasthani hospitality!",
        date: "2024-01-03"
      }
    ]
  },
  {
    _id: "6",
    name: "Pushkar Backpackers",
    city: "Pushkar",
    address: "987 Holy Lake Road, Pushkar, Rajasthan, India",
    description: "Spiritual desert town hostel near the sacred lake, perfect for camel safaris and experiencing authentic Rajasthani desert culture.",
    rating: 4.3,
    pricePerNight: 500,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Lake Views", "Free WiFi", "Camel Safari", "Desert Tours", "Rooftop Restaurant"],
    totalBeds: 30,
    availableBeds: 12,
    reviews: [
      {
        id: "7",
        userName: "Desert Explorer",
        rating: 4,
        comment: "Amazing desert experience and peaceful lake views!",
        date: "2024-01-01"
      }
    ]
  },
  {
    _id: "7",
    name: "Zostel Udaipur",
    city: "Udaipur",
    address: "123 Lake Palace Road, Udaipur, Rajasthan, India",
    description: "Lake city hostel with stunning views of City Palace and Lake Pichola, perfect for experiencing the Venice of the East.",
    rating: 4.8,
    pricePerNight: 1000,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Lake Views", "Free WiFi", "Palace Tours", "Rooftop Cafe", "Boat Rides"],
    totalBeds: 45,
    availableBeds: 28,
    reviews: []
  },
  {
    _id: "8",
    name: "Mad Monkey Hampi",
    city: "Hampi",
    address: "456 Ruins Road, Hampi, Karnataka, India",
    description: "Historic ruins hostel in the UNESCO World Heritage site, perfect for history buffs and rock climbing enthusiasts.",
    rating: 4.4,
    pricePerNight: 600,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Historic Views", "Free WiFi", "Rock Climbing", "Bicycle Rental", "Heritage Tours"],
    totalBeds: 40,
    availableBeds: 22,
    reviews: []
  },
  {
    _id: "9",
    name: "Zostel Varanasi",
    city: "Varanasi",
    address: "789 Ghats Road, Varanasi, Uttar Pradesh, India",
    description: "Spiritual city hostel near the holy Ganges ghats, perfect for experiencing India's spiritual heart and ancient traditions.",
    rating: 4.2,
    pricePerNight: 700,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Ghat Views", "Free WiFi", "Spiritual Tours", "Boat Rides", "Cultural Shows"],
    totalBeds: 50,
    availableBeds: 35,
    reviews: []
  },
  {
    _id: "10",
    name: "Backpacker Panda Kasol",
    city: "Kasol",
    address: "321 Parvati Valley, Kasol, Himachal Pradesh, India",
    description: "Himalayan valley hostel in the mini Israel of India, perfect for trekkers and nature lovers in the beautiful Parvati Valley.",
    rating: 4.6,
    pricePerNight: 800,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Valley Views", "Free WiFi", "Trekking Base", "Israeli Cafe", "River Access"],
    totalBeds: 25,
    availableBeds: 15,
    reviews: []
  }
];

export const getHostelsByCity = (city: string): Hostel[] => {
  if (!city) return mockHostels;
  return mockHostels.filter(hostel => 
    hostel.city.toLowerCase().includes(city.toLowerCase())
  );
};

export const getHostelById = (id: string): Hostel | undefined => {
  return mockHostels.find(hostel => hostel._id === id);
};
