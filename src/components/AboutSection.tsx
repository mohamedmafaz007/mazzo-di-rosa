import { Flower2, Heart } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { IconRenderer } from '@/lib/IconRenderer';

const AboutSection = () => {
  const { content } = useContent();
  const { about } = content;

  return (
    <section id="about" className="section-padding bg-secondary/30">
      <div className="container-luxury">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={about.mainImage}
                alt={about.title}
                className="w-full aspect-square object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-chocolate/30 to-transparent" />
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 md:bottom-8 md:-right-8 bg-card rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-serif text-2xl font-semibold text-foreground">{about.badgeNumber}</p>
                  <p className="text-sm text-muted-foreground">{about.badgeText}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="lg:text-left text-center">
            <div className="flex items-center lg:justify-start justify-center gap-2 text-primary mb-4">
              <Flower2 className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-widest">{about.subtitle}</span>
            </div>

            <h2 className="heading-section text-foreground mb-6">
              {about.title}
            </h2>

            <div className="divider-elegant mb-8 lg:ml-0 mx-auto" />

            <p className="text-elegant text-lg mb-6">
              {about.description1}
            </p>

            <p className="text-elegant mb-8">
              {about.description2}
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-4">
              {about.features.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-xl bg-card/50"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <IconRenderer name={item.icon} className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium text-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
