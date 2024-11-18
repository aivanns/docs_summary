"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var readline_1 = require("readline");
var chalk_1 = require("chalk");
var ora_1 = require("ora");
var fs_1 = require("fs");
// Constants
var STRUCTURE_TYPES = {
    FEATURE: "feature",
    ENTITY: "entity",
};
var LAYERS = {
    UI: "ui",
    MODEL: "model",
    API: "api",
};
// Templates configuration
var baseTemplates = {
    feature: (_a = {
            base: {
                "index.ts": function (name) {
                    var componentName = "".concat(name.charAt(0).toUpperCase()).concat(name.slice(1));
                    return ("export { ".concat(componentName, " } from \"./ui/").concat(name, "\";\n") +
                        "export { use".concat(componentName, " } from \"./model/use-").concat(name, "\";\n") +
                        "export type { ".concat(componentName, "Props } from \"./types\";"));
                },
                "types.ts": function (name) {
                    var componentName = "".concat(name.charAt(0).toUpperCase()).concat(name.slice(1));
                    return ("export interface ".concat(componentName, "Props {\n") +
                        "  className?: string;\n" +
                        "}\n\n" +
                        "export interface ".concat(componentName, "State {\n") +
                        "  // Define your state here\n" +
                        "}");
                },
            }
        },
        _a[LAYERS.UI] = {
            "ui/index.ts": function (name) {
                var componentName = "".concat(name.charAt(0).toUpperCase()).concat(name.slice(1));
                return "export { ".concat(componentName, " } from \"./").concat(name, "\";");
            },
            "ui/{{fileName}}.tsx": function (name) {
                var componentName = "".concat(name.charAt(0).toUpperCase()).concat(name.slice(1));
                return ("\"use client\";\n\n" +
                    "import { cn } from \"@/shared/utils/lib/cn\";\n" +
                    "import type { ".concat(componentName, "Props } from \"../types\";\n\n") +
                    "export const ".concat(componentName, " = ({ className }: ").concat(componentName, "Props) => {\n") +
                    "  return (\n" +
                    "    <div className={cn(\"\", className)}>\n" +
                    "      ".concat(componentName, " Component\n") +
                    "    </div>\n" +
                    "  );\n" +
                    "};");
            },
        },
        _a[LAYERS.MODEL] = {
            "model/index.ts": function (name, fileNames) {
                var _a, _b;
                var componentName = "".concat(name.charAt(0).toUpperCase()).concat(name.slice(1));
                var exports = [];
                if ((_a = fileNames === null || fileNames === void 0 ? void 0 : fileNames.model) === null || _a === void 0 ? void 0 : _a.store) {
                    exports.push("export { use".concat(componentName, "Store } from \"./").concat(name, "-store\";"));
                }
                if ((_b = fileNames === null || fileNames === void 0 ? void 0 : fileNames.model) === null || _b === void 0 ? void 0 : _b.hook) {
                    exports.push("export { use".concat(componentName, " } from \"./use-").concat(name, "\";"));
                }
                return exports.join("\n");
            },
            "model/{{name}}-store.ts": function (name) {
                var componentName = "".concat(name.charAt(0).toUpperCase()).concat(name.slice(1));
                return ("import { create } from \"zustand\";\n" +
                    "import type { ".concat(componentName, "State } from \"../types\";\n\n") +
                    "export const use".concat(componentName, "Store = create<").concat(componentName, "State>((set) => ({\n") +
                    "  // Define your store methods here\n" +
                    "}));");
            },
            "model/use-{{name}}.ts": function (name) {
                var componentName = "".concat(name.charAt(0).toUpperCase()).concat(name.slice(1));
                return ("import { use".concat(componentName, "Store } from \"./").concat(name, "-store\";\n\n") +
                    "export const use".concat(componentName, " = () => {\n") +
                    "  // Define your hook logic here\n" +
                    "  return {};\n" +
                    "};");
            },
        },
        _a[LAYERS.API] = {
            "api/index.ts": function (name) {
                var componentName = "".concat(name.charAt(0).toUpperCase()).concat(name.slice(1));
                return "export { ".concat(componentName, "Api } from \"./").concat(name, "-api\";");
            },
            "api/{{name}}-api.ts": function (name) {
                var componentName = "".concat(name.charAt(0).toUpperCase()).concat(name.slice(1));
                return ("import type { ".concat(componentName, "Props } from \"../types\";\n") +
                    "import { apiRequest } from \"@/shared/api\";\n\n" +
                    "export const ".concat(componentName, "Api = {\n") +
                    "  getAll: async () => {\n" +
                    "    const response = await apiRequest.get<".concat(componentName, "Props[]>(\"/").concat(name.toLowerCase(), "\");\n") +
                    "    return response.data;\n" +
                    "  },\n" +
                    "  getById: async (id: string) => {\n" +
                    "    const response = await apiRequest.get<".concat(componentName, "Props>(`/").concat(name.toLowerCase(), "/${id}`);\n") +
                    "    return response.data;\n" +
                    "  },\n" +
                    "  create: async (data: ".concat(componentName, "Props) => {\n") +
                    "    const response = await apiRequest.post<".concat(componentName, "Props>(\"/").concat(name.toLowerCase(), "\", data);\n") +
                    "    return response.data;\n" +
                    "  },\n" +
                    "  update: async (id: string, data: Partial<".concat(componentName, "Props>) => {\n") +
                    "    const response = await apiRequest.patch<".concat(componentName, "Props>(`/").concat(name.toLowerCase(), "/${id}`, data);\n") +
                    "    return response.data;\n" +
                    "  },\n" +
                    "  delete: async (id: string) => {\n" +
                    "    const response = await apiRequest.delete(`/".concat(name.toLowerCase(), "/${id}`);\n") +
                    "    return response.data;\n" +
                    "  },\n" +
                    "};");
            },
        },
        _a),
};
// Utility functions
var createReadlineInterface = function () {
    return readline_1.default.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
};
var askQuestion = function (rl, question) {
    return new Promise(function (resolve) {
        rl.question(question, resolve);
    });
};
var validateName = function (name) {
    if (!name || name.trim().length === 0) {
        throw new Error("Name cannot be empty");
    }
    return name.trim();
};
// Move askStructureType before generateStructure
var askStructureType = function (rl) { return __awaiter(void 0, void 0, void 0, function () {
    var answer, selectedType;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(chalk_1.default.blue("\nSelect structure type:"));
                Object.values(STRUCTURE_TYPES).forEach(function (type, index) {
                    console.log(chalk_1.default.gray("".concat(index + 1, ") ").concat(type)));
                });
                return [4 /*yield*/, askQuestion(rl, chalk_1.default.blue("Enter number (1-2): "))];
            case 1:
                answer = _a.sent();
                selectedType = Object.values(STRUCTURE_TYPES)[parseInt(answer) - 1];
                if (!selectedType) {
                    throw new Error("Invalid selection");
                }
                return [2 /*return*/, selectedType];
        }
    });
}); };
// Move askConfirmation before it's used
var askConfirmation = function (rl, message) { return __awaiter(void 0, void 0, void 0, function () {
    var answer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, askQuestion(rl, chalk_1.default.blue("".concat(message, " ")) + chalk_1.default.gray("(y/n): "))];
            case 1:
                answer = _a.sent();
                return [2 /*return*/, answer.toLowerCase() === "y"];
        }
    });
}); };
// Move all other utility functions before generateStructure
var getLayersConfig = function (rl, type, name) { return __awaiter(void 0, void 0, void 0, function () {
    var layers, _a, _b, _c, fileNames;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                layers = {
                    ui: false,
                    model: false,
                    api: false,
                };
                console.log(chalk_1.default.yellow("\n📁 Select layers to generate:"));
                if (!(type === "feature")) return [3 /*break*/, 2];
                _a = layers;
                return [4 /*yield*/, askConfirmation(rl, "Include UI layer?")];
            case 1:
                _a.ui = _d.sent();
                _d.label = 2;
            case 2:
                _b = layers;
                return [4 /*yield*/, askConfirmation(rl, "Include Model layer?")];
            case 3:
                _b.model = _d.sent();
                _c = layers;
                return [4 /*yield*/, askConfirmation(rl, "Include API layer?")];
            case 4:
                _c.api = _d.sent();
                if (!layers.ui && !layers.model && !layers.api) {
                    throw new Error("At least one layer must be selected");
                }
                return [4 /*yield*/, getFileNames(rl, type, layers, name)];
            case 5:
                fileNames = _d.sent();
                return [2 /*return*/, { layers: layers, fileNames: fileNames }];
        }
    });
}); };
var getFileNames = function (rl, type, layers, name) { return __awaiter(void 0, void 0, void 0, function () {
    var fileNames, _a, _b, includeStore, _c, includeHook, _d, _e;
    var _f, _g, _h;
    return __generator(this, function (_j) {
        switch (_j.label) {
            case 0:
                fileNames = {};
                if (!(layers.ui && type === "feature")) return [3 /*break*/, 2];
                console.log(chalk_1.default.yellow("\n📝 UI Layer file names:"));
                _a = fileNames;
                _f = {};
                return [4 /*yield*/, askFileName(rl, name, "ui")];
            case 1:
                _a.ui = (_f.component = _j.sent(),
                    _f);
                _j.label = 2;
            case 2:
                if (!layers.model) return [3 /*break*/, 9];
                console.log(chalk_1.default.yellow("\n📝 Model Layer file names:"));
                _b = fileNames;
                _g = {};
                return [4 /*yield*/, askFileName(rl, name, "types")];
            case 3:
                _b.model = (_g.types = _j.sent(),
                    _g);
                return [4 /*yield*/, askConfirmation(rl, "Include store?")];
            case 4:
                includeStore = _j.sent();
                if (!includeStore) return [3 /*break*/, 6];
                _c = fileNames.model;
                return [4 /*yield*/, askFileName(rl, name, "store")];
            case 5:
                _c.store = _j.sent();
                _j.label = 6;
            case 6: return [4 /*yield*/, askConfirmation(rl, "Include hook?")];
            case 7:
                includeHook = _j.sent();
                if (!includeHook) return [3 /*break*/, 9];
                _d = fileNames.model;
                return [4 /*yield*/, askFileName(rl, name, "hook")];
            case 8:
                _d.hook = _j.sent();
                _j.label = 9;
            case 9:
                if (!layers.api) return [3 /*break*/, 11];
                console.log(chalk_1.default.yellow("\n📝 API Layer file names:"));
                _e = fileNames;
                _h = {};
                return [4 /*yield*/, askFileName(rl, name, "api")];
            case 10:
                _e.api = (_h.service = _j.sent(),
                    _h);
                _j.label = 11;
            case 11: return [2 /*return*/, fileNames];
        }
    });
}); };
var askFileName = function (rl, name, type) { return __awaiter(void 0, void 0, void 0, function () {
    var defaultName, answer, _a, customName;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                defaultName = type === "ui"
                    ? name
                    : type === "store"
                        ? "".concat(name, "-store")
                        : type === "hook"
                            ? "use-".concat(name)
                            : type === "api"
                                ? "".concat(name, "-api")
                                : type === "types"
                                    ? "types"
                                    : name;
                return [4 /*yield*/, askQuestion(rl, chalk_1.default.blue("Choose option for ".concat(type, " file name:\n")) +
                        chalk_1.default.gray("1) Default name: ".concat(defaultName, "\n")) +
                        chalk_1.default.gray("2) Enter custom name\n") +
                        chalk_1.default.blue("Enter option (1-2): "))];
            case 1:
                answer = _b.sent();
                _a = answer.trim();
                switch (_a) {
                    case "1": return [3 /*break*/, 2];
                    case "2": return [3 /*break*/, 3];
                }
                return [3 /*break*/, 5];
            case 2: return [2 /*return*/, defaultName];
            case 3: return [4 /*yield*/, askQuestion(rl, chalk_1.default.blue("Enter custom name for ".concat(type, " file: ")))];
            case 4:
                customName = _b.sent();
                return [2 /*return*/, customName || defaultName];
            case 5: return [2 /*return*/, defaultName];
        }
    });
}); };
var generateFiles = function (type, name, config) { return __awaiter(void 0, void 0, void 0, function () {
    var basePath, template;
    return __generator(this, function (_a) {
        basePath = path_1.default.join(type === "feature" ? "./src/features" : "./src/entities", name.toLowerCase());
        template = baseTemplates[type];
        if (!template) {
            throw new Error("Template for type ".concat(type, " not found"));
        }
        // Create base structure
        createStructure(basePath, template.base, name, config.fileNames);
        // Create layer-specific structures
        if (config.layers.ui && template.ui) {
            createStructure(basePath, template.ui, name, config.fileNames);
        }
        if (config.layers.model && template.model) {
            createStructure(basePath, template.model, name, config.fileNames);
        }
        if (config.layers.api && template.api) {
            createStructure(basePath, template.api, name, config.fileNames);
        }
        return [2 /*return*/];
    });
}); };
var createStructure = function (basePath, template, name, fileNames) {
    Object.entries(template).forEach(function (_a) {
        var _b, _c, _d, _e, _f;
        var filePath = _a[0], contentFn = _a[1];
        var layer = filePath.split("/")[0];
        // Skip store file if not selected
        if (filePath.includes("store") && !((_b = fileNames === null || fileNames === void 0 ? void 0 : fileNames.model) === null || _b === void 0 ? void 0 : _b.store))
            return;
        // Skip hook file if not selected
        if (filePath.includes("use-") && !((_c = fileNames === null || fileNames === void 0 ? void 0 : fileNames.model) === null || _c === void 0 ? void 0 : _c.hook))
            return;
        var fileName = filePath.includes("{{fileName}}")
            ? (layer === "ui" && ((_d = fileNames.ui) === null || _d === void 0 ? void 0 : _d.component)) ||
                (layer === "model" && ((_e = fileNames.model) === null || _e === void 0 ? void 0 : _e.types)) ||
                (layer === "api" && ((_f = fileNames.api) === null || _f === void 0 ? void 0 : _f.service)) ||
                name.toLowerCase()
            : name.toLowerCase();
        var finalPath = path_1.default.join(basePath, filePath
            .replace("{{fileName}}", fileName)
            .replace("{{name}}", name.toLowerCase()));
        var directory = path_1.default.dirname(finalPath);
        if (!fs_1.default.existsSync(directory)) {
            fs_1.default.mkdirSync(directory, { recursive: true });
        }
        fs_1.default.writeFileSync(finalPath, contentFn(name, fileNames));
    });
};
var printDirectoryStructure = function (dir_1) {
    var args_1 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args_1[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([dir_1], args_1, true), void 0, function (dir, prefix) {
        var files, _a, _b, _c, index, file, filePath, isLast, stats, isDirectory, fileIcon, fileName;
        if (prefix === void 0) { prefix = ""; }
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    files = fs_1.default.readdirSync(dir);
                    _a = 0, _b = files.entries();
                    _d.label = 1;
                case 1:
                    if (!(_a < _b.length)) return [3 /*break*/, 4];
                    _c = _b[_a], index = _c[0], file = _c[1];
                    filePath = path_1.default.join(dir, file);
                    isLast = index === files.length - 1;
                    stats = fs_1.default.statSync(filePath);
                    isDirectory = stats.isDirectory();
                    fileIcon = isDirectory ? "📁" : "📄";
                    fileName = isDirectory ? chalk_1.default.magenta(file) : chalk_1.default.cyan(file);
                    console.log(prefix + (isLast ? "└── " : "├── ") + "".concat(fileIcon, " ").concat(fileName));
                    if (!isDirectory) return [3 /*break*/, 3];
                    return [4 /*yield*/, printDirectoryStructure(filePath, prefix + (isLast ? "    " : "│   "))];
                case 2:
                    _d.sent();
                    _d.label = 3;
                case 3:
                    _a++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
};
// Finally, place generateStructure and its execution at the end
function generateStructure() {
    return __awaiter(this, void 0, void 0, function () {
        var rl, spinner, type, name_1, _a, layers, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    rl = createReadlineInterface();
                    spinner = (0, ora_1.default)();
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 7, 8, 9]);
                    console.log("\n" + chalk_1.default.green.bold("🚀 Feature & Entity Generator") + "\n");
                    return [4 /*yield*/, askStructureType(rl)];
                case 2:
                    type = _b.sent();
                    _a = validateName;
                    return [4 /*yield*/, askQuestion(rl, chalk_1.default.blue("Enter name: "))];
                case 3:
                    name_1 = _a.apply(void 0, [_b.sent()]);
                    return [4 /*yield*/, getLayersConfig(rl, type, name_1)];
                case 4:
                    layers = _b.sent();
                    // Generate files
                    spinner.start(chalk_1.default.blue("Creating ".concat(type, " structure...")));
                    return [4 /*yield*/, generateFiles(type, name_1, layers)];
                case 5:
                    _b.sent();
                    spinner.succeed(chalk_1.default.green("\u2728 ".concat(type, " \"").concat(name_1, "\" successfully created")));
                    // Print structure
                    console.log("\n" + chalk_1.default.yellow("📂 Created files structure:"));
                    return [4 /*yield*/, printDirectoryStructure(path_1.default.join(type === "feature" ? "./src/features" : "./src/entities", name_1.toLowerCase()))];
                case 6:
                    _b.sent();
                    return [3 /*break*/, 9];
                case 7:
                    error_1 = _b.sent();
                    if (error_1 instanceof Error) {
                        spinner.fail(chalk_1.default.red("\u274C Error: ".concat(error_1.message)));
                    }
                    else {
                        spinner.fail(chalk_1.default.red("\u274C An unknown error occurred"));
                    }
                    return [3 /*break*/, 9];
                case 8:
                    rl.close();
                    return [7 /*endfinally*/];
                case 9: return [2 /*return*/];
            }
        });
    });
}
// Start generator at the very end
generateStructure().catch(console.error);
