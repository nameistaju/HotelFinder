import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import HostelCard from '@/components/HostelCard';
import FilterSidebar from '@/components/FilterSidebar';
import Pagination from '@/components/Pagination';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyState from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import { useHostels } from '@/hooks/useHostels';
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  // Get search parameters
  const city = searchParams.get('city') || '';
  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');
  const guests = searchParams.get('guests') || '2';
  
  // Fetch hostels
  const { hostels, totalPages, total, loading, error, refetch } = useHostels(
    city || undefined, 
    currentPage, 
    12
  );

  // Reset to page 1 when search params change
  useEffect(() => {
    setCurrentPage(1);
  }, [city, checkIn, checkOut, guests]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSearchTitle = () => {
    if (city) {
      return `Hostels in ${city}`;
    }
    return 'All Hostels';
  };

  const getSearchSubtitle = () => {
    if (total === 0) return 'No hostels found';
    if (total === 1) return '1 hostel found';
    return `${total} hostels found`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {getSearchTitle()}
              </h1>
              <p className="text-gray-600">{getSearchSubtitle()}</p>
              {city && (
                <div className="mt-2 text-sm text-gray-500">
                  {checkIn && checkOut && (
                    <span>Check-in: {new Date(checkIn).toLocaleDateString()} • Check-out: {new Date(checkOut).toLocaleDateString()} • </span>
                  )}
                  <span>{guests} guest{guests !== '1' ? 's' : ''}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              {/* View Mode Toggle */}
              <div className="flex bg-white rounded-lg border">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Filters Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className={`md:block ${showFilters ? 'block' : 'hidden'} w-full md:w-80 shrink-0`}>
            <FilterSidebar onFilterChange={refetch} />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {loading && (
              <div className="flex justify-center py-12">
                <LoadingSpinner />
              </div>
            )}

            {error && (
              <div className="text-center py-12">
                <p className="text-red-600 mb-4">Error: {error}</p>
                <Button onClick={refetch} variant="outline">
                  Try Again
                </Button>
              </div>
            )}

            {!loading && !error && hostels.length === 0 && (
              <EmptyState
                title="No hostels found"
                description="Try adjusting your search criteria or filters"
                actionLabel="Clear Filters"
                onAction={() => {
                  setCurrentPage(1);
                  refetch();
                }}
                type="search"
              />
            )}

            {!loading && !error && hostels.length > 0 && (
              <>
                {/* Results Grid */}
                <div className={
                  viewMode === 'grid' 
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8"
                    : "space-y-4 mb-8"
                }>
                  {hostels.map((hostel, index) => (
                    <div 
                      key={hostel._id}
                      className="animate-slide-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <HostelCard hostel={hostel} />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;