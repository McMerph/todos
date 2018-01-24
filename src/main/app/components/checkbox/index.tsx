import * as React from 'react';
import { Input, Label } from './styled';

interface CheckboxProps {
  onClick: () => void;
  text: string;
  defaultChecked: boolean;
}

interface CheckboxState {
  labelHover: boolean;
  labelFocus: boolean;
  inputChecked: boolean;
}

export default class Checkbox extends React.PureComponent<CheckboxProps, CheckboxState> {

  public constructor(props: CheckboxProps) {
    super(props);
    this.state = {
      labelHover: false,
      labelFocus: false,
      inputChecked: props.defaultChecked
    };
  }

  public render(): React.ReactNode {
    return (
      <Label
        tabIndex={0}
        onMouseOver={() => this.setState({labelHover: true})}
        onMouseLeave={() => this.setState({labelHover: false})}
      >
        <Input
          tabIndex={-1}
          type="checkbox"
          onFocus={() => this.setState({labelFocus: true})}
          onBlur={() => this.setState({labelFocus: false})}
          onChange={(event) => this.setState({inputChecked: event.target.checked})}
          onClick={() => this.props.onClick()}
          defaultChecked={this.props.defaultChecked}
        />
        {this.props.text}
      </Label>
    );
  }

}
