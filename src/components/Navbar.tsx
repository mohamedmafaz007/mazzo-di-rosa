import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useContent } from '@/context/ContentContext';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Collection', href: '#collection' },
  { name: 'Categories', href: '#categories' },
  { name: 'Why Us', href: '#why-us' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const { content } = useContent();
  const { hero, contact } = content;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-rose-100'
        : 'bg-white py-4 border-b border-rose-50'
        }`}
    >
      <div className="container-luxury">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" onClick={() => handleNavClick('#home')} className="flex items-center gap-3">
            <img
              src={hero.logoImage}
              alt={hero.title}
              className="h-12 w-12 md:h-14 md:w-14 rounded-full object-cover shadow-md"
            />
            <span className="font-serif text-xl md:text-2xl font-medium text-chocolate hidden sm:block">
              {hero.title}
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="font-sans text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-300 link-underline"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <button
              onClick={() => handleNavClick('#contact')}
              className="btn-luxury text-sm px-6 py-2.5"
            >
              Contact to Order
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-md shadow-lg border-t border-border animate-fade-in">
            <div className="container-luxury py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="font-sans text-base font-medium text-foreground/80 hover:text-primary transition-colors duration-300 py-2 text-left"
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={() => handleNavClick('#contact')}
                className="btn-luxury text-sm mt-4"
              >
                Contact to Order
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
