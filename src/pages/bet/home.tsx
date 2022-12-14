import React, { useEffect, useState } from 'react'

import {
  Box,
  Button,
  Flex,
  Grid,
  Text,
  useColorModeValue,
  SimpleGrid,
  Link
} from '@chakra-ui/react'

import Card from 'components/card/Card'

import TopGambler from 'components/topGambler'
import Match from 'components/card/Match'
import HistoryItem from 'components/HistoryItem'

import AdminLayout from 'layouts/admin'
import { ethers } from 'ethers'
import { addressContract, RPC, chainId } from 'variables/project'
import ABI from 'variables/abi.json'
import { getAllMacth } from '../../../firebase/clientApp';

export default function Home() {
  const [allMatchActive, setAllMatchActive] = useState([]);
  const [allMatchFinished, setAllMatchFinished] = useState([]);

  const textColor = useColorModeValue('secondaryGray.900', 'white')
  const textColorBrand = useColorModeValue('brand.500', 'white')

  const bscProvider = new ethers.providers.JsonRpcProvider(RPC, { name: 'binance', chainId: chainId })
  const contract = new ethers.Contract(addressContract, ABI, bscProvider)

  useEffect(() => {
    // searchEvent()
    searchMatch();
  }, []);

  async function searchEvent() {
    const filterFrom = contract.filters.Bet();
    let events = await contract.queryFilter(filterFrom, 20224070, "latest")
  }

  async function searchMatch() {
    const _AllMatch = await getAllMacth();

    setAllMatchActive(_AllMatch.filter((e: any)=> !e.isEnd))
    setAllMatchFinished(_AllMatch.filter((e: any)=> e.isEnd))
  }

  return (
    <AdminLayout>
      <Box pt={{ base: '180px', md: '80px', xl: '80px' }}>
        {/* Main Fields */}
        <Grid
          mb='20px'
          gridTemplateColumns={{ xl: 'repeat(3, 1fr)', '2xl': '1fr 0.46fr' }}
          gap={{ base: '20px', xl: '20px' }}
          display={{ base: 'block', xl: 'grid' }}
        >
          <Flex
            flexDirection='column'
            gridArea={{ xl: '1 / 1 / 2 / 3', '2xl': '1 / 1 / 2 / 2' }}
          >
            <Flex direction='column'>
              <Flex
                mt='45px'
                mb='20px'
                justifyContent='space-between'
                direction={{ base: 'column', md: 'row' }}
                align={{ base: 'start', md: 'center' }}
              >
                <Text
                  color={textColor}
                  fontSize='2xl'
                  ms='24px'
                  fontWeight='700'
                >
                  Next match
                </Text>
              </Flex>
              <SimpleGrid columns={{ base: 1, md: 3 }} gap='15px'>
                {allMatchActive.map((match, i) =>
                  <Match key={"match" + i}
                    name={match.team1 + " - " + match.team2}
                    image1={"/static/flags/" + match.team1 + ".jpg"}
                    image2={"/static/flags/" + match.team2 + ".jpg"}
                    currentbid='0.91 ETH'
                    id={match.id}
                    isEnd={match.isEnd}
                  />
                )}
              </SimpleGrid>
              <Flex
                mt='45px'
                mb='20px'
                justifyContent='space-between'
                direction={{ base: 'column', md: 'row' }}
                align={{ base: 'start', md: 'center' }}
              >
                <Text
                  color={textColor}
                  fontSize='2xl'
                  ms='24px'
                  fontWeight='700'
                >
                  Finished match
                </Text>
              </Flex>
              <SimpleGrid columns={{ base: 1, md: 3 }} gap='15px'>
                {allMatchFinished.map((match, i) =>
                  <Match key={"match" + i}
                    name={match.team1 + " - " + match.team2}
                    image1={"/static/flags/" + match.team1 + ".jpg"}
                    image2={"/static/flags/" + match.team2 + ".jpg"}
                    currentbid='0.91 ETH'
                    id={match.id}
                    isEnd={match.isEnd}
                  />
                )}
              </SimpleGrid>
            </Flex>
          </Flex>

          <Flex
            flexDirection='column'
            gridArea={{ xl: '1 / 3 / 2 / 4', '2xl': '1 / 2 / 2 / 3' }}
          >
            {/* <Card px='0px' mb='20px'>
              <TopGambler
                tableData={(tableDataTopCreators as unknown) as TableData[]}
                columnsData={tableColumnsTopCreators}
              />
            </Card> */}
            <Card p='0px' mt="10px">
              <Flex

                align={{ sm: 'flex-start', lg: 'center' }}
                justify='space-between'
                w='100%'
                px='22px'
                py='18px'
              >
                {/* <Text color={textColor} fontSize='xl' fontWeight='600'>
                  History
                </Text>
                <Button variant='action'>See all</Button> */}
              </Flex>

              {/* <HistoryItem
                team1='France'
                team2='Angleterre'
                date='30s ago'
                image1={matchs[0].flag2}
                image2={matchs[0].flag1}
                price='0.91 ETH'
              /> */}
            </Card>
          </Flex>
        </Grid>
      </Box>
    </AdminLayout>
  )
}
