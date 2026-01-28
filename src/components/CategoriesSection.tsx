import { Palette } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { IconRenderer } from '@/lib/IconRenderer';

interface CategoriesSectionProps {
  onSelectCategory: (category: string) => void;
}

const CategoriesSection = ({ onSelectCategory }: CategoriesSectionProps) => {
  const { content } = useContent();
  const { categories } = content;

  return (
    <section id="categories" className="section-padding bg-secondary/30">
      <div className="container-luxury">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-accent mb-4">
            <Palette className="w-5 h-5" />
            <span className="text-sm font-medium uppercase tracking-widest">{categories.subtitle}</span>
          </div>

          <h2 className="heading-section text-foreground mb-6">
            {categories.title}
          </h2>

          <div className="divider-elegant mb-6" />

          <p className="text-elegant text-lg">
            {categories.description}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.items.map((category, index) => (
            <div
              key={category.id || index}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer ${index === 0 || index === 4 ? 'lg:col-span-1' : ''
                }`}
              onClick={() => {
                onSelectCategory(category.filterValue);
              }}
            >
              {/* Background Image */}
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover image-zoom"
                />

                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${category.color} to-chocolate/70 group-hover:to-chocolate/80 transition-all duration-500`} />
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="w-14 h-14 rounded-2xl bg-card/90 backdrop-blur-sm flex items-center justify-center mb-4 shadow-lg">
                    <IconRenderer name={category.icon} className="w-7 h-7 text-primary" />
                  </div>

                  <h3 className="heading-card text-white mb-2">{category.name}</h3>
                  <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {category.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
