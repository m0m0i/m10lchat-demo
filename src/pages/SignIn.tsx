import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Text,
  VisuallyHidden,
} from "@chakra-ui/react";
import React from "react";
import { FaGoogle } from "react-icons/fa";

import { Card } from "../components/Card";
import { Link } from "../components/Link";
import { LandingContainer } from "../screens/LandingContainer";
import { signInWithGoogle } from "../service/firebase";

const _signInWithGoogle = () => signInWithGoogle();

export const SignIn = () => (
  <LandingContainer>
    <Box maxW="md" mx="auto" mt="100">
      <Heading textAlign="center" size="xl" fontWeight="extrabold">
        Sign in to your account
      </Heading>
      <Text
        mt="4"
        mb="8"
        align="center"
        maxW="md"
        fontWeight="medium"
        justifyContent={"center"}
      >
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
  </LandingContainer>
);
