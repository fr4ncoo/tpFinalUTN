import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { MdLocalShipping } from "react-icons/md";
import { CartContext } from "../../context";

export const ItemDetailContainer = ({ product }) => {
  const [count, setCount] = useState(0);
  const { addItem, removeItem } = useContext(CartContext);

  if (!product) {
    return (
      <Container maxW={"7xl"} px={{ base: 4, md: 6 }} py={12}>
        <Heading size="md" textAlign="center">
          Producto no encontrado :c
        </Heading>
      </Container>
    );
  }

  const title = product.title || product.name || "Producto";
  const price = typeof product.price === "number" ? product.price : 0;
  const imageSrc = product.images?.[0] || product.thumbnail || "";
  const description = product.description || "Sin descripción.";
  const warrantyInformation = product.warrantyInformation || "Sin garantía";
  const shippingInformation = product.shippingInformation || "Envío estándar";
  const returnPolicy = product.returnPolicy || "Devoluciones dentro de 7 días";

  const handleRemoveProduct = () => {
    setCount((c) => Math.max(0, c - 1));
    removeItem(product);
  };

  const handleAddProduct = () => {
    setCount((c) => c + 1);
    addItem(product);
  };

  return (
    <Container maxW={"7xl"} px={{ base: 4, md: 6 }}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 10, md: 16 }}
      >
        <Flex>
          <Image
            rounded={"md"}
            alt={"product image"}
            src={imageSrc}
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={{ base: "260px", sm: "360px", lg: "500px" }}
          />
        </Flex>

        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {title}
            </Heading>
            <Text
              color={useColorModeValue("gray.900", "gray.400")}
              fontWeight={300}
              fontSize={"2xl"}
            >
              ${price} ARS
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text fontSize={{ base: "md", md: "lg" }}>{description}</Text>
            </VStack>

            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                DETALLES DEL PRODUCTO
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Garantía:
                  </Text>{" "}
                    {warrantyInformation}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Info de envío:
                  </Text>{" "}
                    {shippingInformation}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Políticass de devolución:
                  </Text>{" "}
                    {returnPolicy}
                </ListItem>
              </List>
            </Box>
          </Stack>

          <Flex
            alignItems={"center"}
            width={"200px"}
            justifyContent={"space-around"}
          >
            <Button onClick={handleRemoveProduct} isDisabled={count === 0}>
              -
            </Button>
            <Text>{count}</Text>
            <Button onClick={handleAddProduct}>+</Button>
          </Flex>

          <Stack direction="row" alignItems="center" justifyContent={"center"}>
            <MdLocalShipping />
            <Text>{shippingInformation}</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
};
