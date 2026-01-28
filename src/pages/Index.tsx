import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import CollectionSection from '@/components/CollectionSection';
import CategoriesSection from '@/components/CategoriesSection';
import WhyChooseSection from '@/components/WhyChooseSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    const element = document.querySelector('#collection');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategoryReset = () => {
    setSelectedCategory(null);
    const element = document.querySelector('#collection');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div id="home">
        <HeroSection />
      </div>
      <AboutSection />
      <CategoriesSection onSelectCategory={handleCategorySelect} />
      <CollectionSection selectedCategory={selectedCategory} onResetCategory={handleCategoryReset} />
      <WhyChooseSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
