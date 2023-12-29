// import Login from './page';
import Header from '@/components/Navbar/Header';
import Footer from '@/components/Navbar/Footer';
import Aside from '@/components/Navbar/Aside';
export default function ViewLayout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <Aside />
        <main className="flex-1 p-4">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
