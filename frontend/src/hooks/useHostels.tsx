    // hooks/useHostels.ts
    import { useState, useEffect } from 'react';
    import { useApi } from './useApi';

    interface Hostel {
    _id: string;
    name: string;
    city: string;
    address: string;
    images: string[];
    amenities: string[];
    priceRange: {
        min: number;
        max: number;
    };
    rating: number;
    reviews: Array<{
        id: string;
        userName: string;
        rating: number;
        comment: string;
        date: Date;
    }>;
    description: string;
    contactInfo: {
        phone: string;
        email: string;
    };
    }

    interface HostelsResponse {
    hostels: Hostel[];
    totalPages: number;
    currentPage: number;
    total: number;
    }

    export const useHostels = (city?: string, page: number = 1, limit: number = 10) => {
    const [hostels, setHostels] = useState<Hostel[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const { loading, error, apiCall } = useApi();

    const fetchHostels = async () => {
        try {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
        });
        
        if (city) {
            params.append('city', city);
        }

        const data: HostelsResponse = await apiCall(`/hostels?${params.toString()}`);
        
        setHostels(data.hostels);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
        setTotal(data.total);
        } catch (err) {
        console.error('Error fetching hostels:', err);
        }
    };

    useEffect(() => {
        fetchHostels();
    }, [city, page, limit]);

    return {
        hostels,
        totalPages,
        currentPage,
        total,
        loading,
        error,
        refetch: fetchHostels
    };
    };

    // Hook for fetching featured hostels (top 3 by rating)
    export const useFeaturedHostels = () => {
    const [featuredHostels, setFeaturedHostels] = useState<Hostel[]>([]);
    const { loading, error, apiCall } = useApi();

    const fetchFeaturedHostels = async () => {
        try {
        const data: HostelsResponse = await apiCall('/hostels?limit=3&page=1');
        setFeaturedHostels(data.hostels);
        } catch (err) {
        console.error('Error fetching featured hostels:', err);
        }
    };

    useEffect(() => {
        fetchFeaturedHostels();
    }, []);

    return {
        featuredHostels,
        loading,
        error,
        refetch: fetchFeaturedHostels
    };
    };