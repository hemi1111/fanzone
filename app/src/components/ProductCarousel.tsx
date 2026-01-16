import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useGetRelatedProducts } from "../hooks/useGetRelatedProducts";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";

import ProductCard from "./ProductCard";
import type { Product } from "../types/Product";

import useEmblaCarousel from "embla-carousel-react";

// Responsive breakpoints configuration
const getItemsPerView = (width: number) => {
  if (width >= 1024) return 3;
  if (width >= 768) return 2;
  return 1;
};

const ProductCarousel = ({
  product_category = "",
}: {
  product_category?: string;
}) => {
  const { id } = useParams();
  const { data: relatedProducts, isLoading: isLoadingRelatedProducts } =
    useGetRelatedProducts(product_category, id ?? "");

  const items = relatedProducts;

  const [itemsPerView, setItemsPerView] = useState(
    getItemsPerView(window.innerWidth)
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  // Resize listener
  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView(window.innerWidth));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-play with pause on hover
  useEffect(() => {
    if (!emblaApi) return;

    let interval: any;

    const play = () => {
      interval = setInterval(() => {
        emblaApi.scrollNext();
      }, 8000);
    };

    const stop = () => clearInterval(interval);

    play();

    emblaApi.containerNode().addEventListener("mouseenter", stop);
    emblaApi.containerNode().addEventListener("mouseleave", play);

    return () => {
      stop();
      emblaApi.containerNode().removeEventListener("mouseenter", stop);
      emblaApi.containerNode().removeEventListener("mouseleave", play);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  if (isLoadingRelatedProducts) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <Box sx={{ position: "relative", width: "90%", margin: "auto" }}>
      {/* Left Arrow */}
      {items.length > itemsPerView && (
        <IconButton
          onClick={scrollPrev}
          sx={{
            position: "absolute",
            left: -20,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            boxShadow: 2,
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
          }}
          aria-label="Previous products"
        >
          <ArrowBackIos />
        </IconButton>
      )}

      {/* Embla Carousel */}
      <Box ref={emblaRef} sx={{ overflow: "hidden" }}>
        <Box
          sx={{
            display: "flex",
            py: 2,
            mx: { xs: "-8px", sm: "-6px" }, // negative margin = cancels child padding
          }}
        >
          {items.map((product: Product) => (
            <Box
              key={product.id}
              sx={{
                flex: `0 0 ${100 / itemsPerView}%`,
                px: { xs: "8px", sm: "6px" }, // inner padding creates spacing
                display: "flex",
                justifyContent: "center",
              }}
            >
              <ProductCard
                product={product}
                navigationLink={`/product/${product.id}`}
              />
            </Box>
          ))}
        </Box>
      </Box>

      {/* Right Arrow */}
      {items.length > itemsPerView && (
        <IconButton
          onClick={scrollNext}
          sx={{
            position: "absolute",
            right: -20,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            boxShadow: 2,
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
          }}
          aria-label="Next products"
        >
          <ArrowForwardIos />
        </IconButton>
      )}
    </Box>
  );
};

export default ProductCarousel;
