import Image from "next/image";

function AuthImage() {
  return (
    <Image
      src="/salad.png"
      className="absolute -right-10 -bottom-10 -rotate-15"
      alt="Salad"
      width={195}
      height={195}
      draggable={false}
    />
  );
}

export default AuthImage;
