// Chakra imports
import { Box, Flex, Icon, Progress, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import IconBox from 'components/icons/IconBox';
import Menu from 'components/menu/MainMenu';
import React, { useEffect, useState } from 'react';

import { MdOutlineTimer } from 'react-icons/md';


export default function Composition(props: { inA: number; inB: number; inEquality: number;[x: string]: any; team1: string; team2: string, date: number }) {
	const { inA, inB, inEquality, team1, team2, date } = props;
	// Chakra Color Mode
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	const brandColor = useColorModeValue('brand.500', 'white');
	const textColorSecondary = 'gray.400';
	const box = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');

	const [days, setDays] = useState(0);
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);

	let time = date * 1000 - Date.now();

	const getTime = () => {
		time = date * 1000 - Date.now();
		setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
		setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
		setMinutes(Math.floor((time / 1000 / 60) % 60));
		setSeconds(Math.floor((time / 1000) % 60));
	};

	useEffect(() => {
		// const interval = setInterval(() => getTime(), 1000);

		// return () => clearInterval(interval);
	}, []);

	return (
		<Card mb={{ base: '0px', lg: '20px' }} alignItems='center'>
			<IconBox
				mx='auto'
				h='100px'
				w='100px'
				icon={<Icon as={MdOutlineTimer} color={brandColor} h='46px' w='46px' />}
				bg={box}
			/>
			{time > 0 ?
				<div><Text color={textColorPrimary} fontWeight='bold' fontSize='15px' mt='10px'>
					end in:
				</Text>
					<Text color={textColorPrimary} fontWeight='bold' fontSize='2xl' mt='10px'>
						{days + " days"}
					</Text>
					<Text color={textColorPrimary} fontWeight='bold' fontSize='15px' mt='10px'>
						{hours + " hours " + minutes + " minutes " + seconds + " seconde "}
					</Text></div> : <Text color={textColorPrimary} fontWeight='bold' fontSize='15px' mt='10px'>
					The game is over
				</Text>
			}

			<Box w='100%' mt='auto'>
				<Flex w='100%' justify='space-between' mb='10px'>
					<Text color={textColorSecondary} fontSize='sm' maxW='40%'>
						{team1}
					</Text>
				</Flex>
				<Progress alignItems='start' colorScheme='brandScheme' value={inA / (inA + inB + inEquality) * 100} w='100%' />
				<Flex w='100%' justify='space-between' mb='10px'>
					<Text color={textColorSecondary} fontSize='sm' maxW='40%'>
						{team2}
					</Text>
				</Flex>
				<Progress alignItems='start' colorScheme='brandScheme' value={inB / (inA + inB + inEquality) * 100} w='100%' />
			</Box>
			{/* <Box w='100%' mt='auto'>
				<Flex w='100%' justify='space-between' mb='10px'>
					<Text color={textColorSecondary} fontSize='sm' maxW='40%'>
						Equality
					</Text>
				</Flex>
				<Progress alignItems='start' colorScheme='brandScheme' value={inEquality / (inA + inB + inEquality) * 100} w='100%' />
			</Box> */}
		</Card>
	);
}
