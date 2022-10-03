import { useCallback, useState } from 'react'
import { checkCollision, STAGE_WIDTH } from '../gameHelper';

import { TETROMINOS, randomTetromino } from '../tetrominos'

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false
  });

  const rotate = (matrix, dir) => {
    //make rows into cols
    const rotateTetro = matrix.map((_, index) => 
      matrix.map(col => col[index])
    );

    //reverse row
    if(dir > 0) return rotateTetro.map(row => row.reverse());
    return rotateTetro.reverse();
  }

  const playerRotate = (stage, dir) => {
    const clonedplayer = JSON.parse(JSON.stringify(player));
    clonedplayer.tetromino = rotate(clonedplayer.tetromino, dir);

    const pos = clonedplayer.pos.x;
    let offset = 1;
    while(checkCollision(clonedplayer, stage, {x: 0, y: 0})){
      clonedplayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if(offset > clonedplayer.tetromino[0].length){
        rotate(clonedplayer.tetromino, -dir);
        clonedplayer.pos.x = pos;
        return;
      }
    }

    setPlayer(clonedplayer);
  }

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer(prev => ({
      ...prev,
      pos: {
        x: (prev.pos.x + x),
        y: (prev.pos.y + y)
      },
      collided,
    }))
  }

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH/2 - 2, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false
    })
  }, [])

  return [player, updatePlayerPos, resetPlayer, playerRotate];
}