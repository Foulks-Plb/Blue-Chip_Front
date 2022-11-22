import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import Card from 'components/card/Card'
import { NextAvatar } from 'components/image/Avatar'
import Image from 'next/image'

export default function Banner (props: {
  banner: string
  team1: string
  team2: string
  name: string
  pricePool: number | string
  attendees: number | string
  following: number | string
  [x: string]: any
}) {
  const {
    banner,
    team1,
    team2,
    name,
    pricePool,
    attendees,
    following,
    ...rest
  } = props
  
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white')
  const textColorSecondary = 'gray.400'
  const borderColor = useColorModeValue(
    'white !important',
    '#111C44 !important'
  )
  return (
    <Card mb={{ base: '0px', lg: '20px' }} alignItems='center' {...rest}>
      
      <Box
        style={{overflow: "hidden"}}
        borderRadius='16px'
        h='131px'
        w='100%'
        >
        <Image src={banner}/>
      </Box>
      <Flex mx='auto' mt='-43px' alignItems='center' flexDirection='row'>
      <NextAvatar
        mx='auto'
        src={team1}
        h='87px'
        w='87px'
        border='4px solid'
        borderColor={borderColor}
      />
      <NextAvatar
        mx='auto'
        src={team2}
        h='87px'
        w='87px'
        border='4px solid'
        borderColor={borderColor}
      />
      </Flex>
      <Text color={textColorPrimary} fontWeight='bold' fontSize='xl' mt='10px'>
        {name}
      </Text>
      <Flex w='max-content' mx='auto' mt='26px'>
        <Flex mx='auto' me='60px' alignItems='center' flexDirection='column'>
          <Text color={textColorPrimary} fontSize='2xl' fontWeight='700'>
            {pricePool}
          </Text>
          <Text color={textColorSecondary} fontSize='sm' fontWeight='400'>
            Price pool
          </Text>
        </Flex>
        <Flex mx='auto' me='60px' alignItems='center' flexDirection='column'>
          <Text color={textColorPrimary} fontSize='2xl' fontWeight='700'>
            {attendees}
          </Text>
          <Text color={textColorSecondary} fontSize='sm' fontWeight='400'>
            bettor
          </Text>
        </Flex>
        {/* <Flex mx='auto' alignItems='center' flexDirection='column'>
          <Text color={textColorPrimary} fontSize='2xl' fontWeight='700'>
            {following}
          </Text>
          <Text color={textColorSecondary} fontSize='sm' fontWeight='400'>
            Following
          </Text>
        </Flex> */}
      </Flex>
    </Card>
  )
}
