"use client";

import { useApolloClient, useMutation } from "@apollo/client/react";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { LogoutDocument } from "@/shared/api/__generated__/graphql";
import { Button } from "@/shared/components/ui/button";

import { PAGES } from "@/shared/config/page.config";

export default function Logout() {
  const router = useRouter();
  const apollo = useApolloClient();
  const [logout, { loading }] = useMutation(LogoutDocument);

  const handleLogout = async () => {
    try {
      await logout();
      await apollo.clearStore();
      router.replace(PAGES.LOGIN);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Button variant={"soft"} size={"icon"} className="rounded-full" onClick={handleLogout} disabled={loading}>
      < LogOut className="text-[#00000096] size-4" />
    </Button>

  )
}