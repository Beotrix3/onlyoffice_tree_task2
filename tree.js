const fs = require('fs');
const path = require('path');

/**
  @param {number} floorNum
  @param {number} totalFloors
  @returns {string}
 */
function createSymmetricalFloor(floorNum, totalFloors) {
    const maxWidth = 9 + (totalFloors - 1) * 4; // max length last floor
    const symbols = ['*', '@', "'"];
    
    let leftSymbol = '';
    let rightSymbol = '';
    if (floorNum === 1) {
        leftSymbol = '';
        rightSymbol = '';
    } else if (floorNum === 2) {
        leftSymbol = symbols[1] + symbols[2];
        rightSymbol = '';
    } else {
        leftSymbol = floorNum % 2 === 0 ? symbols[1] : '';
        rightSymbol = floorNum % 2 !== 0 ? symbols[1] : '';
    }
    
    const starsCount = 1 + (floorNum - 1) * 2;
    const stars = symbols[0].repeat(starsCount).split('').join(' ');
    
    // build floor
    let floor = leftSymbol + ' ' + stars;
    if (rightSymbol) {
        floor += ' ' + rightSymbol;
    }
    
    const padding = Math.floor((maxWidth - floor.length) / 2);
    return ' '.repeat(padding) + floor + ' '.repeat(padding);
}

/**
  @param {number} floors
  @param {string} outputPath
 */
function drawChristmasTree(floors, outputPath) {
    if (isNaN(floors) || floors < 1) {
        console.error('Ошибка: количество этажей должно быть положительным числом');
        return;
    }

    let tree = [];
    
    const maxWidth = 9 + (floors - 1) * 4;
    const topPadding = Math.floor((maxWidth - 1) / 2);
    tree.push(' '.repeat(topPadding) + 'W' + ' '.repeat(topPadding));
    
    // gener for floor
    for (let i = 1; i <= floors; i++) {
        tree.push(createSymmetricalFloor(i, floors));
    }
    
    const trunkPadding = Math.floor((maxWidth - 5) / 2);
    tree.push(' '.repeat(trunkPadding) + 'TTTTT' + ' '.repeat(trunkPadding));
    tree.push(' '.repeat(trunkPadding) + 'TTTTT' + ' '.repeat(trunkPadding));
    
    // save
    try {
        const fullPath = path.resolve(process.cwd(), outputPath);
        fs.writeFileSync(fullPath, tree.join('\n'));
        console.log(`Ёлка с ${floors} этажами успешно сохранена в файл: ${fullPath}`);
    } catch (err) {
        console.error('Ошибка при сохранении файла:', err.message);
    }
}

// test
function main() {
    let floors = 5;
    let outputFile = 'tree.txt';

    const args = process.argv.slice(2);
    if (args.length >= 1) {
        floors = parseInt(args[0]) || floors;
    }
    if (args.length >= 2) {
        outputFile = args[1];
    }

    console.log('Генератор ёлки');
    console.log(`Количество этажей: ${floors}`);
    console.log(`Выходной файл: ${outputFile}`);
    
    drawChristmasTree(floors, outputFile);
}

main();