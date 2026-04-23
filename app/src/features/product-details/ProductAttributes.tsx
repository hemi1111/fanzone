import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface ProductAttributesProps {
  attributes: Record<string, any>;
  selected: string | null;
  setSelected: (value: string | null) => void;
}

const ProductAttributes = ({
  attributes,
  selected,
  setSelected,
}: ProductAttributesProps) => {
  const { t } = useTranslation();

  const attributeKey = Object.keys(attributes)[0];
  const attributeValue = attributes[attributeKey];
  const isArray = Array.isArray(attributeValue);

  const getAttributeDisplayName = (key: string) => {
    switch (key) {
      case "sizes":
        return t("product.sizeLabel").toUpperCase();
      case "colors":
        return t("product.colorLabel").toUpperCase();
      case "dimensions":
        return t("product.dimensionsLabel").toUpperCase();
      default:
        return key.toUpperCase();
    }
  };

  const getColorLabel = (color: string) =>
    t(`colorMap.${color.toLowerCase()}`, { defaultValue: color });

  const getSelectedDisplay = () => {
    if (!selected) return null;
    if (attributeKey === "colors") return getColorLabel(selected);
    return isArray ? selected : selected.split(" - ")[0];
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        sx={{ mb: 1, fontSize: "0.875rem", letterSpacing: "0.5px" }}
      >
        {getAttributeDisplayName(attributeKey)}:
        {selected && (
          <Box component="span" sx={{ textTransform: "uppercase", ml: 0.5 }}>
            {getSelectedDisplay()}
          </Box>
        )}
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {isArray
          ? attributeValue.map((value: string) => (
              <Button
                key={value}
                variant={selected === value ? "contained" : "outlined"}
                onClick={() => setSelected(value)}
                size="small"
                sx={{
                  minWidth: "auto",
                  px: 2,
                  py: 0.5,
                  fontSize: "0.75rem",
                  fontWeight: "medium",
                  textTransform: "none",
                  borderRadius: 1,
                  "&:hover": {
                    backgroundColor:
                      selected === value ? undefined : "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                {attributeKey === "colors" ? getColorLabel(value) : value}
              </Button>
            ))
          : Object.entries(attributeValue).map(([key, price]) => (
              <Button
                key={key}
                variant={selected === key ? "contained" : "outlined"}
                onClick={() => setSelected(key)}
                size="small"
                sx={{
                  minWidth: "auto",
                  px: 2,
                  py: 0.5,
                  fontSize: "0.75rem",
                  fontWeight: "medium",
                  textTransform: "none",
                  borderRadius: 1,
                  "&:hover": {
                    backgroundColor:
                      selected === key ? undefined : "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                {`${key} - ${price} ALL`}
              </Button>
            ))}
      </Box>
    </Box>
  );
};

export default ProductAttributes;
