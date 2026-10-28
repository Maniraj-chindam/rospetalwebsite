import Image from "next/image";
import Link from "next/link";

export default function RosepetalLogo({
  className = "",
  isLight = true,
}: {
  className?: string;
  isLight?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Rosepetal Designer Boutique — home"
      className={`group inline-flex shrink-0 items-center gap-2.5 text-left sm:gap-3.5 ${className}`}
    >
      <Image
        src="/rosepetal-official-logo.png"
        alt=""
        aria-hidden="true"
        width={512}
        height={512}
        priority={isLight}
        sizes={isLight ? "(max-width: 640px) 48px, 56px" : "144px"}
        className={`shrink-0 rounded-full bg-white object-contain shadow-sm ring-1 ring-black/10 ${isLight ? "size-12 sm:size-14" : "size-36"}`}
      />
      {isLight && (
        <span className="flex flex-col">
          <span className="font-serif-luxury text-xl font-medium leading-tight tracking-wide text-white transition-colors group-hover:text-[#FDE8C5] sm:text-3xl">
            Rosepetal
          </span>
          <span className="-mt-0.5 text-[8px] font-semibold uppercase tracking-[0.18em] text-rose-100 sm:text-[10.5px] sm:tracking-[0.28em]">
            Designer Boutique
          </span>
        </span>
      )}
    </Link>
  );
}
