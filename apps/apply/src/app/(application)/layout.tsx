import Navbar from '@/components/Navbar';
import { ApplicationContextProvider } from '@/context/ApplicationContext';

export default function ApplicationLayout({ children }: LayoutProps<'/'>) {
  return (
    <ApplicationContextProvider>
      <div className="flex h-dvh max-h-dvh min-h-0 flex-col overflow-hidden px-6 py-8 md:p-12">
        <Navbar />
        <main className="flex min-h-0 flex-1 flex-col overflow-hidden pt-15 md:pt-30 md:p-25">
          {children}
        </main>
      </div>
    </ApplicationContextProvider>
  );
}
