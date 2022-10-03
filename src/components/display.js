import { StyledDisplay } from "./styles/styledDisplay";

const Display = (props) => {
  let { gameOver, text } = props;

  return (
    <StyledDisplay gameOver={gameOver} >{text}</StyledDisplay>
  )
}

export default Display;