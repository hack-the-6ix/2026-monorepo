import ApplicationsClosed from '@/components/ApplicationsClosed';

export default function ApplicationLayout() {
  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden p-6 md:py-8 md:px-12 no-scrollbar">
      <main className="flex min-h-0 flex-1 flex-col items-center justify-center">
        <ApplicationsClosed />
      </main>
    </div>
  );
}
