import { UI } from "../../sys/UI";
import { bind } from "../../sys/Corelib";
export declare namespace Material {
    class HeavyTable<T> extends UI.ListAdapter<T, any> {
        private cols;
        visibleCols: number[];
        private Controller;
        constructor(cols: UI.help.IColumnTableDef[]);
        initialize(): void;
        protected OnCompileEnd(cnt: bind.Controller): void;
        setName(name: string, dom: HTMLElement, cnt: UI.JControl, e: bind.IJobScop): void;
        private endEdit(save);
        private beginEdit();
        edit(currentElement: HTMLTableDataCellElement): boolean;
        readonly EOF: boolean;
        OnKeyDown(e: KeyboardEvent): boolean;
        _x: number;
        _y: number;
        oldInnerText: any;
        private x;
        private ColCount();
        private y;
        private stat;
        private _selectedCell;
        setXY(x: number, y: number): void;
        private isfocussed;
        private getStat();
        getCurrentCell(): HTMLTableDataCellElement;
        selectCell(): HTMLTableDataCellElement;
        deselectCell(): void;
        private editCell;
    }
}
export declare function test(): any[];
