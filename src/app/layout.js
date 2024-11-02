import AppLayout from '../components/AppLayout';
import '../styles/globals.css';
import FontLoader from './FontLoader';

export const metadata = {
  title: 'The Clueless Cook',
  description: 'A web app for searching and exploring recipes',
  icons: {
    icon: '/images/favicon-32x32.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <FontLoader />
      </head>
      <body className='min-h-screen'>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
