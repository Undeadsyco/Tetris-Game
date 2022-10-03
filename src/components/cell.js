import { StyledCell } from "./styles/styledCell";
import { TETROMINOS } from "../tetrominos";

const Cell = ( props ) => {
  let { type } = props;

  return <StyledCell type={type} color={TETROMINOS[type].color} />;
};

export default Cell;