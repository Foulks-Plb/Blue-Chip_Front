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
  price?: any;
  team1?: string;
  team2?: string;
  [x: string]: any;
  id: number;
}) {
  const [leverage, setLeverage] = useState(1);
  const [teamWin, setTeamWin] = useState(1);

  const [result, setResult] = useState(0);

  const handleChange = (value: any) => setLeverage(value);

  const { id, price, team1, team2, ...rest } = props;

  const { data: signer, isError, isLoading } = useSigner();

  const contract = useContract({
    address: addressContract,
    abi: ABI,
    signerOrProvider: signer,
  });

  async function betFunction() {
    await contract.bet(id, leverage, result, {value: (leverage * price).toString()})
  }

  async function freeBetFunction() {
    await contract.freeBet(id, result)
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
              <Checkbox onChange={(e) =>{setResult(0)}} isChecked={result == 0}>{team1}</Checkbox>
              <Checkbox onChange={(e) =>{setResult(1)}} isChecked={result == 1}>{team2}</Checkbox>
              {/* <Checkbox onChange={(e) =>{setResult(2)}} isChecked={result == 2}>Equality</Checkbox> */}
            </Stack>
          </CheckboxGroup>
        </Center>
        <Center>
          <Button
            onClick={betFunction}
            w="140px"
            minW="140px"
            m="5px"
            mt={{ base: "20px", "2xl": "auto" }}
            variant="brand"
            fontWeight="500"
          >
            {ethers.utils.formatEther((leverage * price).toString()) + " bet"}
          </Button>
          <Button
            onClick={freeBetFunction}
            w="140px"
            m="5px"
            minW="140px"
            mt={{ base: "20px", "2xl": "auto" }}
            variant="brand"
            fontWeight="500"
          >
            Free bet
          </Button>
        </Center>
      </Flex>
    </Card>
  );
}
