import './globals.css';
import Header from '../component/Navbar/Header';
import Footer from '../component/Navbar/Footer';
import Aside from '../component/Navbar/Aside';
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className="flex flex-col h-screen">
        <Header />
        <div class="flex flex-1">
          <Aside />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
