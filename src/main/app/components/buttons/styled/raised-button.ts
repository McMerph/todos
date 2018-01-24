import MaterialDesignButton from './material-design-button';

const darkerColor: string = '#0b76cc';

const RaisedButton = MaterialDesignButton.extend` 
  &:hover {
    box-shadow: 0 8px 6px -6px #878787;
  }

  &:focus {
    background: ${darkerColor};
  }

  &:active {
    box-shadow:
      0 8px 10px 1px rgba(0, 0, 0, 0.14),
      0 3px 14px 2px rgba(0, 0, 0, 0.12),
      0 5px 5px -3px rgba(0, 0, 0, 0.4);
  }

  @media only screen and (max-width: 900px) {
    box-shadow:
      0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 1px 5px 0 rgba(0, 0, 0, 0.12),
      0 3px 1px -2px rgba(0, 0, 0, 0.2);
  }
`;

export default RaisedButton;
