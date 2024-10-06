import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  // typography: {
  //   fontFamily: 'Quicksand, sans-serif'
  // },
  colorSchemes: {
    light: {
      palette: {
        text: {
          primary: "#ffffff", // Màu chữ cho chế độ sáng
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
  breakpoints: {
    values: {
      xs: 500,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          "*::-webkit-scrollbar": {
            width: "6px",
            height: "6px",
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: "#dcdde1",
            borderRadius: "8px",
          },
          "*::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "white",
            borderRadius: "8px",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderWidth: "0.5px",
          "&:hover": {
            borderWidth: "0.5px",
          },
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          paddingTop: 0,
          paddingBottom: 0,
          marginTop: 0,
          marginBottom: 0,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          paddingTop: 0,
          paddingBottom: 0,
          marginTop: 0,
          marginBottom: 0,
          ".css-17h9zjm-MuiButtonBase-root-MuiListItemButton-root, .css-1sol1on": {
            borderRadius: "13px",
            ".css-tlelie-MuiListItemText-root": {
              margin: 0,
            },
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { fontSize: "0.875rem" },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          "&.MuiTypography-body1": {
            fontSize: "0.875rem",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
          fieldset: {
            borderWidth: "0.5px !important",
          },
          "&:hover fieldset": {
            borderWidth: "1px !important",
          },
          "&.Mui-focused fieldset": {
            borderWidth: "1px !important",
          },
        },
      },
    },
  },
});

export default theme;
