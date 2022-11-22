import { Icon } from '@chakra-ui/react'
import {
  MdPerson,
  MdHome
} from 'react-icons/md'

import Home from 'pages/bet/home'
import myMatch from 'pages/bet/myMatch'
import { IRoute } from 'types/navigation'

const routes: IRoute[] = [
  {
    name: 'Home',
    layout: '/bet',
    path: '/home',
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: Home
  },
  {
    name: 'My match',
    layout: '/bet',
    path: '/myMatch',
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: myMatch
  },
]

export default routes
