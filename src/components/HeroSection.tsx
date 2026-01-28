import heroBg from '@/assets/hero-bg.jpg';
import logo from '@/assets/logo.jpeg';

import { useContent } from '@/context/ContentContext';

const HeroSection = () => {
  const { content } = useContent();
  const { hero } = content;

  const handleContactClick = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${hero.backgroundImage})` }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(30, 25, 20, 0.3) 0%, rgba(30, 25, 20, 0.5) 100%)' }}
      />

      {/* Content */}
      <div className="relative z-10 container-luxury text-center">
        <div className="max-w-4xl mx-auto">
          {/* Logo */}
          <div className="mb-8 animate-fade-up">
            <img
              src={hero.logoImage}
              alt={hero.title}
              className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full shadow-2xl object-cover border-4 border-white/30"
            />
          </div>

          {/* Brand Name */}
          <h1
            className="heading-display text-white mb-6 animate-fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            {hero.title}
          </h1>

          {/* Tagline */}
          <p
            className="text-xl md:text-2xl lg:text-3xl text-white/90 font-serif italic mb-4 animate-fade-up"
            style={{ animationDelay: '0.4s' }}
          >
            "{hero.tagline}"
          </p>

          {/* Subtext */}
          <p
            className="text-base md:text-lg text-white/80 font-sans mb-10 max-w-2xl mx-auto animate-fade-up"
            style={{ animationDelay: '0.5s' }}
          >
            {hero.subtext}
          </p>

          {/* CTA Button */}
          <div
            className="animate-fade-up"
            style={{ animationDelay: '0.6s' }}
          >
            <button
              onClick={handleContactClick}
              className="btn-gold text-base md:text-lg px-10 py-4"
            >
              {hero.buttonText}
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-white/50 flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/70 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
