import {
  Box,
  BoxProps,
  Button,
  HTMLChakraProps,
  Heading,
  SimpleGrid,
  Text,
  VisuallyHidden,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { FaGoogle } from "react-icons/fa";

import { signInWithGoogle } from "../service/firebase";

const _signInWithGoogle = () => signInWithGoogle();

export const SignIn = () => (
  <Box maxW="md" mx="auto" mt="200">
    <Heading textAlign="center" size="xl" fontWeight="extrabold">
      Sign in to your account
    </Heading>
    <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
      <Text as="span">Don&apos;t have an Google account?</Text>
      <Link href="https://accounts.google.com/signup/v2/webcreateaccount?flowName=GlifWebSignIn&flowEntry=SignUp">
        You can create it from here
      </Link>
    </Text>
    <Card>
      <SimpleGrid colums={1} spacing="4">
        <Text as="span" align="center">
          Sign in with your Google account.
        </Text>
        <Button
          color="currentColor"
          variant="outline"
          onClick={_signInWithGoogle}
        >
          <VisuallyHidden>Login with Google</VisuallyHidden>
          <FaGoogle />
        </Button>
      </SimpleGrid>
    </Card>
  </Box>
);

export const Link = (props: HTMLChakraProps<"a">) => (
  <chakra.a
    marginStart="1"
    href="#"
    color={useColorModeValue("blue.500", "blue.200")}
    _hover={{ color: useColorModeValue("blue.600", "blue.300") }}
    display={{ base: "block", sm: "inline" }}
    {...props}
  />
);

export const Card = (props: BoxProps) => (
  <Box
    bg={useColorModeValue("white", "gray.700")}
    py="8"
    px={{ base: "4", md: "10" }}
    shadow="base"
    rounded={{ sm: "lg" }}
    {...props}
  />
);