import { MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BouquetCardProps {
  image: string;
  name: string;
  description: string;
  price: string;
  category?: string;
}

const BouquetCard = ({ image, name, description, price, category }: BouquetCardProps) => {
  const { toast } = useToast();

  const handleContactClick = () => {
    const whatsappNumber = '919445687883';
    const currentUrl = window.location.origin;
    const fullImageUrl = image.startsWith('http') ? image : `${currentUrl}${image}`;

    // Create a robust message
    const messageLines = [
      `🌟 *NEW ORDER REQUEST* 🌟`,
      ``,
      `—————————————————`,
      `🌸 *Bouquet:* ${name}`,
      `💰 *Price:* ${price}`,
      `📝 *Details:* ${description}`,
      `—————————————————`,
      ``,
      `Hello Mazzo di Rosa! I saw this beautiful bouquet on your website and would like to place an order.`,
      ``,
      `🖼️ *Product Image:*`,
      `${fullImageUrl}`
    ];

    const finalMessage = messageLines.join('\n');
    const encodedMessage = encodeURIComponent(finalMessage);

    // Direct link to WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');

    toast({
      title: "Opening WhatsApp",
      description: "Redirecting you to chat with us directly...",
    });
  };

  return (
    <div className="card-luxury group">
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[4/5]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover image-zoom"
        />

        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-chocolate/80 via-chocolate/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Category Badge */}
        {category && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 bg-card/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground">
              {category}
            </span>
          </div>
        )}

        {/* Quick Contact Button */}
        <button
          onClick={handleContactClick}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 btn-luxury opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 text-sm px-6 py-2.5"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Order Now
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="heading-card text-foreground mb-2 line-clamp-1">{name}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>

        <div className="flex items-center justify-between">
          <p className="font-serif text-2xl font-semibold text-primary">{price}</p>
          <p className="text-xs text-muted-foreground italic">Contact to order</p>
        </div>
      </div>
    </div>
  );
};

export default BouquetCard;
