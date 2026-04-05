import Link from "next/link";

import { PAGES } from "@/shared/config/page.config";

interface Props {
  isLogin: boolean;
}

function AuthChangeType({ isLogin }: Props) {
  return isLogin ? (
    <div className="mt-3 text-center">
      Don&apos;t have an account ?{" "}
      <Link href={PAGES.REGISTER} className="underline ml-1 ">
        Register
      </Link>
    </div>
  ) : (
    <div className="mt-3 text-center">
      Already have an account ?{" "}
      <Link href={PAGES.LOGIN} className="underline">
        Login
      </Link>
    </div>
  );
}

export default AuthChangeType;
