// src/pages/Payment.jsx
import React, { useContext, useMemo, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import { CartContext } from "../context";

export const Payment = () => {
  const { cartState = [] } = useContext(CartContext);

  const items = useMemo(
    () =>
      cartState.map((it) => ({
        name: it.name || it.title || "Producto",
        price:
          typeof it.price === "number"
            ? it.price
            : typeof it.precio === "number"
            ? it.precio
            : Number(it.price ?? it.precio) || 0,
        qty: it.qtyCartItem ?? it.qty ?? 1,
      })),
    [cartState]
  );

  const total = useMemo(
    () => items.reduce((acc, it) => acc + it.price * it.qty, 0),
    [items]
  );

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [adress, setAdress] = useState("");

  const cardBg = useColorModeValue("white", "gray.800");

  const handleConfirmOrder = () => {
    if (!name || !lastName || !email || !adress) {
      Swal.fire({
        title: "Datos obligatorios",
        text: "Todos los datos son obligatorios",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    const fakeOrderId = Math.floor(Math.random() * 1_000_000);
    setTimeout(() => {
      Swal.fire({
        title: "Orden Creada",
        html: `Orden creada exitosamente.<br/>Tu número de orden es: <b>${fakeOrderId}</b>`,
        icon: "success",
        confirmButtonText: "Aceptar",
      });
    }, 500);
  };

  return (
    <Flex
      direction="column"
      maxW="7xl"
      mx="auto"
      px={{ base: 3, md: 6 }}
      py={{ base: 4, md: 8 }}
      gap={6}
    >
      <Heading size="lg" textAlign={{ base: "left", md: "center" }}>
        Pago de orden
      </Heading>

      <Flex
        gap={6}
        direction={{ base: "column", md: "row" }}
        align="flex-start"
      >
        {/* Formulario */}
        <Box
          flex="1"
          bg={cardBg}
          borderWidth="1px"
          rounded="lg"
          p={{ base: 4, md: 6 }}
        >
          <Stack spacing={4}>
            <Input
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Apellido"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Input
              placeholder="Dirección"
              value={adress}
              onChange={(e) => setAdress(e.target.value)}
            />
            <Input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button
              onClick={handleConfirmOrder}
              isDisabled={!items.length}
              colorScheme="teal"
            >
              Confirmar pago
            </Button>
          </Stack>
        </Box>

        {/* Resumen */}
        <Box
          w={{ base: "full", md: "380px" }}
          bg={cardBg}
          borderWidth="1px"
          rounded="lg"
          p={{ base: 4, md: 6 }}
          position={{ md: "sticky" }}
          top={{ md: "80px" }}
          alignSelf={{ base: "stretch", md: "flex-start" }}
        >
          <Heading size="md" mb={3}>
            Resumen
          </Heading>
          {!items.length ? (
            <Text color="gray.500">No hay productos en el carrito.</Text>
          ) : (
            <Stack spacing={2}>
              {items.map((it, idx) => (
                <Flex key={idx} justify="space-between" gap={3}>
                  <Text noOfLines={1}>
                    {it.name} × {it.qty}
                  </Text>
                  <Text fontWeight="semibold">
                    ${(it.price * it.qty).toFixed(2)}
                  </Text>
                </Flex>
              ))}
              <Box h={2} />
              <Flex justify="space-between" mt={2}>
                <Text fontWeight="bold">Total</Text>
                <Text fontWeight="bold">${total.toFixed(2)}</Text>
              </Flex>
            </Stack>
          )}
        </Box>
      </Flex>
    </Flex>
  );
};
