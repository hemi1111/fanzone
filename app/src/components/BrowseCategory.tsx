import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface Category {
  id: string;
  path: string;
  color: string;
  image: string;
}

const BrowseCategory = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const categories: Category[] = [
    {
      id: "f1",
      path: "/f1",
      color: "#DC143C",
      image:
        "https://vgtfcayksprxvzdcikrx.supabase.co/storage/v1/object/public/f1-images/Showcase/f1_category.jpg",
    },
    {
      id: "football",
      path: "/futboll",
      color: "#000000",
      image:
        "https://vgtfcayksprxvzdcikrx.supabase.co/storage/v1/object/public/f1-images/Showcase/football_category.jpg",
    },
    {
      id: "basketball",
      path: "/basketboll",
      color: "#FF6600",
      image:
        "https://vgtfcayksprxvzdcikrx.supabase.co/storage/v1/object/public/f1-images/Showcase/basketball_category.jpg",
    },
    {
      id: "cars",
      path: "/makina",
      color: "#1E90FF",
      image:
        "https://vgtfcayksprxvzdcikrx.supabase.co/storage/v1/object/public/f1-images/Showcase/cars_category.jpg",
    },
    {
      id: "movies",
      path: "/filma",
      color: "#FFD700",
      image:
        "https://vgtfcayksprxvzdcikrx.supabase.co/storage/v1/object/public/f1-images/Showcase/movies_category.jpg",
    },
  ];

  const handleCategoryClick = (path: string) => {
    navigate(path);
  };

  return (
    <Box sx={{ py: { xs: 4, md: 8 }, backgroundColor: "#ffffff" }}>
      {categories.map((category, index) => {
        const isEven = index % 2 === 0;

        return (
          <Container
            maxWidth="xl"
            key={category.id}
            sx={{
              mb: { xs: 6, md: 12 },
              display: "flex",
              alignItems: "center",
              gap: { xs: 3, md: 6 },
              flexDirection: {
                xs: "column",
                md: isEven ? "row" : "row-reverse",
              },
            }}
          >
            <Box
              sx={{
                flex: 1,
                height: { xs: 250, sm: 300, md: 350 },
                backgroundColor: category.color,
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontSize: "18px",
                fontWeight: 500,
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                width: { xs: "100%", md: "auto" },
                aspectRatio: "16 / 9",
                opacity: 0.9,
                transition: "all 0.3s ease",
                "&:hover": {
                  opacity: 1,
                  boxShadow: "0 16px 48px rgba(0, 0, 0, 0.2)",
                  transform: "scale(1.02)",
                },
              }}
            >
              <img
                src={category.image}
                alt={t(`categories.${category.id}.name`)}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>

            {/* Content */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: { xs: 1.5, md: 2 },
                width: { xs: "100%", md: "auto" },
                textAlign: { xs: "center", md: "left" },
              }}
            >
              <Typography
                variant="h3"
                fontWeight="600"
                sx={{
                  color: "#000000",
                  mb: { xs: 1, md: 2 },
                  fontSize: { xs: "1.8rem", sm: "2.2rem", md: "3rem" },
                  fontFamily: "'Inter', 'Roboto', sans-serif",
                  letterSpacing: "-0.02em",
                }}
              >
                {t(`categories.${category.id}.name`)}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "#666666",
                  fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                  lineHeight: 1.6,
                  mb: { xs: 2, md: 2 },
                  fontFamily: "'Inter', 'Roboto', sans-serif",
                }}
              >
                {t(`categories.${category.id}.description`)}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => handleCategoryClick(category.path)}
                  sx={{
                    borderColor: "#000000",
                    color: "#000000",
                    fontWeight: "500",
                    padding: { xs: "10px 24px", md: "12px 32px" },
                    fontSize: { xs: "0.9rem", md: "1rem" },
                    borderRadius: 2,
                    borderWidth: "2px",
                    fontFamily: "'Inter', 'Roboto', sans-serif",
                    letterSpacing: "0.02em",
                    textTransform: "none",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#000000",
                      color: "#ffffff",
                      borderColor: "#000000",
                      transform: "translateY(-1px)",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    },
                  }}
                >
                  {t("home.browseCollection")}
                </Button>
              </Box>
            </Box>
          </Container>
        );
      })}
    </Box>
  );
};

export default BrowseCategory;
