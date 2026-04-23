import { useState } from "react";
import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import { useForm, Controller } from "react-hook-form";

import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import MessageIcon from "@mui/icons-material/Message";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTiktok } from "@fortawesome/free-brands-svg-icons";

import { sendMail } from "../../hooks/useSendContactMessage";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

type FormData = {
  name: string;
  email: string;
  message: string;
};

const Contact = () => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    await sendMail(data.name, data.email, data.message);
    setSubmitted(true);
    reset();
  };

  const faqs = [
    {
      question: t("contact.faq.orderQuestion"),
      answer: t("contact.faq.orderAnswer"),
    },
    {
      question: t("contact.faq.shippingQuestion"),
      answer: t("contact.faq.shippingAnswer"),
    },
    {
      question: t("contact.faq.deliveryQuestion"),
      answer: t("contact.faq.deliveryAnswer"),
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        mx: "auto",
        p: { xs: 2, sm: 4 },
        mt: 4,
        mb: 6,
        maxWidth: "900px",
      }}
    >
      {/* Contact Info + Form */}
      <Paper
        elevation={6}
        sx={{
          p: { xs: 3, sm: 5 },
          mb: 5,
          borderRadius: 4,
          backdropFilter: "blur(10px)",
          background: "rgba(255,255,255,0.85)",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: "primary.main",
            letterSpacing: ".02em",
          }}
        >
          {t("contact.title")}
        </Typography>

        <Typography variant="body1" mb={3} color="text.secondary">
          {t("contact.subtitle")}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1.5} mb={3}>
          <EmailIcon color="primary" />
          <Typography variant="body1" fontWeight={500}>
            fanzone@gmail.com
          </Typography>
        </Stack>

        {submitted && (
          <Alert severity="success" sx={{ mb: 2, fontWeight: 500 }}>
            {t("contact.successMessage")}
          </Alert>
        )}

        {/* Form */}
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 2 }}
        >
          <Stack spacing={2.5}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: t("contact.nameRequired") }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("contact.name")}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: t("contact.emailRequired"),
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: t("contact.emailInvalid"),
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("contact.email")}
                  type="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <Controller
              name="message"
              control={control}
              defaultValue=""
              rules={{ required: t("contact.messageRequired") }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("contact.message")}
                  multiline
                  rows={4}
                  error={!!errors.message}
                  helperText={errors.message?.message}
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MessageIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              size="large"
              sx={{
                fontWeight: 700,
                borderRadius: 3,
                letterSpacing: ".04em",
                py: 1.4,
                textTransform: "none",
              }}
            >
              {t("contact.sendMessage")}
            </Button>
          </Stack>
        </Box>

        {/* Social icons */}
        <Divider sx={{ my: 4 }} />
        <Typography variant="subtitle1" fontWeight={600} mb={2}>
          {t("contact.followUs")}
        </Typography>
        <Stack direction="row" spacing={2}>
          <IconButton
            aria-label="Instagram"
            component="a"
            href="https://instagram.com/fanzone.al"
            target="_blank"
          >
            <InstagramIcon sx={{ color: "#e10600" }} />
          </IconButton>
          <IconButton
            aria-label="Facebook"
            component="a"
            href="https://facebook.com/659230857277586"
            target="_blank"
          >
            <FacebookIcon sx={{ color: "#1877f3" }} />
          </IconButton>
          <IconButton
            aria-label="TikTok"
            component="a"
            href="https://tiktok.com/@fanzone.al"
            target="_blank"
          >
            <FontAwesomeIcon icon={faTiktok} size="sm" color="black" />
          </IconButton>
        </Stack>
      </Paper>

      {/* FAQ */}
      <Paper
        elevation={4}
        sx={{
          p: { xs: 3, sm: 4 },
          mb: 5,
          borderRadius: 4,
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(8px)",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: 700, color: "primary.main", mb: 2 }}
        >
          {t("contact.faqTitle")}
        </Typography>
        {faqs.map((faq, idx) => (
          <Accordion key={idx} disableGutters>
            <AccordionSummary expandIcon={<ExpandMoreIcon color="primary" />}>
              <Typography fontWeight={600}>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>

      {/* About Us */}
      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, sm: 5 },
          borderRadius: 4,
          background: "rgba(255,255,255,0.9)",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: 700, color: "primary.main", mb: 2 }}
        >
          {t("contact.aboutTitle")}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t("contact.aboutText")}
        </Typography>
      </Paper>
    </Box>
  );
};

export default Contact;
