/**
 * Homepage-specific layout with LCP image preload
 * Uses route group (home) to add preload only for the homepage
 */
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Preload hero image for faster LCP on mobile */}
      <link
        rel="preload"
        as="image"
        href="/_next/image?url=%2Fimages%2Fconcrete%2Fprofessional-concrete-contractors-houston-tx.webp&w=480&q=60"
        media="(max-width: 480px)"
      />
      <link
        rel="preload"
        as="image"
        href="/_next/image?url=%2Fimages%2Fconcrete%2Fprofessional-concrete-contractors-houston-tx.webp&w=828&q=60"
        media="(min-width: 481px) and (max-width: 1024px)"
      />
      {children}
    </>
  );
}
