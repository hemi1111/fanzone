import { useMemo, type FC } from "react";
import { useTranslation } from "react-i18next";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import ProductCard from "../../components/ProductCard";
import LoadMoreButton from "./LoadMoreButton";

import { useGetProducts } from "../../hooks/useGetProducts";
import type { Product } from "../../types/Product";

interface ProductsGridProps {
  params: any;
  clearFilters: any;
}

const ProductsGrid: FC<ProductsGridProps> = ({ params, clearFilters }) => {
  const { t } = useTranslation();
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
      <Grid container spacing={3}>
        {Array.from({ length: 8 }).map((_, i) => (
          <Grid size={{ xs: 6, sm: 6, md: 4, lg: 3 }} key={i}>
            <Card sx={{ height: "100%" }}>
              <Skeleton variant="rectangular" height={220} />
              <CardContent>
                <Skeleton variant="text" width="60%" sx={{ mb: 0.5 }} />
                <Skeleton variant="text" width="90%" />
                <Skeleton variant="text" width="40%" sx={{ mt: 1 }} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
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
            {t("products.noResultsFound")}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t("products.tryRemovingFilters")}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={clearFilters}
            sx={{ mt: 2 }}
          >
            {t("products.removeFilters")}
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
