import Paper from '@mui/material/Paper';
import { StyledBoxSteps } from '../../utils/StyledBoxSteps';

const totalSteps = 3;

export default function ThreeStepSlider({ stepStates }) {
    return (
        <StyledBoxSteps>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {[...Array(totalSteps)].map((_, index) => (
                    <Paper
                        key={index}
                        sx={{
                            m: 1,
                            width: 82,
                            height: 6,
                            backgroundColor: stepStates[index] === 'StepDone' ? 'green' : '#DEDEE9',
                        }}
                        elevation={0}
                    />
                ))}
            </div>
        </StyledBoxSteps>
    );
}
