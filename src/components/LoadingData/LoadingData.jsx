import { CircularProgress } from '@mui/material';
import { StyledBackdrop, StyledBackdropClients } from '../../utils/StyledBackdrop';

function LoadingData({ isLoading, page }) {
    return (
        <>
            {page === 'home' ? (
                <StyledBackdrop open={isLoading}>
                    <CircularProgress color="inherit" />
                </StyledBackdrop>
            ) : (
                <StyledBackdropClients open={isLoading}>
                    <CircularProgress color="inherit" />
                </StyledBackdropClients>
            )}
        </>
    );
}

export default LoadingData;
