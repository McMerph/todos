import { FONTS_STACK } from '../../constants';
import styled from 'styled-components';

const color: string = '#2196f3';

const MaterialDesignButton = styled.button`
  font: normal 500 14px/1.42857143 ${FONTS_STACK.ROBOTO};
  min-height: 36px;
  min-width: 88px;
  padding: 6px 16px;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  user-select: none;
  border: 0;
  border-radius: 2px;
  background: ${color};
  color: #fff;
  outline: 0;
  transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
`;

export default MaterialDesignButton;
