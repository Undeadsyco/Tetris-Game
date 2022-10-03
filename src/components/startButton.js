import { StyledBtn } from "./styles/styledBtn";

const StartBtn = (props) => {
  let { callBack } = props;

  return (
    <StyledBtn onClick={callBack} >Start Game</StyledBtn>
  );
};

export default StartBtn;