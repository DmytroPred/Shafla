import './globals.css';
import { Inter } from 'next/font/google';
import Layout from './components/layout/Layout';
import { AuthContextProvider } from './store/auth-context';
import { HeroesContextProvider } from './store/heroesContext';

const inter = Inter({ subsets: ['latin'] });
export const metadata = {
  verification: {
    google: 'WBQMJqQoc4z5k9NO7SFdwPcoIK4YGWuLGOgW9ckxURM',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AuthContextProvider>
          <HeroesContextProvider>
            <Layout>{children}</Layout>
          </HeroesContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
