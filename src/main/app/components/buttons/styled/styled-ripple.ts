import styled, { keyframes } from 'styled-components';
import { COLORS } from '../../constants';
import Coordinates from '../coordinates';

interface StyledRippleProps extends Coordinates {
  radius: number;
  time: number;
}

const rippleAnimation = keyframes`
  to {
    opacity: 0;
    transform: scale(2);
  }
`;

const StyledRipple = styled<StyledRippleProps, 'span'>('span')`
  transform: scale(0);
  border-radius: 100%;
  position: absolute;
  opacity: 0.75;
  background-color: ${COLORS.WHITE};
  animation: ${rippleAnimation} ${props => props.time}ms;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  height: ${props => props.radius}px;
  width: ${props => props.radius}px;
`;

export default StyledRipple;
