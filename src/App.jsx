import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combination";

import './index.css';

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2',
};

const INITIAL_GAME_BOARD = [
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

// 95. 컴포넌트 개선
function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

// 95. 컴포넌트 개선
function deriveWinner(gameBoard, players) {
  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function App() {
  const [ players, setPlayers ] = useState(PLAYERS);
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
  // let gameBoard = [...initialGameBoard.map(array => [...array])];

  // for (const turn of gameTurns) {
  //   const { square, player } = turn;
  //   const { row, col } = square;

  //   gameBoard[row][col] = player;
  // }

  // 95. 컴포넌트 개선
  const gameBoard = deriveGameBoard(gameTurns);

  // 89, 90. 계산된 값에서 새로운 값 계산
  // let winner = null;

  // for (const combination of WINNING_COMBINATIONS) {
  //   const firstSquareSymbol =
  //     gameBoard[combination[0].row][combination[0].column];
  //   const secondSquareSymbol =
  //     gameBoard[combination[1].row][combination[1].column];
  //   const thirdSquareSymbol =
  //     gameBoard[combination[2].row][combination[2].column];

  //   if (firstSquareSymbol && 
  //     firstSquareSymbol === secondSquareSymbol && 
  //     firstSquareSymbol === thirdSquareSymbol
  //   ) {
  //     winner = players[firstSquareSymbol];
  //   }
  // }

  // 95. 컴포넌트 개선
  const winner = deriveWinner(gameBoard, players);

  const hasDraw = gameTurns.length === 9 && !winner;

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

  function handleRestart() {
    setGameTurns([]);
  }

  // 93. 플레이어 이름 변경
  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {/* 91. 게임오버 화면 구현 및 무승부 조건 구현 */}
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      {/* 85. 컴포넌트 간 상태(state) 공유 */}
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
