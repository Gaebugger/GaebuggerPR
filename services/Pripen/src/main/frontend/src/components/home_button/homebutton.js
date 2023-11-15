import styled, { css } from 'styled-components';
import Button from '@material-ui/core/Button';

const StyledButton = styled(Button)`
  /* 기본 버튼 스타일 */
  
  &.animated {
    animation-delay: 1.5s;

    /* .section 안에서만 적용될 경우 */
    .section & {
      animation-delay: 1.5s;
    }
  }
`;