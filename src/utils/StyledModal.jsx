import { Modal, styled } from '@mui/material';

export const StyledModal = styled(Modal)({
    '& .MuiBackdrop-root': {
        width: 'calc(100vw - 10.6rem)',
        marginLeft: '10.6rem',
        backgroundColor: 'rgba(146, 155, 151, 0.3)',
        zIndex: 0,
        backdropFilter: 'blur(1.5px)',
        '@media (max-width: 768px)': {
            width: '100vw',
            marginLeft: '0',
        },
    },
});
