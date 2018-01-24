import * as React from 'react';
import Coordinates from './coordinates';
import StyledRippleButton from './styled/styled-tipple-button';
import Ripple from './ripple';

export enum ButtonType { Button = 'button', Submit = 'submit' }

// TODO Change text to props.children?
interface RippleButtonProps {
  className?: string;
  text: string;
  buttonType: ButtonType;
}

interface RippleButtonState {
  clicks: Coordinates[];
}

export default class RippleButton extends React.PureComponent<RippleButtonProps, RippleButtonState> {

  private button: HTMLButtonElement;

  private animationEndCounter: number = 0;
  private offsetWidth: number;
  private offsetHeight: number;

  public constructor(props: RippleButtonProps) {
    super(props);
    this.state = {clicks: []};
    this.onAnimationEnd = this.onAnimationEnd.bind(this);
  }

  public componentDidMount(): void {
    this.offsetWidth = this.button.offsetWidth;
    this.offsetHeight = this.button.offsetHeight;
  }

  public render(): React.ReactNode {
    return (
      <StyledRippleButton
        className={this.props.className}
        onClick={event => this.handleClick(event)}
        innerRef={button => this.button = button}
        type={this.props.buttonType}
      >
        {this.props.text}
        {(this.state.clicks.length > 0) && (
          <React.Fragment>
            {this.state.clicks.map((click, index) =>
              (
                <Ripple
                  coordinates={{x: click.x, y: click.y}}
                  rect={this.button.getBoundingClientRect()}
                  offsetWidth={this.offsetWidth}
                  offsetHeight={this.offsetHeight}
                  onAnimationEnd={this.onAnimationEnd}
                  key={index}
                />
              ))
            }
          </React.Fragment>
        )}
      </StyledRippleButton>
    );
  }

  private onAnimationEnd(): void {
    this.animationEndCounter++;
    if (this.animationEndCounter === this.state.clicks.length) {
      this.animationEndCounter = 0;
      this.setState({clicks: []});
    }
  }

  private handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const x: number = event.pageX;
    const y: number = event.pageY;
    this.setState((prevState) => ({clicks: [...prevState.clicks, {x, y}]}));
  }

}
