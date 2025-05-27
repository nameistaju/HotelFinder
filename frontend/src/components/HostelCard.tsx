
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin } from 'lucide-react';
import { Hostel } from '@/services/hostelService';

interface HostelCardProps {
  hostel: Hostel;
}

const HostelCard = ({ hostel }: HostelCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 animate-slide-up">
      <Link to={`/hostel/${hostel._id}`}>
        <div className="relative">
          <img
            src={hostel.image}
            alt={hostel.name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-3 right-3">
            <Badge className="bg-white text-travel-blue border-0 shadow-sm">
              ₹{hostel.pricePerNight}/night
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
              {hostel.name}
            </h3>
            <div className="flex items-center space-x-1 ml-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{hostel.rating}</span>
            </div>
          </div>
          
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{hostel.city}</span>
          </div>
          
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {hostel.description}
          </p>
          
          <div className="flex flex-wrap gap-1">
            {hostel.amenities.slice(0, 3).map((amenity, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {amenity}
              </Badge>
            ))}
            {hostel.amenities.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{hostel.amenities.length - 3} more
              </Badge>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default HostelCard;
