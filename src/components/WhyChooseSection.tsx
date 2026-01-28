import { Award } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { IconRenderer } from '@/lib/IconRenderer';

const WhyChooseSection = () => {
  const { content } = useContent();
  const { whyChoose } = content;

  return (
    <section id="why-us" className="section-padding">
      <div className="container-luxury">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-primary mb-4">
            <Award className="w-5 h-5" />
            <span className="text-sm font-medium uppercase tracking-widest">{whyChoose.subtitle}</span>
          </div>

          <h2 className="heading-section text-foreground mb-6">
            {whyChoose.title}
          </h2>

          <div className="divider-gold mb-6" />

          <p className="text-elegant text-lg">
            {whyChoose.description}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {whyChoose.features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl"
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <IconRenderer name={feature.icon} className="w-8 h-8 text-primary" />
              </div>

              {/* Content */}
              <h3 className="heading-card text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
