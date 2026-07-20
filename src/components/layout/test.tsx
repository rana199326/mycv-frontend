import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const navItems = [
    { path: '/home', label: 'Dashboard' },
    { path: '/users', label: 'User List' },
    { path: '/projects', label: 'Projects' },
    { path: '/calendar', label: 'Calendar' }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full bg-white border-b border-gray-200">
      <nav className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="text-blue-500">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4.5c-4.5 0-7.5 3-7.5 7.5s3 7.5 7.5 7.5 7.5-3 7.5-7.5-3-7.5-7.5-7.5zm0 13.5c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"/>
            </svg>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between flex-1 ml-8">
            <div className="flex space-x-6">
              {navItems.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  className={`font-medium ${
                    location.pathname === item.path
                      ? 'text-gray-900 border-b-2 border-gray-900'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Rest of the navbar code remains the same */}
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white" ref={menuRef}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.path
                    ? 'text-gray-900 bg-gray-50'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
          {/* Rest of mobile menu code remains the same */}
        </div>
      )}
    </div>
  );
};

export default Navbar;
