import { Box, Image } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import "bootstrap-icons/font/bootstrap-icons.css";

const Hero = () => {
  const property = {
    imageUrl: "https://bit.ly/2Z4KKcF",
    title: "Anjana",
    user: "https://tse3.mm.bing.net/th?id=OIP.ixZ69lPCOZ3ZO5UqSHQGIAHaHa&pid=Api&P=0&h=180",
  };

  return (
    <Box maxW="xl" borderWidth="2px" borderRadius="lg" overflow="hidden">
      <Box p="6">
        <Box display="flex" alignItems="center">
          <img
            src={property.user}
            alt=""
            style={{
              borderRadius: "30px",
              height: "40px",
              marginRight: "10px",
            }}
          />
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            noOfLines={1}
          >
            {property.title}
          </Box>
        </Box>
      </Box>

      <Image src={property.imageUrl} alt={property.imageAlt} />

      <Box p="6">
        <Box display="flex" alignItems="center">
          <i class="bi bi-heart" style={{ fontSize: '2rem', marginRight:"20px" }}></i>
          
          <i class="bi bi-chat" style={{ fontSize: '2rem' }}></i>
        </Box>

        
        
      </Box>
    </Box>
  );
};

export default Hero;
