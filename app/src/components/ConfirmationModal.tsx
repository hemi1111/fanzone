import React, { useEffect } from "react";
import { motion } from "framer-motion";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorIcon from "@mui/icons-material/Error";

interface ConfirmationModalProps {
  open: boolean;
  severity: "success" | "error";
  onClose: () => void;
}

const dropIn = {
  hidden: { opacity: 0, y: "-20%" },
  visible: {
    opacity: 1,
    y: "0%",
    transition: { duration: 0.4, type: "spring", damping: 12 },
  },
  exit: { opacity: 0, y: "10%", transition: { duration: 0.2 } },
};

const pulseAnimation = {
  animate: {
    scale: [1, 1.2, 1],
    transition: { repeat: Infinity, duration: 1 },
  },
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  severity,
  onClose,
}) => {
  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [open, onClose]);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent
        className="p-0 bg-white overflow-hidden shadow-2xl rounded-2xl border-none max-w-md"
        sx={{ px: 4, py: 6, textAlign: "center" }}
      >
        <motion.div
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div {...pulseAnimation}>
            {severity === "success" ? (
              <CheckCircleOutlineIcon
                sx={{ fontSize: 64, color: "green", mb: 2 }}
              />
            ) : (
              <ErrorIcon sx={{ fontSize: 64, color: "red", mb: 2 }} />
            )}
          </motion.div>
          <Typography variant="h5" gutterBottom>
            {severity === "success"
              ? "Faleminderit për blerjen tuaj!"
              : "Dicka shkoi keq"}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {severity === "success"
              ? "Porosia u përfundua me sukses."
              : "Ju lutem provojeni më vonë ose na kontaktoni."}
          </Typography>
          <Box mt={4}>
            <Button variant="contained" color="primary" onClick={onClose}>
              Shko te produktet
            </Button>
          </Box>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal;
