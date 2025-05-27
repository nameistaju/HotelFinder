
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Star, MapPin, ArrowLeft, Wifi, Coffee, Car, Users, Shield, Calendar } from 'lucide-react';
import { useHostelService, Hostel } from '@/services/hostelService';
import { useAuth } from '@/context/AuthContext';
import BookingForm from '@/components/BookingForm';

const HostelDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [hostel, setHostel] = useState<Hostel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { getHostelById } = useHostelService();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (id) {
      console.log('Loading hostel details for ID:', id);
      fetchHostel();
    }
  }, [id]);

  const fetchHostel = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      const hostelData = await getHostelById(id);
      setHostel(hostelData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load hostel details');
    } finally {
      setLoading(false);
    }
  };

  const getAmenityIcon = (amenity: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      'Free WiFi': <Wifi className="h-4 w-4" />,
      'Breakfast included': <Coffee className="h-4 w-4" />,
      'Kitchen': <Coffee className="h-4 w-4" />,
      'Common Room': <Users className="h-4 w-4" />,
      '24/7 Reception': <Shield className="h-4 w-4" />,
      'Parking': <Car className="h-4 w-4" />,
    };
    return icons[amenity] || <Shield className="h-4 w-4" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-20 pb-8">
          <div className="container mx-auto px-4">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="h-96 bg-gray-200 rounded-lg"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
                <div className="h-64 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !hostel) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-20 pb-8">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {error || 'Hostel not found'}
            </h1>
            <Link to="/search">
              <Button>Back to Search</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link to="/search" className="inline-flex items-center text-travel-blue hover:text-travel-blue/80 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Search
          </Link>

          {/* Hostel Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{hostel.name}</h1>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{hostel.rating}</span>
                    <span className="text-gray-600">({hostel.reviews.length} reviews)</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{hostel.address}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-travel-blue">
                  ${hostel.pricePerNight}
                </div>
                <div className="text-gray-600">per night</div>
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-3">
                <img
                  src={hostel.images[selectedImageIndex] || hostel.image}
                  alt={hostel.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
              {hostel.images.length > 1 && (
                <div className="space-y-2">
                  {hostel.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${hostel.name} ${index + 1}`}
                      className={`w-full h-24 object-cover rounded cursor-pointer transition-all ${
                        selectedImageIndex === index ? 'ring-2 ring-travel-blue' : 'opacity-70 hover:opacity-100'
                      }`}
                      onClick={() => setSelectedImageIndex(index)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">About this hostel</h2>
                  <p className="text-gray-600 leading-relaxed">{hostel.description}</p>
                </CardContent>
              </Card>

              {/* Amenities */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {hostel.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        {getAmenityIcon(amenity)}
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Reviews */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Reviews ({hostel.reviews.length})
                  </h2>
                  <div className="space-y-4">
                    {hostel.reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium">{review.userName}</div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{review.rating}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-1">{review.comment}</p>
                        <div className="text-xs text-gray-400">
                          {new Date(review.date).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              {isAuthenticated ? (
                <BookingForm hostel={hostel} />
              ) : (
                <Card className="sticky top-24">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-travel-blue mb-4">
                      ${hostel.pricePerNight}
                    </div>
                    <div className="text-gray-600 mb-6">per night</div>
                    
                    <Link to="/auth">
                      <Button className="w-full bg-travel-blue hover:bg-travel-blue/90 text-white">
                        Sign In to Book
                      </Button>
                    </Link>
                    
                    <div className="text-xs text-gray-500 mt-4">
                      Create an account to make a booking
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelDetails;
