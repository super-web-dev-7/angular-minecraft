import {exposeAllMines, exposeAllAdjustCells} from '../../helpers/cells-exposer';
import {createCells, generateMinePlaces} from '../../helpers/cells-creator';
import {getSubset} from '../../helpers/cells-reducer'
import {cellType} from '../../helpers/game-contants';

it('mines exposer will expose all mines', () => {
    let minePlaces = generateMinePlaces({height:10,width:12,numOfMines: 20});
    let cells = createCells({height:10,width:12,minePlaces:minePlaces});
    exposeAllMines(cells, minePlaces);
    cells.forEach((row) => {
        row.forEach((cell) => {
        if(cell.type === cellType.MINE)
            expect(cell.isOpen).toEqual(true);
        else
            expect(cell.isOpen).toEqual(false);
        });
    });
});

it('adjust exposer will expose all cells when no mines', () => {
    let cells = createCells({height:8,width:10,minePlaces:[]});
    exposeAllAdjustCells(cells, 5, 5);
    cells.forEach((row) => {
        row.forEach((cell) => {
        expect(cell.isOpen).toEqual(true);
        });
    });
});

it('adjust exposer will expose all cells when one mines', () => {
    let cells = createCells({height:8,width:10,minePlaces:[{row: 0, col: 0}]});
    exposeAllAdjustCells(cells, 5, 5);
    cells.forEach((row) => {
        row.forEach((cell) => {
            if(cell.type !== cellType.MINE)
                expect(cell.isOpen).toEqual(true);
            else 
                expect(cell.isOpen).toEqual(false);
        });
    });
});

it('reducer will return all the cells when size is bigger', () => {
    let cells = createCells({height:8,width:8,minePlaces:[]});
    let subCells = getSubset(cells, 0, 0, 12, 16);
    expect(cells.length).toEqual(subCells.length);
    expect(cells[0].length).toEqual(subCells[0].length);
    for(let i=0; i<cells.length; i++) {
        for(let j=0; j<cells[i].length; j++) {
            expect(cells[j][i].key).toEqual(subCells[j][i].key);
        }
    }
});

