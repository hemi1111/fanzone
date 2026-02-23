import { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";

import useEmblaCarousel from "embla-carousel-react";

interface ProductImagesProps {
  images: string[];
}

const ProductImages = ({ images }: ProductImagesProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });

  const filteredImages = (images || []).filter(
    (img) => img && typeof img === "string" && img.trim() !== ""
  );

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (selectedIndex >= filteredImages.length || selectedIndex < 0) {
      setSelectedIndex(0);
    }
  }, [filteredImages.length, selectedIndex]);

  const handleThumbnailClick = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
      setSelectedIndex(index);
    },
    [emblaApi]
  );

  if (filteredImages.length === 0) return null;

  const showNav = filteredImages.length > 1;

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        width: "100%",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {/* Main slider area */}
      <Box
        sx={{
          flex: 1,
          order: { xs: 1, md: 2 },
          position: "relative",
        }}
      >
        <Box ref={emblaRef} sx={{ overflow: "hidden" }}>
          <Box
            sx={{
              display: "flex",
              touchAction: "pan-y pinch-zoom",
            }}
          >
            {filteredImages.map((src, index) => (
              <Box
                key={`${src}-${index}`}
                sx={{
                  flex: "0 0 100%",
                  minWidth: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CardMedia
                  component="img"
                  image={src}
                  alt={`Product image ${index + 1}`}
                  sx={{
                    maxHeight: "420px",
                    maxWidth: "100%",
                    width: "auto",
                    objectFit: "contain",
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>

        {/* Prev / Next arrows */}
        {showNav && (
          <>
            <IconButton
              onClick={scrollPrev}
              sx={{
                position: "absolute",
                left: 8,
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: "rgba(255,255,255,0.9)",
                boxShadow: 1,
                "&:hover": {
                  bgcolor: "rgba(255,255,255,1)",
                },
                "&:disabled": {
                  bgcolor: "rgba(255,255,255,0.6)",
                },
                zIndex: 1,
              }}
              size="medium"
              aria-label="Previous image"
            >
              <ChevronLeft />
            </IconButton>
            <IconButton
              onClick={scrollNext}
              sx={{
                position: "absolute",
                right: 8,
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: "rgba(255,255,255,0.9)",
                boxShadow: 1,
                "&:hover": {
                  bgcolor: "rgba(255,255,255,1)",
                },
                zIndex: 1,
              }}
              size="medium"
              aria-label="Next image"
            >
              <ChevronRight />
            </IconButton>
          </>
        )}

        {/* Dot indicators */}
        {showNav && filteredImages.length > 1 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 0.75,
              mt: 1.5,
            }}
          >
            {filteredImages.map((_, index) => (
              <Box
                key={index}
                onClick={() => handleThumbnailClick(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleThumbnailClick(index);
                  }
                }}
                aria-label={`Go to image ${index + 1}`}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor:
                    selectedIndex === index ? "primary.main" : "grey.400",
                  cursor: "pointer",
                  transition: "background-color 0.2s, transform 0.2s",
                  "&:hover": {
                    bgcolor:
                      selectedIndex === index ? "primary.dark" : "grey.500",
                    transform: "scale(1.2)",
                  },
                }}
              />
            ))}
          </Box>
        )}
      </Box>

      {/* Thumbnails - left on desktop, hidden on mobile (dots used instead) */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          gap: 1,
          width: "100px",
          maxHeight: "500px",
          overflowY: "auto",
          order: 1,
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "2px",
          },
        }}
      >
        {filteredImages.map((src, index) => (
          <Box
            key={`thumb-${src}-${index}`}
            onClick={() => handleThumbnailClick(index)}
            sx={{
              cursor: "pointer",
              border:
                selectedIndex === index ? "2px solid" : "2px solid transparent",
              borderColor:
                selectedIndex === index ? "primary.main" : "transparent",
              borderRadius: 1,
              overflow: "hidden",
              transition: "border-color 0.2s ease-in-out",
              flexShrink: 0,
              "&:hover": {
                borderColor: "primary.main",
              },
            }}
          >
            <CardMedia
              component="img"
              image={src}
              alt={`Thumbnail ${index + 1}`}
              sx={{
                width: "100%",
                height: "80px",
                objectFit: "cover",
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ProductImages;
