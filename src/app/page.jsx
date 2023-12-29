import { Inter } from '@next/font/google';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className="flex-1 p-4">
      <h1 className="text-2xl font-semibold mb-4">Main Content</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...</p>
    </main>
  );
}
