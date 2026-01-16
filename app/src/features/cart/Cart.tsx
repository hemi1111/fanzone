import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PaymentIcon from "@mui/icons-material/Payment";

import { useShop } from "../../contexts/ShopContext";

export const buildAttributesText = (
  attributes: string | undefined,
  isPoster: boolean
) => {
  if (!attributes) return "";
  if (!isPoster) {
    return `- ${attributes}`;
  }
  const colorMap: { [key: string]: string } = {
    black: "e zezë",
    white: "e bardhë",
  };

  const finishMap: { [key: string]: string } = {
    framed: "me kornizë",
    canvas: "kanavacë",
  };

  const parts = attributes.split("-").map((p) => p.trim());

  const size = parts[0];
  const color = colorMap[parts[1].toLowerCase()] || parts[1];
  const finish = finishMap[parts[2].toLowerCase()] || parts[2];

  return `- ${size} - ${color} - ${finish}`;
};

const Cart = () => {
  const {
    cartItems,
    cartTotal,
    updateQuantity,
    removeFromCart,
    clearCart,
  }: any = useShop();
  const navigate = useNavigate();

  // Free shipping logic
  const FREE_SHIPPING_THRESHOLD = 1500;
  const isFreeShippingEligible = cartTotal >= FREE_SHIPPING_THRESHOLD;
  const remainingForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - cartTotal
  );
  const shippingProgress = Math.min(
    100,
    (cartTotal / FREE_SHIPPING_THRESHOLD) * 100
  );
  const shippingCost = isFreeShippingEligible ? 0 : 200;
  const finalTotal = cartTotal + shippingCost;

  const handleQuantityChange = (
    id: any,
    newQuantity: any,
    attribute?: string
  ) => {
    updateQuantity(id, newQuantity, attribute);
  };

  const handleRemoveItem = (id: any, attribute?: string) => {
    removeFromCart(id, attribute);
  };

  // Free Shipping Progress Component
  const FreeShippingProgress = () => (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <LocalShippingIcon
          sx={{
            mr: 1,
            color: isFreeShippingEligible ? "success.main" : "primary.main",
          }}
        />
        <Typography variant="h6" fontWeight="bold">
          {isFreeShippingEligible
            ? "Transport Falas!"
            : "Transport Falas në 1500 ALL"}
        </Typography>
      </Box>

      {isFreeShippingEligible ? (
        <Alert
          icon={<CheckCircleIcon fontSize="inherit" />}
          severity="success"
          sx={{ mb: 2 }}
        >
          <Typography variant="body2">
            Keni arritur transportin falas për këtë porosi.
          </Typography>
        </Alert>
      ) : (
        <>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Ju duhen edhe {remainingForFreeShipping} ALL për transport falas
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: "100%", mr: 1 }}>
              <LinearProgress
                variant="determinate"
                value={shippingProgress}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "grey.200",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: isFreeShippingEligible
                      ? "success.main"
                      : "primary.main",
                    borderRadius: 4,
                  },
                }}
              />
            </Box>
            <Typography
              variant="body2"
              color="primary"
              fontWeight="bold"
              sx={{ minWidth: 45 }}
            >
              {Math.round(shippingProgress)}%
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Typography variant="caption" color="text.secondary">
              {cartTotal} ALL
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {FREE_SHIPPING_THRESHOLD} ALL
            </Typography>
          </Box>
        </>
      )}
    </Paper>
  );

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
        <ShoppingBagIcon
          sx={{ fontSize: 60, color: "text.secondary", mb: 2 }}
        />
        <Typography variant="h4" gutterBottom>
          Shporta juaj është bosh
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Ju nuk keni produkte ne shportë.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate("/")}
          sx={{ mt: 2 }}
        >
          Shiko produktet
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="xl">
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Shporta juaj
        </Typography>

        <Grid container spacing={4}>
          {/* Cart Items */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Paper sx={{ p: 3, mb: { xs: 3, lg: 0 } }}>
              {cartItems.map((item: any) => {
                const itemPrice = item.discount ? item.final_price : item.price;
                const itemTotal = itemPrice * item.quantity;

                return (
                  <Box key={item.id}>
                    <Grid container spacing={2} alignItems="center">
                      {/* Product Image */}
                      <Grid size={{ xs: 3, sm: 2 }}>
                        <Box
                          component="img"
                          src={item.thumbnail}
                          alt={item.name}
                          sx={{
                            width: "100%",
                            height: "auto",
                            objectFit: "contain",
                            borderRadius: 1,
                          }}
                        />
                      </Grid>

                      {/* Product Details */}
                      <Grid size={{ xs: 9, sm: 4 }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {item.name}{" "}
                          {buildAttributesText(
                            item.attribute,
                            item.product_type === "poster"
                          )}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.category}
                        </Typography>
                        {item.discount && (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mt: 0.5,
                            }}
                          >
                            <Typography
                              variant="body2"
                              color="primary"
                              fontWeight="bold"
                            >
                              {itemPrice} ALL
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ ml: 1, textDecoration: "line-through" }}
                            >
                              {item.price} ALL
                            </Typography>
                          </Box>
                        )}
                        {!item.discount && (
                          <Typography
                            variant="body2"
                            color="primary"
                            fontWeight="bold"
                            sx={{ mt: 0.5 }}
                          >
                            {item.price} ALL
                          </Typography>
                        )}
                      </Grid>

                      {/* Quantity Controls */}
                      <Grid size={{ xs: 6, sm: 3 }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <IconButton
                            size="small"
                            onClick={() =>
                              handleQuantityChange(
                                item.id,
                                item.quantity - 1,
                                item.attribute
                              )
                            }
                            disabled={item.quantity <= 1}
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>

                          <TextField
                            value={item.quantity}
                            onChange={(e) => {
                              const value = Number.parseInt(e.target.value);
                              if (!isNaN(value) && value > 0) {
                                handleQuantityChange(
                                  item.id,
                                  value,
                                  item.attribute
                                );
                              }
                            }}
                            inputProps={{
                              min: 1,
                              style: { textAlign: "center" },
                            }}
                            sx={{ width: "60px", mx: 1 }}
                            size="small"
                          />

                          <IconButton
                            size="small"
                            onClick={() =>
                              handleQuantityChange(
                                item.id,
                                item.quantity + 1,
                                item.attribute
                              )
                            }
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Grid>

                      {/* Item Total and Remove */}
                      <Grid
                        size={{ xs: 6, sm: 3 }}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="subtitle1" fontWeight="bold">
                          {itemTotal} ALL
                        </Typography>

                        <IconButton
                          color="error"
                          onClick={() =>
                            handleRemoveItem(item.id, item.attribute)
                          }
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                    <Divider sx={{ my: 2 }} />
                  </Box>
                );
              })}

              <Grid gap={2} container justifyContent={"space-between"}>
                <Grid size={{ xs: 12, md: 5 }}>
                  <Button
                    variant="outlined"
                    fullWidth
                    size="large"
                    onClick={() => navigate("/")}
                  >
                    Kthehu te produktet
                  </Button>
                </Grid>
                <Grid size={{ xs: 12, md: 5 }}>
                  <Button
                    endIcon={<DeleteIcon />}
                    variant="outlined"
                    color="error"
                    fullWidth
                    size="large"
                    onClick={() => clearCart()}
                  >
                    Fshi shportën
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Order Summary */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Përmbledhje
              </Typography>

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body1">Nëntotal</Typography>
                <Typography variant="body1">{cartTotal} ALL</Typography>
              </Box>

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body1">Transporti</Typography>
                <Box sx={{ textAlign: "right" }}>
                  {isFreeShippingEligible ? (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Typography
                        variant="body1"
                        color="success.main"
                        sx={{ textDecoration: "line-through", mr: 1 }}
                      >
                        {shippingCost} ALL
                      </Typography>
                      <Typography
                        variant="body1"
                        color="success.main"
                        fontWeight="bold"
                      >
                        Falas
                      </Typography>
                    </Box>
                  ) : (
                    <Typography variant="body1">{shippingCost} ALL</Typography>
                  )}
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
              >
                <Typography variant="h6" fontWeight="bold">
                  Total
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  {finalTotal} ALL
                </Typography>
              </Box>

              <Button
                endIcon={<PaymentIcon />}
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                sx={{
                  mb: 2,
                }}
                onClick={() => {
                  navigate("/checkout");
                }}
              >
                Kalo te Pagesa
              </Button>
              <FreeShippingProgress />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Cart;
