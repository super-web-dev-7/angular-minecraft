import {createCells, generateMinePlaces} from '../../helpers/cells-creator';
import {cellType} from '../../helpers/game-contants';

it('create empty cells matrix', () => {
    let cells = createCells({height:0,width:0,minePlaces:[]});
    expect(cells).not.toBeNull();
    expect(cells).not.toBeUndefined();
    expect(cells.length).toEqual(0);
});
it('create cells matrix with null params', () => {
    let cells = createCells({height:null,width:null,minePlaces:null});
    expect(cells).not.toBeNull();
    expect(cells).not.toBeUndefined();
    expect(cells.length).toEqual(0);
});
it('create 1X1 matrix and check cell structure', () => {
    let cells = createCells({height:1,width:1,minePlaces:[]});
    expect(cells.length).toEqual(1);
    expect(cells[0].length).toEqual(1);
    const {key, row, col, type, value, isOpen, isFlagged} = cells[0][0];
    expect(key).toEqual(0);
    expect(row).toEqual(0);
    expect(col).toEqual(0);
    expect(type).toEqual(cellType.EMPTY);
    expect(value).toBeNull();
    expect(isOpen).toEqual(false);
    expect(isFlagged).toEqual(false);
});
it('create 1X1 matrix with mine', () => {
    let cells = createCells({height:1,width:1,minePlaces:[{row: 0,col: 0}]});
    expect(cells.length).toEqual(1);
    expect(cells[0].length).toEqual(1);
    expect(cells[0][0].type).toEqual(cellType.MINE);
});
it('create 3X3 matrix with mine inside', () => {
    let cells = createCells({height:3,width:3,minePlaces:[{row: 1,col: 1}]});
    expect(cells.length).toEqual(3);
    expect(cells[0].length).toEqual(3);
    for(let i=0;i<=2;i++) {
        for(let j=0; j<=2;j++){
            if(i === j & i === 1)
                continue;
            expect(cells[i][j].type).toEqual(cellType.NUMBER);
            expect(cells[i][j].value).toEqual(1);
        }
    }
});
it('create 3X3 matrix with 8 mines', () => {
    let minePlaces = [];
    for(let i=0;i<=2;i++) {
        for(let j=0; j<=2;j++){
            if(i === j & i === 1)
                continue;
            minePlaces.push({row: i, col: j});
        }
    }
    let cells = createCells({height:3,width:3,minePlaces:minePlaces});
    expect(cells.length).toEqual(3);
    expect(cells[0].length).toEqual(3);
    for(let i=0;i<=2;i++) {
        for(let j=0; j<=2;j++){
            if(i === j & i === 1) {
                expect(cells[i][j].type).toEqual(cellType.NUMBER);
                expect(cells[i][j].value).toEqual(8);
            } else {
                expect(cells[i][j].type).toEqual(cellType.MINE);
            }
        }
    }
});
it('check keys of cells in large matrix', () => {
    let cells = createCells({height:140,width:170,minePlaces:[]});
    let key = 0;
    for(let i = 0; i<140;i++) {
        for(let j=0;j<170;j++) {
            expect(cells[i][j].key).toEqual(key++);
        }
    }
});
it('create large matrix full of mines and check all unique places', () => {
    let minePlaces = generateMinePlaces({height:50,width:50,numOfMines: 2500});
    expect(minePlaces.length).toEqual(2500);
    let cells = createCells({height:50, width:50, minePlaces:minePlaces});
    for(let i = 0; i<50;i++) {
        for(let j=0;j<50;j++) {
            expect(cells[i][j].type).toEqual(cellType.MINE);
        }
    }
});