import React, { useContext, useMemo } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Image,
  Divider,
  Stack,
  HStack,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context";

export const Checkout = () => {
  const bg = useColorModeValue("white", "gray.800");
  const { cartState = [], removeItem, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  
  const items = useMemo(
    () =>
      cartState.map((it) => ({
        id: it.id,
        name: it.name || it.title || "Producto",
        price: typeof it.price === "number" ? it.price : Number(it.price) || 0,
        qty: it.qtyCartItem ?? it.qty ?? 1,
        thumbnail: it.thumbnail || it.images?.[0] || "",
        raw: it,
      })),
    [cartState]
  );

  const total = useMemo(
    () => items.reduce((acc, it) => acc + it.price * it.qty, 0),
    [items]
  );

  const handleRemove = (item) => {
    if (typeof removeItem === "function") removeItem(item.raw || item);
  };

  const handleClear = () => {
    if (typeof clearCart === "function") clearCart();
  };

  if (!items.length) {
    return (
      <Flex direction="column" align="center" py={12} px={{ base: 3, md: 6 }}>
        <Heading size="lg" mb={3}>Tu carrito está vacío</Heading>
        <Text color="gray.500" mb={6}>Agregá productos para continuar con la compra.</Text>
        <Button as={Link} to="/" colorScheme="teal">Ir a comprar</Button>
      </Flex>
    );
  }

  return (
    <Flex
      direction="column"
      maxW="7xl"
      mx="auto"
      px={{ base: 3, md: 6 }}
      py={{ base: 4, md: 8 }}
      gap={4}
    >
      <Heading size="lg">Carrito</Heading>

      <Stack direction={{ base: "column", lg: "row" }} gap={6} align="flex-start">
        {/* Lista de ítems */}
        <VStack w="full" align="stretch" spacing={3}>
          {items.map((it) => (
            <Box
              key={it.id}
              bg={bg}
              borderWidth="1px"
              rounded="lg"
              p={{ base: 3, md: 4 }}
            >
              <HStack align="center" spacing={4}>
                <Image
                  src={it.thumbnail}
                  alt={it.name}
                  boxSize={{ base: "64px", md: "80px" }}
                  objectFit="cover"
                  rounded="md"
                />
                <Flex
                  justify="space-between"
                  align="center"
                  w="full"
                  gap={3}
                  wrap="wrap"
                >
                  <Box minW={0}>
                    <Text fontWeight="semibold" noOfLines={1}>
                      {it.name}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      Cantidad: {it.qty}
                    </Text>
                  </Box>
                  <HStack spacing={4}>
                    <Text fontWeight="semibold">
                      ${ (it.price * it.qty).toFixed(2) }
                    </Text>
                    <Button size="sm" variant="outline" onClick={() => handleRemove(it)}>
                      Quitar
                    </Button>
                  </HStack>
                </Flex>
              </HStack>
            </Box>
          ))}
        </VStack>

        {/* Resumen */}
        <Box
          w={{ base: "full", lg: "380px" }}
          bg={bg}
          borderWidth="1px"
          rounded="lg"
          p={{ base: 4, md: 5 }}
          position={{ lg: "sticky" }}
          top={{ lg: "80px" }}
          alignSelf={{ base: "stretch", lg: "flex-start" }}
        >
          <Heading size="md" mb={3}>Resumen</Heading>
          <Divider mb={3} />
          <Flex justify="space-between" mb={2}>
            <Text color="gray.600">Subtotal</Text>
            <Text fontWeight="semibold">${ total.toFixed(2) }</Text>
          </Flex>
          <Flex justify="space-between" mb={2}>
            <Text color="gray.600">Envío</Text>
            <Text>Calculado en el pago</Text>
          </Flex>
          <Divider my={3} />
          <Flex justify="space-between" mb={4}>
            <Text fontWeight="bold">Total</Text>
            <Text fontWeight="bold">${ total.toFixed(2) }</Text>
          </Flex>

          <Stack direction={{ base: "column", sm: "row" }} spacing={3}>
            <Button colorScheme="teal" w="full" onClick={() => navigate("/payment")}>
              Ir a pagar
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
