'use strict';
const puzzle = document.getElementById("puzzle");

// タイルの初期配置(ランダムにしたい場合はシャッフル)
let tiles = [...Array(8).keys()].map(n => n + 1); // 1~8
tiles.push(null); // 空きマス

function createTiles() {
    puzzle.innerHTML = "";
    tiles.forEach((num, i) => {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        if (num === null) {
            tile.classList.add("empty");
        } else {
            const row = Math.floor((num - 1) / 3);
            const col = (num - 1) % 3;
            tile.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;
            tile.addEventListener("click", () => moveTile(i));
        }
        puzzle.appendChild(tile);
    });
}

function moveTile(index) {
    const emptyIndex = tiles.indexOf(null);
    const validMoves = [
        emptyIndex - 3, // 上
        emptyIndex + 3, // 下
        (emptyIndex % 3 !== 0) ? emptyIndex - 1 : -1, // 左
        (emptyIndex % 3 !== 2) ? emptyIndex + 1 : +1 // 右
    ];
    if (validMoves.includes(index)) {
        [tiles[emptyIndex], tiles[index]] = [tiles[index], tiles[emptyIndex]];
        createTiles();
        checkWin();
        checkSolved();
    }
}
function isPuzzleSolved() {
    for (let i = 0; i < tiles.length - 1; i++) {
        if (tiles[i] !== i) return false;
    }
    return true;
}

function checkSolved() {
    if (isPuzzleSolved()) {
        showCompleteImage();
        showChoiceButtons();
    }
}

function showCompleteImage() {
    document.getElementById("puzzle").style.display = "none";
    document.getElementById("completeImage").classList.remove("hidden");
}

function showChoiceButtons() {
    document.getElementById("choices").classList.remove("hidden");
}

function restartGame() {
    // シャッフルや初期化処理
    location.reload(); // 簡単な方法:ページ再読込
}

function endGame() {
    document.body.innerHTML = "<h2>遊んでくれてありがとう！</h2>";
}

function checkWin() {
    const correct = [...Array(8).keys()].map(n => n + 1).concat(null);
    if (tiles.join() === correct.join()) {
        showCompleteImage();
        showChoiceButtons();
        document.getElementById("shuffleBtn").style.display = "none";
        setTimeout(() => alert("完成!"), 100);
    }
}

function shuffleTiles() {
    let count = 100; // 100回有効な移動をランダムに
    for (let i = 0; i < count; i++) {
        const emptyIndex = tiles.indexOf(null);
        const neighbors = [];
        const moves = [
            emptyIndex - 3,
            emptyIndex + 3,
            (emptyIndex % 3 !== 0) ? emptyIndex - 1 : -1,
            (emptyIndex % 3 !== 2) ? emptyIndex + 1 : -1
        ];
        for (let m of moves) {
            const emptyIndex = tiles.indexOf(null);
            const neighbors = [];
            const moves = [
                emptyIndex - 3,
                emptyIndex + 3,
                (emptyIndex % 3 !== 0) ? emptyIndex - 1 : -1,
                (emptyIndex % 3 !== 2) ? emptyIndex + 1 : -1
            ];
            for (let m of moves) {
                if (m >= 0 && m < 9) neighbors.push(m);
            }
            const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
            [tiles[emptyIndex], tiles[randomNeighbor]] = [tiles[randomNeighbor], tiles[emptyIndex]];
        }
        createTiles();
    }
}
createTiles();