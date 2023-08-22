import { Icon } from '@chakra-ui/react'
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart
} from 'react-icons/md'
import {BsDatabaseFillLock} from 'react-icons/bs'

// Admin Imports
import MainDashboard from 'pages/admin/default'
import NFTMarketplace from 'pages/admin/database'
import Profile from 'pages/admin/profile'
import DataTables from 'pages/admin/data-tables'
import RTL from 'pages/rtl/rtl-default'

// Auth Imports
import SignInCentered from 'pages/auth/sign-in'
import { IRoute } from 'types/navigation'
import sendMail from 'pages/admin/sendMail'

const routes: IRoute[] = [
/*   {
    name: 'Dashboard',
    layout: '/admin',
    path: '/default',
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard
  }, */
  {
    name: 'Database',
    layout: '/admin',
    path: '/database',
    icon: (
      <Icon
        as={BsDatabaseFillLock}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: NFTMarketplace,
    secondary: true
  },
  {
    name: 'Clients',
    layout: '/admin',
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: '/data-tables',
    component: DataTables
  },
  {
    name: 'Profile',
    layout: '/admin',
    path: '/profile',
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: Profile
  },
  {
    name: 'Log out',
    layout: '/auth',
    path: '/logout',
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered
  },
  {
    name: "sendMail",
    layout: '/admin',
    path: '/sendMail',
    icon:  null,
    component: sendMail
  }
 
]

export default routes
