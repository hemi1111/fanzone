import { useMemo } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { useShop } from "../../contexts/ShopContext";
import ProductsGrid from "./ProductsGrid";

const HomeProductsContainer = () => {
  const { searchQuery }: any = useShop();

  // Simple params for home page - no filters, just search and basic sorting
  const params = useMemo(
    () => ({
      search: searchQuery,
      sortOption: "default",
    }),
    [searchQuery]
  );

  return (
    <Container maxWidth="xl" sx={{ mt: 6, mb: 4 }}>
      {/* Section Header */}
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#333",
            mb: 2,
          }}
        >
          Produktet Tona
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            mb: 3,
            maxWidth: "600px",
            mx: "auto",
          }}
        >
          Zbuloni koleksionin tonë të produkteve ekskluzive
        </Typography>
      </Box>

      {/* Products Grid - No Filters */}
      <ProductsGrid params={params} clearFilters={() => {}} />
    </Container>
  );
};

export default HomeProductsContainer;
