import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTiktok } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <Box
      id="footer"
      sx={{
        bgcolor: "black",
        color: "white",
        py: 6,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Fan Zone
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Destinacioni juaj kryesor për produkte dhe postera te sporteve te
              ndryshme
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                className="footer-social-icon"
                aria-label="Instagram"
                component={Link}
                href="https://instagram.com/fanzone.al"
                target="_blank"
                sx={{ color: "white" }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                className="footer-social-icon"
                aria-label="Facebook"
                component={Link}
                href="https://facebook.com/659230857277586"
                target="_blank"
                sx={{ color: "white" }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                className="footer-social-icon"
                aria-label="TikTok"
                component={Link}
                href="https://tiktok.com/@fanzone.al"
                target="_blank"
                sx={{ color: "white" }}
              >
                <FontAwesomeIcon icon={faTiktok} size="sm" />
              </IconButton>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Shfletoni
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Link
                  href="/"
                  color="inherit"
                  sx={{
                    display: "block",
                    mb: 1,
                    textDecoration: "none",
                    "&:hover": { color: "lightblue" },
                  }}
                >
                  Kryefaqja
                </Link>
                <Link
                  href="/f1"
                  color="inherit"
                  sx={{
                    display: "block",
                    mb: 1,
                    textDecoration: "none",
                    "&:hover": { color: "lightblue" },
                  }}
                >
                  F1
                </Link>
                <Link
                  href="/futboll"
                  color="inherit"
                  sx={{
                    display: "block",
                    mb: 1,
                    textDecoration: "none",
                    "&:hover": { color: "lightblue" },
                  }}
                >
                  Futboll
                </Link>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Link
                  href="/basketboll"
                  color="inherit"
                  sx={{
                    display: "block",
                    mb: 1,
                    textDecoration: "none",
                    "&:hover": { color: "lightblue" },
                  }}
                >
                  Basketboll
                </Link>
                <Link
                  href="/makina"
                  color="inherit"
                  sx={{
                    display: "block",
                    mb: 1,
                    textDecoration: "none",
                    "&:hover": { color: "lightblue" },
                  }}
                >
                  Makina
                </Link>
                <Link
                  href="/filma"
                  color="inherit"
                  sx={{
                    display: "block",
                    mb: 1,
                    textDecoration: "none",
                    "&:hover": { color: "lightblue" },
                  }}
                >
                  Filma
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Kontakt
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Email: fanzone@gmail.com
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Tiranë, Shqipëri
            </Typography>
            <Link
              href="/contact-us"
              color="inherit"
              fontSize={"14px"}
              sx={{
                display: "block",
                mb: 1,
                "&:hover": { color: "lightblue" },
              }}
            >
              Na kontaktoni
            </Link>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3, bgcolor: "rgba(255,255,255,0.1)" }} />
        <Typography variant="body2" align="center" sx={{ pt: 2 }}>
          {`© ${new Date().getFullYear()} Fan Zone`}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
