import Navbar from "@/components/navbar/Navbar";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0d1117] text-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="text-5xl font-bold">
          GitHub Portfolio
        </h1>

        <p className="mt-4 max-w-xl text-lg text-gray-400">
          Building modern web applications with React, Next.js,
          TypeScript and Node.js.
        </p>
      </section>
    </main>
  );
}