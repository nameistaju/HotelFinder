import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Star, X } from 'lucide-react';

interface FilterSidebarProps {
  onFilterChange: () => void;
}

const FilterSidebar = ({ onFilterChange }: FilterSidebarProps) => {
  const [priceRange, setPriceRange] = useState([500, 3000]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedCity, setSelectedCity] = useState('');

  const amenitiesList = [
    'Free WiFi',
    'Air Conditioning',
    'Kitchen',
    'Laundry',
    'Parking',
    'Breakfast',
    '24/7 Reception',
    'Lockers',
    'Common Room',
    'Rooftop',
    'Garden',
    'Security'
  ];

  const popularCities = [
    'Delhi',
    'Mumbai',
    'Bangalore',
    'Goa',
    'Jaipur',
    'Udaipur',
    'Rishikesh',
    'Manali',
    'Varanasi',
    'Kochi'
  ];

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setSelectedAmenities([...selectedAmenities, amenity]);
    } else {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    }
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRating(selectedRating === rating ? null : rating);
  };

  const clearAllFilters = () => {
    setPriceRange([500, 3000]);
    setSelectedAmenities([]);
    setSelectedRating(null);
    setSelectedCity('');
    onFilterChange();
  };

  const applyFilters = () => {
    // In a real implementation, you would pass these filters to the parent
    console.log('Applying filters:', {
      priceRange,
      selectedAmenities,
      selectedRating,
      selectedCity
    });
    onFilterChange();
  };

  const hasActiveFilters = selectedAmenities.length > 0 || selectedRating !== null || selectedCity !== '';

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      {/* Price Range */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Price Range (per night)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={5000}
            min={200}
            step={100}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
        </CardContent>
      </Card>

      {/* Popular Cities */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Popular Cities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {popularCities.map((city) => (
              <Badge
                key={city}
                variant={selectedCity === city ? "default" : "outline"}
                className={`cursor-pointer hover:bg-travel-blue hover:text-white ${
                  selectedCity === city ? 'bg-travel-blue text-white' : ''
                }`}
                onClick={() => setSelectedCity(selectedCity === city ? '' : city)}
              >
                {city}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rating */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Minimum Rating</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <div
              key={rating}
              className={`flex items-center space-x-2 p-2 rounded cursor-pointer hover:bg-gray-50 ${
                selectedRating === rating ? 'bg-travel-lightBlue' : ''
              }`}
              onClick={() => handleRatingChange(rating)}
            >
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm">{rating}+ stars</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Amenities */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Amenities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {amenitiesList.map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox
                id={amenity}
                checked={selectedAmenities.includes(amenity)}
                onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
              />
              <Label
                htmlFor={amenity}
                className="text-sm cursor-pointer"
              >
                {amenity}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Apply Filters Button */}
      <Button
        onClick={applyFilters}
        className="w-full bg-travel-blue hover:bg-travel-blue/90 text-white"
      >
        Apply Filters
      </Button>
    </div>
  );
};

export default FilterSidebar;