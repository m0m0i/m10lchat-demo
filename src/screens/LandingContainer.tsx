import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import React from "react";

export const LandingContainer: React.FC = ({ children }) => (
  <Box
    bg={useColorModeValue("gray.50", "inherit")}
    minH="100vh"
    py="12"
    px={{ base: "4", lg: "8" }}
    h="full"
  >
    <Heading as="h1" size="2xl" mt={100} textAlign={"center"}>
      Multilingual Chat + Antidote demo
    </Heading>
    {children}
  </Box>
);
