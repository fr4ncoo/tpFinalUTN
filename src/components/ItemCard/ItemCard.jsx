import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  AspectRatio,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { Link } from "react-router-dom";

function Rating({ rating = 0, numReviews = 0 }) {
  return (
    <Box display="flex" alignItems="center">
      {Array(5)
        .fill("")
        .map((_, i) => {
          const roundedRating = Math.round(rating * 2) / 2;
          if (roundedRating - i >= 1) {
            return (
              <BsStarFill
                key={i}
                style={{ marginLeft: "1" }}
                color={i < rating ? "teal.500" : "gray.300"}
              />
            );
          }
          if (roundedRating - i === 0.5) {
            return <BsStarHalf key={i} style={{ marginLeft: "1" }} />;
          }
          return <BsStar key={i} style={{ marginLeft: "1" }} />;
        })}
      <Box as="span" ml="2" color="gray.600" fontSize="sm">
        {numReviews} Valoracione{numReviews > 1 && "s"}
      </Box>
    </Box>
  );
}

export const ItemCard = ({ data }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Link to={`/item/${data.id}`}>
      <Flex align="center" justify="center">
        <Box
          bg={useColorModeValue("white", "gray.800")}
          w={{ base: "100%", sm: "260px", md: "300px" }}
          borderWidth="1px"
          rounded="lg"
          shadow="lg"
          position="relative"
          overflow="hidden"
        >
          {data.isNew && (
            <Circle
              size="10px"
              position="absolute"
              top={2}
              right={2}
              bg="red.200"
            />
          )}

          <AspectRatio ratio={4 / 3}>
            <Image
              src={data.thumbnail}
              alt={`Picture of ${data.name}`}
              onLoad={() => setIsLoaded(true)}
              objectFit="cover"
            />
          </AspectRatio>

          <Box p={{ base: 4, md: 6 }}>
            <Box display="flex" alignItems="baseline">
              {data.isNew && (
                <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
                  NUEVO
                </Badge>
              )}
            </Box>

            <Flex mt="2" justify="space-between" align="center">
              <Box
                fontSize={{ base: "lg", md: "xl" }}
                fontWeight="semibold"
                as="h4"
                noOfLines={1}
              >
                {data.name}
              </Box>
            </Flex>

            <Flex mt="2" justify="space-between" align="center">
              <Rating rating={data.rating} numReviews={data.numReviews} />
              <Box
                fontSize={{ base: "lg", md: "2xl" }}
                color={useColorModeValue("gray.800", "white")}
              >
                <Box as="span" color={"gray.600"} fontSize="lg">
                  $
                </Box>
                {Number(data.price).toFixed(2)}
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Link>
  );
};
