import React from "react";
// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import Card from "components/card/Card";
import { Image } from "components/image/Image";
import Link from "next/link";

export default function NFT(props: {
  image1: string;
  image2: string;
  team1: string;
  team2: string;
  matchNumber: number;
}) {
  const { image1, image2, team1, team2, matchNumber } = props;

  const textColor = useColorModeValue("brands.900", "white");
  const bgItem = useColorModeValue(
    { bg: "white", boxShadow: "0px 40px 58px -20px rgba(112, 144, 176, 0.12)" },
    { bg: "navy.700", boxShadow: "unset" }
  );
  const textColorDate = useColorModeValue("secondaryGray.600", "white");
  return (
    <Card
      _hover={bgItem}
      bg="transparent"
      boxShadow="unset"
      px="24px"
      py="21px"
      transition="0.2s linear"
    >
      <Flex direction={{ base: "column" }} justify="center">
        <Flex position="relative" align="center">
          <Box>
            <Flex direction={{ base: "row" }} justify="center">
              <Image
                src={image1}
                w="40px"
                h="40px"
                borderRadius="50%"
                me="16px"
              />
              <Image
                src={image2}
                w="40px"
                h="40px"
                borderRadius="50%"
                me="16px"
              />
            </Flex>
          </Box>
          <Flex
            direction="column"
            w={{ base: "70%", md: "100%" }}
            me={{ base: "4px", md: "32px", xl: "10px", "3xl": "32px" }}
          >
            <Text
              color={textColor}
              fontSize={{
                base: "md",
              }}
              mb="5px"
              fontWeight="bold"
              me="14px"
            >
              {team1} - {team2}
            </Text>
          </Flex>
          <Flex
            w="max-content"
            me={{ base: "4px", md: "32px", xl: "10px", "3xl": "32px" }}
            align="center"
          ></Flex>
		  <Link href={"/bet/match/"+matchNumber}>
          	<Button variant="action">See</Button>
		  </Link>
        </Flex>
      </Flex>
    </Card>
  );
}
