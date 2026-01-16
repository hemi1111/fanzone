import React from "react";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

interface FrameDetailsProps {
  posterOptions: {
    sizes: string[];
    frame_colors: string[];
    materials: string[];
    pricing?: {
      [size: string]: {
        [material: string]: number;
      };
    };
  };
}

const FrameDetails: React.FC<FrameDetailsProps> = ({ posterOptions }) => {
  // Map sizes to their corresponding image URLs
  const getSizeImageUrl = (size: string) => {
    const sizeMap: { [key: string]: string } = {
      "21x30cm":
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=400&fit=crop",
      "30x40cm":
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
      "40x50cm":
        "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=400&fit=crop",
      "40x60 cm":
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=400&fit=crop",
      "50x70 cm":
        "https://images.unsplash.com/photo-1582037928769-181f2644ecb7?w=300&h=400&fit=crop",
    };

    return (
      sizeMap[size] ||
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=400&fit=crop"
    );
  };

  return (
    <Box>
      <Grid container spacing={3}>
        {posterOptions.sizes.map((size: string) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={size}>
            <Box
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                },
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: 300,
                  background: `url(${getSizeImageUrl(size)})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Chip
                  label={size}
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.95)",
                    color: "text.primary",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    px: 2,
                    py: 0.5,
                  }}
                />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Quality Information */}
      <Box sx={{ mt: 4, p: 3, backgroundColor: "#f8f9fa", borderRadius: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Cilësia dhe Karakteristikat:
        </Typography>
        <Typography variant="body2" component="div" color="text.secondary">
          <ul style={{ margin: 0, paddingLeft: "20px", lineHeight: 1.6 }}>
            <li>Printim me cilësi të lartë dhe ngjyra vibrante</li>
            <li>Materiale të cilësisë së mirë dhe të qëndrueshme</li>
            <li>Kornizat janë të lehta dhe të gatshme për t'u varur</li>
            <li>Canvas është i tensionuar dhe i gatshëm për t'u varur</li>
            <li>Rezistente ndaj dritës dhe lagështisë</li>
            <li>Të gjitha madhësitë vijnë me sisteme montimi të përfshira</li>
          </ul>
        </Typography>
      </Box>
    </Box>
  );
};

export default FrameDetails;
