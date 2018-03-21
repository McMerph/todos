import Button from "material-ui/Button";
import green from "material-ui/colors/green";
import { CircularProgress } from "material-ui/Progress";
import { css } from "styled-components";
import styled from "./styled-components";

const color = green[500];

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
  color: ${color} !important;
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
  background-color: ${color} !important;

  &:hover {
    background-color: ${green[700]} !important;
  }
`;

const StyledButton = styled(Button)`
  ${(props) => props.theme.success ? successButtonCss : ""}
`;

export { Wrapper, LeftButtonWrapper, RightButtonWrapper, FabCircularProgress, ButtonCircularProgress, StyledButton };
