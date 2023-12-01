import { useState } from "react";

import "./App.css";

const TURNS = {
  X: "x",
  O: "0",
};
const Square = ({ children,isSelected, updateBoard, index })=> {
  const className =`square ${isSelected ? 'is-selected': ''}`
  const handleClick=()=>{
    updateBoard(index)
  }
  return (
  <div onClick={handleClick} className={className}>
    {children}
  </div>)
}


const WINNER_COMBOS= [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [6,4,2]
]

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  
  const [turn, setTurn] = useState(TURNS.X)

  const [winner,setWinner]= useState(null)
  
  const checkWinner = (boardTocheck)=>{
    for (const combo of WINNER_COMBOS){
      const [a,b,c] = combo
      if (boardTocheck[a]&&
        boardTocheck[a]===boardTocheck[b]
        && boardTocheck[a]===boardTocheck[c]
        ){return boardTocheck[a]}
    }
    return null
  }
  
  const resetGame=()=>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }
  
  
  const updateBoard=(index)=>{
    if (board[index]|| winner) return

    const newBoard = [...board]
    newBoard[index]=turn
    setBoard(newBoard)

    const newTurn=turn=== TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)

    if(newWinner){
      alert(`El ganador es ${newWinner}`)
      setWinner(newWinner)
    }
  }

  return (
    <main className="board">
      <h1>X-0</h1>



      <section className="game">
        {
        board.map((square, index) => {
          return(
          <Square 
            key={index} 
            index={index}
            updateBoard={updateBoard}>
              {square}
            </Square>
            )
        })
        }
      </section>





      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      {
        winner !== null && (
          <section className="winner">
            <h1>{
              winner===false
              ? 'Empate'
              : 'Ganó: ' 
            }</h1>
            <header className="win">
              {winner && <Square>{winner}</Square>}
              <footer>
                <button onClick={resetGame}>empezar de nuevo</button>
              </footer>
            </header>
          </section>
        )
      }
    </main>
  );
}

export default App;
