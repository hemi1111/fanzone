import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000", // Black
      light: "#424242",
      dark: "#000000",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ffffff", // White
      light: "#f5f5f5",
      dark: "#e0e0e0",
      contrastText: "#000000",
    },
    background: {
      default: "#ffffff",
      paper: "#f8f8f8",
    },
    text: {
      primary: "#000000",
      secondary: "#666666",
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontFamily: '"Oswald", "Inter", "Helvetica", "Arial", sans-serif',
      letterSpacing: "0.5px",
    },
    h2: {
      fontWeight: 600,
      fontFamily: '"Oswald", "Inter", "Helvetica", "Arial", sans-serif',
      letterSpacing: "0.4px",
    },
    h3: {
      fontWeight: 600,
      fontFamily: '"Oswald", "Inter", "Helvetica", "Arial", sans-serif',
      letterSpacing: "0.3px",
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 24px",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          },
        },
        containedPrimary: {
          background: "#000000",
          color: "#ffffff",
          "&:hover": {
            background: "#222222",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: "0 12px 20px rgba(0, 0, 0, 0.15)",
          },
        },
      },
    },
  },
});

export default theme;
