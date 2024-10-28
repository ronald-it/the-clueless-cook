import "../styles/globals.css";
import FontLoader from './FontLoader';

export const metadata = {
  title: "Browser tab title",
  description: "Browser tab description",
  icons: {
    icon: '/images/favicon-32x32.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <FontLoader/>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}