// Chakra imports
import { Flex, useColorModeValue } from '@chakra-ui/react';

// Custom components
import { HSeparator } from 'components/separator/Separator';
import { Text } from '@chakra-ui/react';

export function SidebarBrand() {
	//   Chakra color mode
	let logoColor = useColorModeValue('navy.700', 'white');

	return (
		<Flex alignItems='center' flexDirection='column'>
		<HSeparator mb='20px' />
		</Flex>
	);
}

export default SidebarBrand;
