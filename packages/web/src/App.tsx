import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import type { ReactNode } from "react";

export default function App({ children }: { children: ReactNode }) {
  return (
    <MantineProvider defaultColorScheme="dark">{children}</MantineProvider>
  );
}
