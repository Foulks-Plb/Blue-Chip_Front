// Chakra imports
import {
	AvatarGroup,
	Avatar,
	Box,
	Button,
	Flex,
	Icon,
	Link,
	Text,
	useColorModeValue,
	Spacer,
	AspectRatio
} from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import { NextAvatar } from 'components/image/Avatar';
import { Image } from 'components/image/Image';
// Assets
import { useState } from 'react';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';

export default function Match(props: {
	image1: string;
	image2: string;
	name: string;
	id: number;
	currentbid: string | number;
}) {
	const { image1, image2, name, id, currentbid } = props;
	const [ like, setLike ] = useState(false);
	const textColor = useColorModeValue('navy.700', 'white');
	const textColorBid = useColorModeValue('brand.500', 'white');
	return (
		<Card p='20px'>
			<Flex direction={{ base: 'column' }} justify='center'>
				<Box mb={{ base: '20px', '2xl': '20px' }} position='relative'>
				<Flex direction={{ base: 'row' }} justify='center'>
					<AspectRatio ratio={1 / 1} w={'40%'} m='5px'>
						<Image src={image1} borderRadius='50%' alt='' />
					</AspectRatio>
					<AspectRatio ratio={1 / 1} w={'40%'} m='5px'>
						<Image src={image2} borderRadius='50%' alt='' />
					</AspectRatio>
					</Flex>
				</Box>
				<Flex flexDirection='column' justify='space-between' h='100%'>
					<Flex
						justify='space-between'
						direction={{
							base: 'row',
							md: 'column',
							lg: 'row',
							xl: 'column',
							'2xl': 'row'
						}}
						mb='auto'>
						<Flex direction='column'>
							<Text
								color={textColor}
								fontSize={{
									base: 'xl',
									md: 'lg',
									lg: 'lg',
									xl: 'lg',
									'2xl': 'md',
									'3xl': 'lg'
								}}
								fontWeight='bold'
								me='14px'>
								{name}
							</Text>
						</Flex>
					</Flex>
					<Flex
						align={{
							base: 'center',
							md: 'start',
							lg: 'center',
							xl: 'start',
							'2xl': 'center'
						}}
						justify='space-between'
						direction={{
							base: 'row',
							md: 'column',
							lg: 'row',
							xl: 'column',
							'2xl': 'row'
						}}
						mt='25px'>
						{/* <Text fontWeight='700' fontSize='sm' color={textColorBid}>
							price pool: {currentbid}
						</Text> */}
						<Link
							href={'/bet/match/' + id}
							mt={{
								base: '0px',
								md: '10px',
								lg: '0px',
								xl: '10px',
								'2xl': '0px'
							}}>
							<Button
								variant='darkBrand'
								color='white'
								fontSize='sm'
								fontWeight='500'
								borderRadius='70px'
								px='24px'
								py='5px'>
								Bet
							</Button>
						</Link>
					</Flex>
				</Flex>
			</Flex>
		</Card>
	);
}
