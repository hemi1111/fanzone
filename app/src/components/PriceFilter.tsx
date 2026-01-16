import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

interface PriceFilterProps {
  value: number[]; // [min, max]
  onChange: (newRange: number[]) => void; // callback when user updates
  min?: number; // optional override, default 0
  max?: number; // optional override, default 5000
  step?: number; // optional override, default 50
}

const PriceFilter = ({
  value,
  onChange,
  min = 0,
  max = 5000,
  step = 50,
}: PriceFilterProps) => {
  const [priceInput, setPriceInput] = useState<string[]>([
    String(value[0]),
    String(value[1]),
  ]);

  // Keep input fields in sync if parent updates value
  useEffect(() => {
    setPriceInput([String(value[0]), String(value[1])]);
  }, [value]);

  // Slider change → notify parent
  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    const range = newValue as number[];
    onChange(range);
  };

  // Input change → update both local input and parent
  const handlePriceInputChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newInput = [...priceInput];
      newInput[index] = e.target.value;
      setPriceInput(newInput);

      const parsed = newInput.map((val) => parseInt(val) || 0);
      const newRange: number[] = [
        Math.min(parsed[0], parsed[1]),
        Math.max(parsed[0], parsed[1]),
      ];

      onChange(newRange);
    };

  return (
    <Box sx={{ p: 2 }}>
      <Slider
        value={value}
        onChange={handleSliderChange}
        min={min}
        max={max}
        step={step}
        valueLabelDisplay="auto"
        sx={{
          color: "primary.main",
          "& .MuiSlider-thumb": { borderRadius: "50%" },
        }}
      />

      {/* Numeric Inputs */}
      <Box sx={{ display: "flex", gap: 1, alignItems: "center", mt: 2 }}>
        <TextField
          label="Min"
          variant="outlined"
          size="small"
          value={priceInput[0]}
          onChange={handlePriceInputChange(0)}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*", min }}
          sx={{ flex: 1, background: "#f5f5f5", borderRadius: 1 }}
        />
        <Typography variant="body2">-</Typography>
        <TextField
          label="Max"
          variant="outlined"
          size="small"
          value={priceInput[1]}
          onChange={handlePriceInputChange(1)}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*", max }}
          sx={{ flex: 1, background: "#f5f5f5", borderRadius: 1 }}
        />
      </Box>

      {/* Display selected range */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
        <Typography variant="body2">{value[0]} ALL</Typography>
        <Typography variant="body2">{value[1]} ALL</Typography>
      </Box>
    </Box>
  );
};

export default PriceFilter;
