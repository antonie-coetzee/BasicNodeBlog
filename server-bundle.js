var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
System.register("common/common", ["inversify", "reflect-metadata"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var TYPES, inversify_1, Katana, Shuriken, Ninja, myContainer, ninja;
    return {
        setters: [
            function (inversify_1_1) {
                inversify_1 = inversify_1_1;
            },
            function (_1) {
            }
        ],
        execute: function () {
            TYPES = {
                Warrior: Symbol("Warrior"),
                Weapon: Symbol("Weapon"),
                ThrowableWeapon: Symbol("ThrowableWeapon")
            };
            Katana = (function () {
                function Katana() {
                }
                Katana.prototype.hit = function () {
                    return "cut!";
                };
                return Katana;
            }());
            Katana = __decorate([
                inversify_1.injectable()
            ], Katana);
            Shuriken = (function () {
                function Shuriken() {
                }
                Shuriken.prototype.throw = function () {
                    return "hit!";
                };
                return Shuriken;
            }());
            Shuriken = __decorate([
                inversify_1.injectable()
            ], Shuriken);
            Ninja = (function () {
                function Ninja(katana, shuriken) {
                    this._katana = katana;
                    this._shuriken = shuriken;
                }
                Ninja.prototype.fight = function () { return this._katana.hit(); };
                ;
                Ninja.prototype.sneak = function () { return this._shuriken.throw(); };
                ;
                return Ninja;
            }());
            Ninja = __decorate([
                inversify_1.injectable(),
                __param(0, inversify_1.inject(TYPES.Weapon)),
                __param(1, inversify_1.inject(TYPES.ThrowableWeapon)),
                __metadata("design:paramtypes", [Object, Object])
            ], Ninja);
            myContainer = new inversify_1.Container();
            myContainer.bind(TYPES.Warrior).to(Ninja);
            myContainer.bind(TYPES.Weapon).to(Katana);
            myContainer.bind(TYPES.ThrowableWeapon).to(Shuriken);
            ninja = myContainer.get(TYPES.Warrior);
            console.log(ninja.fight());
            console.log(ninja.sneak());
        }
    };
});
System.register("server/api/IApi", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var IApiSymbol;
    return {
        setters: [],
        execute: function () {
            exports_2("IApiSymbol", IApiSymbol = Symbol("IApi"));
        }
    };
});
System.register("server/api/Api", ["inversify"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var inversify_2, BnbApi;
    return {
        setters: [
            function (inversify_2_1) {
                inversify_2 = inversify_2_1;
            }
        ],
        execute: function () {
            BnbApi = (function () {
                function BnbApi() {
                }
                Object.defineProperty(BnbApi.prototype, "routes", {
                    get: function () {
                        return null;
                    },
                    enumerable: true,
                    configurable: true
                });
                return BnbApi;
            }());
            BnbApi = __decorate([
                inversify_2.injectable()
            ], BnbApi);
            exports_3("BnbApi", BnbApi);
        }
    };
});
System.register("server/IServer", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var IServerSymbol;
    return {
        setters: [],
        execute: function () {
            exports_4("IServerSymbol", IServerSymbol = Symbol("IServer"));
        }
    };
});
System.register("server/Server", ["inversify", "reflect-metadata", "express", "server/api/IApi"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var inversify_3, express, IApi_1, BnbServer;
    return {
        setters: [
            function (inversify_3_1) {
                inversify_3 = inversify_3_1;
            },
            function (_2) {
            },
            function (express_1) {
                express = express_1;
            },
            function (IApi_1_1) {
                IApi_1 = IApi_1_1;
            }
        ],
        execute: function () {
            BnbServer = (function () {
                function BnbServer(api) {
                    this.api = api;
                }
                BnbServer.prototype.bootstrap = function () {
                    this.app = express();
                    this.app.get('/', function (req, res) {
                        res.send('Hello World!');
                    });
                    this.app.listen(8080, function () {
                        console.log('Example app listening on port 8080!');
                    });
                    return this;
                };
                return BnbServer;
            }());
            BnbServer = __decorate([
                inversify_3.injectable(),
                __param(0, inversify_3.inject(IApi_1.IApiSymbol)),
                __metadata("design:paramtypes", [Object])
            ], BnbServer);
            exports_5("BnbServer", BnbServer);
        }
    };
});
System.register("server/ContainerBuilder", ["reflect-metadata", "inversify", "server/api/IApi", "server/api/Api", "server/IServer", "server/Server"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var inversify_4, IApi_2, Api_1, IServer_1, Server_1, BnbContainerBuilder;
    return {
        setters: [
            function (_3) {
            },
            function (inversify_4_1) {
                inversify_4 = inversify_4_1;
            },
            function (IApi_2_1) {
                IApi_2 = IApi_2_1;
            },
            function (Api_1_1) {
                Api_1 = Api_1_1;
            },
            function (IServer_1_1) {
                IServer_1 = IServer_1_1;
            },
            function (Server_1_1) {
                Server_1 = Server_1_1;
            }
        ],
        execute: function () {
            BnbContainerBuilder = (function () {
                function BnbContainerBuilder() {
                }
                BnbContainerBuilder.prototype.build = function () {
                    var bnbContainer = new inversify_4.Container();
                    bnbContainer.bind(IApi_2.IApiSymbol).to(Api_1.BnbApi);
                    bnbContainer.bind(IServer_1.IServerSymbol).to(Server_1.BnbServer);
                    return bnbContainer;
                };
                return BnbContainerBuilder;
            }());
            exports_6("BnbContainerBuilder", BnbContainerBuilder);
        }
    };
});
System.register("server/Bootstrap", ["server/IServer", "server/ContainerBuilder"], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var IServer_2, ContainerBuilder_1, container, server;
    return {
        setters: [
            function (IServer_2_1) {
                IServer_2 = IServer_2_1;
            },
            function (ContainerBuilder_1_1) {
                ContainerBuilder_1 = ContainerBuilder_1_1;
            }
        ],
        execute: function () {
            container = new ContainerBuilder_1.BnbContainerBuilder().build();
            server = container.get(IServer_2.IServerSymbol);
            server.bootstrap();
        }
    };
});
//# sourceMappingURL=server-bundle.js.map