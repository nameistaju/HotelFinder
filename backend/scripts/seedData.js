const mongoose = require('mongoose');
const Hostel = require('../models/Hostel');
require('dotenv').config();

const hostelData = [
  // Existing European hostels
  {
    name: "The Backpacker's Haven",
    city: "London",
    address: "123 Camden Street, London, UK",
    description: "A vibrant hostel in the heart of Camden, perfect for young travelers looking to experience London's music scene and nightlife.",
    pricePerNight: 35,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Free WiFi", "24/7 Reception", "Common Room", "Kitchen", "Lockers"],
    reviews: [
      {
        id: "1",
        userName: "Sarah M.",
        rating: 5,
        comment: "Amazing atmosphere and great location! Met so many cool people here.",
        date: new Date("2024-01-15")
      },
      {
        id: "2",
        userName: "Mike R.",
        rating: 4,
        comment: "Clean facilities and friendly staff. Would definitely stay again.",
        date: new Date("2024-01-20")
      }
    ]
  },
  {
    name: "Paris Central Hostel",
    city: "Paris",
    address: "45 Rue de Rivoli, Paris, France",
    description: "Modern hostel near the Louvre with stunning city views and contemporary amenities.",
    pricePerNight: 42,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Free WiFi", "Breakfast included", "City views", "Lockers", "Common Room"],
    reviews: [
      {
        id: "3",
        userName: "Emma L.",
        rating: 4,
        comment: "Great location and beautiful views of the city.",
        date: new Date("2024-02-01")
      }
    ]
  },
  {
    name: "Barcelona Beach Hostel",
    city: "Barcelona",
    address: "88 Carrer de la Marina, Barcelona, Spain",
    description: "Beachfront hostel with direct access to Barcelona's beautiful beaches and vibrant nightlife.",
    pricePerNight: 28,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Beach access", "Free WiFi", "Rooftop terrace", "Kitchen", "Bike rental"],
    reviews: [
      {
        id: "4",
        userName: "Carlos D.",
        rating: 5,
        comment: "Perfect location right by the beach! Amazing sunset views.",
        date: new Date("2024-02-10")
      }
    ]
  },
  {
    name: "Amsterdam Canal Hostel",
    city: "Amsterdam",
    address: "12 Prinsengracht, Amsterdam, Netherlands",
    description: "Historic canal house converted into a cozy hostel with traditional Dutch charm.",
    pricePerNight: 38,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Canal views", "Free WiFi", "Bike rental", "Common Room", "Kitchen"],
    reviews: []
  },
  {
    name: "Berlin Underground",
    city: "Berlin",
    address: "77 Warschauer Strasse, Berlin, Germany",
    description: "Industrial-style hostel in Friedrichshain, heart of Berlin's alternative culture scene.",
    pricePerNight: 25,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["24/7 Reception", "Free WiFi", "Bar", "Common Room", "Lockers"],
    reviews: [
      {
        id: "5",
        userName: "Anna K.",
        rating: 4,
        comment: "Great vibe and perfect for exploring Berlin's nightlife.",
        date: new Date("2024-01-25")
      }
    ]
  },
  {
    name: "Rome Colosseum View",
    city: "Rome",
    address: "34 Via dei Fori Imperiali, Rome, Italy",
    description: "Historic hostel with incredible views of the Colosseum and easy access to ancient Rome.",
    pricePerNight: 45,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Colosseum views", "Free WiFi", "Rooftop terrace", "Kitchen", "Tours"],
    reviews: []
  },
  {
    name: "Prague Castle Hostel",
    city: "Prague",
    address: "56 Nerudova Street, Prague, Czech Republic",
    description: "Charming hostel in the castle district with medieval atmosphere and stunning city views.",
    pricePerNight: 22,
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Castle views", "Free WiFi", "Common Room", "Kitchen", "24/7 Reception"],
    reviews: []
  },
  {
    name: "Budapest Thermal Hostel",
    city: "Budapest",
    address: "89 Váci Street, Budapest, Hungary",
    description: "Modern hostel near the famous thermal baths with access to spa facilities.",
    pricePerNight: 30,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Spa access", "Free WiFi", "Common Room", "Kitchen", "Lockers"],
    reviews: []
  },
  {
    name: "Vienna Music Hostel",
    city: "Vienna",
    address: "23 Kärntner Strasse, Vienna, Austria",
    description: "Music-themed hostel in the city center, perfect for classical music lovers and culture enthusiasts.",
    pricePerNight: 35,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Music room", "Free WiFi", "Concert tickets", "Common Room", "Kitchen"],
    reviews: []
  },
  {
    name: "Lisbon Sunrise Hostel",
    city: "Lisbon",
    address: "67 Rua Augusta, Lisbon, Portugal",
    description: "Colorful hostel in Baixa district with rooftop views and traditional Portuguese breakfast.",
    pricePerNight: 26,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Rooftop views", "Portuguese breakfast", "Free WiFi", "Common Room", "City tours"],
    reviews: [
      {
        id: "6",
        userName: "Pedro S.",
        rating: 5,
        comment: "Fantastic breakfast and amazing rooftop views of the city!",
        date: new Date("2024-02-05")
      }
    ]
  },

  // NEW INDIAN HOSTELS
  {
    name: "Delhi Heritage Backpackers",
    city: "Delhi",
    address: "15 Main Bazaar, Paharganj, New Delhi, India",
    description: "Budget-friendly hostel in the heart of Delhi's backpacker district, walking distance to New Delhi Railway Station and major attractions.",
    pricePerNight: 800, // ₹800 per night
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Free WiFi", "24/7 Reception", "Rooftop restaurant", "Lockers", "Travel desk"],
    reviews: [
      {
        id: "7",
        userName: "Priya S.",
        rating: 4,
        comment: "Great location for exploring Old Delhi and Red Fort. Staff was very helpful with travel arrangements.",
        date: new Date("2024-01-28")
      },
      {
        id: "8",
        userName: "David L.",
        rating: 4,
        comment: "Perfect base for Delhi exploration. The rooftop restaurant has amazing views!",
        date: new Date("2024-02-12")
      }
    ]
  },
  {
    name: "Mumbai Marine Drive Hostel",
    city: "Mumbai",
    address: "45 Marine Drive, Fort, Mumbai, India",
    description: "Modern hostel overlooking the Queen's Necklace with easy access to Gateway of India and Bollywood studios.",
    pricePerNight: 1200, // ₹1200 per night
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Ocean views", "Free WiFi", "Common kitchen", "Laundry", "24/7 Security"],
    reviews: [
      {
        id: "9",
        userName: "Raj P.",
        rating: 5,
        comment: "Waking up to Marine Drive views every morning was incredible! Great hostel in the heart of Mumbai.",
        date: new Date("2024-02-08")
      }
    ]
  },
  {
    name: "Goa Beach Paradise Hostel",
    city: "Goa",
    address: "23 Baga Beach Road, North Goa, India",
    description: "Beachside hostel just steps away from Baga Beach, perfect for beach lovers and party enthusiasts.",
    pricePerNight: 900, // ₹900 per night
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Beach access", "Pool", "Free WiFi", "Beach volleyball", "Bike rental"],
    reviews: [
      {
        id: "10",
        userName: "Lisa M.",
        rating: 5,
        comment: "Amazing beach vibes! Perfect location and the pool area is great for meeting other travelers.",
        date: new Date("2024-01-30")
      }
    ]
  },
  {
    name: "Jaipur Pink City Hostel",
    city: "Jaipur",
    address: "78 MI Road, Jaipur, Rajasthan, India",
    description: "Traditional Rajasthani architecture hostel in the Pink City, close to Hawa Mahal and City Palace.",
    pricePerNight: 700, // ₹700 per night
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Traditional architecture", "Free WiFi", "Rooftop terrace", "Cultural tours", "Lockers"],
    reviews: [
      {
        id: "11",
        userName: "Ahmed K.",
        rating: 4,
        comment: "Beautiful traditional building and great location. The cultural tours organized by the hostel were fantastic!",
        date: new Date("2024-02-15")
      }
    ]
  },
  {
    name: "Bangalore Tech Hub Hostel",
    city: "Bangalore",
    address: "12 Brigade Road, Bangalore, Karnataka, India",
    description: "Modern hostel in the Silicon Valley of India, perfect for digital nomads and tech enthusiasts.",
    pricePerNight: 950, // ₹950 per night
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["High-speed WiFi", "Co-working space", "24/7 Reception", "Cafeteria", "Lockers"],
    reviews: [
      {
        id: "12",
        userName: "Tech Nomad",
        rating: 4,
        comment: "Perfect for remote work! Great co-working space and reliable internet. Met lots of fellow techies.",
        date: new Date("2024-02-03")
      }
    ]
  },
  {
    name: "Kerala Backwaters Hostel",
    city: "Kochi",
    address: "34 Fort Kochi, Ernakulam, Kerala, India",
    description: "Colonial-era hostel in historic Fort Kochi with easy access to backwater cruises and spice markets.",
    pricePerNight: 750, // ₹750 per night
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Historic architecture", "Backwater tours", "Free WiFi", "Spice garden", "Traditional meals"],
    reviews: [
      {
        id: "13",
        userName: "Maria G.",
        rating: 5,
        comment: "The backwater cruise arranged by the hostel was magical! Beautiful historic building and friendly staff.",
        date: new Date("2024-01-22")
      }
    ]
  },
  {
    name: "Rishikesh Yoga Retreat Hostel",
    city: "Rishikesh",
    address: "56 Laxman Jhula Road, Rishikesh, Uttarakhand, India",
    description: "Peaceful hostel by the Ganges, perfect for yoga enthusiasts and spiritual seekers visiting the Yoga Capital of the World.",
    pricePerNight: 600, // ₹600 per night
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Yoga classes", "Ganges views", "Meditation hall", "Free WiFi", "Organic meals"],
    reviews: [
      {
        id: "14",
        userName: "Sarah Y.",
        rating: 5,
        comment: "Life-changing experience! The morning yoga sessions by the Ganges were incredible. Very peaceful atmosphere.",
        date: new Date("2024-02-18")
      }
    ]
  },
  {
    name: "Udaipur Lake Palace Hostel",
    city: "Udaipur",
    address: "89 Lake Pichola Road, Udaipur, Rajasthan, India",
    description: "Romantic hostel overlooking Lake Pichola with stunning views of the City Palace and Jag Mandir.",
    pricePerNight: 850, // ₹850 per night
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Lake views", "Rooftop restaurant", "Free WiFi", "Boat rides", "Cultural shows"],
    reviews: [
      {
        id: "15",
        userName: "Romantic Traveler",
        rating: 5,
        comment: "Most beautiful hostel location ever! Watching sunset over Lake Pichola from the rooftop was magical.",
        date: new Date("2024-02-01")
      }
    ]
  },
  {
    name: "Kolkata Cultural Heritage Hostel",
    city: "Kolkata",
    address: "23 Park Street, Kolkata, West Bengal, India",
    description: "Heritage hostel in the cultural capital of India, close to Victoria Memorial and Indian Museum.",
    pricePerNight: 700, // ₹700 per night
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Heritage building", "Book exchange", "Free WiFi", "Cultural tours", "Bengali cuisine"],
    reviews: [
      {
        id: "16",
        userName: "Literature Lover",
        rating: 4,
        comment: "Perfect for culture enthusiasts! Great book collection and the Bengali food was authentic and delicious.",
        date: new Date("2024-01-25")
      }
    ]
  },
  {
    name: "Manali Mountain Adventure Hostel",
    city: "Manali",
    address: "67 Old Manali Road, Manali, Himachal Pradesh, India",
    description: "Adventure hostel in the Himalayas, perfect base for trekking, paragliding, and mountain biking.",
    pricePerNight: 800, // ₹800 per night
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Mountain views", "Adventure sports", "Bonfire area", "Free WiFi", "Trekking guides"],
    reviews: [
      {
        id: "17",
        userName: "Adventure Seeker",
        rating: 5,
        comment: "Best hostel for adventure activities! Staff helped organize amazing treks and the mountain views are breathtaking.",
        date: new Date("2024-02-10")
      }
    ]
  },
    {
    name: "The Backpacker's Haven",
    city: "London",
    address: "123 Camden Street, London, UK",
    description: "A vibrant hostel in the heart of Camden, perfect for young travelers looking to experience London's music scene and nightlife.",
    pricePerNight: 35,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Free WiFi", "24/7 Reception", "Common Room", "Kitchen", "Lockers"],
    reviews: [
      {
        id: "1",
        userName: "Sarah M.",
        rating: 5,
        comment: "Amazing atmosphere and great location! Met so many cool people here.",
        date: new Date("2024-01-15")
      },
      {
        id: "2",
        userName: "Mike R.",
        rating: 4,
        comment: "Clean facilities and friendly staff. Would definitely stay again.",
        date: new Date("2024-01-20")
      }
    ]
  },
  {
    name: "Paris Central Hostel",
    city: "Paris",
    address: "45 Rue de Rivoli, Paris, France",
    description: "Modern hostel near the Louvre with stunning city views and contemporary amenities.",
    pricePerNight: 42,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Free WiFi", "Breakfast included", "City views", "Lockers", "Common Room"],
    reviews: [
      {
        id: "3",
        userName: "Emma L.",
        rating: 4,
        comment: "Great location and beautiful views of the city.",
        date: new Date("2024-02-01")
      }
    ]
  },
  {
    name: "Barcelona Beach Hostel",
    city: "Barcelona",
    address: "88 Carrer de la Marina, Barcelona, Spain",
    description: "Beachfront hostel with direct access to Barcelona's beautiful beaches and vibrant nightlife.",
    pricePerNight: 28,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Beach access", "Free WiFi", "Rooftop terrace", "Kitchen", "Bike rental"],
    reviews: [
      {
        id: "4",
        userName: "Carlos D.",
        rating: 5,
        comment: "Perfect location right by the beach! Amazing sunset views.",
        date: new Date("2024-02-10")
      }
    ]
  },
  {
    name: "Amsterdam Canal Hostel",
    city: "Amsterdam",
    address: "12 Prinsengracht, Amsterdam, Netherlands",
    description: "Historic canal house converted into a cozy hostel with traditional Dutch charm.",
    pricePerNight: 38,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Canal views", "Free WiFi", "Bike rental", "Common Room", "Kitchen"],
    reviews: []
  },
  {
    name: "Berlin Underground",
    city: "Berlin",
    address: "77 Warschauer Strasse, Berlin, Germany",
    description: "Industrial-style hostel in Friedrichshain, heart of Berlin's alternative culture scene.",
    pricePerNight: 25,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["24/7 Reception", "Free WiFi", "Bar", "Common Room", "Lockers"],
    reviews: [
      {
        id: "5",
        userName: "Anna K.",
        rating: 4,
        comment: "Great vibe and perfect for exploring Berlin's nightlife.",
        date: new Date("2024-01-25")
      }
    ]
  },
  {
    name: "Rome Colosseum View",
    city: "Rome",
    address: "34 Via dei Fori Imperiali, Rome, Italy",
    description: "Historic hostel with incredible views of the Colosseum and easy access to ancient Rome.",
    pricePerNight: 45,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Colosseum views", "Free WiFi", "Rooftop terrace", "Kitchen", "Tours"],
    reviews: []
  },
  {
    name: "Prague Castle Hostel",
    city: "Prague",
    address: "56 Nerudova Street, Prague, Czech Republic",
    description: "Charming hostel in the castle district with medieval atmosphere and stunning city views.",
    pricePerNight: 22,
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Castle views", "Free WiFi", "Common Room", "Kitchen", "24/7 Reception"],
    reviews: []
  },
  {
    name: "Budapest Thermal Hostel",
    city: "Budapest",
    address: "89 Váci Street, Budapest, Hungary",
    description: "Modern hostel near the famous thermal baths with access to spa facilities.",
    pricePerNight: 30,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Spa access", "Free WiFi", "Common Room", "Kitchen", "Lockers"],
    reviews: []
  },
  {
    name: "Vienna Music Hostel",
    city: "Vienna",
    address: "23 Kärntner Strasse, Vienna, Austria",
    description: "Music-themed hostel in the city center, perfect for classical music lovers and culture enthusiasts.",
    pricePerNight: 35,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Music room", "Free WiFi", "Concert tickets", "Common Room", "Kitchen"],
    reviews: []
  },
  {
    name: "Lisbon Sunrise Hostel",
    city: "Lisbon",
    address: "67 Rua Augusta, Lisbon, Portugal",
    description: "Colorful hostel in Baixa district with rooftop views and traditional Portuguese breakfast.",
    pricePerNight: 26,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Rooftop views", "Portuguese breakfast", "Free WiFi", "Common Room", "City tours"],
    reviews: [
      {
        id: "6",
        userName: "Pedro S.",
        rating: 5,
        comment: "Fantastic breakfast and amazing rooftop views of the city!",
        date: new Date("2024-02-05")
      }
    ]
  },

  // INDIAN HOSTELS
  {
    name: "Delhi Heritage Backpackers",
    city: "Delhi",
    address: "15 Main Bazaar, Paharganj, New Delhi, India",
    description: "Budget-friendly hostel in the heart of Delhi's backpacker district, walking distance to New Delhi Railway Station and major attractions.",
    pricePerNight: 800,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Free WiFi", "24/7 Reception", "Rooftop restaurant", "Lockers", "Travel desk"],
    reviews: [
      {
        id: "7",
        userName: "Priya S.",
        rating: 4,
        comment: "Great location for exploring Old Delhi and Red Fort. Staff was very helpful with travel arrangements.",
        date: new Date("2024-01-28")
      },
      {
        id: "8",
        userName: "David L.",
        rating: 4,
        comment: "Perfect base for Delhi exploration. The rooftop restaurant has amazing views!",
        date: new Date("2024-02-12")
      }
    ]
  },
  {
    name: "Mumbai Marine Drive Hostel",
    city: "Mumbai",
    address: "45 Marine Drive, Fort, Mumbai, India",
    description: "Modern hostel overlooking the Queen's Necklace with easy access to Gateway of India and Bollywood studios.",
    pricePerNight: 1200,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Ocean views", "Free WiFi", "Common kitchen", "Laundry", "24/7 Security"],
    reviews: [
      {
        id: "9",
        userName: "Raj P.",
        rating: 5,
        comment: "Waking up to Marine Drive views every morning was incredible! Great hostel in the heart of Mumbai.",
        date: new Date("2024-02-08")
      }
    ]
  },
  {
    name: "Goa Beach Paradise Hostel",
    city: "Goa",
    address: "23 Baga Beach Road, North Goa, India",
    description: "Beachside hostel just steps away from Baga Beach, perfect for beach lovers and party enthusiasts.",
    pricePerNight: 900,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Beach access", "Pool", "Free WiFi", "Beach volleyball", "Bike rental"],
    reviews: [
      {
        id: "10",
        userName: "Lisa M.",
        rating: 5,
        comment: "Amazing beach vibes! Perfect location and the pool area is great for meeting other travelers.",
        date: new Date("2024-01-30")
      }
    ]
  },
  {
    name: "Jaipur Pink City Hostel",
    city: "Jaipur",
    address: "78 MI Road, Jaipur, Rajasthan, India",
    description: "Traditional Rajasthani architecture hostel in the Pink City, close to Hawa Mahal and City Palace.",
    pricePerNight: 700,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Traditional architecture", "Free WiFi", "Rooftop terrace", "Cultural tours", "Lockers"],
    reviews: [
      {
        id: "11",
        userName: "Ahmed K.",
        rating: 4,
        comment: "Beautiful traditional building and great location. The cultural tours organized by the hostel were fantastic!",
        date: new Date("2024-02-15")
      }
    ]
  },
  {
    name: "Bangalore Tech Hub Hostel",
    city: "Bangalore",
    address: "12 Brigade Road, Bangalore, Karnataka, India",
    description: "Modern hostel in the Silicon Valley of India, perfect for digital nomads and tech enthusiasts.",
    pricePerNight: 950,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["High-speed WiFi", "Co-working space", "24/7 Reception", "Cafeteria", "Lockers"],
    reviews: [
      {
        id: "12",
        userName: "Tech Nomad",
        rating: 4,
        comment: "Perfect for remote work! Great co-working space and reliable internet. Met lots of fellow techies.",
        date: new Date("2024-02-03")
      }
    ]
  },
  {
    name: "Kerala Backwaters Hostel",
    city: "Kochi",
    address: "34 Fort Kochi, Ernakulam, Kerala, India",
    description: "Colonial-era hostel in historic Fort Kochi with easy access to backwater cruises and spice markets.",
    pricePerNight: 750,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Historic architecture", "Backwater tours", "Free WiFi", "Spice garden", "Traditional meals"],
    reviews: [
      {
        id: "13",
        userName: "Maria G.",
        rating: 5,
        comment: "The backwater cruise arranged by the hostel was magical! Beautiful historic building and friendly staff.",
        date: new Date("2024-01-22")
      }
    ]
  },
  {
    name: "Rishikesh Yoga Retreat Hostel",
    city: "Rishikesh",
    address: "56 Laxman Jhula Road, Rishikesh, Uttarakhand, India",
    description: "Peaceful hostel by the Ganges, perfect for yoga enthusiasts and spiritual seekers visiting the Yoga Capital of the World.",
    pricePerNight: 600,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Yoga classes", "Ganges views", "Meditation hall", "Free WiFi", "Organic meals"],
    reviews: [
      {
        id: "14",
        userName: "Sarah Y.",
        rating: 5,
        comment: "Life-changing experience! The morning yoga sessions by the Ganges were incredible. Very peaceful atmosphere.",
        date: new Date("2024-02-18")
      }
    ]
  },
  {
    name: "Udaipur Lake Palace Hostel",
    city: "Udaipur",
    address: "89 Lake Pichola Road, Udaipur, Rajasthan, India",
    description: "Romantic hostel overlooking Lake Pichola with stunning views of the City Palace and Jag Mandir.",
    pricePerNight: 850,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Lake views", "Rooftop restaurant", "Free WiFi", "Boat rides", "Cultural shows"],
    reviews: [
      {
        id: "15",
        userName: "Romantic Traveler",
        rating: 5,
        comment: "Most beautiful hostel location ever! Watching sunset over Lake Pichola from the rooftop was magical.",
        date: new Date("2024-02-01")
      }
    ]
  },
  {
    name: "Kolkata Cultural Heritage Hostel",
    city: "Kolkata",
    address: "23 Park Street, Kolkata, West Bengal, India",
    description: "Heritage hostel in the cultural capital of India, close to Victoria Memorial and Indian Museum.",
    pricePerNight: 700,
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Heritage building", "Book exchange", "Free WiFi", "Cultural tours", "Bengali cuisine"],
    reviews: [
      {
        id: "16",
        userName: "Literature Lover",
        rating: 4,
        comment: "Perfect for culture enthusiasts! Great book collection and the Bengali food was authentic and delicious.",
        date: new Date("2024-01-25")
      }
    ]
  },
  {
    name: "Manali Mountain Adventure Hostel",
    city: "Manali",
    address: "67 Old Manali Road, Manali, Himachal Pradesh, India",
    description: "Adventure hostel in the Himalayas, perfect base for trekking, paragliding, and mountain biking.",
    pricePerNight: 800,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Mountain views", "Adventure sports", "Bonfire area", "Free WiFi", "Trekking guides"],
    reviews: [
      {
        id: "17",
        userName: "Adventure Seeker",
        rating: 5,
        comment: "Best hostel for adventure activities! Staff helped organize amazing treks and the mountain views are breathtaking.",
        date: new Date("2024-02-10")
      }
    ]
  },

  // NEW ASIAN HOSTELS
  {
    name: "Tokyo Shibuya Capsule Hostel",
    city: "Tokyo",
    address: "2-15-17 Shibuya, Tokyo, Japan",
    description: "Ultra-modern capsule hostel in the heart of Shibuya, featuring high-tech pods and traditional Japanese hospitality.",
    pricePerNight: 3500, // ¥3500 per night
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Capsule pods", "Free WiFi", "Onsen bath", "24/7 Reception", "Vending machines"],
    reviews: [
      {
        id: "18",
        userName: "Kenji T.",
        rating: 5,
        comment: "Amazing futuristic experience! The capsules are so comfortable and the onsen was perfect after exploring Tokyo.",
        date: new Date("2024-02-20")
      }
    ]
  },
  {
    name: "Seoul Gangnam Digital Hostel",
    city: "Seoul",
    address: "456 Gangnam-daero, Seoul, South Korea",
    description: "High-tech hostel in trendy Gangnam district with gaming lounges and K-pop themed rooms.",
    pricePerNight: 35000, // ₩35,000 per night
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Gaming lounge", "K-pop karaoke", "Free WiFi", "Korean BBQ", "24/7 Reception"],
    reviews: [
      {
        id: "19",
        userName: "Min-Jun K.",
        rating: 5,
        comment: "Perfect for K-pop fans! The karaoke nights were incredible and met so many international friends.",
        date: new Date("2024-02-14")
      }
    ]
  },
  {
    name: "Bangkok Khao San Road Hostel",
    city: "Bangkok",
    address: "89 Khao San Road, Bangkok, Thailand",
    description: "Iconic backpacker hostel on the famous Khao San Road, heart of Southeast Asian backpacking culture.",
    pricePerNight: 600, // ฿600 per night
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Street food tours", "Free WiFi", "Rooftop bar", "Lockers", "Travel desk"],
    reviews: [
      {
        id: "20",
        userName: "Backpacker Bob",
        rating: 4,
        comment: "Classic backpacker experience! Great location and amazing street food right outside the door.",
        date: new Date("2024-02-16")
      }
    ]
  },
  {
    name: "Singapore Little India Hostel",
    city: "Singapore",
    address: "45 Serangoon Road, Singapore",
    description: "Cultural hostel in vibrant Little India district with multicultural atmosphere and hawker center access.",
    pricePerNight: 65, // S$65 per night
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Cultural tours", "Free WiFi", "Hawker center access", "Common kitchen", "Lockers"],
    reviews: [
      {
        id: "21",
        userName: "Cultural Explorer",
        rating: 4,
        comment: "Amazing cultural immersion! The food tours were fantastic and learned so much about Singapore's history.",
        date: new Date("2024-02-18")
      }
    ]
  },{
    name: "Hyderabad Charminar Heritage Hostel",
    city: "Hyderabad",
    address: "12 Charminar Road, Old City, Hyderabad, Telangana, India",
    description: "Historic hostel near the iconic Charminar with traditional Nizami architecture and famous biryani experiences.",
    pricePerNight: 850,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Heritage architecture", "Biryani cooking classes", "Free WiFi", "Cultural tours", "Traditional meals"],
    reviews: [
      {
        id: "200",
        userName: "Arjun R.",
        rating: 5,
        comment: "The biryani cooking class was amazing! Perfect location to explore Charminar and Golconda Fort.",
        date: new Date("2024-02-22")
      },
      {
        id: "201",
        userName: "Food Lover",
        rating: 4,
        comment: "Best biryani I've ever had! The hostel's location in Old City is perfect for food walks.",
        date: new Date("2024-02-25")
      }
    ]
  },
  {
    name: "Vizag Beach View Hostel",
    city: "Visakhapatnam",
    address: "78 Beach Road, RK Beach, Visakhapatnam, Andhra Pradesh, India",
    description: "Beachfront hostel with stunning Bay of Bengal views, perfect for beach lovers and submarine museum visits.",
    pricePerNight: 750,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Beach access", "Ocean views", "Free WiFi", "Surfing lessons", "Seafood restaurant"],
    reviews: [
      {
        id: "202",
        userName: "Beach Bum",
        rating: 5,
        comment: "Waking up to ocean views every day was incredible! The surfing lessons were so much fun.",
        date: new Date("2024-02-20")
      },
      {
        id: "203",
        userName: "Navy Enthusiast",
        rating: 4,
        comment: "Great location near the submarine museum. The seafood at the hostel restaurant was fresh and delicious!",
        date: new Date("2024-02-28")
      }
    ]
  },
  {
    name: "Bengaluru Garden City Hostel",
    city: "Bengaluru",
    address: "34 MG Road, Bengaluru, Karnataka, India",
    description: "Modern hostel in the heart of India's Silicon Valley with rooftop gardens and tech meetup spaces.",
    pricePerNight: 1000,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Rooftop garden", "Tech meetup space", "High-speed WiFi", "Co-working area", "Craft beer bar"],
    reviews: [
      {
        id: "204",
        userName: "Startup Founder",
        rating: 5,
        comment: "Perfect for tech professionals! Met amazing people at the tech meetups and the co-working space was excellent.",
        date: new Date("2024-02-24")
      },
      {
        id: "205",
        userName: "Digital Nomad Pro",
        rating: 4,
        comment: "Great WiFi and work environment. The rooftop garden is perfect for relaxing after long coding sessions.",
        date: new Date("2024-03-01")
      }
    ]
  },
  {
    name: "Kerala Munnar Hills Hostel",
    city: "Munnar",
    address: "56 Tea Estate Road, Munnar, Kerala, India",
    description: "Mountain hostel surrounded by tea plantations with breathtaking hill station views and plantation tours.",
    pricePerNight: 650,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Tea plantation tours", "Mountain views", "Free WiFi", "Trekking guides", "Organic tea tasting"],
    reviews: [
      {
        id: "206",
        userName: "Tea Lover",
        rating: 5,
        comment: "The tea plantation tour was incredible! Learned so much about tea processing and the views are breathtaking.",
        date: new Date("2024-02-26")
      },
      {
        id: "207",
        userName: "Mountain Trekker",
        rating: 5,
        comment: "Perfect base for trekking in the Western Ghats. The sunrise views from the hostel are absolutely stunning!",
        date: new Date("2024-03-02")
      }
    ]
  },
  {
    name: "Kerala Alleppey Houseboat Hostel",
    city: "Alleppey",
    address: "23 Backwater Lane, Alleppey, Kerala, India",
    description: "Unique floating hostel experience on traditional Kerala houseboats in the famous backwaters.",
    pricePerNight: 1200,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Houseboat accommodation", "Backwater cruises", "Traditional Kerala meals", "Fishing experiences", "Ayurvedic spa"],
    reviews: [
      {
        id: "208",
        userName: "Unique Experience Seeker",
        rating: 5,
        comment: "Most unique hostel experience ever! Sleeping on a houseboat in the backwaters was magical. The traditional meals were incredible!",
        date: new Date("2024-02-27")
      },
      {
        id: "209",
        userName: "Nature Photographer",
        rating: 5,
        comment: "Paradise for photography! The sunrise and sunset views from the houseboat were spectacular. Ayurvedic spa was so relaxing.",
        date: new Date("2024-03-03")
      }
    ]
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Hostel.deleteMany({});
    console.log('Cleared existing hostels');

    const hostels = await Hostel.insertMany(hostelData);
    console.log(`Inserted ${hostels.length} hostels`);

    for (let hostel of hostels) {
      if (hostel.reviews.length > 0) {
        hostel.updateRating();
        await hostel.save();
      }
    }

    console.log('Database seeded successfully!');
    console.log(`Total hostels: ${hostels.length}`);
    console.log(`European hostels: ${hostels.filter(h => !['Delhi', 'Mumbai', 'Goa', 'Jaipur', 'Bangalore', 'Kochi', 'Rishikesh', 'Udaipur', 'Kolkata', 'Manali'].includes(h.city)).length}`);
    console.log(`Indian hostels: ${hostels.filter(h => ['Delhi', 'Mumbai', 'Goa', 'Jaipur', 'Bangalore', 'Kochi', 'Rishikesh', 'Udaipur', 'Kolkata', 'Manali'].includes(h.city)).length}`);
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seedDatabase();