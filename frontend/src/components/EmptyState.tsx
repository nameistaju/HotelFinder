import { Button } from '@/components/ui/button';
import { Search, MapPin, Filter } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  type?: 'search' | 'filter' | 'general';
}

const EmptyState = ({ 
  title, 
  description, 
  actionLabel, 
  onAction, 
  type = 'general' 
}: EmptyStateProps) => {
  const getIcon = () => {
    switch (type) {
      case 'search':
        return <Search className="h-16 w-16 text-gray-300" />;
      case 'filter':
        return <Filter className="h-16 w-16 text-gray-300" />;
      default:
        return <MapPin className="h-16 w-16 text-gray-300" />;
    }
  };

  const getSuggestions = () => {
    switch (type) {
      case 'search':
        return [
          'Check your spelling',
          'Try searching for a different city',
          'Use more general terms'
        ];
      case 'filter':
        return [
          'Adjust your price range',
          'Remove some amenity filters',
          'Try a lower rating requirement'
        ];
      default:
        return [
          'Try a different search',
          'Check back later for new listings',
          'Contact us for help finding hostels'
        ];
    }
  };

  return (
    <div className="text-center py-16 px-4">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          {getIcon()}
        </div>
        
        <h3 className="text-2xl font-semibold text-gray-900 mb-3">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-6">
          {description}
        </p>

        <div className="mb-8">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Try these suggestions:</h4>
          <ul className="text-sm text-gray-500 space-y-1">
            {getSuggestions().map((suggestion, index) => (
              <li key={index} className="flex items-center justify-center">
                <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>

        {actionLabel && onAction && (
          <Button
            onClick={onAction}
            className="bg-travel-blue hover:bg-travel-blue/90 text-white"
          >
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;