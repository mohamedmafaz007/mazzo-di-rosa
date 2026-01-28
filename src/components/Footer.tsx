import { Instagram, Facebook, Twitter, Heart } from 'lucide-react';
import { useContent } from '@/context/ContentContext';

const Footer = () => {
  const { content } = useContent();
  const { hero, contact } = content;
  const currentYear = new Date().getFullYear();

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-chocolate text-chocolate-foreground">
      <div className="container-luxury py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img
                src={hero.logoImage}
                alt={hero.title}
                className="w-14 h-14 rounded-full object-cover border-2 border-white/20"
              />
              <div>
                <h3 className="font-serif text-2xl font-medium text-white">{hero.title}</h3>
                <p className="text-white/60 text-sm">Bouquet Point</p>
              </div>
            </div>
            <p className="text-white/70 mb-6 max-w-md leading-relaxed">
              {hero.subtext}
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: contact.social.instagram },
                { icon: Facebook, href: contact.social.facebook },
                { icon: Twitter, href: contact.social.twitter },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors duration-300"
                >
                  <social.icon className="w-5 h-5 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-medium text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', href: '#home' },
                { name: 'About Us', href: '#about' },
                { name: 'Collection', href: '#collection' },
                { name: 'Categories', href: '#categories' },
                { name: 'Contact', href: '#contact' },
              ].map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-white/70 hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-serif text-lg font-medium text-white mb-6">Categories</h4>
            <ul className="space-y-3">
              {[
                'Romantic Bouquets',
                'Wedding Collection',
                'Birthday Specials',
                'Anniversary Gifts',
                'Custom Arrangements',
              ].map((category) => (
                <li key={category}>
                  <button
                    onClick={() => handleNavClick('#categories')}
                    className="text-white/70 hover:text-primary transition-colors duration-300"
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-sm text-center md:text-left">
              © {currentYear} {hero.title}. All rights reserved.
            </p>
            <p className="text-white/60 text-sm flex items-center gap-1">
              Crafted with <Heart className="w-4 h-4 text-primary fill-primary" /> for flower lovers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
