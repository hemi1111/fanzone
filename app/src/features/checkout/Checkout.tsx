import { useMemo, useState } from "react";

import { useForm, Controller } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import CartSummary from "./components/CartSummary";
import ConfirmationModal from "../../components/ConfirmationModal";

import type { CheckoutFormData } from "../../types/CheckoutFormData";
import type { Product } from "../../types/Product";

import { useCreateOrder } from "../../hooks/useCreateOrder";
import { useShop } from "../../contexts/ShopContext";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { Autocomplete } from "@mui/material";
import { albanianCities } from "./albanian-cities";

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart }: any = useShop();

  const navigate = useNavigate();
  const location = useLocation();
  const { product, quantity: buyNowQuantity } = location.state || {};

  const [openModal, setOpenModal] = useState(false);

  const { mutate, isPending } = useCreateOrder();

  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors },
    reset,
  } = useForm<CheckoutFormData>({
    defaultValues: {
      name: "",
      user_email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      country: "Shqipëri",
      notes: "",
    },
  });

  const onSubmit = (data: CheckoutFormData) => {
    const { name, user_email, phone, address, city, notes } = data;
    const products = product ? [product] : cartItems;
    if (!products.length) {
      navigate("/", { replace: true });
      return;
    }
    const productsPayload = products.map((item: Product) => ({
      id: item.id.toString(),
      name: item.attribute ? `${item.name} - ${item.attribute}` : item.name,
      quantity: product ? buyNowQuantity || 1 : item.quantity,
      price: item.final_price,
      image: item.thumbnail,
    }));
    const orderPayload = {
      name,
      user_email,
      phone,
      city,
      address,
      notes,
      total: product ? product.final_price * (buyNowQuantity || 1) : cartTotal,
      products: productsPayload,
    };

    mutate(orderPayload);

    reset();
    clearCart();

    setOpenModal(true);
  };

  const totalPrice = product
    ? product.final_price * (buyNowQuantity || 1)
    : cartTotal;

  const total = totalPrice > 1500 ? totalPrice : totalPrice + 200;

  const Modal = () => (
    <ConfirmationModal
      open={openModal}
      severity="success"
      onClose={() => {
        setOpenModal(false);
        navigate("/", { replace: true });
      }}
    />
  );
  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom>
        Përfundoni Porosinë
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ mt: 4 }}
      >
        {/* ========== Personal Info Section ========== */}
        <Typography variant="h6" gutterBottom>
          Të dhënat personale
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Controller
              name="name"
              control={control}
              rules={{
                required: true,
                pattern: {
                  value: /^[A-Za-zÀ-ž\s]+$/, // letters (with accents) and spaces only
                  message: "Emri nuk mund të përmbajë numra ose simbole",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Emri i plotë"
                  fullWidth
                  required
                  placeholder="Emri Mbiemri"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="user_email"
              control={control}
              rules={{
                required: true,
                pattern: {
                  value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                  message: "Email i pavlefshëm",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  fullWidth
                  required
                  placeholder="email@example.com"
                  error={!!errors.user_email}
                  helperText={errors.user_email?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="phone"
              control={control}
              rules={{
                required: "Numri i telefonit është i detyrueshëm",
                validate: (value) => {
                  // remove spaces before testing
                  const digits = value.replace(/\s+/g, "");

                  // match local format: 06 + 9 digits (total 10)
                  const local = /^0[6-9]\d{8}$/;

                  // match international format: +355 + 9 digits (total 12 with prefix)
                  const intl = /^\+355[6-9]\d{8}$/;

                  if (local.test(digits) || intl.test(digits)) {
                    return true;
                  }

                  return "Numër telefoni i pavlefshëm për Shqipëri. Shembull: 0691234567 ose +355691234567";
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Numri i telefonit"
                  fullWidth
                  required
                  placeholder="0691234567"
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                />
              )}
            />
          </Grid>
        </Grid>

        {/* ========== Shipping Section ========== */}
        <Divider sx={{ my: 4 }} />
        <Typography variant="h6" gutterBottom>
          Adresa
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Controller
              name="address"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Adresa / Rruga"
                  fullWidth
                  required
                  error={!!errors.address}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 6, md: 4 }}>
            <Controller
              name="city"
              control={control}
              rules={{
                required: "Zgjidhni qytetin",
              }}
              render={({ field: { onChange, value, ref } }) => (
                <Autocomplete
                  options={albanianCities}
                  value={value || null}
                  onInputChange={(_, newInputValue) => {
                    // This tracks text input as user types
                    onChange(newInputValue);
                  }}
                  onChange={(_, newValue) => {
                    // This triggers when selecting from dropdown
                    if (typeof newValue === "string") {
                      onChange(newValue);
                    } else {
                      onChange(newValue ?? "");
                    }
                  }}
                  openOnFocus={false}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Qyteti"
                      fullWidth
                      required
                      inputRef={ref}
                      error={!!errors.city}
                      helperText={errors.city?.message}
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 6, md: 4 }}>
            <Controller
              name="postalCode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Kodi postar"
                  fullWidth
                  error={!!errors.postalCode}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Shteti" fullWidth disabled />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Controller
              name="notes"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Shënime shtesë (opsionale)"
                  fullWidth
                  multiline
                  rows={3}
                />
              )}
            />
          </Grid>
        </Grid>

        {/* ========== Cart Summary ========== */}
        <Divider sx={{ my: 4 }} />
        <Typography variant="h6" gutterBottom>
          Përmbledhja e porosisë
        </Typography>
        <Box sx={{ mb: 3 }}>
          {!product ? (
            cartItems.map((item: Product) => (
              <CartSummary key={item.id} item={item} />
            ))
          ) : (
            <CartSummary item={product} buyNow quantity={buyNowQuantity} />
          )}
        </Box>
        <Box
          sx={{
            p: 3,
            borderRadius: 2,
            bgcolor: "grey.50",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Stack spacing={1.5}>
            {/* Subtotal */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body1" fontWeight={600}>
                Nëntotal
              </Typography>
              <Typography variant="body1">{totalPrice} ALL</Typography>
            </Box>

            {/* Shipping */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body1" fontWeight={600}>
                Transporti
              </Typography>
              <Typography
                variant="body1"
                color={totalPrice > 1500 ? "success.main" : "text.primary"}
                fontWeight={600}
              >
                {totalPrice > 1500 ? "Falas" : "200 ALL"}
              </Typography>
            </Box>

            <Divider sx={{ my: 1 }} />

            {/* Total */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" fontWeight={700}>
                Totali
              </Typography>
              <Typography variant="h6" fontWeight={700} color="primary">
                {total} ALL
              </Typography>
            </Box>

            {/* Payment info */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1, textAlign: "center" }}
            >
              Paguani në dorëzim • <b>Cash On Delivery</b>
            </Typography>
          </Stack>
        </Box>

        {/* Snackbar on Error */}
        <Snackbar
          open={hasErrors}
          autoHideDuration={5000}
          onClose={() => clearErrors()}
        >
          <Alert severity="error" sx={{ mt: 2 }}>
            Ju lutem plotësoni fushat e detyrueshme
          </Alert>
        </Snackbar>

        {/* Submit Buttons */}
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}
        >
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Anulo
          </Button>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isPending}
          >
            {isPending ? "Duke Dërguar..." : "Përfundo Porosinë"}
          </Button>
        </Box>
      </Box>
      {/* Confirmation Modal */}
      <Modal />
    </Container>
  );
};

export default CheckoutPage;
