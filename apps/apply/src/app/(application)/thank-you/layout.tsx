import './thank-you.css';

export default function ThankYouLayout({
  children,
}: LayoutProps<'/thank-you'>) {
  return (
    <div className="thank-you-route flex min-h-0 flex-1 flex-col">{children}</div>
  );
}
