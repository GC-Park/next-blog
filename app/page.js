import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-5xl mb-8 font-bold">GC-PARK BLOG</h1>
      <Link href="/client" className="btn btn-accent">
        get started
      </Link>
    </div>
  );
}
