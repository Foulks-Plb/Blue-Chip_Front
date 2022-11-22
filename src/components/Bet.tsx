// Chakra imports
import {
  Box,
  Button,
  Center,
  Checkbox,
  CheckboxGroup,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card";
import { BigNumber, ethers } from "ethers";
import { useEffect, useState } from "react";
// Assets
import { MdUpload } from "react-icons/md";
import { addressContract, chainId, RPC } from "variables/project";
import Dropzone from "views/admin/profile/components/Dropzone";
import ABI from "variables/abi.json";
import { useContract, useSigner } from "wagmi";

export default function Bet(props: {
  price?: BigNumber;
  team1?: string;
  team2?: string;
  [x: string]: any;
}) {
  const [leverage, setLeverage] = useState(1);
  const [teamWin, setTeamWin] = useState(1);

  const [isTeam1, setIsTeam1] = useState(false);
  const [isTeam2, setIsTeam2] = useState(false);
  const [isEquality, setIsEquality] = useState(false);

  const handleChange = (value: any) => setLeverage(value);

  const { price, team1, team2, ...rest } = props;

  const { data: signer, isError, isLoading } = useSigner();

  const contract = useContract({
    address: addressContract,
    abi: ABI,
    signerOrProvider: signer,
  });

  async function betFunction() {
    await contract.bet(0, leverage, isTeam1, isTeam2, isEquality, {value: leverage * price})
  }

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const brandColor = useColorModeValue("brand.500", "white");
  const textColorSecondary = "gray.400";
  return (
    <Card {...rest} mb="20px" alignItems="center" p="20px">
      <Flex w="100%" h="100%" direction={{ base: "column", "2xl": "row" }}>
        <Center>
          <Text
            color={textColorPrimary}
            fontWeight="bold"
            textAlign="start"
            fontSize="2xl"
            mt={{ base: "20px", "2xl": "50px" }}
            mb={{ base: "20px", "2xl": "50px" }}
          >
            Choose your leverage
          </Text>
        </Center>
        <Flex>
          <NumberInput
            maxW="100px"
            mr="2rem"
            value={leverage}
            onChange={handleChange}
          >
            <NumberInputField color={textColorPrimary} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Slider
            color={textColorSecondary}
            flex="1"
            focusThumbOnChange={false}
            value={leverage}
            onChange={handleChange}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb fontSize="sm" boxSize="32px" children={leverage} />
          </Slider>
        </Flex>
        <Center>
          <Text mt="20px">Choose the winning team:</Text>
        </Center>

        <Center mt="20px">
          <CheckboxGroup colorScheme="purple">
            <Stack spacing={[1, 5]} direction={["column", "row"]}>
              <Checkbox onChange={(e) =>{setIsTeam1(e.target.checked); setIsTeam2(false); setIsEquality(false)}} isChecked={isTeam1}>{team1}</Checkbox>
              <Checkbox onChange={(e) =>{setIsTeam2(e.target.checked); setIsTeam1(false); setIsEquality(false)}} isChecked={isTeam2}>{team2}</Checkbox>
              <Checkbox onChange={(e) =>{setIsEquality(e.target.checked); setIsTeam2(false); setIsTeam1(false);}} isChecked={isEquality}>Equality</Checkbox>
            </Stack>
          </CheckboxGroup>
        </Center>
        <Center>
          <Button
            onClick={betFunction}
            w="140px"
            minW="140px"
            mt={{ base: "20px", "2xl": "auto" }}
            variant="brand"
            fontWeight="500"
          >
            Bet{" "}
            {leverage * price}
          </Button>
        </Center>
      </Flex>
    </Card>
  );
}
