import { Radio } from '@mui/material';
import { styled } from '@mui/material/styles';

const Icon = styled('span')({
    borderRadius: '50%',
    width: '2.4rem',
    height: '2.4rem',
    backgroundColor: '#C8C8D7',

    'input:hover ~ &': {
        backgroundColor: '#bebecb',
    },
});

const CheckedIcon = styled('span')({
    '&::before': {
        content: '""',
        display: 'block',
        width: '2.4rem',
        height: '2.4rem',
        borderRadius: '50%',
        backgroundColor: '#0E8750',
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='11' height='9' viewBox='0 0 11 9' fill='none'><path d='M9.72727 1.22559L3.72727 7.77104L1 4.79583' stroke='%23FCFCFC' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>")`,
        backgroundSize: '1.1rem',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    },
});

export default function StyledRadio(props) {
    return <Radio disableRipple color="default" checkedIcon={<CheckedIcon />} icon={<Icon />} {...props} />;
}
