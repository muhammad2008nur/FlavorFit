"use client";

import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import React from "react";

export function useTurnstileCaptcha() {
  const ref = React.useRef<TurnstileInstance | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY;
  const [token, setToken] = React.useState<string | null>(null);

  const reset = () => {
    setToken(null);
    ref.current?.reset();
  };

  const widget = siteKey ? (
    <Turnstile
      className="fixed bottom-4 right-4"
      ref={ref}
      siteKey={siteKey}
      onError={reset}
      onSuccess={(newToken) => setToken(newToken)}
      onExpire={() => setToken(null)}
    />
  ) : null;

  return { token, reset, widget };
}
