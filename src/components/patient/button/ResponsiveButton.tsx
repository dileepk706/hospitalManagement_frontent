import { styled } from '@mui/material';
import { Button, } from '@mui/material';


export const StyledButton = styled(Button)(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        fontSize: '12px',
        padding: '8px 16px' 
    }, 
    [theme.breakpoints.down('md')]: {
        fontSize: '8px', 
        padding: '4px 8px'
    }
 }))