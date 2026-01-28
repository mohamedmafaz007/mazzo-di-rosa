import { useState, useEffect } from 'react';
import { Flower2 } from 'lucide-react';
import BouquetCard from './BouquetCard';
import { useContent } from '@/context/ContentContext';

interface CollectionSectionProps {
  selectedCategory: string | null;
  onResetCategory: () => void;
}

const CollectionSection = ({ selectedCategory, onResetCategory }: CollectionSectionProps) => {
  const { content } = useContent();
  const { collection } = content;
  const [activeTab, setActiveTab] = useState("All");

  // Sync activeTab with selectedCategory prop from parent (CategoriesSection)
  useEffect(() => {
    if (selectedCategory) {
      setActiveTab(selectedCategory);
    }
  }, [selectedCategory]);

  const filteredBouquets = activeTab === "All"
    ? collection.bouquets
    : collection.bouquets.filter(b => b.category === activeTab);

  return (
    <section id="collection" className="section-padding">
      <div className="container-luxury">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-primary mb-4">
            <Flower2 className="w-5 h-5" />
            <span className="text-sm font-medium uppercase tracking-widest">{collection.subtitle}</span>
          </div>

          <h2 className="heading-section text-foreground mb-6">
            {collection.title}
          </h2>

          <div className="divider-gold mb-6" />

          <p className="text-elegant text-lg">
            {collection.description}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {collection.categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveTab(cat);
                if (cat === "All") onResetCategory();
              }}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === cat
                ? 'bg-primary text-white shadow-lg scale-105'
                : 'bg-secondary/50 text-foreground/70 hover:bg-secondary hover:text-foreground'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Bouquet Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 min-h-[400px]">
          {filteredBouquets.map((bouquet, index) => (
            <div
              key={`${activeTab}-${bouquet.id || index}`}
              className="animate-fade-up"
              style={{ animationDelay: `${(index % 4) * 0.1}s` }}
            >
              <BouquetCard {...bouquet} />
            </div>
          ))}
        </div>

        {filteredBouquets.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">No bouquets found in this category.</p>
          </div>
        )}

        {/* Note */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground italic">
            {collection.footerNote}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CollectionSection;
