import { useEffect, useState } from "react";
import  shuffleArray from "../utils/ShuffleFunction";
import Puzzle from "./Puzzle";
import Timer from "./Timer";

export default function Game() {
    const [shuffledArray, setShuffledArray] = useState(() => shuffleArray());
    const [moves, setMoves] = useState(0);
    const [time, setTime] = useState(0);
    const [timerActive, setTimerActive] = useState(false);
    const [win, setWin] = useState(false);

    const swapTiles = (array, index1, index2) => {
        if (
            index1 < 0 ||
            index2 < 0 ||
            index1 >= array.length ||
            index2 >= array.length ||
            index1 === index2
        )
            return array;

        const newArray = [...array];
        [newArray[index1], newArray[index2]] = [newArray[index2], newArray[index1]];
        return newArray;
    };

    useEffect(() => {
        if (moves === 1) setTimerActive(true);

        const won = shuffledArray.every((value, index) =>
            index === shuffledArray.length - 1 ? value === "" : value === index + 1
        );

        if (won) {
            setWin(true);
            setTimerActive(false);
        }
    }, [moves, shuffledArray]);

    const newGame = () => {
        setMoves(0);
        setTimerActive(false);
        setTime(0);
        setShuffledArray(shuffleArray()); 
        setWin(false);
    };

    const dragStart = (e) => e.dataTransfer.setData("tile", e.target.id);

    const dragOver = (e) => e.preventDefault();

    const dropped = (e) => {
        e.preventDefault();
        const tile = e.dataTransfer.getData("tile");
        const oldPlace = Number(document.getElementById(tile).parentElement.id.slice(6)) - 1;
        const newPlace = Number(e.target.id.slice(6)) - 1;

        if (!(Math.abs(oldPlace - newPlace) === 4 || Math.abs(oldPlace - newPlace) === 1)) return;

        const newShuffledArray = swapTiles(shuffledArray, oldPlace, newPlace);

        setShuffledArray(newShuffledArray);
        setMoves((prev) => prev + 1);
    };

    return (
        <div className="h-screen flex text-gray-300 bg-gray-950">
            <div className="mx-auto mt-8 max-w-md w-full px-4">
                {win && (
                    <div className="rounded-md border-l-4 border-green-500 bg-green-100 p-2 mb-4">
                        <p className="font-medium text-green-600 text-center">
                            HURRAY!! You have won the game 🎉
                        </p>
                    </div>
                )}

                <h3 className="text-xl font-bold text-center bg-clip-text text-transparent
                    bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 mb-6">
                    15 Puzzle Game
                </h3>

                <div className="flex justify-between px-6 mb-4 text-lg">
                    <p>Moves: {moves}</p>
                    <Timer time={time} timerActive={timerActive} setTime={setTime} />
                </div>

                <Puzzle
                    shuffledArray={shuffledArray}
                    dragStart={dragStart}
                    dragOver={dragOver}
                    dropped={dropped}
                />

                <div className="px-6 mt-6">
                    <button
                        onClick={newGame}
                        className="text-black font-bold w-full rounded p-3
                        bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500
                        hover:brightness-110 transition"
                    >
                        New Game
                    </button>
                </div>
            </div>
        </div>
    );
}
