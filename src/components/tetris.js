import { useState } from "react";
import { createStage, checkCollision } from "../gameHelper";
// components
import Stage from "./stage";
import Display from "./display";
import StartBtn from "./startButton";
// styles
import { StyledTetrisWrapper, StyledTetris } from "./styles/styledTetris";
// hooks
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useInterval } from '../hooks/useInterval';
import { useGameStatus } from "../hooks/useGameStatus";

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, lvl, setLvl] = useGameStatus(rowsCleared);

  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0, collided: false });
    }
  }

  const startGame = () => {
    setStage(createStage());
    resetPlayer();
    setGameOver(false)
    setDropTime(1000);
    setScore(0);
    setRows(0);
    setLvl(0);
  }

  const drop = () => {
    //increase lvl
    if(rows >= (lvl+1)*10){
      setLvl(prev => prev + 1);
      //increase spead
      setDropTime(1000/(lvl+1)+200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      //Game Over
      if (player.pos.y < 1) {
        console.log("GAME OVER");
        setGameOver(true);
        setDropTime(null);
      }

      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  }

  const keyUp = ({ keyCode }) => {
    if(!gameOver) {
      if(keyCode === 40) {
        setDropTime(1000/(lvl+1)+200);
      }
    }
  }

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  }

  const move = ({ keyCode }) => {
    if (!gameOver) {
      switch (keyCode) {
        case 37:
          movePlayer(-1);
          break;
        case 39:
          movePlayer(1);
          break;
        case 40:
          dropPlayer();
          break;
        case 38:
          playerRotate(stage, 1);
          break;
        default:
          return null;
      }
    }
  }

  useInterval(() => {
    drop()
  }, dropTime)

  return (
    <StyledTetrisWrapper role='button' tabIndex="0" onKeyDown={e => move(e)} onKeyUp={keyUp}>
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text={`Score: ${parseInt(score)}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Lvl: ${lvl}`} />
            </div>
          )}
          <StartBtn callBack={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  )
}

export default Tetris