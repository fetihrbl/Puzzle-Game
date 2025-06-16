function isSolvable(array) {
    let inversionCount = 0;
    const flatArray = array.filter((val) => val !== "");

    for (let i = 0; i < flatArray.length - 1; i++) {
        for (let j = i + 1; j < flatArray.length; j++) {
            if (flatArray[i] > flatArray[j]) inversionCount++;
        }
    }

    return inversionCount % 2 === 0;
}

function shuffle(array) {
    const arr = [...array];
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export default function shuffleArray() {
    const baseArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ""];

    let shuffled;
    do {
        shuffled = shuffle(baseArray);
    } while (!isSolvable(shuffled))

    return shuffled;
}