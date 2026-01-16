import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface Category {
  id: string;
  name: string;
  path: string;
  color: string;
  image: string;
  description: string;
}

const BrowseCategory = () => {
  const navigate = useNavigate();

  const categories: Category[] = [
    {
      id: "f1",
      name: "F1",
      path: "/f1",
      color: "#DC143C",
      image:
        "https://vgtfcayksprxvzdcikrx.supabase.co/storage/v1/object/public/f1-images/Advertising/f1_category.jpg",
      description:
        "Zbuloni koleksionin tonë ekskluziv Formula 1. Postera të pistave, pilotëve dhe ekipeve, aksesore si makina miniaturë, çelësa, kapele dhe bluza.",
    },
    {
      id: "futboll",
      name: "Futboll",
      path: "/futboll",
      color: "#000000",
      image:
        "https://vgtfcayksprxvzdcikrx.supabase.co/storage/v1/object/public/f1-images/Advertising/football_category.jpg",
      description:
        "Eksploroni koleksionin tonë të posterave të futbollit. Postera të lojtarëve, ekipeve dhe momenteve ikonike nga klubet kryesore në mbarë botën.",
    },
    {
      id: "basketboll",
      name: "Basketboll",
      path: "/basketboll",
      color: "#FF6600",
      image:
        "https://vgtfcayksprxvzdcikrx.supabase.co/storage/v1/object/public/f1-images/Advertising/basketball_category.jpg",
      description:
        "Shfletoni koleksionin tonë të posterave të basketbollit. Postera të lojtarëve legjendar, ekipeve dhe momenteve historike nga NBA dhe basketbolli ndërkombëtar.",
    },
    {
      id: "makina",
      name: "Makina",
      path: "/makina",
      color: "#1E90FF",
      image:
        "https://vgtfcayksprxvzdcikrx.supabase.co/storage/v1/object/public/f1-images/Advertising/cars_category.png",
      description:
        "Zbuloni koleksionin tonë të posterave të makinave. Postera të makinave klasike, supermakinave moderne dhe momenteve ikonike nga bota e automobilizmit.",
    },
    {
      id: "filma",
      name: "Filma",
      path: "/filma",
      color: "#FFD700",
      image:
        "https://vgtfcayksprxvzdcikrx.supabase.co/storage/v1/object/public/f1-images/Advertising/movies_category.jpg",
      description:
        "Eksploroni koleksionin tonë të posterave të filmave. Postera ikonike nga filmat klasik dhe bashkëkohor, serialet e njohur dhe personazhet e dashur.",
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
                alt={category.name}
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
                {category.name}
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
                {category.description}
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
                  Shfleto Koleksionin
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
