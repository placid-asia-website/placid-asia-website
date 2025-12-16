import { Metadata } from 'next';
import GuidesHeader from './guides-header';

export const metadata: Metadata = {
  title: 'Buyer Guides | Placid Asia',
  description: 'Expert buyer guides to help you choose the right acoustic, noise, and vibration measurement equipment for your needs.',
  keywords: 'buyer guide, acoustic equipment guide, noise monitoring guide, vibration testing guide, how to choose',
};

export default function GuidesPage() {
  return <GuidesHeader />;
}
