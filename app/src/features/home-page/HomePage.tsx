import Box from "@mui/material/Box";
import Showcase from "../../components/Showcase";
import BrowseCategory from "../../components/BrowseCategory";
import HomeProductsContainer from "../products/HomeProductsContainer";

const HomePage = () => {
  return (
    <Box>
      <Showcase />
      <BrowseCategory />
      {/* Trending Items */}
      <Box id="products">
        <HomeProductsContainer />
      </Box>
    </Box>
  );
};

export default HomePage;
