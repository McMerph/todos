import Button from "material-ui/Button";
import green from "material-ui/colors/green";
import red from "material-ui/colors/red";
import { CircularProgress } from "material-ui/Progress";
import { css } from "styled-components";
import DatabaseStatus from "../../../../model/DatabaseStatus";
import styled from "./styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  position: relative;
`;

const LeftButtonWrapper = ButtonWrapper.extend`
  margin: 8px 8px 8px 0;
`;

const RightButtonWrapper = ButtonWrapper.extend`
  margin: 8px 0 8px 8px;
  width: 100%;
`;

const StyledCircularProgress = styled(CircularProgress)`
  color: ${green[500]} !important;
  position: absolute;
`;

const FabCircularProgress = StyledCircularProgress.extend`
  top: -6px;
  left: -6px;
  z-index: 1;
`;

const ButtonCircularProgress = StyledCircularProgress.extend`
  top: 50%;
  left: 50%;
  margin-top: -12px;
  margin-left: -12px;
`;

const successButtonCss = css`
  background-color: ${green[500]} !important;

  &:hover {
    background-color: ${green[700]} !important;
  }
`;

const errorButtonCss = css`
  background-color: ${red[500]} !important;

  &:hover {
    background-color: ${red[700]} !important;
  }
`;

const StyledButton = styled(Button)`
  ${(props) => props.theme.status === DatabaseStatus.Success ? successButtonCss : ""}
  ${(props) => props.theme.status === DatabaseStatus.Error ? errorButtonCss : ""}
`;

export { Wrapper, LeftButtonWrapper, RightButtonWrapper, FabCircularProgress, ButtonCircularProgress, StyledButton };
