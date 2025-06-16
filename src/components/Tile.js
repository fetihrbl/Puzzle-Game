

export function FilledTile({ index, value, dragStart }) {
    const isCorrectPosition = index === value -1;

    return (
        <div
        id={`place-${index + 1}`}
        className={`shadow w-20 h-20 rounded flex items-center justify-center transition-colors ${
          isCorrectPosition
            ? "bg-gradient-to-r from-pink-500 to-yellow-500"
            : "bg-gray-800"
        }`}
        role="gridcell"
        aria-label={`Tile ${value}`}
      >
        <p
          id={`tile-${value}`}
          draggable="true"
          onDragStart={dragStart}
          className="text-xl font-bold w-full h-full rounded grid place-items-center cursor-move hover:bg-gray-700 transition"
          tabIndex={0}
          role="button"
          aria-grabbed="false"
        >
          {value}
        </p>
      </div>
    )
}

export function EmptyTile({ dragOver, dropped, index }) {
    return (
        <div
          id={`place-${index + 1}`}
          onDragOver={dragOver}
          onDrop={dropped}
          className="bg-gray-700 shadow w-20 h-20 rounded border-2 border-dashed border-gray-400 transition"
          role="gridcell"
          aria-label="Empty tile"
        ></div>
      );
}