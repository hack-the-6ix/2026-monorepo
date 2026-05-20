import Navbar from '@/components/Navbar';
import { ApplicationContextProvider } from '@/context/ApplicationContext';

export default function ApplicationLayout({ children }: LayoutProps<'/'>) {
  return (
    <ApplicationContextProvider>
      <div className="flex h-dvh min-h-dvh w-full flex-col overflow-hidden p-6 md:py-8 md:px-12 no-scrollbar">
        <Navbar />
        <main className="flex min-h-0 flex-1 flex-col pt-10 md:pt-25 md:px-25 no-scrollbar">
          {children}
        </main>
      </div>
    </ApplicationContextProvider>
  );
}
