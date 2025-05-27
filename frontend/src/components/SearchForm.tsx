
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Search, Users } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface SearchFormProps {
  variant?: 'hero' | 'compact';
}

const SearchForm = ({ variant = 'hero' }: SearchFormProps) => {
  const [city, setCity] = useState('');
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState('2');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', { city, checkIn, checkOut, guests });
    
    // Navigate to search results with query parameters
    const params = new URLSearchParams();
    if (city) params.set('city', city);
    if (checkIn) params.set('checkIn', checkIn.toISOString());
    if (checkOut) params.set('checkOut', checkOut.toISOString());
    if (guests) params.set('guests', guests);
    
    navigate(`/search?${params.toString()}`);
  };

  const isHeroVariant = variant === 'hero';

  return (
    <Card className={cn(
      "p-6 shadow-lg animate-fade-in",
      isHeroVariant ? "bg-white/95 backdrop-blur-sm max-w-4xl mx-auto" : "bg-white"
    )}>
      <form onSubmit={handleSearch}>
        <div className={cn(
          "grid gap-4",
          isHeroVariant ? "grid-cols-1 md:grid-cols-4" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        )}>
          {/* Destination */}
          <div className="space-y-2">
            <Label htmlFor="city" className="text-sm font-medium">
              Destination
            </Label>
            <Input
              id="city"
              type="text"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Check-in Date */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Check-in</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !checkIn && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkIn ? format(checkIn, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white" align="start">
                <Calendar
                  mode="single"
                  selected={checkIn}
                  onSelect={setCheckIn}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Check-out Date */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Check-out</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !checkOut && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkOut ? format(checkOut, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white" align="start">
                <Calendar
                  mode="single"
                  selected={checkOut}
                  onSelect={setCheckOut}
                  disabled={(date) => date < (checkIn || new Date())}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Guests */}
          <div className="space-y-2">
            <Label htmlFor="guests" className="text-sm font-medium">
              Guests
            </Label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="guests"
                type="number"
                min="1"
                max="20"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        <Button 
          type="submit" 
          className={cn(
            "bg-travel-blue hover:bg-travel-blue/90 text-white",
            isHeroVariant ? "w-full md:w-auto mt-6" : "w-full mt-4"
          )}
          size="lg"
        >
          <Search className="mr-2 h-4 w-4" />
          Search Hostels
        </Button>
      </form>
    </Card>
  );
};

export default SearchForm;
