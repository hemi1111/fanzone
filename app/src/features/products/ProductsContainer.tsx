import { useMemo, useState, useEffect, useRef } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MenuItem, useTheme } from "@mui/material";

import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SortIcon from "@mui/icons-material/Sort";

import { useShop } from "../../contexts/ShopContext";
import ProductsGrid from "./ProductsGrid";
import PriceFilter from "../../components/PriceFilter";

const Products = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { searchQuery, setSearchQuery }: any = useShop();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(!isMobile);
  const [priceRange, setPriceRange] = useState<any[]>([0, 5000]);
  const [priceInput, setPriceInput] = useState<any[]>([0, 5000]);
  const [selectedCategories, setSelectedCategories] = useState<any>([]);
  const [sortOption, setSortOption] = useState<string>("default");
  const [showDiscountedOnly, setShowDiscountedOnly] = useState<boolean>(false);
  const debounceTimeout = useRef<any>(null);

  const params = useMemo(
    () => ({
      search: searchQuery,
      categories:
        selectedCategories.length > 0
          ? selectedCategories.join(",")
          : undefined,
      discountedOnly: showDiscountedOnly,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      sortOption,
    }),
    [
      searchQuery,
      selectedCategories,
      showDiscountedOnly,
      priceRange,
      sortOption,
    ]
  );

  // Get unique categories
  const categories = [
    "Makina",
    "Pista",
    "Poster Helmete",
    "Kapele",
    "Aksesore",
  ];

  const handleCategoryToggle = (category: any) => {
    setSelectedCategories((prev: any) => {
      if (prev.includes(category)) {
        return prev.filter((c: any) => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      let min = parseInt(priceInput[0]);
      let max = parseInt(priceInput[1]);
      if (isNaN(min)) min = 0;
      if (isNaN(max)) max = 5000;
      if (min < 0) min = 0;
      if (max > 5000) max = 5000;
      if (min > max) min = max;
      setPriceRange([min, max]);
    }, 1000);
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [priceInput]);

  const clearFilters = () => {
    setSearchQuery("");
    setPriceRange([0, 5000]);
    setPriceInput([0, 5000]);
    setSelectedCategories([]);
    setShowDiscountedOnly(false);
    setSortOption("default");
  };

  const toggleDrawer = (open: boolean) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const filterDrawer = (
    <Box sx={{ width: 250, p: 2 }} role="presentation">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Filtrat
        </Typography>
        {isMobile && (
          <IconButton onClick={toggleDrawer(false)}>
            <ArrowBackIosIcon color="secondary" />
          </IconButton>
        )}
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        Kategoritë
      </Typography>
      <List>
        {categories.map((category) => (
          <ListItem key={category} disablePadding>
            <ListItemButton
              dense
              onClick={() => handleCategoryToggle(category)}
            >
              <Checkbox
                edge="start"
                checked={selectedCategories.includes(category)}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary={category} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        Çmimi
      </Typography>
      <Box sx={{ mr: 2, mt: 2 }}>
        <PriceFilter
          value={priceInput}
          onChange={setPriceInput}
          min={0}
          max={5000}
          step={50}
        />
      </Box>

      <Divider sx={{ my: 2 }} />

      <FormControlLabel
        control={
          <Checkbox
            checked={showDiscountedOnly}
            onChange={(e) => setShowDiscountedOnly(e.target.checked)}
          />
        }
        label="Produktet në Zbritje"
      />

      <Button
        variant="outlined"
        color="primary"
        fullWidth
        onClick={clearFilters}
        sx={{ mt: 2 }}
      >
        Fshi filtrat
      </Button>
    </Box>
  );

  return (
    <Box>
      <Container maxWidth="xl" id="products">
        <Box sx={{ display: "flex", mb: 4, gap: 2, flexWrap: "wrap" }}>
          <Box
            sx={{
              display: "flex",
              gap: 4,
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {isMobile && (
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                onClick={toggleDrawer(true)}
              >
                Filtrat
              </Button>
            )}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <SortIcon />
              <TextField
                select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                variant="outlined"
                size="small"
                sx={{
                  minWidth: 220,
                  "& .MuiSelect-select": {
                    padding: "10px 14px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis", // truncate long text
                  },
                  borderRadius: "12px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: "#fff",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                    "& fieldset": {
                      borderColor: "#d0d0d0",
                    },
                    "&:hover fieldset": {
                      borderColor: "#999",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#000000ff",
                      borderWidth: "2px",
                    },
                  },
                  "& select": {
                    padding: "10px 14px",
                  },
                }}
              >
                <MenuItem value="default">Parazgjedhje</MenuItem>
                <MenuItem value="price-low">Çmimi në rritje ↑</MenuItem>
                <MenuItem value="price-high">Çmimi në zbritje ↓</MenuItem>
                <MenuItem value="name-asc">Emri : A-Z</MenuItem>
                <MenuItem value="name-desc">Emri : Z-A</MenuItem>
              </TextField>
            </Box>
          </Box>
        </Box>

        {/* Active filters */}
        {(selectedCategories.length > 0 ||
          showDiscountedOnly ||
          priceRange[0] > 0 ||
          priceRange[1] < 5000) && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1,
              mb: 3,
            }}
          >
            <Typography
              variant="body2"
              sx={{ mr: 1, display: "flex", alignItems: "center" }}
            >
              Filtrat e aplikuar:
            </Typography>

            {selectedCategories.map((category: any) => (
              <Chip
                key={category}
                label={category}
                onDelete={() => handleCategoryToggle(category)}
                size="small"
              />
            ))}

            {showDiscountedOnly && (
              <Chip
                label="Produktet në Zbritje"
                onDelete={() => setShowDiscountedOnly(false)}
                size="small"
              />
            )}

            {(priceRange[0] > 0 || priceRange[1] < 5000) && (
              <Chip
                label={`${priceRange[0]} ALL - ${priceRange[1]} ALL`}
                onDelete={() => setPriceRange([0, 5000])}
                size="small"
              />
            )}

            <Button
              variant="outlined"
              size="small"
              onClick={clearFilters}
              sx={{ ml: "auto" }}
            >
              Fshi filtrat
            </Button>
          </Box>
        )}

        <Grid container spacing={3}>
          {/* Filter sidebar for desktop */}
          {!isMobile && (
            <Grid size={{ xs: 12, md: 3, lg: 2 }}>{filterDrawer}</Grid>
          )}

          {/* Products grid */}
          <Grid size={{ xs: 12, md: 9, lg: 10 }}>
            <Typography variant="h4" sx={{ mb: 1 }}>
              Produktet
            </Typography>
            <ProductsGrid params={params} clearFilters={clearFilters} />
          </Grid>
        </Grid>
      </Container>
      {/* Mobile filter drawer */}
      {isMobile && (
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          {filterDrawer}
        </Drawer>
      )}
    </Box>
  );
};

export default Products;
