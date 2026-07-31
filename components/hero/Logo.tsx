import Image from "next/image";

export default function Logo() {
  return (
    <Image
        src="/images/logo-web.png"
        alt="ANTIKA"
        priority
        width={700}
        height={230}
        className="
            logo-shadow
            w-85
            md:w-117.5
            lg:w-140
            h-auto
            select-none
        "
    />
  );
}