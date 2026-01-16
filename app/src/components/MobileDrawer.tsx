import type { Dispatch, SetStateAction } from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTiktok } from "@fortawesome/free-brands-svg-icons";
import CategoryIcon from "@mui/icons-material/Category";

import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";

interface MobileDrawerProps {
  drawerOpen: boolean;
  toggleDrawer: Dispatch<SetStateAction<boolean>>;
  pages: any;
}

const MobileDrawer = ({
  drawerOpen,
  toggleDrawer,
  pages,
}: MobileDrawerProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuButtonClick = (navigationLink: string) => {
    toggleDrawer(false);
    navigate(navigationLink);
  };

  return (
    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
      <Box
        sx={{
          width: 250,
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
          color: "#000000",
          height: "100vh",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
            pl: 2,
            backgroundColor: "#f8f8f8",
            borderBottom: "1px solid #e0e0e0",
            position: "relative",
            zIndex: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#000000",
              letterSpacing: "1px",
            }}
          >
            Fan Zone
          </Typography>
          <IconButton
            onClick={() => toggleDrawer(false)}
            sx={{
              color: "#000000",
              "&:hover": {
                backgroundColor: "#f0f0f0",
                transform: "scale(1.1)",
              },
              transition: "all 0.2s ease",
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>
        </Box>

        <Divider sx={{ borderColor: "#e0e0e0" }} />

        <List
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            height: "calc(100vh - 80px)",
            p: 0,
          }}
        >
          <Box>
            {pages.map((page: any) => (
              <ListItem key={page.name} disablePadding>
                <ListItemButton
                  onClick={() => {
                    toggleDrawer(false);
                    if (page.scrollTo) {
                      if (location.pathname !== "/") {
                        navigate("/", { state: { scrollTo: page.scrollTo } });
                      } else {
                        setTimeout(() => {
                          const el = document.getElementById(page.scrollTo);
                          if (el) {
                            el.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                          }
                        }, 50);
                      }
                    } else {
                      handleMenuButtonClick(page.path);
                    }
                  }}
                  selected={location.pathname === page.path && !page.scrollTo}
                  sx={{
                    color: "#000000",
                    position: "relative",
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: "#000000", minWidth: "40px" }}>
                    {page.icon ?? <CategoryIcon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={page.name}
                    sx={{
                      "& .MuiTypography-root": {
                        fontWeight: 500,
                        fontSize: "0.95rem",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}

            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleMenuButtonClick("/cart")}
                selected={location.pathname === "/cart"}
                sx={{
                  color: "#000000",
                  position: "relative",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "#000000", minWidth: "40px" }}>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Shporta"}
                  sx={{
                    "& .MuiTypography-root": {
                      fontWeight: 500,
                      fontSize: "0.95rem",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                component={RouterLink}
                target="_blank"
                to={"https://www.instagram.com/fanzone.al"}
                sx={{
                  color: "#000000",
                  position: "relative",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "#000000", minWidth: "40px" }}>
                  <InstagramIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Instagram"}
                  sx={{
                    "& .MuiTypography-root": {
                      fontWeight: 500,
                      fontSize: "0.95rem",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>

            <Divider sx={{ mt: 2, borderColor: "#e0e0e0" }} />
          </Box>
          <Stack sx={{ p: 2 }}>
            <Stack
              direction="row"
              justifyContent={"space-evenly"}
              sx={{
                backgroundColor: "#f8f8f8",
                borderRadius: "8px",
                p: 1,
                mb: 2,
              }}
            >
              <Button
                color="inherit"
                component="a"
                href="https://www.instagram.com/fanzone.al"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "#000000",
                  minWidth: "auto",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                    transform: "scale(1.1)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <InstagramIcon />
              </Button>
              <Button
                color="inherit"
                component="a"
                href="https://www.facebook.com/659230857277586"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "#000000",
                  minWidth: "auto",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                    transform: "scale(1.1)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <FacebookIcon />
              </Button>
              <Button
                color="inherit"
                component="a"
                href="https://www.tiktok.com/@fanzone.al"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "#000000",
                  minWidth: "auto",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                    transform: "scale(1.1)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <FontAwesomeIcon icon={faTiktok} size="lg" />
              </Button>
            </Stack>

            <Divider sx={{ mb: 2, borderColor: "#e0e0e0" }} />

            <Typography
              variant="body2"
              align="center"
              sx={{
                m: 1,
                color: "#666666",
                fontSize: "0.75rem",
                letterSpacing: "0.5px",
              }}
            >
              © {new Date().getFullYear()} Fan Zone
            </Typography>
          </Stack>
        </List>
      </Box>
    </Drawer>
  );
};

export default MobileDrawer;
