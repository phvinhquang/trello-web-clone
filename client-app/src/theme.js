// import { createTheme } from "@mui/material/styles";
import { experimental_extendTheme as extendTheme } from "@mui/material/styles";
import { cyan, deepOrange, orange, red, teal } from "@mui/material/colors";

const APP_BAR_HEIGHT = "58px";
const BOARD_BAR_HEIGHT = "60px";
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT} )`;
const COLUMN_HEADER_HEIGHT = "50px";
const COLUMN_FOOTER_HEIGHT = "50px";

// Sử dụng extend theme để fix lỗi flickering khi sử dụng server-side render.
// Nếu không dùng SSR có thể sử dụng create theme.
const theme = extendTheme({
  customVars: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
    columnHeaderHeight: COLUMN_HEADER_HEIGHT,
    columnFooterHeight: COLUMN_FOOTER_HEIGHT,
  },
  // colorSchemes: {
  //   light: {
  //     palette: {
  //       primary: teal,
  //       secondary: deepOrange,
  //     },
  //   },
  //   dark: {
  //     palette: {
  //       primary: orange,
  //       secondary: orange,
  //     },
  //   },
  // },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          /* width */
          "*::-webkit-scrollbar": {
            height: "6px",
          },
          /* Handle */
          "*::-webkit-scrollbar-thumb": {
            background: "#dcdde1",
            borderRadius: "2px",
          },
          /* Handle on hover */
          "*::-webkit-scrollbar-thumb:hover": {
            background: "white",
          },
        },
      },
    },
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          textTransform: "none",
          borderWidth: "0.5px",
          "&:hover": {
            borderWidth: 0.5,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        // Name of the slot
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          fontSize: "0.875rem",
        }),
      },
    },
    MuiTypography: {
      styleOverrides: {
        // Name of the slot
        root: {
          "&.MuiTypography-body1": {
            fontSize: "0.875rem",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        // Name of the slot
        root: ({ theme }) => ({
          fontSize: "0.875rem",
          "& fieldset": {
            borderWidth: "0.5px !important",
          },
          "&:hover fieldset": {
            borderWidth: "0.5px !important",
          },
          "&:Mui-focused fieldset": {
            borderWidth: "0.5px !important",
          },
        }),
      },
    },
  },
});

export default theme;

// Create a theme instance.
// const theme = createTheme({
//   palette: {
//     mode: "dark",
//     primary: {
//       main: "#556cd6",
//     },
//     secondary: {
//       main: "#19857b",
//     },
//     error: {
//       main: red.A400,
//     },
//   },
// });
