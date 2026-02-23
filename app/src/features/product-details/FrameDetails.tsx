import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const FrameDetails: React.FC = () => {
  // Single image used for all poster size illustrations
  const posterSizeImageUrl =
    "https://vgtfcayksprxvzdcikrx.supabase.co/storage/v1/object/public/f1-images/Showcase/frame_size_illustration.jpg";

  return (
    <Box>
      <Box
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
      >
        <Box
          sx={{
            width: "100%",
            aspectRatio: "2 / 1",
            minHeight: 280,
            maxHeight: 420,
            background: `url(${posterSizeImageUrl})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
      </Box>

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
