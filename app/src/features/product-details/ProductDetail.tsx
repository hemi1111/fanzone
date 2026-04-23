import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
import { translateCategory } from "../../utils/translateCategory";

import ProductImages from "./ProductImages";
import ProductAttributes from "./ProductAttributes";
import ProductDescription from "./ProductDescription";
import FrameDetails from "./FrameDetails";
import PosterCustomization, {
  type PosterSelections,
} from "../../components/PosterCustomization";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductCarousel from "../../components/ProductCarousel";
import { CATEGORY_CONFIGS } from "../../types/CategoryConfig";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

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

  const getLocalizedDescription = (p: typeof product) => {
    if (!p) return "";
    if (i18n.language === "en" && p.description_en) return p.description_en;
    if (i18n.language === "it" && p.description_it) return p.description_it;
    return p.description;
  };

  const calculatePosterPrice = (
    basePrice: number,
    selections: PosterSelections,
    applyDiscount: boolean = false
  ) => {
    if (product?.attributes?.poster_options?.pricing) {
      const pricing = product.attributes.poster_options.pricing;
      if (
        pricing[selections.size] &&
        pricing[selections.size][selections.material]
      ) {
        let price = pricing[selections.size][selections.material];

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

    return basePrice;
  };

  const handleAddToCart = () => {
    if (product) {
      const isPoster =
        product.product_type === "poster" && product.attributes?.poster_options;

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
        const customizedPrice = calculatePosterPrice(
          product.price,
          posterSelections,
          false
        );
        const customizedFinalPrice =
          product.product_type !== "poster"
            ? product.final_price
            : calculatePosterPrice(
                product.final_price,
                posterSelections,
                product.discount
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
        const updatedProduct = {
          ...product,
          attribute: selectedAttribute,
        };
        addToCart(updatedProduct, quantity);
      } else {
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
          <Typography variant="h5">{t("product.notFound")}</Typography>
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

    const isPoster =
      product.product_type === "poster" && product.attributes?.poster_options;

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
      const customizedPrice = calculatePosterPrice(
        product.price,
        posterSelections,
        false
      );
      const customizedFinalPrice = calculatePosterPrice(
        product.final_price,
        posterSelections,
        product.discount
      );

      updatedProduct = {
        ...product,
        price: customizedPrice,
        final_price: customizedFinalPrice,
        attribute: `${posterSelections.size} - ${posterSelections.frameColor} - ${posterSelections.material}`,
        posterCustomization: posterSelections,
      } as any;
    } else if (hasAttributes && selectedAttribute && product.attributes) {
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
          onClick={() =>
            navigate(
              product?.category && CATEGORY_CONFIGS[product.category]
                ? CATEGORY_CONFIGS[product.category].route
                : "/"
            )
          }
          sx={{ mb: 3 }}
        >
          {t("product.backToProducts")}
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
                {translateCategory(t, product.category)}
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
                ? product.attributes?.poster_options
                : true) && (
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
                                  false
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
                            {t("product.price")}
                            {posterSelections
                              ? calculatePosterPrice(
                                  product.final_price,
                                  posterSelections,
                                  true
                                )
                              : product.final_price}{" "}
                            ALL
                          </Typography>
                          <Chip
                            label={t("product.discountLabel")}
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
                                false
                              )
                            : product.price}{" "}
                          ALL
                        </Typography>
                      )
                    ) : product.discount ? (
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
                          {t("product.price")}
                          {product.final_price} ALL
                        </Typography>
                        <Chip
                          label={t("product.discountLabel")}
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
                {getLocalizedDescription(product).split(".")[0]}
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

              {/* Quantity Controls and Add to Cart */}
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

                  {/* Add to Cart Button */}
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
                    {t("product.addToCart")}
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
                  {t("product.buyNow")}
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
            <Tab label={t("product.details")} />
            <Tab label={t("product.shippingInfo")} />
            {product.product_type === "poster" && (
              <Tab label={t("product.frameDetails")} />
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
                <strong>{getLocalizedDescription(product).split(".")[0]}</strong>
                <br />
                <ProductDescription description={getLocalizedDescription(product)} />
              </Stack>
            )}

            {tabValue === 1 && (
              <Typography variant="body1">
                <strong>{t("product.shippingAlbania")}</strong>
                <br />
                {t("product.shippingText")}
                <br />
                <strong>{t("product.deliveryTime")}</strong>{" "}
                {t("product.deliveryDays")}
                <br />
                <strong>{t("product.shippingCost")}</strong>{" "}
                {t("product.freeShipping")}
              </Typography>
            )}

            {tabValue === 2 &&
              product.product_type === "poster" &&
              product.attributes?.poster_options && <FrameDetails />}
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
            {t("product.similarProducts")}
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
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {t("product.addedToCart")}
                </Link>
              );
            }

            if (isPoster && !posterSelections) {
              return <Typography>{t("product.configurePoster")}</Typography>;
            }

            return <Typography>{t("product.selectOption")}</Typography>;
          })()}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductDetail;
