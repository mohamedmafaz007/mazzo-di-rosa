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

  const handleContactClick = async () => {
    const whatsappNumber = '918124817806';

    // Structured message for the order
    const message = `🌟 *NEW ORDER REQUEST* 🌟\n\n` +
      `—————————————————\n` +
      `🌸 *Bouquet:* ${name}\n` +
      `💰 *Price:* ${price}\n` +
      `📝 *Details:* ${description}\n` +
      `—————————————————\n\n` +
      `Hello Mazzo di Rosa! I saw this beautiful bouquet on your website and would like to place an order.`;

    try {
      // Step 1: Attempt to use the Web Share API (Best for Mobile, attaches ACTUAL image)
      if (navigator.share && (navigator as any).canShare) {
        const response = await fetch(image);
        const blob = await response.blob();
        const file = new File([blob], `${name.replace(/\s+/g, '-').toLowerCase()}.jpg`, { type: 'image/jpeg' });

        const shareData = {
          files: [file],
          title: 'Order: ' + name,
          text: message,
        };

        if ((navigator as any).canShare(shareData)) {
          await navigator.share(shareData);
          toast({
            title: "Success",
            description: "Please select WhatsApp and your contact to complete the order.",
          });
          return; // Exit if share was successful
        }
      }
    } catch (error) {
      console.error('Error sharing image:', error);
    }

    // Step 2: Fallback to WhatsApp wa.me link if Share API is not available (Desktop/Older browsers)
    const fullImageUrl = `${window.location.origin}${image}`;
    const fallbackMessage = `${message}\n\n🖼️ *Product Image:* \n${fullImageUrl}`;

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(fallbackMessage)}`, '_blank');

    toast({
      title: "Order Request Initiated",
      description: "Redirecting to WhatsApp with bouquet details",
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
