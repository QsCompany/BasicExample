var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define("App", ["require", "exports", "lib:q|<./lib/q/InfiniteJs.js"], function (require, exports, t1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ValidateImport(t1);
    require('./Main', function () {
    });
});
define("Jobs", ["require", "exports", "./lib/q/sys/Corelib", "./lib/q/sys/UI"], function (require, exports, Corelib_1, UI_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var jobs;
    (function (jobs) {
        Corelib_1.bind.Register({
            Name: 'enumoption',
            OnInitialize: function (j, e) {
                if (!(j.dom instanceof HTMLInputElement))
                    throw "Dom must be Select";
                var dm = j.dom;
                var c = dm.getAttribute('enum');
                var et = dm.getAttribute('enum-type');
                if (et !== 'string')
                    et = 'number';
                var lst = Corelib_1.basic.getEnum(c);
                var ac = new UI_1.UI.ProxyAutoCompleteBox(new UI_1.UI.Input(j.dom), lst);
                ac.Box.Parent = UI_1.UI.Desktop.Current;
                ac.initialize();
                var p = { ac: ac, lst: lst, et: et };
                j.addValue('params', p);
                this.Todo(j, e);
                ac.OnValueChanged(ac, function (b, o, n) {
                    return j.Scop.Value = et === 'string' ? (n ? n.Name : lst.Get(0)) : n ? n.Value : 0;
                });
            }, Todo: function (ji, e) {
                var p = ji.getValue('params');
                var v = ji.Scop.Value;
                p.ac.Value = p.et === 'number' ? Corelib_1.basic.EnumValue.GetValue(p.lst, v || 0) : v;
            }
        });
        Corelib_1.bind.Register({
            Name: 'enum',
            OnInitialize: function (j, e) {
                if (!(j.dom instanceof HTMLSelectElement))
                    throw "Dom must be Select";
                var s = j.Scop;
                var dm = j.dom;
                dm.contentEditable = 'true';
                var c = dm.getAttribute('enum') || dm.getAttribute('type') || dm.getAttribute('rtype');
                var lst = Corelib_1.basic.getEnum(c);
                for (var i = 0; i < lst.Count; i++) {
                    var o = document.createElement('option');
                    var m = lst.Get(i);
                    o.value = String(m.Value);
                    o.text = m.Name;
                    j.dom.appendChild(o);
                }
                j.addValue('list', lst);
                this.Todo(j, e);
                j.dom.addEventListener('change', function (e) {
                    if (j._store.inter)
                        return;
                    j._store.inter = true;
                    try {
                        var v = this.options[this.selectedIndex];
                        v = parseFloat(v && v.value);
                        j.Scop.Value = isFinite(v) ? v : null;
                    }
                    catch (_a) { }
                    j._store.inter = false;
                });
            }, Todo: function (ji, e) {
                if (ji._store.inter)
                    return;
                ji._store.inter = true;
                try {
                    var t = ji.getValue('list');
                    var v = Corelib_1.basic.EnumValue.GetValue(t, ji.Scop.Value);
                    v = v && t.IndexOf(v);
                    ji.dom.selectedIndex = v;
                }
                catch (_a) { }
                ji._store.inter = false;
            }
        });
        Corelib_1.bind.Register({
            Name: 'enumstring',
            OnInitialize: function (j, e) {
                var dm = j.dom;
                var c = dm.getAttribute('type');
                var lst = Corelib_1.basic.getEnum(c);
                j.addValue('params', lst);
                this.Todo(j, e);
            }, Todo: function (ji, e) {
                var p = ji.getValue('params');
                var v = ji.Scop.Value;
                ji.dom.textContent = typeof v === 'string' ? v : p.Get(v || 0).Name;
            }
        });
        Corelib_1.bind.Register({
            Name: 'enum2string',
            OnInitialize: function (j, e) {
                var dm = j.dom;
                var c = dm.getAttribute('type');
                var lst = Corelib_1.basic.getEnum(c);
                j.addValue('params', lst);
                this.Todo(j, e);
            }, Todo: function (ji, e) {
                var p = ji.getValue('params');
                var v = ji.Scop.Value;
                ji.dom.textContent = typeof v === 'string' ? v : p.Get(v || 0).Name;
            }
        });
        Corelib_1.bind.Register({
            Name: 'tostring',
            OnInitialize: function (j, e) {
                this.Todo(j, e);
            }, Todo: function (ji, e) {
                var v = ji.Scop.Value;
                ji.dom.textContent = (v && v.toString()) || "";
            }
        });
    })(jobs || (jobs = {}));
});
define("Main", ["require", "exports", "./lib/q/sys/Corelib", "./lib/q/sys/UI", "template|./assets.html"], function (require, exports, Corelib_2, UI_2, tmp) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ValidateImport(tmp);
    var Gender;
    (function (Gender) {
        Gender[Gender["Boy"] = 0] = "Boy";
        Gender[Gender["Girl"] = 1] = "Girl";
        Gender[Gender["Young"] = 2] = "Young";
        Gender[Gender["Woman"] = 3] = "Woman";
    })(Gender = exports.Gender || (exports.Gender = {}));
    var model = /** @class */ (function (_super) {
        __extends(model, _super);
        function model() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        model.prototype.onNameChanged = function (e) {
            this.FullName = (this.FirstName || "") + " " + (this.LastName || "");
        };
        __decorate([
            Corelib_2.attributes.property(String, "", void 0, model.prototype.onNameChanged),
            __metadata("design:type", String)
        ], model.prototype, "FirstName", void 0);
        __decorate([
            Corelib_2.attributes.property(String, "", void 0, model.prototype.onNameChanged),
            __metadata("design:type", String)
        ], model.prototype, "LastName", void 0);
        __decorate([
            Corelib_2.attributes.property(String),
            __metadata("design:type", String)
        ], model.prototype, "FullName", void 0);
        __decorate([
            Corelib_2.attributes.property(Number),
            __metadata("design:type", Number)
        ], model.prototype, "Gender", void 0);
        return model;
    }(Corelib_2.bind.DObject));
    exports.model = model;
    var data = new model();
    var view = /** @class */ (function (_super) {
        __extends(view, _super);
        function view() {
            var _this = _super.call(this, tmp.template.test.PersonInfoTemplate, data) || this;
            _this.datas = new Array();
            return _this;
        }
        view.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
        };
        view.prototype.restore = function () {
            if (this.datas.length == 0) {
                UI_2.UI.Modal.ShowDialog("Error", "You have no copy registerd do you want to clear fields ?", function (e) {
                    if (e.Result == UI_2.UI.MessageResult.ok) {
                        data.FirstName = "";
                        data.LastName = "";
                        data.Gender = Gender.Boy;
                    }
                }, "YES", "NO");
            }
            else {
                if (!data.Rollback(this.datas.pop(), false))
                    UI_2.UI.Modal.ShowDialog("Error", "Unexpected Error occured when restore data");
                else
                    UI_2.UI.InfoArea.push("We have restore data for you successfully", true);
            }
        };
        view.prototype.backup = function () {
            this.datas.push(data.CreateBackup());
        };
        return view;
    }(UI_2.UI.TControl));
    exports.view = view;
    UI_2.UI.Desktop.Current.OnInitialized =
        function () {
            var app = new UI_2.UI.App("Q-Test");
            UI_2.UI.Desktop.Current.Add(app);
            var t = new view();
            app.PageBody.Content = t;
            app.Show();
            UI_2.UI.Spinner.Default.Pause();
        };
});
//# sourceMappingURL=qinf.js.map