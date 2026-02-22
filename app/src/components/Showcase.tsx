import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Fade from "@mui/material/Fade";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Showcase = () => {
  const navigate = useNavigate();

  const showcaseItems = [
    {
      title: "Formula 1",
      link: "f1",
      background:
        "https://vgtfcayksprxvzdcikrx.supabase.co/storage/v1/object/public/f1-images/Showcase/f1_category.jpg",
    },
    {
      title: "Futboll",
      link: "football",
      background:
        "https://vgtfcayksprxvzdcikrx.supabase.co/storage/v1/object/public/f1-images/Showcase/football_category.jpg",
    },
    {
      title: "Basketboll",
      link: "basketball",
      background:
        "https://vgtfcayksprxvzdcikrx.supabase.co/storage/v1/object/public/f1-images/Showcase/basketball_category.jpg",
    },
    {
      title: "Makina",
      link: "cars",
      background:
        "https://vgtfcayksprxvzdcikrx.supabase.co/storage/v1/object/public/f1-images/Showcase/cars_category.jpg",
    },
    {
      title: "Filma",
      link: "movies",
      background:
        "https://vgtfcayksprxvzdcikrx.supabase.co/storage/v1/object/public/f1-images/Showcase/movies_category.jpg",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Helper function to check if background is a video
  const isVideo = (url: string) => {
    if (!url.startsWith("http")) return false;
    return /\.(mp4|webm|ogg|mov)$/i.test(url);
  };

  const handleClick = (code: string) => {
    navigate(`/${code}`);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? showcaseItems.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % showcaseItems.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % showcaseItems.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [showcaseItems.length]);

  const item = showcaseItems[currentIndex];

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: 600,
        mb: 4,
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      <Fade in timeout={800} key={item.title}>
        <Box
          onClick={() => handleClick(item.link)}
          sx={{
            width: "100%",
            height: "100%",
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            position: "absolute",
            inset: 0,
            transition: "all 0.3s ease",
            // Only apply backgroundImage if it's not a video
            ...(isVideo(item.background)
              ? {}
              : {
                  backgroundImage: item.background.startsWith("#")
                    ? "none"
                    : `url(${item.background})`,
                  backgroundColor: item.background.startsWith("#")
                    ? item.background
                    : "transparent",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }),
          }}
        >
          {/* Video background if it's a video */}
          {isVideo(item.background) && (
            <Box
              component="video"
              autoPlay
              muted
              loop
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: -1,
              }}
            >
              <source src={item.background} type="video/mp4" />
            </Box>
          )}

          {/* Overlay for better text visibility */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              zIndex: 1,
            }}
          />

          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            sx={{ position: "relative", zIndex: 2 }}
          >
            {item.title}
          </Typography>
        </Box>
      </Fade>

      {/* Left Arrow */}
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          handlePrevious();
        }}
        sx={{
          position: "absolute",
          left: 16,
          top: "50%",
          transform: "translateY(-50%)",
          color: "white",
          bgcolor: "rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(10px)",
          "&:hover": {
            bgcolor: "rgba(0, 0, 0, 0.6)",
          },
          zIndex: 2,
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>

      {/* Right Arrow */}
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        sx={{
          position: "absolute",
          right: 16,
          top: "50%",
          transform: "translateY(-50%)",
          color: "white",
          bgcolor: "rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(10px)",
          "&:hover": {
            bgcolor: "rgba(0, 0, 0, 0.6)",
          },
          zIndex: 2,
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>

      {/* Dots Indicator */}
      <Box
        sx={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 1,
          zIndex: 2,
        }}
      >
        {showcaseItems.map((_, index) => (
          <Box
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(index);
            }}
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              bgcolor:
                index === currentIndex ? "white" : "rgba(255, 255, 255, 0.4)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "white",
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Showcase;
