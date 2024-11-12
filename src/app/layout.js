import AppLayout from '../components/AppLayout/AppLayout';
import '../styles/globals.css';
import FontLoader from './FontLoader';

export const metadata = {
  title: 'The Clueless Cook',
  description: 'A web app for searching and exploring recipes',
  icons: {
    icon: '/images/favicon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <FontLoader />
      </head>
      <body>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
