import Image from "next/image";

function AuthImage() {
  return (
    <Image
      src="/salad.png"
      className="absolute -left-20 -bottom-15 rotate-10 z-0 pointer-events-none"
      alt="Salad"
      width={195}
      height={195}
      draggable={false}
    />
  );
}

export default AuthImage;
