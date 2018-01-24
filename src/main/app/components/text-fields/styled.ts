import styled from 'styled-components';
import { FONTS_STACK } from '../constants';

interface LabelProps {
  caption: string;
  whirling: boolean;
  animationDuration: string;
}

const Label = styled<LabelProps, 'label'>('label')`
  margin-top: 20px;
  position: relative;
  width: 100%;
  max-width: 300px;
  display: inline-block;
  cursor: text;

  &::before {
    position: absolute;
    display: block;
    left: 0;
    transition:
      ${props => props.animationDuration} ease bottom,
      ${props => props.animationDuration} ease color,
      ${props => props.animationDuration} ease font;
    color: ${props => props.whirling ? '#5264AE' : '#999'};
    font: normal 400 ${props => props.whirling ? '14px' : '18px'} ${FONTS_STACK.ROBOTO};
    content: '${props => props.caption}';
    bottom: ${props => props.whirling ? '40px' : '20px'};
  }

  &::after {
    position: absolute;
    content: '';
    bottom: 0;
    background: #5264ae;
    transition:
      ${props => props.animationDuration} ease width,
      ${props => props.animationDuration} ease  left;
    height: 2px;
    width: ${props => props.whirling ? '100%' : '0'};
    left: ${props => props.whirling ? '0' : '50%'};
  }
`;

const Input = styled.input`
  box-sizing: border-box;
  font: normal 400 16px ${FONTS_STACK.ROBOTO};
  padding: 10px 10px 10px 5px;
  z-index: -1;
  left: -5px;
  width: 100%;
  border: none;
  border-bottom: 2px solid #cac8ca;
  outline: none;
  transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    box-shadow: 0 8px 6px -6px #878787;
  }
`;

export { Label, Input };
