import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combination";

import './index.css';

const initialGameBoard = [
    [null, null, null],
    [null, null, null], 
    [null, null, null],
];

// 86. State(상태) 관리 간소화 및 불필요한 State(상태) 분별
function deriveActivePlayer(gameTurns) {
    let currentPlayer = "X";

    if (gameTurns.length > 0 && gameTurns[0].player === "X") {
      currentPlayer = "O";
    }

    return currentPlayer;
}

function App() {
  const [ gameTurns, setGameTurns ] = useState([]);
  // 89. 계산된 값 끌어올리기
  // 밑의 코드는 동일한 내용(gameTurns)을 반복하기 때문에 불필요함
  // const [ hasWinner, setHasWinner ] = useState(false);
  
  // 81. Lifting State Up (State(상태) 끌어올리기)
  // 현재 진행 중인 플레이어 제어
  // 'X' 기호에 할당된 플레이어가 첫 번째 플레이어가 되도록 초기화
  // setActivePlayer 함수를 사용하여 플레이어를 변경
  // const [ activePlayer, setActivePlayer ] = useState('X');

  const activePlayer = deriveActivePlayer(gameTurns);

  // 89. 계산된 값 끌어올리기
  //GameBoard 컴포넌트에서 코드를 가져옴
  let gameBoard = initialGameBoard;

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  let winner = null;

  // 89, 90. 계산된 값에서 새로운 값 계산
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && 
      firstSquareSymbol === secondSquareSymbol && 
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol;
    }
  }

  // 차례가 바뀔 때마다 플레이어 변경 함수
  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns(prevTurns => {
      // let currentPlayer = 'X';

      // if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
      //   currentPlayer = 'O';
      // }
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
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
        {winner && <p>You won, {winner}!</p>}
        <GameBoard 
          onSelectSquare={handleSelectSquare} 
          board={gameBoard}
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
