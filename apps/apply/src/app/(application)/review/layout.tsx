import './review.css';

export default function ReviewLayout({ children }: LayoutProps<'/review'>) {
  return (
    <div className="review-route flex min-h-0 flex-1 flex-col">{children}</div>
  );
}
