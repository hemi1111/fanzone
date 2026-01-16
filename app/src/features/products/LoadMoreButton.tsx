import type { FC } from "react";

import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";

interface LoadMoreButtonProps {
  onLoadMore: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  currentCount?: number;
  totalCount?: number;
}

const LoadMoreButton: FC<LoadMoreButtonProps> = ({
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
  currentCount = 0,
  totalCount = 0,
}) => {
  const progressPercentage =
    totalCount > 0 ? (currentCount / totalCount) * 100 : 0;

  return (
    <Box sx={{ width: "100%", mt: 4, mb: 2 }}>
      {/* Pagination Info */}
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          {currentCount} nga {totalCount} produkte
        </Typography>
      </Box>

      {/* Progress Bar */}
      <Box sx={{ width: "100%", mb: 3, maxWidth: 400, mx: "auto" }}>
        <LinearProgress
          variant="determinate"
          value={progressPercentage}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            "& .MuiLinearProgress-bar": {
              borderRadius: 4,
              backgroundColor: "#000",
            },
          }}
        />
      </Box>

      {/* Load More Button */}
      {hasNextPage && (
        <Box sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            onClick={onLoadMore}
            disabled={isFetchingNextPage}
            sx={{
              backgroundColor: "#000",
              "&:hover": {
                backgroundColor: "#333",
              },
            }}
          >
            {isFetchingNextPage ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Shfaq më shumë"
            )}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default LoadMoreButton;
