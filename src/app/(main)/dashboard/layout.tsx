import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
}
