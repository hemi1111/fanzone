import { useCallback, useEffect, useState, type FC } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export type FallbackErrorBoundaryProps = {
  resetErrorBoundary: () => void;
};

export const FallbackErrorBoundary: FC<FallbackErrorBoundaryProps> = ({
  resetErrorBoundary,
}) => {
  const [seconds, setSeconds] = useState<number>(30);

  const handleReset = useCallback(() => {
    setSeconds(30);
    resetErrorBoundary();
  }, [resetErrorBoundary]);

  useEffect(() => {
    let timerId: any;

    if (seconds > 0) {
      timerId = setTimeout(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else {
      handleReset();
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [seconds, resetErrorBoundary, handleReset]);

  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      height={"90vh"}
      p={2}
      spacing={2}
    >
      <Box>
        <img
          src="/alert-error.svg"
          width="225"
          height="170"
          loading="lazy"
          alt="An error occurred"
        />
      </Box>

      <Typography color={"grey"}>
        Ndodhi nje problem gjatë ngarkimit të faqes. Ju lutemi, provoni përsëri
        më vonë.
      </Typography>
      <Button size="large" variant="outlined" onClick={resetErrorBoundary}>
        Rifresko {seconds}
      </Button>
    </Stack>
  );
};
