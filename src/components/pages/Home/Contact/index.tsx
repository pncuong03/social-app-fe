import React from "react";
import { useColorScheme } from "@mui/material";

const Contact = () => {
  const { mode } = useColorScheme();

  return (
    <div
      className={`hidden h-[calc(120vh-56px)] w-[25rem] flex-col rounded-xl ${
        mode === "light" ? "bg-white" : "bg-black-300"
      } p-3 shadow-sm hover:overflow-y-auto xl:flex `}
    >
      Contact
    </div>
  );
};

export default Contact;
