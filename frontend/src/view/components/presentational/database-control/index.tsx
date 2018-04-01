import CloudDoneIcon from "material-ui-icons/CloudDone";
import CloudDownloadIcon from "material-ui-icons/CloudDownload";
import CloudOffIcon from "material-ui-icons/CloudOff";
import CloudUploadIcon from "material-ui-icons/CloudUpload";
import * as React from "react";
import DatabaseStatus from "../../../../model/DatabaseStatus";
import {
  ButtonCircularProgress,
  FabCircularProgress,
  LeftButtonWrapper,
  RightButtonWrapper,
  StyledButton,
  Wrapper,
} from "./styled";

interface IProps {
  onRetrieve: () => void;
  type: Type;
  status: DatabaseStatus;
  text: string;
}

enum Type { Download, Upload }

function handleButtonClick(props: IProps): void {
  const { status, onRetrieve } = props;

  if (status !== DatabaseStatus.Loading) {
    onRetrieve();
  }
}

function getIcon(props: IProps): React.ReactNode {
  let Icon = props.type === Type.Download ? <CloudDownloadIcon/> : <CloudUploadIcon/>;
  if (props.status === DatabaseStatus.Success) {
    Icon = <CloudDoneIcon/>;
  } else if (props.status === DatabaseStatus.Error) {
    Icon = <CloudOffIcon/>;
  }

  return Icon;
}

const DatabaseControl: React.SFC<IProps> = (props) => {
  const { status, text } = props;

  return (
    <Wrapper>
      <LeftButtonWrapper>
        <StyledButton
          variant="fab"
          color="primary"
          theme={{ status }}
          // tslint:disable-next-line jsx-no-lambda
          onClick={() => handleButtonClick(props)}
        >
          {getIcon(props)}
        </StyledButton>
        {status === DatabaseStatus.Loading && <FabCircularProgress size={68}/>}
      </LeftButtonWrapper>
      <RightButtonWrapper>
        <StyledButton
          variant="raised"
          color="primary"
          fullWidth={true}
          theme={{ status }}
          disabled={status === DatabaseStatus.Loading}
          // tslint:disable-next-line jsx-no-lambda
          onClick={() => handleButtonClick(props)}
        >
          {text}
        </StyledButton>
        {status === DatabaseStatus.Loading && <ButtonCircularProgress size={24}/>}
      </RightButtonWrapper>
    </Wrapper>
  );
};

export default DatabaseControl;

export { Type };
