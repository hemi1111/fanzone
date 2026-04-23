import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface PosterCustomizationProps {
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
  onSelectionChange: (selections: PosterSelections) => void;
}

export interface PosterSelections {
  size: string;
  frameColor: string;
  material: string;
}

const PosterCustomization: React.FC<PosterCustomizationProps> = ({
  posterOptions,
  onSelectionChange,
}) => {
  const { t } = useTranslation();

  const [selections, setSelections] = useState<PosterSelections>({
    size: posterOptions.sizes[0] || "",
    frameColor: posterOptions.frame_colors[0] || "black",
    material: posterOptions.materials[0] || "",
  });

  useEffect(() => {
    onSelectionChange(selections);
  }, [selections, onSelectionChange]);

  const getColorLabel = (color: string) =>
    t(`colorMap.${color.toLowerCase()}`, { defaultValue: color });

  const getMaterialLabel = (material: string) =>
    material === "framed"
      ? t("product.materialFramed")
      : t("product.materialCanvas");

  return (
    <Box sx={{ mb: 3 }}>
      {/* Size Selection */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          sx={{ mb: 1, fontSize: "0.875rem", letterSpacing: "0.5px" }}
        >
          {t("product.sizeLabel").toUpperCase()}: {selections.size.toUpperCase()}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {posterOptions.sizes.map((size) => (
            <Button
              key={size}
              variant={selections.size === size ? "contained" : "outlined"}
              onClick={() => setSelections((prev) => ({ ...prev, size }))}
              size="small"
              sx={{
                minWidth: "auto",
                px: 2,
                py: 0.5,
                fontSize: "0.75rem",
                fontWeight: "medium",
                textTransform: "none",
                borderRadius: 1,
              }}
            >
              {size}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Material Selection */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          sx={{ mb: 1, fontSize: "0.875rem", letterSpacing: "0.5px" }}
        >
          {t("product.materialLabel").toUpperCase()}:{" "}
          {getMaterialLabel(selections.material).toUpperCase()}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {posterOptions.materials.map((material) => (
            <Button
              key={material}
              variant={
                selections.material === material ? "contained" : "outlined"
              }
              onClick={() => {
                if (material === "canvas") {
                  setSelections((prev) => ({
                    ...prev,
                    material,
                    frameColor: posterOptions.frame_colors[0] || "black",
                  }));
                } else {
                  setSelections((prev) => ({ ...prev, material }));
                }
              }}
              size="small"
              sx={{
                minWidth: "auto",
                px: 2,
                py: 0.5,
                fontSize: "0.75rem",
                fontWeight: "medium",
                textTransform: "none",
                borderRadius: 1,
              }}
            >
              {getMaterialLabel(material)}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Frame Color Selection - Only show if material is framed */}
      {selections.material === "framed" && (
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ mb: 1, fontSize: "0.875rem", letterSpacing: "0.5px" }}
          >
            {t("product.frameColorLabel").toUpperCase()}:{" "}
            {getColorLabel(selections.frameColor).toUpperCase()}
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {posterOptions.frame_colors.map((color) => (
              <Button
                key={color}
                variant={
                  selections.frameColor === color ? "contained" : "outlined"
                }
                onClick={() =>
                  setSelections((prev) => ({ ...prev, frameColor: color }))
                }
                size="small"
                sx={{
                  minWidth: "auto",
                  px: 2,
                  py: 0.5,
                  fontSize: "0.75rem",
                  fontWeight: "medium",
                  textTransform: "none",
                  borderRadius: 1,
                }}
              >
                {getColorLabel(color)}
              </Button>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default PosterCustomization;
