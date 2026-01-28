import { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useContent } from '@/context/ContentContext';

const ContactSection = () => {
  const { toast } = useToast();
  const { content } = useContent();
  const { contact } = content;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      toast({
        title: "Please fill all required fields",
        description: "Name, phone, and message are required",
        variant: "destructive"
      });
      return;
    }

    // Format message for WhatsApp
    const message = `Hello Mazzo di Rosa!%0A%0A*Name:* ${encodeURIComponent(formData.name.trim())}%0A*Phone:* ${encodeURIComponent(formData.phone.trim())}%0A*Email:* ${encodeURIComponent(formData.email.trim() || 'Not provided')}%0A%0A*Message:*%0A${encodeURIComponent(formData.message.trim())}`;

    // Open WhatsApp with the message
    window.open(`https://wa.me/${contact.info.whatsapp}?text=${message}`, '_blank');

    toast({
      title: "Redirecting to WhatsApp",
      description: "Complete your order inquiry on WhatsApp",
    });
  };

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${contact.info.whatsapp}?text=Hello! I would like to place an order for a bouquet.`, '_blank');
  };

  const handlePhoneClick = () => {
    window.open(`tel:${contact.info.phone.replace(/\s+/g, '')}`, '_self');
  };

  return (
    <section id="contact" className="section-padding bg-secondary/30">
      <div className="container-luxury">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-primary mb-4">
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium uppercase tracking-widest">{contact.subtitle}</span>
          </div>

          <h2 className="heading-section text-foreground mb-6">
            {contact.title}
          </h2>

          <div className="divider-elegant mb-6" />

          <p className="text-elegant text-lg">
            {contact.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div className="bg-card rounded-3xl p-8 md:p-10 shadow-xl">
            <h3 className="heading-card text-foreground mb-6">Send Us a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  maxLength={100}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  maxLength={20}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="+91 XXXXX XXXXX"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  maxLength={255}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  maxLength={1000}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                  placeholder="Tell us about your bouquet requirements..."
                  required
                />
              </div>

              <button type="submit" className="btn-luxury w-full text-base">
                <Send className="w-5 h-5 mr-2" />
                Send via WhatsApp
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col justify-center">
            <h3 className="heading-card text-foreground mb-8">Get In Touch</h3>

            <div className="space-y-6 mb-10">
              <button
                onClick={handlePhoneClick}
                className="flex items-start gap-4 p-4 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 w-full text-left group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Call Us</p>
                  <p className="text-muted-foreground">{contact.info.phone}</p>
                </div>
              </button>

              <button
                onClick={handleWhatsAppClick}
                className="flex items-start gap-4 p-4 rounded-2xl bg-card border border-border/50 hover:border-sage/50 transition-all duration-300 w-full text-left group"
              >
                <div className="w-12 h-12 rounded-xl bg-sage/20 flex items-center justify-center flex-shrink-0 group-hover:bg-sage/30 transition-colors">
                  <MessageCircle className="w-5 h-5 text-sage" />
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">WhatsApp</p>
                  <p className="text-muted-foreground">{contact.info.phone}</p>
                </div>
              </button>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-card border border-border/50">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Email Us</p>
                  <p className="text-muted-foreground">{contact.info.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-card border border-border/50">
                <div className="w-12 h-12 rounded-xl bg-chocolate/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-chocolate" />
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Visit Us</p>
                  <p className="text-muted-foreground">{contact.info.address}</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
              <p className="font-serif text-lg text-foreground mb-2">Ready to Order?</p>
              <p className="text-muted-foreground text-sm mb-4">
                Contact us directly for fastest response and personalized assistance
              </p>
              <button onClick={handleWhatsAppClick} className="btn-gold text-sm w-full">
                <MessageCircle className="w-4 h-4 mr-2" />
                Order on WhatsApp
              </button>
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-16 rounded-3xl overflow-hidden shadow-xl h-80 bg-muted flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground">Google Map Integration</p>
            <p className="text-sm text-muted-foreground/70">{contact.info.address}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
