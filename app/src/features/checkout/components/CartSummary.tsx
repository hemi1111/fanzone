import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import type { Product } from "../../../types/Product";
import { buildAttributesText } from "../../cart/Cart";

const CartSummary = ({
  item,
  buyNow = false,
  quantity,
}: {
  item: Product;
  buyNow?: boolean;
  quantity?: number;
}) => {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <Card
        variant="outlined"
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          borderRadius: 2,
          "&:hover": { boxShadow: 3 },
        }}
      >
        {/* Product Image */}
        <CardMedia
          component="img"
          image={item.thumbnail}
          alt={item.name}
          sx={{
            width: 90,
            height: 90,
            borderRadius: 1,
            objectFit: "contain",
            bgcolor: "grey.100",
            mr: 2,
          }}
        />

        {/* Product Info */}
        <Stack spacing={0.5} sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography variant="subtitle1" fontWeight="bold" title={item.name}>
            {item.name}{" "}
            {item.attributes &&
              buildAttributesText(
                item.attribute,
                item.product_type === "poster"
              )}
          </Typography>

          <Chip
            size="small"
            label={item.category}
            sx={{ alignSelf: "flex-start", fontSize: "0.75rem" }}
          />

          {/* Price */}
          {item.discount ? (
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body1" color="primary" fontWeight="bold">
                {item.final_price} ALL
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textDecoration: "line-through" }}
              >
                {item.price} ALL
              </Typography>
              <Chip
                label={`-${Math.round(
                  ((item.price - item.final_price) / item.price) * 100
                )}%`}
                color="error"
                size="small"
              />
            </Stack>
          ) : (
            <Typography variant="body1" color="primary" fontWeight="bold">
              {item.price} ALL
            </Typography>
          )}

          {/* Quantity */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontStyle: "italic" }}
          >
            Sasia: {buyNow ? quantity || 1 : item.quantity}
          </Typography>
        </Stack>
      </Card>
    </Grid>
  );
};

export default CartSummary;
