
// Google Analytics tracking utilities

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Track events
export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Predefined event trackers for common actions
export const trackProductView = (productSku: string, productName: string) => {
  event({
    action: 'view_item',
    category: 'Product',
    label: `${productName} (${productSku})`,
  });
};

export const trackAddToCart = (productSku: string, productName: string, quantity: number = 1) => {
  event({
    action: 'add_to_cart',
    category: 'E-commerce',
    label: `${productName} (${productSku})`,
    value: quantity,
  });
};

export const trackQuoteRequest = (itemCount: number) => {
  event({
    action: 'request_quote',
    category: 'E-commerce',
    label: 'Quote Request Submitted',
    value: itemCount,
  });
};

export const trackContactInquiry = (source: string = 'contact_page') => {
  event({
    action: 'contact_inquiry',
    category: 'Lead Generation',
    label: source,
  });
};

export const trackNewsletterSignup = (source: string = 'footer') => {
  event({
    action: 'newsletter_signup',
    category: 'Lead Generation',
    label: source,
  });
};

export const trackChatbotInteraction = (action: string) => {
  event({
    action: 'chatbot_interaction',
    category: 'Engagement',
    label: action,
  });
};

export const trackSearch = (searchQuery: string) => {
  event({
    action: 'search',
    category: 'Engagement',
    label: searchQuery,
  });
};

export const trackCategoryView = (categoryName: string) => {
  event({
    action: 'view_category',
    category: 'Navigation',
    label: categoryName,
  });
};

export const trackBrandView = (brandName: string) => {
  event({
    action: 'view_brand',
    category: 'Navigation',
    label: brandName,
  });
};
