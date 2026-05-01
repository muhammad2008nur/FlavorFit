import Image from "next/image";

function AuthImage() {
  return (
    <Image
      src="/salad.png"
      className="absolute left-117 top-107 -rotate-15"
      alt="Salad"
      width={195}
      height={195}
      draggable={false}
    />
  );
}

export default AuthImage;
