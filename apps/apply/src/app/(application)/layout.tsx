import { ApplicationContextProvider } from '@/context/ApplicationContext';
import Navbar from '../../components/Navbar';

export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ApplicationContextProvider>
      <div className="py-8 px-6 md:p-12 min-h-screen max-h-screen overflow-hidden">
        <Navbar />
        <main className="pt-15 md:pt-30 md:p-25">{children}</main>
      </div>
    </ApplicationContextProvider>
  );
}
