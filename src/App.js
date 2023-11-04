import * as React from "react";
import { Button, useToast } from "@chakra-ui/react";
import { color } from "framer-motion";

function Board() {
  const [squares, setSquares] = React.useState(Array(9).fill(null));
  const toast = useToast();
  function selectSquare(square) {
    const newSquares = [...squares];
    if (calculateWinner(newSquares) || newSquares[square]) {
      return;
    }
    newSquares[square] = calculateNextValue(squares);
    setSquares(newSquares);

    const winner = calculateWinner(newSquares);
    if(winner !== null){
      notification(calculateWinner(newSquares));
    }
  }

  function restart() {
    setSquares(Array(9).fill(null));
  }

  function notification(winner) {
    toast({
      title: `${winner} is the winner!`,
      description: "You won the game.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  }

  function renderSquare(i) {
    return (
      <Button
        className="m-1"
        w="7rem"
        h="7rem"
        fontSize="6xl"
        _hover={{ bg: "gray.300" }}
        onClick={() => {
          const result = selectSquare(i);
          const X = result === "X";
          if (X) {
            color = "red";
          }
        }}
        style={{ color: squares[i] === "X" ? "#D80032" : "#3E6D9C" }}
      >
        {squares[i]}
      </Button>
    );
  }

  const status = calculateStatus(
    calculateWinner(squares),
    squares,
    calculateNextValue(squares)
  );


  return (
    <div className="">
      <div className="flex justify-center text-5xl mt-3 font-bold">
        Tic Tac Toe
      </div>
      <div className="flex justify-center mt-1 text-xl mb-3">{status}</div>
      <div className="flex justify-center">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="flex justify-center">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="flex justify-center">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div className="flex justify-center mt-5">
        <Button
          colorScheme="red"
          w="10rem"
          h="4rem"
          fontSize="2xl"
          onClick={restart}
          className=""
        >
          restart
        </Button>
      </div>
    </div>
  );
}

function Game() {
  return (
    <div>
      <div>
        <Board />
      </div>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner : ${winner}`
    : squares.every(Boolean)
    ? `Scratch : Cat's game`
    : `Next player : ${nextValue}`;
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? "X" : "O";
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return <Game />;
}

export default App;
