import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetProductsByCategory } from "../hooks/useGetProductsByCategory";
import { ItemListContainer, Loader } from "../components";
import { productos } from "../data/productos";
import {
  Flex,
  Heading,
  Button,
  SimpleGrid,
  Text,
  Tag,
} from "@chakra-ui/react";

export const Category = () => {
  const { id } = useParams();              
  const navigate = useNavigate();
  const { items, loading } = useGetProductsByCategory(id);


  const categoriasUnicas = Array.from(
    new Set(productos.map((p) => p.category).filter(Boolean))
  );

  
  if (!id) {
    return (
      <Flex direction="column" gap={4} p={6}>
        <Heading size="lg">Buscar por categoría</Heading>

        {categoriasUnicas.length === 0 ? (
          <Text color="gray.500">No hay categorías disponibles.</Text>
        ) : (
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={3} mt={3}>
            {categoriasUnicas.map((cat) => (
              <Button key={cat} variant="outline" onClick={() => navigate(`/category/${cat.toLowerCase().replace(/\s+/g, "-")}`)}>
                {cat}
              </Button>
            ))}
          </SimpleGrid>
        )}
      </Flex>
    );
  }


  if (loading) return <Loader />;

  return (
    <Flex direction="column" p={6} gap={4}>
      <Flex align="center" gap={3}>
        <Heading size="lg">Categoría</Heading>
        <Tag size="lg" variant="subtle">{id}</Tag>
        <Button size="sm" onClick={() => navigate(-1)} variant="ghost">
          Volver
        </Button>
      </Flex>

      {items.length === 0 ? (
        <Text color="gray.500" mt={4}>
          No hay productos para “{id}”.
        </Text>
      ) : (
        <ItemListContainer products={items} />
      )}
    </Flex>
  );
};
