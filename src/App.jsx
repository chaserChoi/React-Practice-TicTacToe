import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";

import './index.css';

function App() {
  const [ gameTurns, setGameTurns ] = useState([]);
  // 81. Lifting State Up (State(상태) 끌어올리기)
  // 현재 진행 중인 플레이어 제어
  // 'X' 기호에 할당된 플레이어가 첫 번째 플레이어가 되도록 초기화
  // setActivePlayer 함수를 사용하여 플레이어를 변경
  const [ activePlayer, setActivePlayer ] = useState('X');

  // 차례가 바뀔 때마다 플레이어 변경 함수
  function handleSelectSquare(rowIndex, colIndex) {
    setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns(prevTurns => {
      let currentPlayer = 'X';

      if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
        currentPlayer = 'O';
      }

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: activePlayer },
         ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} />
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} />
        </ol>
        <GameBoard 
          onSelectSquare={handleSelectSquare} 
          turns={gameTurns}
        />
      </div>
      {/* 85. 컴포넌트 간 상태(state) 공유 */}
      <Log 
        turns={gameTurns}
      />
    </main>
  );
}

export default App;
