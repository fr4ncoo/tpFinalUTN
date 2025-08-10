import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  VStack,
  HStack,
  Divider,
  Text,
} from "@chakra-ui/react";
import {
  MoonIcon,
  SunIcon,
  ChevronDownIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import { productos } from "../../data/productos";
import { CartWidget } from "../index";

export const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const categoriasUnicas = Array.from(
    new Set(productos.map((p) => p.category).filter(Boolean))
  );

  const toSlug = (s) => String(s).toLowerCase().trim().replace(/\s+/g, "-");

  const bg = useColorModeValue("gray.100", "gray.900");

  return (
    <>
      <Box bg={bg} px={4} position="sticky" top={0} zIndex={1000}>
        <Flex
          h={16}
          align="center"
          justify="space-between"
          gap={2}
          wrap="nowrap"
          maxW="7xl"
          mx="auto"
        >
         
          <Box fontWeight="bold" fontSize={{ base: "md", md: "lg" }}>
            <Link to="/">Shopping</Link>
          </Box>

          
          <Flex
            align="center"
            gap={3}
            display={{ base: "none", md: "flex" }}
          >
            
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Categorías
              </MenuButton>
              <MenuList maxH={"300px"} overflowY={"auto"}>
                {categoriasUnicas.map((cat) => (
                  <MenuItem key={cat}>
                    <Link to={`/category/${toSlug(cat)}`}>{cat}</Link>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>

          
            <Button as={Link} to="/busqueda">
              Buscar productos
            </Button>

            
            <HStack spacing={3}>
              <CartWidget />
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </Flex>

          
          <IconButton
            aria-label="Abrir menú"
            icon={<HamburgerIcon />}
            variant="ghost"
            onClick={onOpen}
            display={{ base: "inline-flex", md: "none" }}
          />
        </Flex>
      </Box>

      
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <HStack justify="space-between" w="full">
              <Text>Menú</Text>
              <IconButton
                size="sm"
                onClick={toggleColorMode}
                aria-label="Cambiar tema"
                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              />
            </HStack>
          </DrawerHeader>
          <DrawerBody>
            <VStack align="stretch" spacing={3}>
              <Button as={Link} to="/" onClick={onClose} variant="ghost">
                Inicio
              </Button>

              {}
              <Button
                as={Link}
                to="/busqueda"
                onClick={onClose}
                variant="outline"
              >
                Buscar productos
              </Button>

              {}
              <HStack justify="space-between">
                <Text fontWeight="medium">Carrito</Text>
                {}
                <Box onClick={onClose}>
                  <CartWidget />
                </Box>
              </HStack>

              <Divider />

              <Text fontWeight="semibold" mt={2}>
                Categorías
              </Text>
              <VStack align="stretch" spacing={2} maxH="40vh" overflowY="auto">
                {categoriasUnicas.length === 0 ? (
                  <Text color="gray.500">No hay categorías</Text>
                ) : (
                  categoriasUnicas.map((cat) => (
                    <Button
                      key={cat}
                      justifyContent="flex-start"
                      variant="ghost"
                      onClick={onClose}
                      as={Link}
                      to={`/category/${toSlug(cat)}`}
                    >
                      {cat}
                    </Button>
                  ))
                )}
              </VStack>

              <Divider />

              {}
              <HStack justify="space-between" pt={2}>
                <HStack>
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                  <Text>Username</Text>
                </HStack>
                {}
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
