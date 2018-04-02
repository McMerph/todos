import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import * as React from "react";
import ServerStatus from "../../../../model/ServerStatus";
import { StyledCircularProgress, StyledCloudDoneIcon, StyledCloudOffIcon } from "./styled";

interface IProps {
  serverStatus: ServerStatus;
}

const ApplicationBar: React.SFC<IProps> = (props) => {
  const { serverStatus } = props;

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="title" color="inherit">
          Todo's app
        </Typography>
        {serverStatus === ServerStatus.Loading && <StyledCircularProgress color="secondary" thickness={7}/>}
        {serverStatus === ServerStatus.Success && <StyledCloudDoneIcon/>}
        {serverStatus === ServerStatus.Error && <StyledCloudOffIcon/>}
      </Toolbar>
    </AppBar>
  );
};

export default ApplicationBar;
