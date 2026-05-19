import Navbar from '@/components/Navbar';
import { ApplicationContextProvider } from '@/context/ApplicationContext';

export default function ApplicationLayout({ children }: LayoutProps<'/'>) {
  return (
    <ApplicationContextProvider>
      <div className="flex h-dvh max-h-dvh min-h-0 flex-col overflow-x-hidden p-6 md:py-8 md:px-12 no-scrollbar">
        <Navbar />
        <main className="flex min-h-0 flex-1 flex-col pt-15 md:pt-25 md:px-25 no-scrollbar">
          {children}
        </main>
      </div>
    </ApplicationContextProvider>
  );
}
