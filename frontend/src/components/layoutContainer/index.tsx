import { ReactNode } from "react";
import { Box } from "@mui/material";
import Header from "../header";

function LayoutContainer({ children }: { children: ReactNode }): JSX.Element {
  return (
    <>
      <Header />
      <Box>{children}</Box>
    </>
  );
}
export default LayoutContainer;
