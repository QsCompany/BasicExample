/// <reference path="./lib/qloader.d.ts" />
import { bind, attributes, collection, basic, reflection } from "./lib/q/sys/Corelib"
import { models } from "./lib/q/sys/QModel";
import { UI } from "./lib/q/sys/UI";
import * as tmp from "template|./assets.html"

ValidateImport(tmp);

export enum Gender {
    Boy,
    Girl,
    Young,
    Woman
}

export class model extends bind.DObject{

    @attributes.property(String,"",void 0,model.prototype.onNameChanged)
    public FirstName: string; 

    @attributes.property(String, "", void 0, model.prototype.onNameChanged)
    public LastName: string; 


    @attributes.property(String)
    public FullName: string; 

    @attributes.property(Number)
    public Gender: Gender; 

    onNameChanged(e) {
        this.FullName = (this.FirstName || "") + " " + (this.LastName || "");
    }
}

var data: model;
export class view extends UI.TControl<model> {
    @attributes.property(collection.List)
    public Records = new collection.List<model>(model);

    constructor() {
        super((tmp.template as any).test.PersonInfoTemplate, null);
    }
    initialize() {
        super.initialize();
        //this.Records.Add(void 0);
        //this.newrecord();
    }
    private datas = new Array();
    restore() {
        if (this.datas.length == 0) {
            UI.Modal.ShowDialog("Error", "You have no copy registerd do you want to clear fields ?", (e) => {
                if (e.Result == UI.MessageResult.ok) {
                    data.FirstName = "";
                    data.LastName = "";
                    data.Gender = Gender.Boy;
                }
            }, "YES", "NO");
        } else {
            if (!data.Rollback(this.datas.pop(), false)) UI.Modal.ShowDialog("Error", "Unexpected Error occured when restore data");
            else UI.InfoArea.push("We have restore data for you successfully", true);
        }
    }
    backup() {
        this.datas.push(data.CreateBackup());
    }
    deleteRecord(ev, e: bind.EventData, scop: bind.Scop, event: bind.events) {
        if (this.Records.Remove(scop.Value)) UI.InfoArea.push('The Record Deleted', true);
        else UI.InfoArea.push("UnExpected Error", false);
    }
    newrecord() {
        this.Records.Add(data = new model());
        this.Data = data;
        this.listView.SelectedItem = data;
    }
    setName(name: string, dom: HTMLElement, cnt: UI.JControl, e: bind.IJobScop) {
        if (name === 'listView') {
            this.listView = cnt as any;
            this.listView.OnPropertyChanged(UI.ListAdapter.DPSelectedItem, (s, e) => {
                this.Data = data = e._new;
                this.listView.AcceptNullValue = true;
            }, this);
        }
    }
    OnKeyDown(e) {
        if (this.listView.OnKeyDown(e)) return true;
    }
    private listView: UI.ListAdapter<model, collection.List<model>>;
}
UI.Desktop.Current.OnInitialized =
    () => {
        var app = new UI.App("Q-Test");
        UI.Desktop.Current.Add(app);
        var t = new view();
        app.PageBody.Content = t;
        app.Show();
        UI.Spinner.Default.Pause();
        app.OnKeyDown = (e) => {
            return t.OnKeyDown(e);
        }
    };
