import * as React from 'react';
import { Input, Label } from './styled';

interface TextFieldProps {
  caption: string;
  setInput: (input: HTMLInputElement) => void;
}

interface TextFieldState {
  whirling: boolean;
}

export default class TextField
  extends React.PureComponent<TextFieldProps, TextFieldState> {

  private static readonly animationDuration: string = '0.2s';

  private input: HTMLInputElement;

  public constructor(props: TextFieldProps) {
    super(props);
    this.state = {whirling: false};
  }

  public componentDidMount(): void {
    this.props.setInput(this.input);
  }

  public render(): React.ReactNode {
    return (
      <Label
        whirling={this.state.whirling}
        caption={this.props.caption}
        animationDuration={TextField.animationDuration}
      >
        <Input
          innerRef={input => this.input = input}
          onFocus={() => this.setState({whirling: true})}
          onBlur={() => {
            if (this.input.value.length === 0) {
              this.setState({whirling: false});
            }
          }}
          type="text"
        />
      </Label>
    );
  }

}
