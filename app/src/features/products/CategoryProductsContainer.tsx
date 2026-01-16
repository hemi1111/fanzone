import { useMemo, useState, useEffect, useRef } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MenuItem, useTheme, Checkbox, InputAdornment } from "@mui/material";

import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SortIcon from "@mui/icons-material/Sort";
import SearchIcon from "@mui/icons-material/Search";

import { useShop } from "../../contexts/ShopContext";
import ProductsGrid from "./ProductsGrid";
import PriceFilter from "../../components/PriceFilter";
import ProductTypeFilter from "../../components/ProductTypeFilter";
import {
  CATEGORY_CONFIGS,
  type CategoryConfig,
} from "../../types/CategoryConfig";

interface CategoryProductsContainerProps {
  category: string;
}

const CategoryProductsContainer = ({
  category,
}: CategoryProductsContainerProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { searchQuery }: any = useShop();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(!isMobile);
  const [categorySearch, setCategorySearch] = useState<string>(""); // Category-specific search
  const [searchInput, setSearchInput] = useState<string>(""); // Local input state for immediate feedback
  const [priceRange, setPriceRange] = useState<any[]>([0, 5000]);
  const [priceInput, setPriceInput] = useState<any[]>([0, 5000]);
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>(
    []
  );
  const [sortOption, setSortOption] = useState<string>("default");
  const [showDiscountedOnly, setShowDiscountedOnly] = useState<boolean>(false);
  const debounceTimeout = useRef<any>(null);
  const searchTimeout = useRef<any>(null);

  // Get category configuration
  const categoryConfig: CategoryConfig | undefined = CATEGORY_CONFIGS[category];

  if (!categoryConfig) {
    return (
      <Container>
        <Typography variant="h4" color="error">
          Category not found: {category}
        </Typography>
      </Container>
    );
  }

  const params = useMemo(
    () => ({
      search: categorySearch || searchQuery, // Use category search if available, fallback to global
      categories: category, // Single category for this page
      productTypes:
        selectedProductTypes.length > 0
          ? selectedProductTypes.join(",")
          : undefined,
      discountedOnly: showDiscountedOnly,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      sortOption,
    }),
    [
      categorySearch,
      searchQuery,
      category,
      selectedProductTypes,
      showDiscountedOnly,
      priceRange,
      sortOption,
    ]
  );

  const clearFilters = () => {
    setCategorySearch("");
    setSearchInput("");
    setPriceRange([0, 5000]);
    setPriceInput([0, 5000]);
    setSelectedProductTypes([]);
    setShowDiscountedOnly(false);
    setSortOption("default");
  };

  // Handle category search with debouncing
  const handleCategorySearch = (value: string) => {
    // Update input immediately for UI feedback
    setSearchInput(value);

    // Clear existing timeout
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    // Set new timeout for debounced search
    searchTimeout.current = setTimeout(() => {
      setCategorySearch(value);
    }, 500);
  };

  // Quick filter presets
  const quickFilters = [
    {
      label: "Nën 1500 ALL",
      action: () => {
        setPriceRange([0, 1500]);
        setPriceInput([0, 1500]);
      },
    },
    {
      label: "Nën 3000 ALL",
      action: () => {
        setPriceRange([0, 3000]);
        setPriceInput([0, 3000]);
      },
    },
    { label: "Në Zbritje", action: () => setShowDiscountedOnly(true) },
  ];

  const handlePriceChange = (newValue: any) => {
    setPriceInput(newValue);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      setPriceRange(newValue);
    }, 1000);
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setDrawerOpen(newOpen);
  };

  useEffect(() => {
    if (isMobile) {
      setDrawerOpen(false);
    } else {
      setDrawerOpen(true);
    }
  }, [isMobile]);

  const hasActiveFilters =
    categorySearch.length > 0 ||
    selectedProductTypes.length > 0 ||
    showDiscountedOnly ||
    priceRange[0] > 0 ||
    priceRange[1] < 5000 ||
    sortOption !== "default";

  const renderFilters = () => (
    <Box sx={{ p: 2, width: isMobile ? 280 : "auto" }}>
      {isMobile && (
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <IconButton onClick={toggleDrawer(false)}>
            <ArrowBackIosIcon />
          </IconButton>
          <Typography variant="h6" sx={{ ml: 1 }}>
            Filtrat
          </Typography>
        </Box>
      )}

      {/* Product Type Filter - Only show if category has multiple product types */}
      {categoryConfig.availableFilters.includes("product_type") && (
        <>
          <ProductTypeFilter
            availableTypes={categoryConfig.availableProductTypes}
            selectedTypes={selectedProductTypes}
            onTypeChange={setSelectedProductTypes}
          />
          <Divider sx={{ my: 2 }} />
        </>
      )}

      {/* Price Filter */}
      {categoryConfig.availableFilters.includes("price") && (
        <>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Çmimi
          </Typography>
          <Box sx={{ mr: 2, mt: 2 }}>
            <PriceFilter
              value={priceInput}
              onChange={handlePriceChange}
              min={0}
              max={5000}
              step={50}
            />
          </Box>
          <Divider sx={{ my: 2 }} />
        </>
      )}

      {/* Discount Filter */}
      <FormControlLabel
        control={
          <Checkbox
            checked={showDiscountedOnly}
            onChange={(e) => setShowDiscountedOnly(e.target.checked)}
            sx={{
              color: "#333",
              "&.Mui-checked": {
                color: "#000",
              },
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          />
        }
        label="Produktet në Zbritje"
      />

      <Button
        variant="outlined"
        fullWidth
        onClick={clearFilters}
        sx={{
          mt: 2,
          borderColor: "#333",
          color: "#333",
          "&:hover": {
            borderColor: "#000",
            backgroundColor: "#f5f5f5",
          },
        }}
      >
        Fshi filtrat
      </Button>
    </Box>
  );

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      {/* Category Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#333",
            textAlign: "center",
            fontSize: { xs: "1.75rem", sm: "2.125rem", md: "3rem" },
            mb: { xs: 2, md: 3 },
          }}
        >
          {categoryConfig.name}
        </Typography>
      </Box>

      {/* Category Search Bar */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder={`Kërko në ${categoryConfig.name}...`}
          value={searchInput}
          onChange={(e) => handleCategorySearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            maxWidth: { xs: "100%", md: 600 },
            mx: "auto",
            display: "block",
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              backgroundColor: "#fff",
              "& fieldset": {
                borderColor: "#e0e0e0",
              },
              "&:hover fieldset": {
                borderColor: "#333",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#000",
              },
            },
          }}
        />
      </Box>

      {/* Quick Filter Chips */}
      <Box sx={{ mb: 3, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Filtra të shpejtë:
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {quickFilters.map((filter, index) => (
            <Chip
              key={index}
              label={filter.label}
              onClick={filter.action}
              variant="outlined"
              sx={{
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
                "&.MuiChip-clickable": {
                  "&:hover": {
                    backgroundColor: "#e8e8e8",
                  },
                },
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Applied Filters Display */}
      {hasActiveFilters && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Filtrat e aplikuar:
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {categorySearch && (
              <Chip
                label={`Kërkimi: "${categorySearch}"`}
                onDelete={() => {
                  setCategorySearch("");
                  setSearchInput("");
                }}
                size="small"
                variant="filled"
                color="primary"
              />
            )}
            {selectedProductTypes.map((type) => (
              <Chip
                key={type}
                label={`Lloji: ${type}`}
                onDelete={() =>
                  setSelectedProductTypes((prev) =>
                    prev.filter((t) => t !== type)
                  )
                }
                size="small"
                variant="filled"
              />
            ))}
            {(priceRange[0] > 0 || priceRange[1] < 5000) && (
              <Chip
                label={`Çmimi: ${priceRange[0]} - ${priceRange[1]} ALL`}
                onDelete={() => {
                  setPriceRange([0, 5000]);
                  setPriceInput([0, 5000]);
                }}
                size="small"
                variant="filled"
              />
            )}

            {showDiscountedOnly && (
              <Chip
                label="Në Zbritje"
                onDelete={() => setShowDiscountedOnly(false)}
                size="small"
                variant="filled"
              />
            )}
            {sortOption !== "default" && (
              <Chip
                label={`Renditja: ${sortOption}`}
                onDelete={() => setSortOption("default")}
                size="small"
                variant="filled"
              />
            )}
          </Box>
        </Box>
      )}

      <Grid container spacing={4}>
        {/* Desktop Sidebar */}
        {!isMobile && (
          <Grid size={{ xs: 12, md: 3 }}>
            <Box
              sx={{
                position: "sticky",
                top: 20,
                backgroundColor: "#f9f9f9",
                borderRadius: 2,
                p: 2,
              }}
            >
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Filtrat
              </Typography>
              {renderFilters()}
            </Box>
          </Grid>
        )}

        {/* Main Content */}
        <Grid size={{ xs: 12, md: isMobile ? 12 : 9 }}>
          {/* Mobile Controls */}
          {isMobile && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
                gap: 2,
              }}
            >
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                onClick={toggleDrawer(true)}
                sx={{
                  flex: 1,
                  borderColor: "#333",
                  color: "#333",
                  "&:hover": {
                    borderColor: "#000",
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                Filtrat
                {hasActiveFilters && (
                  <Box
                    sx={{
                      ml: 1,
                      width: 6,
                      height: 6,
                      backgroundColor: "#d32f2f",
                      borderRadius: "50%",
                    }}
                  />
                )}
              </Button>

              <TextField
                select
                size="small"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                sx={{
                  minWidth: 120,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#333",
                    },
                    "&:hover fieldset": {
                      borderColor: "#000",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#000",
                    },
                  },
                }}
                InputProps={{
                  startAdornment: <SortIcon sx={{ mr: 1, color: "#333" }} />,
                }}
              >
                <MenuItem value="default">Parazgjedhje</MenuItem>
                <MenuItem value="price-low">Çmimi: Ulët në Lartë</MenuItem>
                <MenuItem value="price-high">Çmimi: Lartë në Ulët</MenuItem>
                <MenuItem value="name-asc">Emri: A-Z</MenuItem>
                <MenuItem value="name-desc">Emri: Z-A</MenuItem>
              </TextField>
            </Box>
          )}

          {/* Desktop Sort */}
          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography variant="body1" color="text.secondary">
                Kategoria: {categoryConfig.name}
              </Typography>

              <TextField
                select
                size="small"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                sx={{
                  minWidth: 200,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#333",
                    },
                    "&:hover fieldset": {
                      borderColor: "#000",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#000",
                    },
                  },
                }}
                InputProps={{
                  startAdornment: <SortIcon sx={{ mr: 1, color: "#333" }} />,
                }}
              >
                <MenuItem value="default">Parazgjedhje</MenuItem>
                <MenuItem value="price-low">Çmimi: Ulët në Lartë</MenuItem>
                <MenuItem value="price-high">Çmimi: Lartë në Ulët</MenuItem>
                <MenuItem value="name-asc">Emri: A-Z</MenuItem>
                <MenuItem value="name-desc">Emri: Z-A</MenuItem>
              </TextField>
            </Box>
          )}

          {/* Products Grid */}
          <ProductsGrid params={params} clearFilters={clearFilters} />
        </Grid>
      </Grid>

      {/* Mobile Filter Drawer */}
      <Drawer
        anchor="left"
        open={isMobile && drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {renderFilters()}
      </Drawer>
    </Container>
  );
};

export default CategoryProductsContainer;
