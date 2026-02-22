import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Icon from "@mui/material/Icon";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

import { useShop } from "../../contexts/ShopContext";
import { useGetProduct } from "../../hooks/useGetProduct";

import ProductImages from "./ProductImages";
import ProductAttributes from "./ProductAttributes";
import ProductDescription from "./ProductDescription";
import FrameDetails from "./FrameDetails";
import PosterCustomization, {
  type PosterSelections,
} from "../../components/PosterCustomization";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductCarousel from "../../components/ProductCarousel";

const ProductDetail = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { addToCart }: any = useShop();

  const { data: product, isLoading: isLoadingDetailedProduct } =
    useGetProduct(id);

  const [tabValue, setTabValue] = useState<number>(0);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [selectedAttribute, setSelectedAttribute] = useState<string | null>(
    null
  );
  const [posterSelections, setPosterSelections] =
    useState<PosterSelections | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const calculatePosterPrice = (
    basePrice: number,
    selections: PosterSelections,
    applyDiscount: boolean = false
  ) => {
    // Get fixed price from product attributes
    if (product?.attributes?.poster_options?.pricing) {
      const pricing = product.attributes.poster_options.pricing;
      if (
        pricing[selections.size] &&
        pricing[selections.size][selections.material]
      ) {
        let price = pricing[selections.size][selections.material];

        // Apply discount if requested and discount_percentage exists
        if (
          applyDiscount &&
          product.discount &&
          product.attributes.poster_options.discount_percentage
        ) {
          const discountPercentage =
            product.attributes.poster_options.discount_percentage;
          price = Math.round(price * (1 - discountPercentage / 100));
        }

        return price;
      }
    }

    // Return base price if no pricing found (should not happen with fixed prices)
    return basePrice;
  };

  const handleAddToCart = () => {
    if (product) {
      // Check if it's a poster product
      const isPoster =
        product.product_type === "poster" && product.attributes?.poster_options;

      // Check if product has other attributes (sizes, colors, etc.)
      const hasAttributes =
        product.attributes &&
        (product.attributes.sizes ||
          product.attributes.colors ||
          product.attributes.dimensions);

      if (isPoster && !posterSelections) {
        setOpenSnackbar(true);
        return;
      }

      if (hasAttributes && !isPoster && !selectedAttribute) {
        setOpenSnackbar(true);
        return;
      }

      if (isPoster && posterSelections) {
        // Handle poster customization
        const customizedPrice = calculatePosterPrice(
          product.price,
          posterSelections,
          false // Original price
        );
        const customizedFinalPrice =
          product.product_type !== "poster"
            ? product.final_price
            : calculatePosterPrice(
                product.final_price,
                posterSelections,
                product.discount // Apply discount if product has discount flag
              );

        const updatedProduct = {
          ...product,
          price: customizedPrice,
          final_price: customizedFinalPrice,
          attribute: `${posterSelections.size} - ${posterSelections.frameColor} - ${posterSelections.material}`,
          posterCustomization: posterSelections,
        } as any;

        addToCart(updatedProduct, quantity);
      } else if (hasAttributes && selectedAttribute && product.attributes) {
        // Handle products with attributes (t-shirts, etc.)
        const updatedProduct = {
          ...product,
          attribute: selectedAttribute,
        };
        addToCart(updatedProduct, quantity);
      } else {
        // Handle simple products without attributes
        addToCart(product, quantity);
      }
      setOpenSnackbar(true);
    }
  };

  const handleTabChange = (_event: any, newValue: any) => {
    setTabValue(newValue);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (isLoadingDetailedProduct) {
    return (
      <div
        style={{
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          height: "80vh",
          display: "flex",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (!product) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <Stack alignItems="center" spacing={2}>
          <Icon>
            <FontAwesomeIcon icon={faExclamationCircle} />
          </Icon>
          <Typography variant="h5">Produkti nuk u gjet.</Typography>
        </Stack>
      </Container>
    );
  }

  const handleBuyNow = () => {
    if (!product.attributes) {
      navigate("/checkout", {
        state: {
          product,
          quantity: quantity,
        },
      });
      return;
    }

    // Check if it's a poster product
    const isPoster =
      product.product_type === "poster" && product.attributes?.poster_options;

    // Check if product has other attributes (sizes, colors, etc.)
    const hasAttributes =
      product.attributes &&
      (product.attributes.sizes ||
        product.attributes.colors ||
        product.attributes.dimensions);

    if (isPoster && !posterSelections) {
      setOpenSnackbar(true);
      return;
    }

    if (hasAttributes && !isPoster && !selectedAttribute) {
      setOpenSnackbar(true);
      return;
    }

    let updatedProduct = product;

    if (isPoster && posterSelections) {
      // Handle poster customization
      const customizedPrice = calculatePosterPrice(
        product.price,
        posterSelections,
        false // Original price
      );
      const customizedFinalPrice = calculatePosterPrice(
        product.final_price,
        posterSelections,
        product.discount // Apply discount if product has discount flag
      );

      updatedProduct = {
        ...product,
        price: customizedPrice,
        final_price: customizedFinalPrice,
        attribute: `${posterSelections.size} - ${posterSelections.frameColor} - ${posterSelections.material}`,
        posterCustomization: posterSelections,
      } as any;
    } else if (hasAttributes && selectedAttribute && product.attributes) {
      // Handle products with attributes (t-shirts, etc.)
      updatedProduct = {
        ...product,
        price: product.attributes.dimensions
          ? product.attributes.dimensions[selectedAttribute ?? 0]
          : product.price,
        final_price: product.attributes.dimensions
          ? product.attributes.dimensions[selectedAttribute ?? 0]
          : product.final_price,
        attribute: selectedAttribute,
      };
    }

    navigate("/checkout", {
      state: {
        product: updatedProduct,
        quantity: quantity,
      },
    });
  };

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="xl">
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
          sx={{ mb: 3 }}
        >
          Produktet
        </Button>

        <Grid container spacing={4}>
          {/* Product Image */}
          <Grid size={{ xs: 12, md: 6 }}>
            <ProductImages
              images={[product.thumbnail, ...(product.images || [])]}
            />
          </Grid>

          {/* Product Details */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {product.category}
              </Typography>

              <Typography
                variant="h4"
                component="h1"
                fontWeight="bold"
                gutterBottom
                sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}
              >
                {product.name}
              </Typography>

              {/* Price Section */}
              {(product.product_type === "poster"
                ? product.attributes?.poster_options // For posters, show if poster_options exist
                : true) && ( // For non-posters, always show price
                <Box sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 1,
                    }}
                  >
                    {product.product_type === "poster" ? (
                      // Poster pricing logic with discount calculations
                      product.discount ? (
                        <>
                          <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{
                              textDecoration: "line-through",
                              fontSize: "0.9rem",
                            }}
                          >
                            {posterSelections
                              ? calculatePosterPrice(
                                  product.price,
                                  posterSelections,
                                  false // Original price without discount
                                )
                              : product.price}{" "}
                            ALL
                          </Typography>
                          <Typography
                            variant="h5"
                            color="primary"
                            fontWeight="bold"
                            sx={{ fontSize: "1.5rem" }}
                          >
                            Cmimi:{" "}
                            {posterSelections
                              ? calculatePosterPrice(
                                  product.final_price,
                                  posterSelections,
                                  true // Apply discount
                                )
                              : product.final_price}{" "}
                            ALL
                          </Typography>
                          <Chip
                            label="ZBRITJE"
                            color="error"
                            size="small"
                            sx={{
                              color: "white",
                              fontWeight: "bold",
                              fontSize: "0.7rem",
                            }}
                          />
                        </>
                      ) : (
                        <Typography
                          variant="h5"
                          color="primary"
                          fontWeight="bold"
                        >
                          {posterSelections
                            ? calculatePosterPrice(
                                product.price,
                                posterSelections,
                                false // No discount to apply
                              )
                            : product.price}{" "}
                          ALL
                        </Typography>
                      )
                    ) : // Non-poster pricing logic - simple final_price display
                    product.discount ? (
                      <>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          sx={{
                            textDecoration: "line-through",
                            fontSize: "0.9rem",
                          }}
                        >
                          {product.price} ALL
                        </Typography>
                        <Typography
                          variant="h5"
                          color="primary"
                          fontWeight="bold"
                          sx={{ fontSize: "1.5rem" }}
                        >
                          Cmimi: {product.final_price} ALL
                        </Typography>
                        <Chip
                          label="ZBRITJE"
                          color="error"
                          size="small"
                          sx={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "0.7rem",
                          }}
                        />
                      </>
                    ) : (
                      <Typography
                        variant="h5"
                        color="primary"
                        fontWeight="bold"
                      >
                        {product.price} ALL
                      </Typography>
                    )}
                  </Box>
                </Box>
              )}

              {/* Product Description */}
              <Typography variant="body1" paragraph sx={{ mb: 3 }}>
                {product.description.split(".")[0]}
              </Typography>

              {/* Product Customization */}
              {product.product_type === "poster" &&
              product.attributes?.poster_options ? (
                <PosterCustomization
                  posterOptions={product.attributes.poster_options}
                  onSelectionChange={setPosterSelections}
                />
              ) : product.attributes &&
                (product.attributes.sizes ||
                  product.attributes.colors ||
                  product.attributes.dimensions) ? (
                <ProductAttributes
                  attributes={product.attributes}
                  selected={selectedAttribute}
                  setSelected={setSelectedAttribute}
                />
              ) : null}

              {/* Quantity Controls and Add to Cart - Same Row */}
              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 2,
                  }}
                >
                  {/* Quantity Controls */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      size="small"
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: "4px",
                        width: 32,
                        height: 32,
                      }}
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>

                    <Typography
                      variant="body1"
                      sx={{
                        minWidth: "40px",
                        textAlign: "center",
                        fontWeight: "medium",
                        px: 1,
                        py: 0.5,
                        border: "1px solid #e0e0e0",
                        borderRadius: "4px",
                      }}
                    >
                      {quantity}
                    </Typography>

                    <IconButton
                      onClick={() => setQuantity(quantity + 1)}
                      size="small"
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: "4px",
                        width: 32,
                        height: 32,
                      }}
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Box>

                  {/* Add to Cart Button - Same Row */}
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleAddToCart}
                    sx={{
                      backgroundColor: "#10ABAE",
                      color: "white",
                      py: 1.5,
                      px: 3,
                      flex: 1,
                      textTransform: "uppercase",
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                      "&:hover": {
                        backgroundColor: "#00796b",
                      },
                    }}
                  >
                    SHTO NË SHPORTË
                  </Button>
                </Box>

                {/* Buy Now Button */}
                <Button
                  variant="outlined"
                  fullWidth
                  size="large"
                  onClick={handleBuyNow}
                  sx={{
                    borderColor: "#e0e0e0",
                    color: "text.primary",
                    py: 1.5,
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                      borderColor: "#bdbdbd",
                    },
                  }}
                >
                  BLEJ TANI
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Product Tabs */}
        <Box sx={{ mt: 6, mb: 4 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Detajet" />
            <Tab label="Informacion mbi dërgesën" />
            {product.product_type === "poster" && (
              <Tab label="Detajet e kornizes" />
            )}
          </Tabs>

          <Box
            sx={{
              p: 3,
              border: 1,
              borderColor: "divider",
              borderTop: 0,
              minHeight: "200px",
            }}
          >
            {tabValue === 0 && (
              <Stack>
                <strong>{product.description.split(".")[0]}</strong>
                <br />
                <ProductDescription description={product.description} />
              </Stack>
            )}

            {tabValue === 1 && (
              <Typography variant="body1">
                <strong>Dërgesa vetëm në Shqipëri</strong>
                <br />
                Porosia juaj do të përpunohet shpejt dhe do të dorëzohet në
                adresën tuaj me kujdes.
                <br />
                <strong>Koha e dorëzimit:</strong> 2–3 ditë pune
                <br />
                <strong>Kosto transporti:</strong> Falas për porositë mbi 1.500
                ALL.
              </Typography>
            )}

            {tabValue === 2 &&
              product.product_type === "poster" &&
              product.attributes?.poster_options && (
                <FrameDetails
                  posterOptions={product.attributes.poster_options}
                />
              )}
          </Box>
        </Box>

        {/* Related Products */}
        <Box sx={{ mt: 6 }}>
          <Typography
            variant="h5"
            component="h2"
            fontWeight="bold"
            gutterBottom
          >
            Produkte të ngjashme
          </Typography>
          <ProductCarousel product_category={product.category} />
        </Box>
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={(() => {
            const isPoster =
              product.product_type === "poster" &&
              product.attributes?.poster_options;
            const hasAttributes =
              product.attributes &&
              (product.attributes.sizes ||
                product.attributes.colors ||
                product.attributes.dimensions);

            if (isPoster && !posterSelections) return "error";
            if (hasAttributes && !isPoster && !selectedAttribute)
              return "error";
            return "success";
          })()}
          sx={{ width: "100%" }}
        >
          {(() => {
            const isPoster =
              product.product_type === "poster" &&
              product.attributes?.poster_options;
            const hasAttributes =
              product.attributes &&
              (product.attributes.sizes ||
                product.attributes.colors ||
                product.attributes.dimensions);

            // Success cases - product was added to cart (no selectable attributes, or poster/attributes with selection made)
            if (
              !product.attributes ||
              Object.keys(product.attributes).length === 0 ||
              (isPoster && posterSelections) ||
              (hasAttributes && !isPoster && selectedAttribute) ||
              (!hasAttributes && !isPoster)
            ) {
              return (
                <Link
                  to="/cart"
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  Produkti u shtua në shportë
                </Link>
              );
            }

            // Error cases - validation failed
            if (isPoster && !posterSelections) {
              return (
                <Typography>
                  Ju lutem konfigurojeni posterin para se ta shtoni në shportë
                </Typography>
              );
            }

            if (hasAttributes && !isPoster && !selectedAttribute) {
              return (
                <Typography>Ju lutem zgjidhni një nga opsionet</Typography>
              );
            }

            return <Typography>Ju lutem zgjidhni një nga opsionet</Typography>;
          })()}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductDetail;
