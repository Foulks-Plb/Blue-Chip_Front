import { Box, Button, Flex, Grid, Text } from "@chakra-ui/react";
import AdminLayout from "layouts/admin";

import Banner from "components/Banner";
import Composition from "components/Composition";
import Bet from "components/Bet";
import { useRouter } from "next/router";
import ABI from "variables/abi.json";
import { addressContract, RPC, chainId } from "variables/project";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

import img from "img/terrain.jpg";
import Card from "components/card/Card";
import HistoryItem from "components/HistoryItem";
import HistoryBet from "components/HistoryBet";
import { useAccount } from "wagmi";
import { RepeatIcon } from "@chakra-ui/icons";
import Link from "next/link";

export default function myMatch() {
  const { address, isConnected } = useAccount();

  const [allBet, setAllBet] = useState([]);


  const bscProvider = new ethers.providers.JsonRpcProvider(RPC, {
    name: "binance",
    chainId: chainId,
  });
  const contract = new ethers.Contract(addressContract, ABI, bscProvider);

  useEffect(() => {
    searchAllBet();
  }, []);


  async function searchAllBet()
  {
    if(!isConnected)
    {
      return
    }
    const filterFrom = contract.filters.Bet();
     let events = await contract.queryFilter(filterFrom, 20224070, "latest")
     var _allBet = [] as any;
    events.map((e: any)=>{
      if(e.args.from == address)
      {
        if(_allBet.indexOf(Number(e.args.id.toString())) == -1)
        {
          _allBet.push(Number(e.args.id.toString()));
          setAllBet(aB => [...aB, 
            Number(e.args.id.toString())
        ]);
        }         
      }   
    })  
  }

  return (
    <AdminLayout>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <Grid
          templateColumns={{
            base: "1fr",
            lg: "1.34fr 1fr 1.62fr",
          }}
          templateRows={{
            base: "repeat(3, 1fr)",
            lg: "1fr",
          }}
          gap={{ base: "20px", xl: "20px" }}
        >
        </Grid>
        <Grid
          mb="20px"
          templateColumns={{
            base: "1fr",
            lg: "repeat(2, 1fr)",
            "2xl": "1.34fr 1.62fr 1fr",
          }}
          templateRows={{
            base: "1fr",
            lg: "repeat(2, 1fr)",
            "2xl": "1fr",
          }}
          gap={{ base: "20px", xl: "20px" }}
        ></Grid>
      </Box>

      <Card p='0px' mt="10px">
              <Flex
              
                align={{ sm: 'flex-start', lg: 'center' }}
                justify='space-between'
                w='100%'
                px='22px'
                py='18px'
              >
                <Text fontSize='xl' fontWeight='600'>
                  Your match
                </Text>
                {/* <RepeatIcon onClick={searchBetNumber}/> */}
                {/* <Button variant='action'>Claim all</Button> */}
              </Flex>
              {allBet.map((e: any, i: number)=>
              // a refaire
              <div></div>
              // <HistoryItem
              //   key={"historyMatch"+i}
              //   team1={matchs[e].team1}
              //   team2={matchs[e].team2}
              //   image1={matchs[e].flag1}
              //   image2={matchs[e].flag2}
              //   matchNumber={e}
              // />
              )}
            </Card>
    </AdminLayout>
  );
}
