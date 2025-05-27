
import { useApi } from '@/hooks/useApi';

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

export const useHostelService = () => {
  const { apiCall } = useApi();

  const getHostels = async (city?: string, page = 1, limit = 10) => {
    const params = new URLSearchParams();
    if (city) params.set('city', city);
    params.set('page', page.toString());
    params.set('limit', limit.toString());
    
    return apiCall(`/hostels?${params.toString()}`);
  };

  const getHostelById = async (id: string) => {
    return apiCall(`/hostels/${id}`);
  };

  const addReview = async (hostelId: string, rating: number, comment: string) => {
    return apiCall(`/hostels/${hostelId}/reviews`, {
      method: 'POST',
      body: { rating, comment },
      requiresAuth: true
    });
  };

  return {
    getHostels,
    getHostelById,
    addReview
  };
};
