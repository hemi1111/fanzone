import React, { useState, useEffect } from "react";
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
  const [selections, setSelections] = useState<PosterSelections>({
    size: posterOptions.sizes[0] || "",
    frameColor: posterOptions.frame_colors[0] || "black",
    material: posterOptions.materials[0] || "",
  });

  // Update parent component when selections change
  useEffect(() => {
    onSelectionChange(selections);
  }, [selections, onSelectionChange]);

  // Event handlers are now handled inline with button onClick events

  return (
    <Box sx={{ mb: 3 }}>
      {/* Size Selection */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          sx={{ mb: 1, fontSize: "0.875rem", letterSpacing: "0.5px" }}
        >
          MADHËSIA: {selections.size.toUpperCase()}
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
                backgroundColor:
                  selections.size === size ? "#lightblue" : "transparent",
                borderColor:
                  selections.size === size ? "#lightblue" : "#e0e0e0",
                color: selections.size === size ? "white" : "text.primary",
                "&:hover": {
                  backgroundColor:
                    selections.size === size
                      ? "#lightblue"
                      : "rgba(0, 0, 0, 0.04)",
                },
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
          MATERIALI:{" "}
          {selections.material === "framed" ? "ME KORNIZË" : "CANVAS"}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {posterOptions.materials.map((material) => (
            <Button
              key={material}
              variant={
                selections.material === material ? "contained" : "outlined"
              }
              onClick={() => {
                // If selecting canvas, reset frame color to default
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
                backgroundColor:
                  selections.material === material
                    ? "#lightblue"
                    : "transparent",
                borderColor:
                  selections.material === material ? "#lightblue" : "#e0e0e0",
                color:
                  selections.material === material ? "white" : "text.primary",
                "&:hover": {
                  backgroundColor:
                    selections.material === material
                      ? "#lightblue"
                      : "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              {material === "framed" ? "Me Kornizë" : "Canvas"}
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
            NGJYRA E KORNIZËS:{" "}
            {selections.frameColor === "black" ? "E ZEZË" : "E BARDHË"}
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
                  color:
                    selections.frameColor === color ? "white" : "text.primary",
                  "&:hover": {
                    backgroundColor:
                      selections.frameColor === color
                        ? "#lightblue"
                        : "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                {color === "black" ? "E Zezë" : "E Bardhë"}
              </Button>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default PosterCustomization;
