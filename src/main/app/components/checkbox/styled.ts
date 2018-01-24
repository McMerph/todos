import * as styledComponents from 'styled-components';
import { ThemedStyledComponentsModule } from 'styled-components';
import { FONTS_STACK } from '../constants';
import { visuallyHidden } from '../common';

interface Theme {
  inputChecked: boolean;
}

/* https://www.styled-components.com/docs/api#define-a-theme-interface */
const {default: styled, keyframes} = styledComponents as ThemedStyledComponentsModule<Theme>;

const borderScaleAnimation = keyframes`
  to {
    box-shadow: 0 0 0 4px #4f8196;
  }
`;

const Label = styled.label`
  position: relative;
  padding-left: 25px;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font: normal 400 16px/1.5 ${FONTS_STACK.ROBOTO};
  word-wrap: break-word;
  display: block;
  outline: 0;

  &:hover,
  &:focus {
    box-shadow: 0 8px 6px -6px #878787;
  }

  &::before {
    position: absolute;
    content: '';
    top: 50%;
    left: 0;
    width: 14px;
    height: 14px;
    margin-top: -9px;
    border: 2px solid #4f8196;
    transition: background 0.4s ease;
    animation: ${props => props.theme.inputChecked ? borderScaleAnimation + ' 0.2s ease-in' : 'unset'};
    background: ${props => props.theme.inputChecked ? '#4f8196' : 'transparent' };
  }

  &:hover::before,
  &:focus::before {
    background: ${props => props.theme.inputChecked ? '#4f8196' : '#ccc' };
  }

  &::after {
    position: absolute;
    content: '';
    top: 50%;
    left: 4px;
    transition: transform 0.2s ease-out;
    width: 8px;
    height: 3px;
    margin-top: -4px;
    border-style: solid;
    border-color: #fff;
    border-width: 0 0 3px 3px;
    transform: rotate(-45deg) scale(${props => props.theme.inputChecked ? '1' : '0'});
  }
`;

const Input = styled.input` ${visuallyHidden}; `;

export { Label, Input };
