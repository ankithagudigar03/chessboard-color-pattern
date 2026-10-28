
import "../styles/Chessboard.scss";
import { Chess } from "chess.js";
import { useState } from "react";

function Chessboard() {
  const [game, setGame] = useState(new Chess());
  const [selectedSquare, setSelectedSquare] = useState(null);

  const squares = [];

  const pieceImages = {
    r: { w: "09_rook_light.gif", b: "10_rook_dark.gif" },
    n: { w: "07_knight_light.gif", b: "08_knight_dark.gif" },
    b: { w: "05_bishop_light.gif", b: "06_bishop_dark.gif" },
    q: { w: "03_queen_light.gif", b: "04_queen_dark.gif" },
    k: { w: "01_king_light.gif", b: "02_king_dark.gif" },
    p: { w: "11_pawn_light.gif", b: "12_pawn_dark.gif" },
  };


  
function handleSquareClick(squareName) {
  if (selectedSquare === null) {
    const piece = game.get(squareName);

    if (piece && piece.color === game.turn()) {
      setSelectedSquare(squareName);
    }

    return;
  }

  try {
    const updatedGame = new Chess(game.fen());

    updatedGame.move({
      from: selectedSquare,
      to: squareName,
    });

    setGame(updatedGame);
    setSelectedSquare(null);
  } catch {
    const piece = game.get(squareName);

    if (piece && piece.color === game.turn()) {
      setSelectedSquare(squareName);
    } else {
      setSelectedSquare(null);
    }
  }
}


  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const squareName =
        String.fromCharCode(97 + col) + (8 - row);

      const chessPiece = game.get(squareName);

      let image = "";
      let pieceColor = "";

      if (chessPiece) {
        image = pieceImages[chessPiece.type][chessPiece.color];
        pieceColor =
          chessPiece.color === "w" ? "white-piece" : "black-piece";
      }

      squares.push(
        <div
          key={squareName}
          data-square={squareName}
          onClick={() => handleSquareClick(squareName)}
          className={`square ${
            (row + col) % 2 === 0 ? "light" : "dark"
          } ${selectedSquare === squareName ? "selected" : ""}`}
        >
          {image && (
            <img
              src={`/${image}`}
              alt={`${pieceColor} ${chessPiece.type}`}
              className={`piece ${pieceColor}`}
              draggable={false}
            />
          )}
        </div>
      );
    }
  }

 
return (
  <div className="game-container">
    <h2>
      {game.isCheckmate()
        ? `Checkmate! ${game.turn() === "w" ? "Black" : "White"} wins!`
        : game.isDraw()
        ? "Game drawn!"
        : game.isCheck()
        ? `${game.turn() === "w" ? "White" : "Black"} is in check!`
        : `${game.turn() === "w" ? "White" : "Black"}'s turn`}
    </h2>

    <div className="chessboard">{squares}</div>
  </div>
);

}

export default Chessboard;
