import Navbar from '../../components/Navbar';

export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-12">
      <Navbar />
      <main className="pt-30 p-25">{children}</main>
    </div>
  );
}
