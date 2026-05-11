import Navbar from '@/components/Navbar';
import { ApplicationContextProvider } from '@/context/ApplicationContext';

export default function ApplicationLayout({ children }: LayoutProps<'/'>) {
  return (
    <ApplicationContextProvider>
      <div className="py-8 px-6 md:p-12 min-h-screen md:max-h-screen md:overflow-hidden">
        <Navbar />
        <main className="pt-4 md:pt-30 md:p-25">{children}</main>
      </div>
    </ApplicationContextProvider>
  );
}
