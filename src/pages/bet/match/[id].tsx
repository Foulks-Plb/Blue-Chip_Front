import { Box, Button, Flex, Grid, Text } from "@chakra-ui/react";
import AdminLayout from "layouts/admin";

import Banner from "components/Banner";
import Composition from "components/Composition";
import Bet from "components/Bet";
import { useRouter } from "next/router";
import ABI from "variables/abi.json";
import { addressContract, RPC, chainId, matchs } from "variables/project";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

import img from "img/terrain.jpg";
import Card from "components/card/Card";
import HistoryItem from "components/HistoryItem";
import HistoryBet from "components/HistoryBet";
import { useAccount } from "wagmi";
import { RepeatIcon } from "@chakra-ui/icons";

export default function ProfileOverview() {
  const { address, isConnected } = useAccount();

  const [matchLocal, setMatchLocal] = useState<any>({});

  const [inA, setInA] = useState<number>();
  const [inB, setInB] = useState<number>();
  const [inEquality, setInEquality] = useState<number>();
  const [pricePool, setPricePool] = useState<any>();
  const [price, setPrice] = useState<any>();

  const [betNumber, setBetNumber] = useState<number>();

  const [date, setDate] = useState<number>();

  const [allBet, setAllBet] = useState([]);

  const router = useRouter();
  const { id } = router.query;
  const idC = Number(id);

  const bscProvider = new ethers.providers.JsonRpcProvider(RPC, {
    name: "binance",
    chainId: chainId,
  });
  const contract = new ethers.Contract(addressContract, ABI, bscProvider);

  useEffect(() => {
    if (id) {
      setMatchLocal(matchs[idC]);

      searchMatchData();
      searchMatch();
      searchBetNumber();
    }
  }, [router]);

  useEffect(() => {
    if (betNumber > 0 && isConnected) {
      
      let i = 0;
      while(i < betNumber)
      {
        searchAddressBetResult(i)
        i ++;
      }
    }
  }, [betNumber]);

  async function searchMatchData() {
    const _matchData = await contract.idData(idC);
    setInA(Number(_matchData.inA.toString()));
    setInB(Number(_matchData.inB.toString()));
    setInEquality(Number(_matchData.inEquality.toString()));
    setPricePool(Number(_matchData.pricePool.toString()));
  }

  async function searchMatch() {
    const _match = await contract.matchId(idC);
    setDate(Number(_match.endAt.toString()));
    setPrice(Number(_match.price.toString()));
  }

  async function searchBetNumber()
  {
    if(isConnected)
    {
      const _betNbr = await contract.idAddressNbrbet(idC, address);
      setBetNumber(Number(_betNbr.toString()));
    }
  }

  async function searchAddressBetResult(betId: number)
  {
    const _result = await contract.idAddressBetResult(idC, address, betId)
    setAllBet(aB => [...aB, {
      isA: _result.winA,
      isB: _result.winB,
      isEquality: _result.equality,
      idMatch: idC,
      idBet: betId,
      leverage: 0
    }]);
  }

  return (
    <AdminLayout>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        {/* Main Fields */}
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
          {matchLocal && pricePool && (
            <Banner
              gridArea="1 / 1 / 2 / 2"
              banner={img}
              team1={matchLocal.flag1}
              team2={matchLocal.flag2}
              name={matchLocal.team1 + " - " + matchLocal.team2}
              pricePool={
                Number(ethers.utils.formatEther(pricePool)) + " BNB"
              }
              attendees={inA + inB + inEquality}
              following="274"
            />
          )}

          {date && (
            <Composition
              gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
              date={date}
              inA={inA}
              inB={inB}
              inEquality={inEquality}
              team1={matchLocal.team1}
              team2={matchLocal.team2}
            />
          )}
          {price && (
            <Bet
              gridArea={{
                base: "3 / 1 / 4 / 2",
                lg: "1 / 3 / 2 / 4",
              }}
              minH={{ base: "auto", lg: "420px", "2xl": "365px" }}
              pe="20px"
              pb={{ base: "100px", lg: "20px" }}
              price={price}
              team1={matchLocal.team1}
              team2={matchLocal.team2}
            />
          )}
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
                  Your bet
                </Text>
                <RepeatIcon onClick={searchBetNumber}/>
                {/* <Button variant='action'>Claim all</Button> */}
              </Flex>
              {allBet.map((e: any, i: number)=>
                <HistoryBet
                key={"historyBet"+i}
                idMatch={e.idMatch}
                idBet={e.idBet}
                teamBet={ e.isA ? matchLocal.team1 : (e.isB ? matchLocal.team2 : (e.isEquality ? "Equality": "Equality"))}
                flag={ e.isA ? matchLocal.flag1 : (e.isB ? matchLocal.flag2 : (e.isEquality ? "/img/flags/white-flag.png": "/img/flags/white-flag.png"))}
                leverage={e.leverage}
              />
              )}
            </Card>
    </AdminLayout>
  );
}
