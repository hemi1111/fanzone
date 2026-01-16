import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";

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
    product.attributes.poster_options.discount_percentage;
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

const ProductCard = ({
  product,
  navigationLink = "",
}: {
  product: Product;
  navigationLink?: string;
}) => {
  const { id, name, price, final_price, thumbnail, category, discount } =
    product;

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigationLink ? navigate(navigationLink) : navigate(`/product/${id}`);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Card
        onClick={handleCardClick}
        sx={{
          width: 345,
          cursor: "pointer",
          position: "relative",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          "&:hover .hoverOverlay": {
            opacity: 1,
          },
          "@media (max-width:600px)": {
            transition: "none",
            "&:hover": {
              transform: "none !important",
            },
          },
        }}
      >
        {discount && (
          <Chip
            label={`ZBRITJE`}
            color="error"
            size="small"
            sx={{
              position: "absolute",
              top: 15,
              left: 15,
              zIndex: 1,
              fontWeight: "600",
              fontFamily: "'Inter', 'Roboto', sans-serif",
              letterSpacing: "0.02em",
              fontSize: "0.75rem",
            }}
          />
        )}
        <CardMedia
          component="img"
          image={thumbnail}
          alt={name}
          sx={{
            objectFit: "cover",
          }}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            height: "100%",
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            gutterBottom
            sx={{
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
              fontFamily: "'Inter', 'Roboto', sans-serif",
              fontWeight: "500",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            {category}
          </Typography>
          <Typography
            gutterBottom
            variant="body1"
            sx={{
              fontSize: { xs: "0.875rem", sm: "1rem" },
              lineHeight: { xs: 1.3, sm: 1.4 },
              fontWeight: "600",
              fontFamily: "'Inter', 'Roboto', sans-serif",
              letterSpacing: "-0.01em",
              color: "#1a1a1a",
            }}
          >
            {name}
          </Typography>
          <Box
            sx={{
              mt: "auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {(() => {
              const priceRange = getPosterPriceRange(product);

              if (priceRange && !priceRange.isSinglePrice) {
                // Display starting from min price for posters with different sizes
                if (priceRange.hasDiscount) {
                  return (
                    <Stack direction="row" alignItems="center">
                      <Typography
                        variant="h6"
                        color="primary"
                        fontWeight="700"
                        sx={{
                          fontSize: { xs: "1rem", sm: "1rem" },
                          fontFamily: "'Inter', 'Roboto', sans-serif",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        Nga {priceRange.minDiscounted.toLocaleString("sq-AL")}{" "}
                        ALL
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          ml: 1,
                          textDecoration: "line-through",
                          fontSize: { xs: "0.75rem", sm: "0.875rem" },
                          fontFamily: "'Inter', 'Roboto', sans-serif",
                          fontWeight: "500",
                        }}
                      >
                        {priceRange.min.toLocaleString("sq-AL")} ALL
                      </Typography>
                    </Stack>
                  );
                } else {
                  return (
                    <Typography
                      variant="h6"
                      color="primary"
                      fontWeight="700"
                      sx={{
                        fontSize: { xs: "1rem", sm: "1rem" },
                        fontFamily: "'Inter', 'Roboto', sans-serif",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      Nga {priceRange.min.toLocaleString("sq-AL")} ALL
                    </Typography>
                  );
                }
              } else if (priceRange && priceRange.isSinglePrice) {
                // Single price poster (all sizes/materials have same price)
                if (priceRange.hasDiscount) {
                  return (
                    <Stack direction="row" alignItems="center">
                      <Typography
                        variant="h6"
                        color="primary"
                        fontWeight="700"
                        sx={{
                          fontFamily: "'Inter', 'Roboto', sans-serif",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        Nga {priceRange.minDiscounted.toLocaleString("sq-AL")}{" "}
                        ALL
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          ml: 1,
                          textDecoration: "line-through",
                          fontSize: { xs: "0.75rem", sm: "0.875rem" },
                          fontFamily: "'Inter', 'Roboto', sans-serif",
                          fontWeight: "500",
                        }}
                      >
                        {priceRange.min.toLocaleString("sq-AL")} ALL
                      </Typography>
                    </Stack>
                  );
                } else {
                  return (
                    <Typography
                      variant="h6"
                      color="primary"
                      fontWeight="700"
                      sx={{
                        fontSize: { xs: "1rem", sm: "1rem" },
                        fontFamily: "'Inter', 'Roboto', sans-serif",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      Nga {priceRange.min.toLocaleString("sq-AL")} ALL
                    </Typography>
                  );
                }
              } else if (discount) {
                // Original discount logic for non-poster products
                return (
                  <Stack direction="row" alignItems="center">
                    <Typography
                      variant="h6"
                      color="primary"
                      fontWeight="700"
                      sx={{
                        fontFamily: "'Inter', 'Roboto', sans-serif",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {final_price.toLocaleString("sq-AL")} ALL
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        ml: 1,
                        textDecoration: "line-through",
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        fontFamily: "'Inter', 'Roboto', sans-serif",
                        fontWeight: "500",
                      }}
                    >
                      {price.toLocaleString("sq-AL")} ALL
                    </Typography>
                  </Stack>
                );
              } else {
                // Original single price logic for non-poster products
                return (
                  <Typography
                    variant="h6"
                    color="primary"
                    fontWeight="700"
                    sx={{
                      fontSize: { xs: "1rem", sm: "1rem" },
                      fontFamily: "'Inter', 'Roboto', sans-serif",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {price.toLocaleString("sq-AL")} ALL
                  </Typography>
                );
              }
            })()}
          </Box>
        </CardContent>
      </Card>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={!product.attributes ? "success" : "error"}
        >
          {!product.attributes ? (
            <Link
              to="/cart"
              style={{
                textDecoration: "none",
                color: "black",
              }}
            >
              Produkti u shtua në shportë
            </Link>
          ) : (
            "Për këtë produkt, zgjidhni opsionet para se ta shtoni në shportë."
          )}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductCard;
