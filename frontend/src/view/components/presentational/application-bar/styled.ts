import CloudDoneIcon from "material-ui-icons/CloudDone";
import CloudOffIcon from "material-ui-icons/CloudOff";
import { CircularProgress } from "material-ui/Progress";
import styled, { css } from "styled-components";

const rightAlign = css` margin-left: auto; `;

const StyledCircularProgress = styled(CircularProgress)` ${rightAlign} `;
const StyledCloudDoneIcon = styled(CloudDoneIcon)` ${rightAlign} `;
const StyledCloudOffIcon = styled(CloudOffIcon)` ${rightAlign} `;

export { StyledCircularProgress, StyledCloudDoneIcon, StyledCloudOffIcon };
