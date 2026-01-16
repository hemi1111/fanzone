import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

interface ProductImagesProps {
  images: string[];
}

const ProductImages = ({ images }: ProductImagesProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Filter out any null/undefined/empty images
  const filteredImages = (images || []).filter(
    (img) => img && typeof img === "string" && img.trim() !== ""
  );

  // Reset selectedIndex when images change or if index is out of bounds
  useEffect(() => {
    if (selectedIndex >= filteredImages.length || selectedIndex < 0) {
      setSelectedIndex(0);
    }
  }, [filteredImages.length, selectedIndex]);

  if (filteredImages.length === 0) return null;

  const currentImage = filteredImages[selectedIndex] || filteredImages[0];

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        width: "100%",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {/* Main image - comes first on mobile */}
      <Box
        sx={{
          flex: 1,
          order: { xs: 1, md: 2 },
        }}
      >
        <Card
          sx={{
            maxHeight: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: 0,
            border: "1px solid #e0e0e0",
            borderRadius: 2,
          }}
        >
          <CardMedia
            component="img"
            image={currentImage}
            alt="Product main image"
            sx={{
              maxHeight: "480px",
              maxWidth: "100%",
              objectFit: "contain",
              padding: 2,
            }}
          />
        </Card>
      </Box>

      {/* Thumbnails - left side on desktop, bottom on mobile */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
          gap: 1,
          width: { xs: "100%", md: "100px" },
          maxHeight: { xs: "none", md: "600px" },
          overflowY: { xs: "visible", md: "auto" },
          overflowX: { xs: "auto", md: "visible" },
          order: { xs: 2, md: 1 },
          "&::-webkit-scrollbar": {
            width: "4px",
            height: "4px",
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
            key={`${src}-${index}`}
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
              minWidth: { xs: "80px", md: "auto" },
              "&:hover": {
                borderColor: "primary.main",
              },
            }}
          >
            <CardMedia
              component="img"
              image={src}
              alt={`Product thumbnail ${index + 1}`}
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
