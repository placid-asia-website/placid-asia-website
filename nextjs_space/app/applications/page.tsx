import { Metadata } from 'next';
import ApplicationsHeader from './applications-header';

export const metadata: Metadata = {
  title: 'Applications | Placid Asia',
  description: 'Discover acoustic, noise, and vibration testing solutions for various applications including building acoustics, environmental monitoring, and industrial testing.',
  keywords: 'building acoustics, noise monitoring, vibration analysis, sound source location, material testing, environmental acoustics',
};

export default function ApplicationsPage() {
  return <ApplicationsHeader />;
}
