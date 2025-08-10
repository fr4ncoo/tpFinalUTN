import { SimpleGrid } from "@chakra-ui/react";
import { ItemCard } from "../index";

export const ItemListContainer = ({ products }) => {
  return (
    <SimpleGrid
      w="100%"
      maxW="7xl"
      mx="auto"
      px={{ base: 3, md: 6 }}
      py={{ base: 3, md: 6 }}
      minChildWidth="240px"        
      spacing={{ base: 3, md: 6 }}
    >
      {products.map((product) => (
        <ItemCard key={product.id} data={product} />
      ))}
    </SimpleGrid>
  );
};
