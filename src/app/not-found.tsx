import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl py-24 text-center">
      <h1 className="text-4xl font-bold">Page not found</h1>
      <p className="mt-4 text-neutral-600">
        The page you’re looking for doesn’t exist.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-lg bg-black px-6 py-3 text-white"
      >
        Go home
      </Link>
    </main>
  );
}