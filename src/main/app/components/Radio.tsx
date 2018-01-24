import * as React from 'react';
import styled, { keyframes, StyledFunction } from 'styled-components';
import { FONTS_STACK } from './constants';
import { visuallyHidden } from './common';

// TODO this radiobutton is not working!!!

const borderScaleAnimation = keyframes`
    to {
        box-shadow: 0 0 0 4px #4f8196;
    }
`;

const StyledLabel = (styled.label as StyledFunction<any>)`
    position: relative;
    padding-left: 25px;
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    font: normal 400 16px/1.5 ${FONTS_STACK.ROBOTO};
    word-wrap: break-word;
    display: block;
    outline: 0;
    
    &:hover, &:focus {
        box-shadow: 0 8px 6px -6px #878787;
    }
    
    &:hover::before, &:focus::before {
        background: ${props => props.inputChecked ? '#4f8196' : '#ccc' };
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
        animation: ${props => props.inputChecked ? borderScaleAnimation + ' 0.2s ease-in' : 'unset'};
        background: ${props => props.inputChecked ? '#4f8196' : 'transparent' };
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
        transform: rotate(-45deg) scale(${props => props.inputChecked ? '1' : '0'});
    }
`;

const StyledInput = styled.input`
    ${visuallyHidden};
`;

interface RadioProps {
  onClick: () => void;
  text: string;
  defaultChecked: boolean;
  name: string;
  value: string;
}

interface RadioState {
  labelHover: boolean;
  labelFocus: boolean;
  inputChecked: boolean;
}

export default class Radio extends React.PureComponent<RadioProps, RadioState> {

  public constructor(props: RadioProps) {
    super(props);
    this.state = {
      labelHover: false,
      labelFocus: false,
      inputChecked: props.defaultChecked
    };
  }

  public render(): React.ReactNode {
    return (
      <StyledLabel
        tabIndex={0}
        onMouseOver={() => this.setState({labelHover: true})}
        onMouseLeave={() => this.setState({labelHover: false})}
        labelHover={this.state.labelHover}
        labelFocus={this.state.labelFocus}
        inputChecked={this.state.inputChecked}
      >
        <StyledInput
          tabIndex={-1}
          name={this.props.name}
          type="radio"
          value={this.props.value}
          onFocus={() => this.setState({labelFocus: true})}
          onBlur={() => this.setState({labelFocus: false})}
          onChange={(event) => this.setState({inputChecked: event.target.checked})}
          onClick={() => this.props.onClick()}
          defaultChecked={this.props.defaultChecked}
        />
        {this.props.text}
      </StyledLabel>
    );
  }

}
