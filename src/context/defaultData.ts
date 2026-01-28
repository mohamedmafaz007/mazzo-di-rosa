import { SiteContent } from '../types/content';

// Import assets to get their default paths
import heroBg from '@/assets/hero-bg.jpg';
import logo from '@/assets/logo.jpeg';
import bouquet1 from '@/assets/bouquets/bouquet-1.jpg';
import bouquet2 from '@/assets/bouquets/bouquet-2.jpg';
import bouquet3 from '@/assets/bouquets/bouquet-3.jpg';
import bouquet4 from '@/assets/bouquets/bouquet-4.jpg';
import bouquet5 from '@/assets/bouquets/bouquet-5.jpg';
import bouquet6 from '@/assets/bouquets/bouquet-6.jpg';
import bouquet7 from '@/assets/bouquets/bouquet-7.jpg';
import bouquet8 from '@/assets/bouquets/bouquet-8.jpg';
import bouquet9 from '@/assets/bouquets/bouquet-9.jpg';
import bouquet10 from '@/assets/bouquets/bouquet-10.jpg';
import bouquet11 from '@/assets/bouquets/bouquet-11.jpg';
import bouquet12 from '@/assets/bouquets/bouquet-12.jpg';

export const defaultContent: SiteContent = {
    hero: {
        title: "Mazzo di Rosa",
        tagline: "Elegant Bouquets for Every Emotion",
        subtext: "Handcrafted floral arrangements that speak the language of love, celebration, and timeless beauty",
        buttonText: "Contact to Order",
        backgroundImage: heroBg,
        logoImage: logo,
    },
    about: {
        subtitle: "About Us",
        title: "Crafting Emotions Through Flowers",
        description1: "At Mazzo di Rosa, we believe that every bouquet tells a story. Our passion lies in creating exquisite floral arrangements that capture the essence of your emotions and transform them into breathtaking visual poetry.",
        description2: "Each bouquet is thoughtfully designed and handcrafted with the freshest premium flowers, ensuring that every petal speaks of elegance, beauty, and heartfelt sentiment. Whether it's a romantic gesture, a celebration of love, or a moment of appreciation, our floral creations are designed to leave lasting impressions.",
        badgeNumber: "100%",
        badgeText: "Handcrafted",
        mainImage: bouquet1,
        features: [
            { icon: "Flower2", text: "Premium Fresh Flowers" },
            { icon: "Heart", text: "Made with Love" },
            { icon: "Sparkles", text: "Elegant Designs" },
            { icon: "Heart", text: "Personalized Touch" },
        ]
    },
    collection: {
        subtitle: "Our Collection",
        title: "Handcrafted Bouquets",
        description: "Discover our exquisite collection of handcrafted bouquets, each designed to convey your deepest emotions with elegance and grace",
        categories: ["All", "Romantic", "Wedding", "Birthday", "Anniversary", "Custom"],
        bouquets: [
            {
                id: "1",
                image: bouquet1,
                name: "Rose Elegance",
                description: "A stunning arrangement of premium red and pink roses with delicate baby's breath",
                price: "₹1,499",
                category: "Romantic"
            },
            {
                id: "2",
                image: bouquet2,
                name: "Pastel Dreams",
                description: "Soft pastel blooms in shades of blush, cream, and lavender",
                price: "₹1,299",
                category: "Birthday"
            },
            {
                id: "3",
                image: bouquet3,
                name: "Midnight Romance",
                description: "Deep red roses with eucalyptus and seasonal fillers",
                price: "₹1,899",
                category: "Romantic"
            },
            {
                id: "4",
                image: bouquet4,
                name: "Sweet Celebration",
                description: "Vibrant mixed flowers with chocolate accents for special occasions",
                price: "₹2,199",
                category: "Anniversary"
            },
            {
                id: "5",
                image: bouquet5,
                name: "Garden Bliss",
                description: "Fresh garden-style arrangement with seasonal wildflowers",
                price: "₹1,099",
                category: "Birthday"
            },
            {
                id: "6",
                image: bouquet6,
                name: "Eternal Love",
                description: "Classic white roses and lilies symbolizing pure devotion",
                price: "₹1,799",
                category: "Wedding"
            },
            {
                id: "7",
                image: bouquet7,
                name: "Sunset Glow",
                description: "Warm orange and peach tones for a radiant display",
                price: "₹1,599",
                category: "Anniversary"
            },
            {
                id: "8",
                image: bouquet8,
                name: "Royal Charm",
                description: "Luxurious purple and white arrangement fit for royalty",
                price: "₹2,499",
                category: "Custom"
            },
        ],
        footerNote: "For orders, please contact us via phone or WhatsApp"
    },
    categories: {
        subtitle: "Categories",
        title: "Find Your Perfect Bouquet",
        description: "Browse our carefully curated categories to find the perfect floral expression for every occasion",
        items: [
            {
                id: "cat1",
                name: "Romantic Bouquets",
                filterValue: "Romantic",
                description: "Express your deepest love with passionate floral arrangements",
                icon: "Heart",
                image: bouquet1,
                color: "from-pink-500/20 to-rose-500/20"
            },
            {
                id: "cat2",
                name: "Wedding Collection",
                filterValue: "Wedding",
                description: "Elegant bridal bouquets and ceremony arrangements",
                icon: "Sparkles",
                image: bouquet9,
                color: "from-amber-500/20 to-yellow-500/20"
            },
            {
                id: "cat3",
                name: "Birthday Specials",
                filterValue: "Birthday",
                description: "Vibrant and joyful arrangements to celebrate life",
                icon: "Cake",
                image: bouquet10,
                color: "from-purple-500/20 to-pink-500/20"
            },
            {
                id: "cat4",
                name: "Anniversary Gifts",
                filterValue: "Anniversary",
                description: "Commemorate your journey with timeless floral beauty",
                icon: "Gift",
                image: bouquet11,
                color: "from-red-500/20 to-pink-500/20"
            },
            {
                id: "cat5",
                name: "Custom Arrangements",
                filterValue: "Custom",
                description: "Bespoke designs tailored to your unique vision",
                icon: "Palette",
                image: bouquet12,
                color: "from-teal-500/20 to-emerald-500/20"
            },
        ]
    },
    whyChoose: {
        subtitle: "Why Choose Us",
        title: "The Mazzo di Rosa Promise",
        description: "Experience the difference of truly exceptional floral artistry with our commitment to quality, creativity, and care",
        features: [
            {
                icon: "Flower2",
                title: "Premium Flowers",
                description: "We source only the finest, freshest blooms from trusted growers to ensure exceptional quality in every arrangement"
            },
            {
                icon: "Palette",
                title: "Custom Designs",
                description: "Our talented florists create bespoke arrangements tailored to your preferences and occasions"
            },
            {
                icon: "LeafyGreen",
                title: "Freshness Guarantee",
                description: "Every bouquet is crafted with care using the freshest flowers, ensuring lasting beauty and fragrance"
            },
            {
                icon: "Heart",
                title: "Personalized Service",
                description: "We take time to understand your needs and create meaningful floral expressions that touch hearts"
            },
            {
                icon: "Clock",
                title: "Timely Delivery",
                description: "Count on us for prompt and careful delivery, ensuring your flowers arrive in perfect condition"
            },
            {
                icon: "Award",
                title: "Trusted Quality",
                description: "Years of expertise and dedication to excellence make us the preferred choice for premium bouquets"
            },
        ]
    },
    contact: {
        subtitle: "Contact Us",
        title: "Let's Create Something Beautiful",
        description: "Ready to place an order? Get in touch with us and let us craft the perfect bouquet for your special moment",
        info: {
            phone: "+91 94456 87883",
            whatsapp: "919445687883",
            email: "hello@mazzodirrosa.com",
            address: "Mumbai, Maharashtra, India"
        },
        social: {
            instagram: "#",
            facebook: "#",
            twitter: "#"
        }
    }
};
