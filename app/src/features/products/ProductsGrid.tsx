import { useMemo, type FC } from "react";

import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import ProductCard from "../../components/ProductCard";
import LoadMoreButton from "./LoadMoreButton";

import { useGetProducts } from "../../hooks/useGetProducts";
import type { Product } from "../../types/Product";

interface ProductsGridProps {
  params: any;
  clearFilters: any;
}

const ProductsGrid: FC<ProductsGridProps> = ({ params, clearFilters }) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetProducts(params);

  const allProducts = useMemo(() => {
    return data?.pages.flatMap((page) => page.products) ?? [];
  }, [data]);

  const totalCount = useMemo(() => {
    return data?.pages?.[0]?.total ?? 0;
  }, [data]);

  if (isLoading)
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

  return (
    <>
      {allProducts.length > 0 ? (
        <>
          <Grid container spacing={3}>
            {allProducts.map((product: Product) => (
              <Grid
                size={{ xs: 6, sm: 6, md: 4, lg: 3 }}
                sx={{
                  display: "flex",
                  alignContent: "center",
                }}
                key={product.id}
              >
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Box sx={{ py: 8, textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>
            Rezultatet nuk u gjeten
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Provoni te fshini filtrat
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={clearFilters}
            sx={{ mt: 2 }}
          >
            Fshi filtrat
          </Button>
        </Box>
      )}
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <LoadMoreButton
          onLoadMore={() => fetchNextPage()}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          currentCount={allProducts.length}
          totalCount={totalCount}
        />
      </Box>
    </>
  );
};

export default ProductsGrid;
