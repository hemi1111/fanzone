import { useState, useEffect, useRef } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Popper from "@mui/material/Popper";
import Paper from "@mui/material/Paper";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";

import Logo from "./Logo";
import MobileDrawer from "./MobileDrawer";
import SearchProducts from "./SearchProducts";

import { useShop } from "../contexts/ShopContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBasketball,
  faCameraRetro,
  faCar,
  faFlagCheckered,
  faHome,
  faSoccerBall,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const location = useLocation();

  const { cartItems, setSearchQuery }: any = useShop();

  const pagesList = [
    {
      name: "Kryefaqja",
      path: "/",
      icon: <FontAwesomeIcon icon={faHome} size="lg" />,
    },
    {
      name: "F1",
      path: "/f1",
      icon: <FontAwesomeIcon icon={faFlagCheckered} size="lg" />,
    },
    {
      name: "Futboll",
      path: "/futboll",
      icon: <FontAwesomeIcon icon={faSoccerBall} size="lg" />,
    },
    {
      name: "Basketboll",
      path: "/basketboll",
      icon: <FontAwesomeIcon icon={faBasketball} size="lg" />,
    },
    {
      name: "Makina",
      path: "/makina",
      icon: <FontAwesomeIcon icon={faCar} size="lg" />,
    },
    {
      name: "Filma",
      path: "/filma",
      icon: <FontAwesomeIcon icon={faCameraRetro} size="lg" />,
    },
  ];

  const totalItems = cartItems.reduce(
    (sum: any, item: any) => sum + item.quantity,
    0
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
    if (searchOpen && mobileInputRef.current) {
      mobileInputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AppBar
      position="sticky"
      sx={{
        maxWidth: "100%",
        bgcolor: "#000000",
        boxShadow: scrolled ? 3 : 0,
        transition: "all 0.8s ease",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ position: "relative" }}>
          <Logo
            variant="dark"
            sx={{
              width: "fit-content",
              display: { xs: "none", md: "flex" },
            }}
          />

          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: "flex",
                md: "none",
              },
            }}
          >
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => setDrawerOpen(true)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <MobileDrawer
              drawerOpen={drawerOpen}
              toggleDrawer={() => setDrawerOpen(false)}
              pages={pagesList}
            />
          </Box>

          <Logo
            variant="dark"
            sx={{
              display: { xs: "flex", md: "none" },
              position: { xs: "absolute", md: "static" },
              left: { xs: "50%", md: "auto" },
              transform: { xs: "translateX(-50%)", md: "none" },
              justifyContent: "center",
            }}
          />

          {/* Desktop menu (centered) */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
            alignItems={"center"}
          >
            {pagesList.map((page) => (
              <Button
                key={page.name}
                component={RouterLink}
                to={page.path}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  mx: 1,
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -2,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: location.pathname === page.path ? "80%" : "0%",
                    height: "2px",
                    backgroundColor: "white",
                    transition: "width 0.3s ease",
                  },
                  "&:hover::after": {
                    width: "80%",
                  },
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <Box
            width={"fit-content"}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent:
                location.pathname === "/" ? "space-between" : "flex-end",
            }}
          >
            {/*Mobile Search*/}
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                alignItems: "center",
                width: "100%",
                position: "relative",
                minHeight: "40px", // Prevent layout shift
              }}
            >
              {/* Search Field with transition */}
              <Box
                sx={{
                  position: "absolute",
                  right: 0,
                  width: searchOpen ? "calc(100vw - 150px)" : "0%",
                  opacity: searchOpen ? 1 : 0,
                  pointerEvents: searchOpen ? "auto" : "none",
                  transition: "all 0.4s ease",
                }}
              >
                <div>
                  <TextField
                    inputRef={mobileInputRef}
                    type="search"
                    placeholder={"Kërko ..."}
                    value={searchValue}
                    onChange={(e) => {
                      setSearchValue(e.target.value);
                      setShowSuggestions(true);
                      setAnchorEl(e.currentTarget);
                      if (e.target.value === "") {
                        setSearchQuery("");
                      }
                    }}
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{
                      background: "#FFFFFF",
                      width: "90%",
                      borderRadius: "10px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                          border: "none",
                        },
                    }}
                    onBlur={() => {
                      setShowSuggestions(false);
                      setSearchValue("");
                      setSearchOpen(false);
                    }}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                  <Popper
                    open={showSuggestions && searchValue.length > 0}
                    anchorEl={anchorEl}
                    disablePortal={false} // makes sure it's rendered in <body>
                    sx={{ zIndex: 1200 }} // set z-index cleanly
                    placement="bottom-start"
                    style={{ width: "100%" }}
                  >
                    <Paper
                      elevation={3}
                      sx={{
                        p: 1,
                        mt: 0.5,
                        maxHeight: "50vh",
                        overflowY: "auto",
                      }}
                    >
                      <SearchProducts
                        searchValue={searchValue}
                        setShowSuggestions={setShowSuggestions}
                      />
                    </Paper>
                  </Popper>
                </div>
              </Box>
              {/* Search Icon (hidden when input is open) */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  flexGrow: 1,
                  opacity: searchOpen ? 0 : 1,
                  pointerEvents: searchOpen ? "none" : "auto",
                  transition: "opacity 0.4s ease",
                }}
              >
                <IconButton
                  onClick={() => setSearchOpen(true)}
                  sx={{ color: "white" }}
                >
                  <SearchIcon />
                </IconButton>
              </Box>
            </Box>

            {/* Desktop Search with icon and transition */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                position: "relative",
                ml: 2,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  right: 0,
                  width: "350px",
                  opacity: searchOpen ? 1 : 0,
                  pointerEvents: searchOpen ? "auto" : "none",
                  transition: "all 0.8s cubic-bezier(.4,1.3,.6,1)",
                }}
              >
                <ClickAwayListener
                  onClickAway={() => setShowSuggestions(false)}
                >
                  <div>
                    <TextField
                      inputRef={inputRef}
                      type="search"
                      placeholder={"Kërko ..."}
                      value={searchValue}
                      onChange={(e) => {
                        setSearchValue(e.target.value);
                        setShowSuggestions(true);
                        setAnchorEl(e.currentTarget);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setSearchQuery(searchValue);
                          setShowSuggestions(false);
                        }
                      }}
                      variant="outlined"
                      size="small"
                      sx={{
                        background: "#FFFFFF",
                        width: "320px",
                        borderRadius: "10px",
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                          {
                            border: "none",
                          },
                      }}
                      onBlur={() => {
                        if (!searchValue) setSearchOpen(false);
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                </ClickAwayListener>
              </Box>
              {/* Search Icon (hidden when input is open) */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  flexGrow: 1,
                  opacity: searchOpen ? 0 : 1,
                  pointerEvents: searchOpen ? "none" : "auto",
                  transition: "opacity 0.4s ease",
                }}
              >
                <IconButton
                  onClick={() => setSearchOpen(true)}
                  sx={{ color: "white" }}
                >
                  <SearchIcon />
                </IconButton>
              </Box>
            </Box>

            {/* Cart */}
            <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
              <IconButton
                component={RouterLink}
                to="/cart"
                sx={{
                  color: "white",
                  mr: 2,
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.1)" },
                }}
              >
                <Badge badgeContent={totalItems} color="primary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
