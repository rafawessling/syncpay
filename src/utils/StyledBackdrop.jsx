import { styled, Backdrop } from '@mui/material';

export const StyledBackdrop = styled(Backdrop)({
    width: 'calc(100vw - 13rem)',
    height: 'calc(100vh - 9.3rem)',
    marginLeft: '12rem',
    marginTop: '9rem',
    color: '#da0175',
    '&.MuiBackdrop-root': {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(4px)',
        zIndex: 5,
    },
    '@media (max-width: 768px)': {
        width: 'calc(100vw - 12vw)',
        height: 'calc(100vh - 8.7rem)',
        marginTop: '8.7rem',
        marginLeft: '12vw',
    },
});

export const StyledBackdropClients = styled(Backdrop)({
    width: 'calc(100vw - 13rem)',
    height: 'calc(100vh - 21rem)',
    marginLeft: '12rem',
    marginTop: '18rem',
    color: '#da0175',
    '&.MuiBackdrop-root': {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(4px)',
        zIndex: 5,
    },
    '@media (max-width: 768px)': {
        width: 'calc(100vw - 12vw)',
        height: 'calc(100vh - 19rem)',
        marginTop: '19rem',
        marginLeft: '12vw',
    },
});
