/*
 Copyright 2022 Google LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
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
