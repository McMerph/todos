import CloudDoneIcon from "material-ui-icons/CloudDone";
import CloudDownloadIcon from "material-ui-icons/CloudDownload";
import * as React from "react";
import { retrieve } from "./api";
import {
  ButtonCircularProgress,
  FabCircularProgress,
  LeftButtonWrapper,
  RightButtonWrapper,
  StyledButton,
  Wrapper,
} from "./styled";

interface IState {
  loading: boolean;
  success: boolean;
}

export default class RetrieveButton extends React.Component<{}, IState> {

  private timer: number | undefined = undefined;

  public constructor(props: {}) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.state = {
      loading: false,
      success: false,
    };
  }

  public componentWillUnmount(): void {
    if (this.timer) {
      window.clearTimeout(this.timer);
    }
  }

  public render(): React.ReactNode {
    const { loading, success } = this.state;

    return (
      <Wrapper>
        <LeftButtonWrapper>
          <StyledButton
            variant="fab"
            color="primary"
            theme={{ success }}
            onClick={this.handleButtonClick}
          >
            {success ? <CloudDoneIcon/> : <CloudDownloadIcon/>}
          </StyledButton>
          {loading && <FabCircularProgress size={68}/>}
        </LeftButtonWrapper>
        <RightButtonWrapper>
          <StyledButton
            variant="raised"
            color="primary"
            fullWidth={true}
            theme={{ success }}
            disabled={loading}
            onClick={this.handleButtonClick}
          >
            Retrieve data from database
          </StyledButton>
          {loading && <ButtonCircularProgress size={24}/>}
        </RightButtonWrapper>
      </Wrapper>
    );
  }

  private handleButtonClick(): void {
    if (!this.state.loading) {
      this.setState({ loading: true, success: false });

      retrieve("http://localhost:48702/todos-webapi/?firstResult=0&maxResults=10")
        .then((response) => {
          console.log(response);
          this.setState({ loading: false, success: true });
        })
        .catch((error) => this.setState({ loading: false, success: true }));
    }
  }

}
