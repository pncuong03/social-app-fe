import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

const theme = extendTheme({
  // typography: {
  //   fontFamily: 'Quicksand, sans-serif'
  // },
  colorSchemes: {
    light: {
      palette: {
        text: {
          primary: "#000000", // Màu chữ cho chế độ sáng
        },
      },
    },
    dark: {
      palette: {
        text: {
          primary: "#ffffff", // Màu chữ cho chế độ tối
        },
        background: {
          default: "#121212", // Màu nền cho chế độ tối
          paper: "#1d1d1d",
        },
      },
    },
  },
});

export default theme;
