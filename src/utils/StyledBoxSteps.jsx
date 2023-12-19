import { styled, Box } from '@mui/material';

export const StyledBoxSteps = styled(Box)({
    height: '2.5rem',
    position: 'absolute',
    bottom: '4rem',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    '@media (max-width: 430px)': {
        bottom: '0',
    },
});
