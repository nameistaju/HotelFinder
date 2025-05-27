
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { CalendarIcon, Users } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Hostel } from '@/services/hostelService';
import { useApi } from '@/hooks/useApi';
import { useToast } from '@/hooks/use-toast';

interface BookingFormProps {
  hostel: Hostel;
}

const BookingForm = ({ hostel }: BookingFormProps) => {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(2);
  const [loading, setLoading] = useState(false);

  const { apiCall } = useApi();
  const { toast } = useToast();

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    return nights * hostel.pricePerNight * guests;
  };

  const handleBooking = async () => {
    if (!checkIn || !checkOut) {
      toast({
        title: "Missing dates",
        description: "Please select check-in and check-out dates",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      await apiCall('/bookings', {
        method: 'POST',
        body: {
          hostelId: hostel._id,
          checkIn: checkIn.toISOString(),
          checkOut: checkOut.toISOString(),
          guests
        },
        requiresAuth: true
      });

      toast({
        title: "Booking created!",
        description: "Your booking has been successfully created.",
      });

      // Reset form
      setCheckIn(undefined);
      setCheckOut(undefined);
      setGuests(2);
    } catch (error) {
      toast({
        title: "Booking failed",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="sticky top-24">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <div className="text-2xl font-bold text-travel-blue mb-1">
            ${hostel.pricePerNight}
          </div>
          <div className="text-gray-600">per night</div>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <Label className="text-sm font-medium mb-1">Check-in</Label>
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
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label className="text-sm font-medium mb-1">Check-out</Label>
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
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="guests" className="text-sm font-medium mb-1">Guests</Label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="guests"
                type="number"
                min="1"
                max="10"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {checkIn && checkOut && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between text-sm">
              <span>${hostel.pricePerNight} x {calculateNights()} nights x {guests} guests</span>
              <span>${calculateTotal()}</span>
            </div>
          </div>
        )}

        <Button 
          onClick={handleBooking}
          disabled={loading || !checkIn || !checkOut}
          className="w-full bg-travel-blue hover:bg-travel-blue/90 text-white mb-4"
        >
          {loading ? 'Creating booking...' : 'Book Now'}
        </Button>

        <Separator className="my-4" />

        <div className="text-xs text-gray-500 text-center">
          You won't be charged yet - this is a mock booking
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
