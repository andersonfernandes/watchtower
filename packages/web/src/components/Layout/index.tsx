import type { ReactNode } from "react";
import Loading from "../Loading";
import Navbar from "../Navbar";

export default function ({
  children,
  isLoading,
}: {
  children: ReactNode;
  isLoading?: boolean;
}) {
  return (
    <Navbar>
      {isLoading && <Loading visible={isLoading} />}
      {!isLoading && children}
    </Navbar>
  );
}
