import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export type LogoVariant = "dark" | "light";

interface LogoProps {
  /** dark = light text (navbar), light = dark text (drawer) */
  variant?: LogoVariant;
  /** Render as link to home; if false, renders as Box */
  asLink?: boolean;
  /** Optional sx for the container */
  sx?: object;
  onClick?: () => void;
}

const Logo = ({
  variant = "dark",
  asLink = true,
  sx = {},
  onClick,
}: LogoProps) => {
  const isLightBg = variant === "light";

  const containerStyles = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    textDecoration: "none",
    transition: "opacity 0.2s ease",
    "&:hover": { opacity: 0.9 },
    ...sx,
  };

  const fanColor = isLightBg ? "#000000" : "white";
  const zoneGradient = isLightBg
    ? "linear-gradient(135deg, #000 0%, #333 100%)"
    : "linear-gradient(135deg, #fff 0%, #e0e0e0 100%)";

  const logoTextFan = {
    fontFamily: '"Oswald", "Inter", sans-serif',
    fontWeight: 700,
    fontSize: { xs: "1.15rem", md: "1.35rem" },
    letterSpacing: "0.22em",
    color: fanColor,
    textTransform: "uppercase" as const,
    lineHeight: 1.1,
  };

  const logoTextZone = {
    fontFamily: '"Oswald", "Inter", sans-serif',
    fontWeight: 700,
    fontSize: { xs: "1.15rem", md: "1.35rem" },
    letterSpacing: "0.22em",
    background: zoneGradient,
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textTransform: "uppercase" as const,
    lineHeight: 1.1,
    marginLeft: "6px", // same space as gap before divider, so divider has equal space as after "Fan"
  };

  const logoAccentBar = {
    width: "3px",
    height: "20px",
    borderRadius: 2,
    background: "linear-gradient(180deg, #e10600 0%, #ff5f52 100%)",
    flexShrink: 0,
  };

  const content = (
    <>
      <Typography component="span" sx={logoTextFan}>
        Fan
      </Typography>
      <Box sx={logoAccentBar} aria-hidden />
      <Typography component="span" sx={logoTextZone}>
        Zone
      </Typography>
    </>
  );

  if (asLink) {
    return (
      <Box
        component={RouterLink}
        to="/"
        sx={containerStyles}
        onClick={onClick}
      >
        {content}
      </Box>
    );
  }

  return (
    <Box sx={containerStyles} onClick={onClick}>
      {content}
    </Box>
  );
};

export default Logo;
