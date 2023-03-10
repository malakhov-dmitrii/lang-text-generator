import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getBaseUrl } from "@/utils/api";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import type { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useState } from "react";

export default function AuthPage() {
  const router = useRouter();
  const callbackUrl = router.query.callbackUrl as string;

  const [email, setEmail] = useState("");
  return (
    <>
      <NextSeo title="Auth" />
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"md"} py={12} px={6} w="full">
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Passwordless email</FormLabel>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  w="full"
                />
              </FormControl>
              {/* <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl> */}
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox size="sm">Send me occasional app updates</Checkbox>
                </Stack>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={() => {
                    void signIn("email", { email, callbackUrl });
                  }}
                >
                  Send
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>);
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  console.log({ session });

  if (context.resolvedUrl.includes("callback")) {
    const url = decodeURIComponent(
      context.resolvedUrl.replace("/auth?callbackUrl=", "")
    );

    console.log({ url, context: context.resolvedUrl });

    // return {
    //   redirect: { destination: `${url}`, permanent: false },
    // };
  }

  return {
    props: {},
  };
};
