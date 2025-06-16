import { FilledTile, EmptyTile } from "./Tile";

export default function Puzzle({ shuffledArray, dragOver, dragStart, dropped }) {
    return (
        <div className="grid grid-cols-4 gap-4 mt-6 px-6 rounded">
            {shuffledArray.map((value, index) => {
                return value === "" ? (
                    <EmptyTile
                        key={index}
                        index={index}
                        dragOver={dragOver}
                        dropped={dropped}
                    />
                ) : (
                    <FilledTile 
                        key={index}
                        index={index}
                        value={value}
                        dragStart={dragStart}
                    />
                );
            })}
        </div>
    );
}
