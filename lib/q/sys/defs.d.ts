import { UI as _UI } from './UI';
export declare module defs {
    namespace UI {
        interface IPage extends _UI.JControl {
        }
        interface IApp extends _UI.JControl {
            Name: string;
            SearchBox: _UI.ActionText;
            Foot: _UI.ServiceNavBar<_UI.IItem>;
            Update(): any;
            OnContextMenu(e: MouseEvent): any;
            OnKeyDown(e: KeyboardEvent): any | void;
            OnPrint(): any;
            OnDeepSearche(): any;
            OpenPage(pageNme: string): any;
            Logout(): any;
            Open(page: IPage): any;
            AddPage(child: IPage): any;
            Show(): any;
            SelectedPage: IPage;
            SelectNaxtPage(): any;
            SelectPrevPage(): any;
            CloseModal(m: _UI.Modal): any;
            OpenModal(m: _UI.Modal): any;
            CurrentModal: _UI.Modal;
        }
    }
}
