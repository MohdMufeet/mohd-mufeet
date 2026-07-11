import Image from "next/image";
import {
//   Github,
//   Linkedin,
  Mail,
  MapPin,
  Download,
} from "lucide-react";


export default function ProfileSidebar() {
  return (
    <aside className="sticky top-24 rounded-xl border border-[#30363d] bg-[#161b22] p-6">

      <div className="flex flex-col items-center">

        {/* <Image
          src="https://avatars.githubusercontent.com/MohdMufeet"
          alt="Mohd Mufeet"
          width={220}
          height={220}
          className="rounded-full border-4 border-[#30363d]"
          priority
        /> */}

        <h1 className="mt-6 text-3xl font-bold">
          Mohd Mufeet
        </h1>

        <p className="mt-2 text-gray-400">
          Full Stack Developer
        </p>

      </div>

      <div className="mt-8 space-y-4 text-sm">

        <p className="leading-7 text-gray-300">
          🚀 Learning, Building and Growing every day with
          React, Next.js, Node.js & TypeScript.
        </p>

        <div className="flex items-center gap-3 text-gray-400">
          <MapPin size={18} />
          Kanpur, India
        </div>

        <div className="flex items-center gap-3 text-gray-400">
          <Mail size={18} />
          contact@example.com
        </div>

      </div>

      <div className="mt-8 flex gap-3">

        <a
          href="https://github.com/MohdMufeet"
          target="_blank"
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#30363d] transition hover:bg-[#21262d]"
        >
          {/* <Github size={20} /> */}
        </a>

        <a
          href="#"
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#30363d] transition hover:bg-[#21262d]"
        >
          {/* <Linkedin size={20} /> */}
        </a>

      </div>

      <a
        href="#"
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-[#238636] py-3 font-semibold transition hover:bg-[#2ea043]"
      >
        <Download size={18} />

        Resume
      </a>

    </aside>
  );
}