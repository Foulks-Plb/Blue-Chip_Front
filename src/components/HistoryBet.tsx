import React from 'react';
// Chakra imports
import { Box, Button, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import { Image } from 'components/image/Image';
import { useContract, useSigner } from 'wagmi';
import { addressContract } from 'variables/project';
import ABI from "variables/abi.json";

export default function HistoryBet(props: {
	idMatch: number;
	idBet: number;
	teamBet: string;
	leverage: number;
	flag: string;
}) {
	const {idMatch, idBet, teamBet, leverage, flag} = props;

	const textColor = useColorModeValue('brands.900', 'white');
	const bgItem = useColorModeValue(
		{ bg: 'white', boxShadow: '0px 40px 58px -20px rgba(112, 144, 176, 0.12)' },
		{ bg: 'navy.700', boxShadow: 'unset' }
	);
	const textColorDate = useColorModeValue('secondaryGray.600', 'white');
	
	const { data: signer, isError, isLoading } = useSigner();

	const contract = useContract({
		address: addressContract,
		abi: ABI,
		signerOrProvider: signer,
	  });
	
	  async function claimFunction() {
		await contract.claim(idMatch, idBet)
	  }

	return (
		<Card _hover={bgItem} bg='transparent' boxShadow='unset' px='24px' py='21px' transition='0.2s linear'>
			<Flex direction={{ base: 'column' }} justify='center'>
				<Flex position='relative' align='center'>
					<Box>
					<Flex direction={{ base: 'row' }} justify='center'>
						<Image src={flag} w='40px' h='40px' borderRadius='50%' me='16px' />
					</ Flex >
					</Box>
					<Flex
						direction='column'
						w={{ base: '70%', md: '100%' }}
						me={{ base: '4px', md: '32px', xl: '10px', '3xl': '32px' }}>
						<Text
							color={textColor}
							fontSize={{
								base: 'md'
							}}
							mb='5px'
							fontWeight='bold'
							me='14px'>
							{teamBet}
						</Text>
					</Flex>
					<Flex w='max-content' me={{ base: '4px', md: '32px', xl: '10px', '3xl': '32px' }} align='center'>
						{/* <Text w='max-content' fontWeight='700' fontSize='md' color={textColor}>
							leverage: x{leverage}
						</Text> */}
					</Flex>
					<Button variant='action' onClick={claimFunction}>Claim</Button>
				</Flex>
			</Flex>
		</Card>
	);
}
