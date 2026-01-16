import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

interface ProductDescriptionProps {
  description: string;
}

const ProductDescription = ({ description }: ProductDescriptionProps) => {
  const match = description.match(/^[^.]*\.([\s\S]*)$/);
  const secondPart = match ? match[1].trim() : "";

  const lines = secondPart
    .split(/\\n|\\n\\|\n/)
    .filter((line) => line.trim() !== "");

  return (
    <Stack spacing={1}>
      {lines.map((line, index) => {
        const trimmedLine = line.trim();

        if (trimmedLine.startsWith("- ")) {
          return (
            <Stack key={index} direction="row" alignItems="center">
              <Typography component="span" sx={{ mr: 1 }}>
                •
              </Typography>
              <Typography>{trimmedLine.substring(2)}</Typography>
            </Stack>
          );
        }
        return (
          <Typography key={index} component="span">
            {trimmedLine}
          </Typography>
        );
      })}
    </Stack>
  );
};

export default ProductDescription;
