import Navbar from '@/components/Navbar';
import { ApplicationContextProvider } from '@/context/ApplicationContext';

export default function ApplicationLayout({ children }: LayoutProps<'/'>) {
  return (
    <ApplicationContextProvider>
      <div className="flex min-h-dvh flex-col px-6 py-8 md:p-12">
        <Navbar />
        <main className="flex flex-1 flex-col pt-15 md:pt-30 md:p-25">
          {children}
        </main>
      </div>
    </ApplicationContextProvider>
  );
}
