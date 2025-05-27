
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { User, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navigation = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { user, logout, isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navBackground = isHomePage && !isScrolled ? 'bg-transparent' : 'bg-white shadow-md';
  const textColor = isHomePage && !isScrolled ? 'text-white' : 'text-gray-700';
  const logoColor = isHomePage && !isScrolled ? 'text-white' : 'text-travel-blue';

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${navBackground}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className={`text-2xl font-bold transition-colors ${logoColor}`}>
              HostelFinder
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`font-medium transition-colors hover:text-travel-blue ${textColor}`}
            >
              Home
            </Link>
            <Link 
              to="/search" 
              className={`font-medium transition-colors hover:text-travel-blue ${textColor}`}
            >
              Search
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant={isHomePage && !isScrolled ? "outline" : "ghost"}
                    className={`flex items-center space-x-2 ${
                      isHomePage && !isScrolled 
                        ? "border-white text-white hover:bg-white hover:text-travel-blue bg-transparent" 
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <User className="h-4 w-4" />
                    <span>{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white">
                  <DropdownMenuItem className="font-medium">
                    {user?.email}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={logout}
                    className="text-red-600 focus:text-red-600 cursor-pointer"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button 
                  variant={isHomePage && !isScrolled ? "outline" : "default"}
                  className={
                    isHomePage && !isScrolled 
                      ? "border-white text-white hover:bg-white hover:text-travel-blue bg-transparent" 
                      : "bg-travel-blue text-white hover:bg-travel-blue/90"
                  }
                >
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
