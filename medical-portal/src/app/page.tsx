import Image from "next/image";
import Link from 'next/link';


export default function Home() {

  const PATIENTROLE = "Patient";
  const DOCTORROLE = "Doctor";
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" Ramzi Belbahri"}
          </a>
        </div>
      </div>

      <div className="relative z-[-1] flex place-items-center ">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] "
          src="/healthcare.png"
          alt="Healthcare Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:max-w-5xl lg:grid-cols-40 lg:grid-auto-rows lg:grid-auto-flow lg:gap-4 lg:text-left">
        <Link
          href={`/menu?role=${PATIENTROLE}`}
          className="group rounded-lg border border-transparent bg-white px-5 py-4 hover:border-gray-300  hover:dark:border-neutral-700 hover:dark:bg-neutral-300">
          <h2 className="mb-3 text-2xl font-semibold">
            Patient{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
        </Link>

        <Link
          href={`/menu?role=${DOCTORROLE}`}
          className="group rounded-lg border border-transparent bg-white px-5 py-4 hover:border-gray-300  hover:dark:border-neutral-700 hover:dark:bg-neutral-300">
          <h2 className="mb-3 text-2xl font-semibold">
            Doctor{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
        </Link>

      </div>
    </main>
  );
}
