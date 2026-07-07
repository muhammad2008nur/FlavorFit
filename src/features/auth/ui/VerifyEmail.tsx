"use client";
import { useMutation } from "@apollo/client/react";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

import { PAGES } from "@/shared/config/page.config";

import { VerifyEmailDocument } from "@/shared/api/__generated__/graphql";

export function VerifyEmail() {
  const ref = React.useRef<TurnstileInstance | null>(null);
  const turnstileSiteKey = process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY;
  const [turnstileToken, setTurnstileToken] = React.useState<string | null>(
    null,
  );
  const searchParam = useSearchParams();
  const token = searchParam.get("token");

  const router = useRouter();
  const [verify] = useMutation(VerifyEmailDocument, {
    onCompleted() {
      toast.success("Почта верифицирована", { id: "verify-email-success" });
      router.replace(PAGES.DASHBOARD);
    },
    onError() {
      toast.error("Ошибка верификации почты", { id: "verify-email-error" });
      router.replace(PAGES.LOGIN);
    },
  });
  React.useEffect(() => {
    if (!token || !turnstileToken) return;

    verify({
      variables: {
        token,
      },
      context: {
        headers: {
          "cf-turnstile-token": turnstileToken,
        },
      },
    });
  }, [token, turnstileToken, verify]);

  return (
    <div className="flex h-screen">
      {turnstileSiteKey && (
        <Turnstile
          className="fixed bottom-4 right-4"
          ref={ref}
          siteKey={turnstileSiteKey}
          onError={() => {
            setTurnstileToken(null);
            ref.current?.reset();
          }}
          onSuccess={(token) => {
            setTurnstileToken(token);
          }}
          onExpire={() => {
            setTurnstileToken(null);
          }}
        />
      )}

      <div className="text-center ">Verifying email...</div>
    </div>
  );
}
