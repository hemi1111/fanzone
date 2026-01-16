import { useState } from "react";
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

const faqs = [
  {
    question: "Si mund të porosis?",
    answer:
      "Zgjidh një ose disa nga produktet, shtoji në shportë ose kliko 'Bli Tani', dhe plotëso formularin me të dhënat mbi dërgesën. Në përfundim të porosisë do ju vijë një email konfirmimi.",
  },
  {
    question: "Sa kushton transporti?",
    answer:
      "Transporti është falas për porosite mbi 1.500 lekë, ndërsa për porositë nën këtë shumë, transporti kushton 200 lekë.",
  },
  {
    question: "Sa vonon dërgesa?",
    answer: "Dërgesa arrin brenda 1-3 ditëve pune pas konfirmimit të porosisë.",
  },
];

type FormData = {
  name: string;
  email: string;
  message: string;
};

const Contact = () => {
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
          Na kontaktoni
        </Typography>

        <Typography variant="body1" mb={3} color="text.secondary">
          Për çdo pyetje, sugjerim ose kërkesë, jemi këtu për ju!
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1.5} mb={3}>
          <EmailIcon color="primary" />
          <Typography variant="body1" fontWeight={500}>
            fanzone@gmail.com
          </Typography>
        </Stack>

        {submitted && (
          <Alert severity="success" sx={{ mb: 2, fontWeight: 500 }}>
            Faleminderit për mesazhin tuaj! Do t'ju kontaktojmë së shpejti.
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
              rules={{ required: "Emri është i detyrueshëm" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Emri"
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
                required: "Email-i është i detyrueshëm",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Shkruani një email të vlefshëm",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
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
              rules={{ required: "Mesazhi është i detyrueshëm" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Mesazhi"
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
              type="submit"
              size="large"
              sx={{
                background: "linear-gradient(90deg, #e10600, #ff5f52)",
                color: "white",
                fontWeight: 700,
                borderRadius: 3,
                letterSpacing: ".04em",
                py: 1.4,
                textTransform: "none",
                "&:hover": {
                  background: "linear-gradient(90deg, #ff5f52, #e10600)",
                },
              }}
            >
              Dërgo Mesazhin
            </Button>
          </Stack>
        </Box>

        {/* Social icons */}
        <Divider sx={{ my: 4 }} />
        <Typography variant="subtitle1" fontWeight={600} mb={2}>
          Na ndiqni në rrjetet sociale:
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
          Pyetjet më të shpeshta
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
          Rreth Nesh
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Mirësevini në Fan Zone! Për të gjithë të apasionuarit e sporteve, ne
          ofrojmë një gamë të gjerë produktesh dhe koleksionesh. Qëllimi ynë
          është të sjellim emocionin e sporteve në shtëpitë tuaja me produkte që
          reflektojnë pasionin tonë për këtë sport.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Contact;
