import { useState } from "react";
import { useTranslation } from "react-i18next";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import AL from "country-flag-icons/react/3x2/AL";
import GB from "country-flag-icons/react/3x2/GB";
import IT from "country-flag-icons/react/3x2/IT";

const languages = [
  { code: "en", label: "English", Flag: GB },
  { code: "sq", label: "Shqip", Flag: AL },
  { code: "it", label: "Italiano", Flag: IT },
];

const FLAG_SX = {
  width: 20,
  lineHeight: 0,
  display: "inline-flex",
  alignItems: "center" as const,
  "& > svg": { width: 20, display: "block" },
};

interface LanguageSwitcherProps {
  variant?: "navbar" | "footer";
}

const LanguageSwitcher = ({ variant = "navbar" }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const currentLanguage =
    languages.find((l) => l.code === i18n.language) ?? languages[0];
  const CurrentFlag = currentLanguage.Flag;

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem("fanzone_language", code);
    handleClose();
  };

  const isNavbar = variant === "navbar";

  return (
    <>
      <Button
        onClick={handleOpen}
        endIcon={<KeyboardArrowDownIcon sx={{ fontSize: "1rem !important" }} />}
        sx={{
          color: isNavbar ? "white" : "inherit",
          textTransform: "none",
          minWidth: "auto",
          px: 1,
          gap: 0.5,
          fontSize: "0.8rem",
          fontWeight: 500,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
          <Box sx={FLAG_SX}>
            <CurrentFlag />
          </Box>
          <span>{currentLanguage.code.toUpperCase()}</span>
        </Box>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        slotProps={{ paper: { sx: { minWidth: 140 } } }}
      >
        {languages.map(({ code, label, Flag }) => (
          <MenuItem
            key={code}
            onClick={() => handleSelect(code)}
            selected={i18n.language === code}
            sx={{ gap: 1.5, fontSize: "0.875rem" }}
          >
            <Box sx={FLAG_SX}>
              <Flag />
            </Box>
            {label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageSwitcher;
