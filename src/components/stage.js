import Cell from "./cell";
import { StyledStage } from "./styles/styledStage";

const Stage = (props) => {
  let { stage } = props;

  return (
    <StyledStage width={stage[0].length} height={stage.length} >
      { stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} /> ))}  
    </StyledStage>
  );
}

export default Stage;