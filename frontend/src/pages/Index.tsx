import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import SearchForm from '@/components/SearchForm';
import HostelCard from '@/components/HostelCard';
import HeroImageSlider from '@/components/HeroImageSlider';
import { Button } from '@/components/ui/button';
import { useFeaturedHostels } from '@/hooks/useHostels';
import { Star, Users, Shield, Heart, Loader2 } from 'lucide-react';

const Index = () => {
  const { featuredHostels, loading, error } = useFeaturedHostels();
  const navigate = useNavigate();

  const handleViewAllHostels = () => {
    navigate('/search');
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Slider */}
        <HeroImageSlider />
        
        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Find Your Perfect
            <span className="block text-travel-blue">Hostel Adventure</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 opacity-90 animate-slide-up">
            Discover amazing hostels across India and connect with fellow travelers
          </p>
          
          {/* Search Form */}
          <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <SearchForm variant="hero" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose HostelFinder?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make it easy to find and book the perfect hostel for your adventure across India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow animate-slide-up">
              <div className="bg-travel-lightBlue rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-travel-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Top-Rated Hostels</h3>
              <p className="text-gray-600">
                Discover highly-rated hostels with authentic reviews from real travelers
              </p>
            </div>

            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="bg-travel-lightBlue rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-travel-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Meet Fellow Travelers</h3>
              <p className="text-gray-600">
                Connect with like-minded adventurers and create unforgettable memories
              </p>
            </div>

            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-travel-lightBlue rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-travel-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Safe & Secure</h3>
              <p className="text-gray-600">
                Book with confidence knowing all our hostels are verified and secure
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Hostels Section */}
      <section className="py-20 bg-travel-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Hostels
            </h2>
            <p className="text-xl text-gray-600">
              Handpicked accommodations for the perfect stay across India
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-travel-blue" />
              <span className="ml-2 text-gray-600">Loading featured hostels...</span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">Failed to load featured hostels: {error}</p>
              <Button 
                onClick={() => window.location.reload()} 
                variant="outline"
                className="border-travel-blue text-travel-blue hover:bg-travel-blue hover:text-white"
              >
                Try Again
              </Button>
            </div>
          )}

          {/* Hostels Grid */}
          {!loading && !error && (
            <>
              {featuredHostels.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  {featuredHostels.map((hostel, index) => (
                    <div key={hostel._id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                      <HostelCard hostel={hostel} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 mb-4">No featured hostels available at the moment.</p>
                  <p className="text-sm text-gray-500">Check back later for amazing hostel recommendations!</p>
                </div>
              )}

              <div className="text-center">
                <Button 
                  size="lg" 
                  className="bg-travel-blue hover:bg-travel-blue/90 text-white"
                  onClick={handleViewAllHostels}
                >
                  View All Hostels
                </Button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-travel-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <Heart className="h-16 w-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of travelers who have found their perfect hostel with HostelFinder
          </p>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-white text-white hover:bg-white hover:text-travel-blue bg-transparent font-semibold"
            onClick={handleViewAllHostels}
          >
            Start Exploring
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">HostelFinder</h3>
              <p className="text-gray-400">
                Your trusted companion for finding amazing hostels across India.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Search Hostels</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Top Destinations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Travel Tips</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 HostelFinder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;