import React, { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";
import { ItemListContainer } from "../components";
import { productos } from "../data/productos";

export const Busqueda = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setNoResults(false);

    setTimeout(() => {
      const searchLower = searchQuery.toLowerCase();
      const filteredProducts = productos.filter((product) =>
        product.title?.toLowerCase().includes(searchLower) ||
        product.name?.toLowerCase().includes(searchLower)
      );

      setProducts(filteredProducts);
      setNoResults(filteredProducts.length === 0);
      setLoading(false);
    }, 300); // Simula retardo
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Flex flexDirection={"column"} width={"90%"} margin={"0 30px"}>
      <Heading size="2xl">Búsqueda de productos</Heading>
      <br />
      <Flex>
        <InputGroup>
          <Input
            type="text"
            placeholder="Buscar producto por nombre, EJ: Aceite..."
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            value={searchQuery}
          />
          <InputRightAddon onClick={handleSearch} cursor="pointer">
            <CiSearch />
          </InputRightAddon>
        </InputGroup>
      </Flex>
      <br />

      {loading && (
        <Flex justifyContent="center">
          <Spinner size="xl" />
        </Flex>
      )}

      {noResults && !loading && (
        <Text textAlign="center" fontSize="xl" color="gray.500">
          No se encontraron resultados :c
        </Text>
      )}

      {!loading && !noResults && products.length > 0 && (
        <ItemListContainer products={products} />
      )}
    </Flex>
  );
};
