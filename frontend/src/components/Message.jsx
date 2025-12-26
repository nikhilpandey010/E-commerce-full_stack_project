
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';

const StyledAlert = styled(MuiAlert)(({ theme }) => ({
  backgroundColor: 'grey',
  color: 'white',
}));

export default function Message({ variant = 'standard', severity = 'info', children }) {
  return (
    <StyledAlert variant={variant} severity={severity}>
      {children}
    </StyledAlert>
  );
}


