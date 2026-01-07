// Force all API routes to be dynamic (not statically generated)
export const dynamic = 'force-dynamic';

export default function APILayout({ children }: { children: React.ReactNode }) {
  return children;
}
