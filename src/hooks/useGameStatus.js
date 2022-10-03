import { useState, useEffect, useCallback } from "react";

export const useGameStatus = rowsCleared => {
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [lvl, setLvl] = useState(0);

  const calcScore = useCallback(() => {
    const linePoints = [40, 100, 300, 1200];

    //chick if rows cleared
    if(rowsCleared > 0) {
      setScore(prev => prev + linePoints[rowsCleared - 1] * (lvl + 1));
      setRows(prev => prev + rowsCleared);
    }
  }, [lvl, rowsCleared]);

  useEffect(() => {
    calcScore()
    console.log(score)
  }, [calcScore, rowsCleared, score]);

  return [score, setScore, rows, setRows, lvl, setLvl];
}