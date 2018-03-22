import CloudIcon from "material-ui-icons/Cloud";
import CloudDoneIcon from "material-ui-icons/CloudDone";
import CloudDownloadIcon from "material-ui-icons/CloudDownload";
import CloudOffIcon from "material-ui-icons/CloudOff";
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
  status: DatabaseStatus;
}

const iconsByStatus = new Map<DatabaseStatus, React.ReactNode>();
iconsByStatus.set(DatabaseStatus.Idle, <CloudIcon/>);
iconsByStatus.set(DatabaseStatus.Loading, <CloudDownloadIcon/>);
iconsByStatus.set(DatabaseStatus.Success, <CloudDoneIcon/>);
iconsByStatus.set(DatabaseStatus.Error, <CloudOffIcon/>);

function handleButtonClick(props: IProps): void {
  const { status, onRetrieve } = props;

  if (status !== DatabaseStatus.Loading) {
    onRetrieve();
  }
}

const RetrieveControl: React.SFC<IProps> = (props) => {
  const { status: status } = props;

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
          {iconsByStatus.get(status)}
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
          Retrieve data from database
        </StyledButton>
        {status === DatabaseStatus.Loading && <ButtonCircularProgress size={24}/>}
      </RightButtonWrapper>
    </Wrapper>
  );
};

export default RetrieveControl;
