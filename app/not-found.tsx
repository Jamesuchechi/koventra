import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-navy p-4 text-center">
      <h2 className="text-4xl font-display font-light text-gold mb-2">404 — Page Not Found</h2>
      <p className="font-body font-light text-muted mb-6">The page you are looking for does not exist.</p>
      <Link
        href="/"
        className="px-4 py-2 border border-gold text-gold hover:bg-gold-pale hover:text-white transition-all duration-200"
      >
        Return Home
      </Link>
    </div>
  );
}
