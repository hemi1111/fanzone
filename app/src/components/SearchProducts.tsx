import { useEffect, useState } from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import CircularProgress from "@mui/material/CircularProgress";
import Chip from "@mui/material/Chip";

import { useSearchProducts } from "../hooks/useSearchProducts";
import { useNavigate } from "react-router-dom";
import type { Product } from "../types/Product";

// Helper function to get price range for posters with different sizes
const getPosterPriceRange = (product: Product) => {
  if (
    product.product_type !== "poster" ||
    !product.attributes?.poster_options?.pricing
  ) {
    return null;
  }

  const pricing = product.attributes.poster_options.pricing;
  // Ensure we always have a number for discount percentage, defaulting to 20% for products with discount flag
  const discountPercentage =
    product.attributes.poster_options.discount_percentage ??
    (product.discount ? 20 : 0);
  const allPrices: number[] = [];

  // Collect all prices from different sizes and materials
  Object.values(pricing).forEach((sizeOptions: any) => {
    Object.values(sizeOptions).forEach((price: any) => {
      if (typeof price === "number") {
        allPrices.push(price);
      }
    });
  });

  if (allPrices.length === 0) return null;

  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);

  // Apply discount if product has discount flag and discount_percentage exists
  const hasValidDiscount = product.discount && discountPercentage > 0;
  const minDiscountedPrice = hasValidDiscount
    ? Math.round(minPrice * (1 - discountPercentage / 100))
    : minPrice;
  const maxDiscountedPrice = hasValidDiscount
    ? Math.round(maxPrice * (1 - discountPercentage / 100))
    : maxPrice;

  // If min and max are the same, return single price
  if (minPrice === maxPrice) {
    return {
      min: minPrice,
      max: maxPrice,
      minDiscounted: minDiscountedPrice,
      maxDiscounted: maxDiscountedPrice,
      isSinglePrice: true,
      hasDiscount: hasValidDiscount,
      discountPercentage,
    };
  }

  return {
    min: minPrice,
    max: maxPrice,
    minDiscounted: minDiscountedPrice,
    maxDiscounted: maxDiscountedPrice,
    isSinglePrice: false,
    hasDiscount: hasValidDiscount,
    discountPercentage,
  };
};

const SearchProducts = ({
  searchValue,
  setShowSuggestions,
}: {
  searchValue: string;
  setShowSuggestions: any;
}) => {
  const [searchValueTimeout, setSearchValueTimeout] = useState<string>("");
  const { data: products, isLoading } = useSearchProducts(searchValueTimeout);

  const navigate = useNavigate();

  const isDebouncing = searchValueTimeout !== searchValue;

  const handleProductClick = (id: string) => {
    navigate(`/product/${id}`);
    setShowSuggestions(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchValueTimeout(searchValue);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [searchValue]);

  return (
    <Stack
      direction="column"
      spacing={1}
      zIndex={1200}
      sx={{
        position: "absolute", // or "fixed" depending on your layout
        top: "100%", // if you’re rendering below an input field
        left: 0,
        right: 0,
        bgcolor: "background.paper", // make sure it has a solid background
        boxShadow: 3, // optional, for dropdown feel
        borderRadius: 1,
      }}
    >
      <List
        disablePadding
        sx={{
          maxHeight: "50vh",
          overflowY: "auto",
          mb: 1,
        }}
      >
        {isDebouncing || isLoading ? (
          <ListItem>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </div>
          </ListItem>
        ) : Array.isArray(products) && products.length > 0 ? (
          products.map((product: any) => (
            <ListItemButton
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              onTouchStart={() => {
                handleProductClick(product.id);
              }}
              sx={{ borderRadius: 1, mb: 0.5 }}
            >
              <ListItemAvatar>
                <Avatar
                  src={product.thumbnail}
                  alt={product.name}
                  variant="square"
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Stack>
                    {product.name}
                    <Typography color="grey" variant="subtitle2">
                      {product.category}
                    </Typography>
                  </Stack>
                }
                primaryTypographyProps={{
                  component: "div",
                }}
                secondary={
                  <Stack direction="row" alignItems="center" spacing={1}>
                    {(() => {
                      const priceRange = getPosterPriceRange(product);

                      if (priceRange && !priceRange.isSinglePrice) {
                        // Display starting from min price for posters with different sizes
                        if (priceRange.hasDiscount) {
                          return (
                            <>
                              <Typography
                                variant="body2"
                                color="primary"
                                noWrap
                              >
                                Nga{" "}
                                {priceRange.minDiscounted.toLocaleString(
                                  "sq-AL"
                                )}{" "}
                                ALL
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ textDecoration: "line-through" }}
                              >
                                {priceRange.min.toLocaleString("sq-AL")} ALL
                              </Typography>
                              <Chip
                                label="ZBRITJE"
                                color="error"
                                size="small"
                                sx={{
                                  fontSize: "0.6rem",
                                  height: "16px",
                                  fontWeight: "600",
                                }}
                              />
                            </>
                          );
                        } else {
                          return (
                            <Typography variant="body2" color="primary" noWrap>
                              Nga {priceRange.min.toLocaleString("sq-AL")} ALL
                            </Typography>
                          );
                        }
                      } else if (priceRange && priceRange.isSinglePrice) {
                        // Single price poster (all sizes/materials have same price)
                        if (priceRange.hasDiscount) {
                          return (
                            <>
                              <Typography
                                variant="body2"
                                color="primary"
                                noWrap
                              >
                                Nga{" "}
                                {priceRange.minDiscounted.toLocaleString(
                                  "sq-AL"
                                )}{" "}
                                ALL
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ textDecoration: "line-through" }}
                              >
                                {priceRange.min.toLocaleString("sq-AL")} ALL
                              </Typography>
                              <Chip
                                label="ZBRITJE"
                                color="error"
                                size="small"
                                sx={{
                                  fontSize: "0.6rem",
                                  height: "16px",
                                  fontWeight: "600",
                                }}
                              />
                            </>
                          );
                        } else {
                          return (
                            <Typography variant="body2" color="primary" noWrap>
                              Nga {priceRange.min.toLocaleString("sq-AL")} ALL
                            </Typography>
                          );
                        }
                      } else if (product.discount) {
                        // Original discount logic for non-poster products
                        return (
                          <>
                            <Typography variant="body2" color="primary" noWrap>
                              {product.final_price?.toLocaleString("sq-AL")} ALL
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ textDecoration: "line-through" }}
                            >
                              {product.price?.toLocaleString("sq-AL")} ALL
                            </Typography>
                            <Chip
                              label="ZBRITJE"
                              color="error"
                              size="small"
                              sx={{
                                fontSize: "0.6rem",
                                height: "16px",
                                fontWeight: "600",
                              }}
                            />
                          </>
                        );
                      } else {
                        // Original single price logic for non-poster products
                        return (
                          <Typography variant="body2" color="primary" noWrap>
                            {product.final_price?.toLocaleString("sq-AL") ||
                              product.price?.toLocaleString("sq-AL")}{" "}
                            ALL
                          </Typography>
                        );
                      }
                    })()}
                  </Stack>
                }
                secondaryTypographyProps={{
                  component: "div",
                }}
              />
            </ListItemButton>
          ))
        ) : (
          <ListItem>
            <Typography
              sx={{ width: "100%", textAlign: "center" }}
              color="text.secondary"
            >
              Produkti nuk u gjet, kerkoni ndryshe
            </Typography>
          </ListItem>
        )}
      </List>
    </Stack>
  );
};

export default SearchProducts;
