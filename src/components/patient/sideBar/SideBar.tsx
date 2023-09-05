import { Chat,Home, Menu ,BookOnline,Person,ListAlt,MonitorHeart,Medication} from '@mui/icons-material';
import {   Avatar, Box, Button, Drawer,  List, ListItem, ListItemButton, ListItemIcon, ListItemText,styled } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBarAutocomplete from '../searchInputBar/SearchBar';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { logoutPateint } from '../../../redux/patient/patientSlice';

 
interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {

   const patient=useAppSelector(state=>state.user)
   const dispatch=useAppDispatch()
   const navigate=useNavigate()

   //types
   type optionType={
      sideBarItem: string, isSelected: boolean,route:string 
   }

   //states
   const [state, setState] = useState({ left: false, isSelected: false });
  
   
   const [options, setOptions] = useState<optionType[]>([
      { sideBarItem: 'Home', isSelected: true,route:'/' },
      { sideBarItem: 'Profile', isSelected: false,route:'/profile'  },
      { sideBarItem: 'Take an appointment', isSelected: false,route:'/book-slot'  },
      { sideBarItem: 'Appointments', isSelected: false ,route:'/appointments/all' },
      // { sideBarItem: 'Reports', isSelected: false,route:'/'  },
      // { sideBarItem: 'Your consultants', isSelected: false,route:'/'  },
      { sideBarItem: 'Chat with Dr', isSelected: false,route:'/chat'  }
   ])

   
   const toggleDrawer = (anchor: any, open: any) => (event: any) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
         return;
      }
      setState({ ...state, [anchor]: open });
   }
   //changing the selector 
   const changeIsSelected = (sideBarItem: string) => {
      const updatedOptions = options.map(option => {
         if (option.isSelected && option.sideBarItem !== sideBarItem) {
            return { ...option, isSelected: false }
         }
         return option.sideBarItem === sideBarItem ? { ...option, isSelected: true } : option;
      }
      )
      setOptions(updatedOptions)
   }

   const list = (anchor: any) => (
      <Box
         //  sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
         sx={{ paddingTop: '40px' }}
         role="presentation"
         onClick={toggleDrawer(anchor, false)}
         onKeyDown={toggleDrawer(anchor, false)}
      >
         <List>
            {options.map((navigation) => {
               return (

                  <ListItem onClick={() => changeIsSelected(navigation.sideBarItem)} key={navigation.sideBarItem} disablePadding>
                     <ListItemButton sx={{ backgroundColor: navigation.isSelected ? 'rgba(160, 160, 160, 0.5)' : '', borderRadius: '2px' }}>
                        <ListItemIcon>
                           {navigation.sideBarItem === 'Home' && <Home />}
                           {navigation.sideBarItem === 'Take an appointment' && <BookOnline />}
                           {navigation.sideBarItem === 'Profile' && <Person />}
                           {navigation.sideBarItem === 'Appointments' && <ListAlt />}
                           {navigation.sideBarItem === 'Reports' && <MonitorHeart />}
                           {navigation.sideBarItem === 'Your consultants' && <Medication />},
                           {navigation.sideBarItem === 'Chat with Dr' && <Chat />}
                        </ListItemIcon>
                        <Link to={navigation.route}><ListItemText primary={navigation.sideBarItem} /></Link>
                     </ListItemButton>
                  </ListItem>
               )
            })}

         </List>
      </Box>
   );

   return (
      <>
         <StyledBox>
            {/* <Box sx={{ width: '60%', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
               <Button onClick={toggleDrawer('left', true)}><Menu /></Button>
               <SearchBarAutocomplete />
            </Box> */}
               <SearchBarAutocomplete />

               <Box sx={{display:'flex',justifyContent:'space-evenly',alignItems:'center',gap:'20px'}}>
                  
                  <Link to={'/'}>Home</Link>
                  <Link to={'/book-slot'}>Make appointment</Link>
                  <Link to={'/appointments/all'}>Appointments</Link>

               </Box>

            {patient?.accessToken ?
               (<Avatar onClick={()=>{
                  navigate('/profile')
                  // dispatch(logoutPateint({}))
                  // localStorage.removeItem('user')
                  // navigate('/login')
               }} alt="Remy Sharp" src={patient?.userImage && `${patient?.userImage}`} />) :
               (<Button variant="outlined"><Link to={'/login'}>Login</Link></Button>)
            }
         </StyledBox>
         {/* <Drawer
            open={state['left']}
            onClose={toggleDrawer('left', false)}
         >
            {list('left')}
         </Drawer> */}
      </>
   );
}
export default Sidebar

const StyledBox = styled(Box)({
   display: 'flex',
   justifyContent: 'space-around',
   alignItems:'center',
   width: '100wh', 
   boxShadow: '0px 0px 8px 0px rgba(0, 0, 0, 0.75)', 
   
   padding: '5px' 
})

// const StyledBox = styled(Box)(({ theme }) => ({
//    [theme.breakpoints.up('xs')]: {
//        paddingLeft:'8px',
//        paddingRight:'8px',
//        marginTop:'8px',
//        flex:1
//    }
//    , [theme.breakpoints.between('sm','md')]: {
//        flex:0.7,
      
//        marginLeft:'auto',
//        marginRight:'auto',
//    }
//    , [theme.breakpoints.up('md')]: {
//        paddingLeft:'12px',
//        paddingRight:'12px',
//        marginTop:'12px',
//        flex:4
//    }
// }))