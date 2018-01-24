import * as React from 'react';
import Coordinates from './coordinates';
import StyledRipple from './styled/styled-ripple';

interface RippleProps {
  rect: ClientRect;
  offsetWidth: number;
  offsetHeight: number;
  coordinates: Coordinates;

  onAnimationEnd(): void;
}

export default class Ripple extends React.PureComponent<RippleProps, {}> {

  private static readonly ANIMATION_DURATION: number = 750;

  private readonly ripplePositionX: number;
  private readonly ripplePositionY: number;
  private readonly radius: number;

  private ripple: HTMLElement;

  public constructor(props: RippleProps) {
    super(props);

    const center: Coordinates = this.getCenterCoordinates();
    this.radius = Math.max(this.props.offsetWidth, this.props.offsetHeight);
    this.ripplePositionX = Ripple.adjustCoordinateByRadius(center.x, this.radius);
    this.ripplePositionY = Ripple.adjustCoordinateByRadius(center.y, this.radius);
  }

  private static adjustCoordinateByRadius(coordinate: number, radius: number): number {
    return coordinate - radius / 2;
  }

  public componentDidMount(): void {
    this.ripple.addEventListener('animationend', this.props.onAnimationEnd);
  }

  public componentWillUnmount(): void {
    this.ripple.removeEventListener('animationend', this.props.onAnimationEnd);
  }

  public render(): React.ReactNode {
    return (
      <StyledRipple
        innerRef={(ripple) => this.ripple = ripple}
        time={Ripple.ANIMATION_DURATION}
        x={this.ripplePositionX}
        y={this.ripplePositionY}
        radius={this.radius}
      />
    );
  }

  private getCenterCoordinates(): Coordinates {
    let rippleCoordinates: Coordinates;
    if (this.isCenteredRipple()) {
      rippleCoordinates = this.getCenteredRipple();
    } else {
      rippleCoordinates = this.getClickedRipple();
    }

    return rippleCoordinates;
  }

  private getCenteredRipple(): Coordinates {
    const {offsetWidth, offsetHeight} = this.props;
    return {
      x: offsetWidth / 2,
      y: offsetHeight / 2
    };
  }

  private getClickedRipple(): Coordinates {
    const {coordinates, rect} = this.props;
    return {
      x: coordinates.x - rect.left,
      y: coordinates.y - rect.top - window.scrollY
    };
  }

  private isCenteredRipple(): boolean {
    return this.props.coordinates.x === 0 && this.props.coordinates.y === 0;
  }

}
