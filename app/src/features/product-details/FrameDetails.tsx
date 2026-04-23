import React from "react";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const FrameDetails: React.FC = () => {
  const { t } = useTranslation();

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
          {t("product.qualityTitle")}:
        </Typography>
        <Typography variant="body2" component="div" color="text.secondary">
          <ul style={{ margin: 0, paddingLeft: "20px", lineHeight: 1.6 }}>
            <li>{t("product.qualityFeature1")}</li>
            <li>{t("product.qualityFeature2")}</li>
            <li>{t("product.qualityFeature3")}</li>
            <li>{t("product.qualityFeature4")}</li>
            <li>{t("product.qualityFeature5")}</li>
            <li>{t("product.qualityFeature6")}</li>
          </ul>
        </Typography>
      </Box>
    </Box>
  );
};

export default FrameDetails;
