import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Home, Heart } from 'lucide-react';

const AppHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#221f1f] shadow-md">
      <div className="container mx-auto px-4 py-3">
        {/* Top bar - always visible */}
        <div className="flex items-center w-full justify-between">
          <Link to="/" className="text-[#e50914] font-heading font-bold text-2xl flex items-center">
            <span className="mr-2">📺</span>
            <span>ShowFlix</span>
          </Link>
          
          {/* Menu for desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`font-medium transition duration-150 ease-in-out ${location.pathname === '/' ? 'text-[#e50914]' : 'text-white hover:text-[#e50914]'}`}
            >
              Home
            </Link>
            <Link 
              to="/favorites" 
              className={`font-medium transition duration-150 ease-in-out ${location.pathname === '/favorites' ? 'text-[#e50914]' : 'text-white hover:text-[#e50914]'}`}
            >
              My Favorites
            </Link>
          </nav>
          
          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        
        {/* Mobile sidebar */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-75">
            <div className="h-full w-64 bg-[#221f1f] shadow-lg p-5 flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <Link to="/" className="text-[#e50914] font-heading font-bold text-xl flex items-center">
                  <span className="mr-2">📺</span>
                  <span>ShowFlix</span>
                </Link>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => handleNavClick('/')}
                  className={`flex items-center py-2 px-3 font-medium rounded-md transition duration-150 ease-in-out ${location.pathname === '/' ? 'text-[#e50914] bg-white/10' : 'text-white hover:text-[#e50914] hover:bg-white/5'}`}
                >
                  <Home className="mr-2 h-5 w-5" />
                  <span>Home</span>
                </button>
                
                <button
                  onClick={() => handleNavClick('/favorites')}
                  className={`flex items-center py-2 px-3 font-medium rounded-md transition duration-150 ease-in-out ${location.pathname === '/favorites' ? 'text-[#e50914] bg-white/10' : 'text-white hover:text-[#e50914] hover:bg-white/5'}`}
                >
                  <Heart className="mr-2 h-5 w-5" />
                  <span>My Favorites</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
