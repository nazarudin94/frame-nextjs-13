import { Inter } from '@next/font/google';
const inter = Inter({ subsets: ['latin'] });
import { Button } from 'antd';

export default function Home() {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Main Content</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...</p>
    </>
  );
}
