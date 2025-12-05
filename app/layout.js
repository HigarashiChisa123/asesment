import { AuthProvider } from './context/auth-context';
import LoadingScreen from './components/LoadingScreen';
import PageTransition from './components/PageTransition';
import './globals.css';

export const metadata = {
  title: 'TB Digital Reads - Your Reading Companion',
  description: 'Track, manage, and discover your next favorite book',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-gray-50">
        <AuthProvider>
          <LoadingScreen />
          <PageTransition>
            {children}
          </PageTransition>
        </AuthProvider>
      </body>
    </html>
  );
}