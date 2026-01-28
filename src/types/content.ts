export interface HeroContent {
    title: string;
    tagline: string;
    subtext: string;
    buttonText: string;
    backgroundImage: string;
    logoImage: string;
}

export interface AboutFeature {
    icon: string;
    text: string;
}

export interface AboutContent {
    subtitle: string;
    title: string;
    description1: string;
    description2: string;
    badgeNumber: string;
    badgeText: string;
    mainImage: string;
    features: AboutFeature[];
}

export interface Bouquet {
    id: string;
    image: string;
    name: string;
    description: string;
    price: string;
    category: string;
}

export interface CollectionContent {
    subtitle: string;
    title: string;
    description: string;
    categories: string[];
    bouquets: Bouquet[];
    footerNote: string;
}

export interface CategoryItem {
    id: string;
    name: string;
    filterValue: string;
    description: string;
    icon: string;
    image: string;
    color: string;
}

export interface CategoriesContent {
    subtitle: string;
    title: string;
    description: string;
    items: CategoryItem[];
}

export interface WhyChooseFeature {
    icon: string;
    title: string;
    description: string;
}

export interface WhyChooseContent {
    subtitle: string;
    title: string;
    description: string;
    features: WhyChooseFeature[];
}

export interface SocialLinks {
    instagram: string;
    facebook: string;
    twitter: string;
}

export interface ContactInfo {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
}

export interface ContactContent {
    subtitle: string;
    title: string;
    description: string;
    info: ContactInfo;
    social: SocialLinks;
}

export interface SiteContent {
    hero: HeroContent;
    about: AboutContent;
    collection: CollectionContent;
    categories: CategoriesContent;
    whyChoose: WhyChooseContent;
    contact: ContactContent;
}
