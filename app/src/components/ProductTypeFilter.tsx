import React from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import Box from "@mui/material/Box";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const formatTypeLabel = (type: string) =>
  type.charAt(0).toUpperCase() + type.slice(1);

interface ProductTypeFilterProps {
  availableTypes: string[];
  selectedTypes: string[];
  onTypeChange: (types: string[]) => void;
}

const ProductTypeFilter: React.FC<ProductTypeFilterProps> = ({
  availableTypes,
  selectedTypes,
  onTypeChange,
}) => {
  const handleTypeToggle = (type: string) => {
    const newSelectedTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];

    onTypeChange(newSelectedTypes);
  };

  if (availableTypes.length <= 1) {
    // Don't show filter if only one product type available
    return null;
  }

  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6" fontWeight="bold">
          Lloji i Produktit
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <FormGroup>
            {availableTypes.map((type) => (
              <FormControlLabel
                key={type}
                control={
                  <Checkbox
                    checked={selectedTypes.includes(type)}
                    onChange={() => handleTypeToggle(type)}
                    sx={{
                      color: "#333",
                      "&.Mui-checked": {
                        color: "#d32f2f",
                      },
                    }}
                  />
                }
                label={
                  <Typography sx={{ fontSize: "0.9rem", color: "#555" }}>
                    {formatTypeLabel(type)}
                  </Typography>
                }
              />
            ))}
          </FormGroup>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default ProductTypeFilter;
