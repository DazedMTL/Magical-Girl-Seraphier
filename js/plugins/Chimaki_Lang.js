//=============================================================================
// RPG Maker MZ - Chimaki Lang
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Configure multilingual by using CSV file v1.2
 * @author Chimaki
 *
 * @command chageLang
 * @text change lang by command
 * @desc change lang by command
 *
 * @arg lang
 * @type string
 * @default tw
 * @text input lang
 * @desc input lang
 *
 *
 *
 * @param defaultLang
 * @text default language
 * @type string
 * @default tw
 *
 * @param allLang
 * @text Supported languages
 * @type array
 * @default ['tw','cn','en']
 *
 *
 * @param allLangShow
 * @text Supported languages
 * @type array
 * @default ['繁體中文','簡體中文','English']
 *
 *
 * @param showOnOption
 * @text option text
 * @type string
 * @default selectLang
 *
 * @param loadfileName
 * @text csv file name
 * @type array
 * @default ['UI']
 *
 * @help Chimaki_Lang.js
 * itch : https://conviction-srpg.itch.io/
 * webside : https://www.chimakier.com
 *
 * Preparation:
 * Create a folder named csv under the project
 *
 * Instructions:
 * 1. Enter \T[Text-number-in-CSV-file] in Event Commands to call the multilingual system.
 * 2. Enter \T[Text-number-in-CSV-file] in Database to call the multilingual system.
 *
 * P.S. You can use Excel 2019 or above to save as CSV files that use UTF-8 character encoding by clicking the CSV UTF-8 (Comma delimited) from Save as type menu. And download as a CSV UTF-8 (Comma delimited) file from Google Drive is also recommended.
 * Special thanks to: Eagle, 快閃小強
 * if you want add new lang call "jp", add Column
 *
 * ex: id , who, tw, cn ,en , jp
 *
 * ps. the who row just for user to note some thing
 *
 * how to use
 * 1. you can input \T[your_code] in text event/ name / chioce...
 * 2. you can input \T[your_code] into data base , ex: item description
 *
 * P.S. if you use exl to write your csv table, dont forget export code to utf-8
 * P.S. You can use Excel 2019 or above to save as CSV files that use UTF-8 character
 * encoding by clicking the CSV UTF-8 (Comma delimited) from Save as type menu.
 * And download as a CSV UTF-8 (Comma delimited) file from Google Drive is also recommended.
 *
 * Special thanks to：Eagle/快閃小強
 */

/*:zh_TW
 * @target MZ
 * @plugindesc 多語系MZ進化版v1.1
 * @author Chimaki
 *
 *
 * @command chageLang
 * @text 修改語系
 * @desc 修改語系
 *
 * @arg lang
 * @type string
 * @default tw
 * @text 輸入要切換的語系
 * @desc 輸入要切換的語系
 *
 * @param defaultLang
 * @text 預設語系(對應csv上的設定)
 * @type string
 * @default tw
 *
 * @param allLang
 * @text 你要支援的語系(對應csv上的設定)
 * @type array
 * @default ['tw','cn','en']
 *
 *
 * @param allLangShow
 * @text 各個語系在選項中的顯示名稱
 * @type array
 * @default ['繁體中文','簡體中文','English']
 *
 *
 * @param showOnOption
 * @text 此功能在選單中顯示的名稱
 * @type string
 * @default 選擇語言
 *
 * @param loadfileName
 * @text 你要讀取的csv 檔案名稱
 * @type array
 * @default ['UI']
 *
 * @help Chimaki_Lang.js
 * itch : https://conviction-srpg.itch.io/
 * webside : https://www.chimakier.com
 *
 * how to use
 * 事前準備：
 * 專案底下新增 csv 資料夾
 * 第一列的格式分別為 id,who(使用者用來備註用), tw ,en ... 從tw開始，可以自由新增語系欄位
 * ex： 假設你想要新增一個語言叫做 jp, 你的第一列就會變成
 * id , who , tw, en ,jp ...
 *
 * 別忘也要到插件參數中新增jp 對應的文字
 *
 * 使用：
 * 1. 在對話事件中輸入 \T[你的文本編號] 即可自動轉換成多語系
 * 2. 在資料庫中輸入 \T[你的文本編號] 即可自動轉換成多語系
 * 3. 多語系中如過要使用內建特殊符號必須多加一個\  ex： \\c[6]變色\\c[0]變回原本顏色
 *
 * P.S. 如果使用exl輸出csv, 請注意編碼要是utf8(輸出後用txt打開即可確認), 建議使用百度雲or goolge drive
 * 下載成csv檔案，編碼就不會有問題
 *
 * 若使用exl 輸出請按照下方流程
 * 1. 另存新檔
 * 2. web 選項
 * 3  到編碼中選則utf-8 按下確認
 * 4. 輸出成 CSV(*.csv utf-8)
 *
 * 特別感謝：Eagle/快閃小強
 */

/*:zh_CN
 * @target MZ
 * @plugindesc 多語系MZ進化版v1.1
 * @author Chimaki
 *
 * @command chageLang
 * @text 修改語系
 * @desc 修改語系
 *
 * @arg lang
 * @type string
 * @default tw
 * @text 輸入要切換的語系
 * @desc 輸入要切換的語系
 *
 *
 * @param defaultLang
 * @text 預設語系(對應csv上的設定)
 * @type string
 * @default tw
 *
 * @param allLang
 * @text 你要支援的語系(對應csv上的設定)
 * @type array
 * @default ['tw','cn','en']
 *
 *
 * @param allLangShow
 * @text 各個語系在選項中的顯示名稱
 * @type array
 * @default ['繁體中文','簡體中文','English']
 *
 *
 * @param showOnOption
 * @text 此功能在選單中顯示的名稱
 * @type string
 * @default 選擇語言
 *
 * @param loadfileName
 * @text 你要讀取的csv名稱
 * @type array
 * @default ['UI']
 *
 * @help Chimaki_Lang.js
 * itch : https://conviction-srpg.itch.io/
 * webside : https://www.chimakier.com
 *
 * 事前準備：
 * 專案底下新增 csv 資料夾
 * 第一列的格式分別為 id,who(使用者用來備註用), tw ,en ... 從tw開始，可以自由新增語系欄位
 * ex： 假設你想要新增一個語言叫做 jp, 你的第一列就會變成
 * id , who , tw, en ,jp ...
 *
 * 別忘也要到插件參數中新增jp 對應的文字
 *
 * 使用：
 * 1. 在對話事件中輸入 \T[你的文本編號] 即可自動轉換成多語系
 * 2. 在資料庫中輸入 \T[你的文本編號] 即可自動轉換成多語系
 * 3. 多語系中如過要使用內建特殊符號必須多加一個\  ex： \\c[6]變色\\c[0]變回原本顏色
 *
 * P.S. 如果使用exl輸出csv, 請注意編碼要是utf8(輸出後用txt打開即可確認), 建議使用百度雲or goolge drive
 * 下載成csv檔案，編碼就不會有問題
 *
 * 若使用exl 輸出請按照下方流程
 * 1. 另存新檔
 * 2. web 選項
 * 3  到編碼中選則utf-8 按下確認
 * 4. 輸出成 CSV(*.csv utf-8)
 *
 * 特別感謝：Eagle/快閃小強
 *
 */
(() => {
  var __webpack_modules__ = {
      823: (a) => {
        "use strict";
        a.exports = require("fs");
      },
    },
    __webpack_module_cache__ = {};
  function __webpack_require__(a) {
    var e = __webpack_module_cache__[a];
    if (void 0 !== e) return e.exports;
    var t = (__webpack_module_cache__[a] = { exports: {} });
    return __webpack_modules__[a](t, t.exports, __webpack_require__), t.exports;
  }
  var __webpack_exports__ = {};
  (() => {
    ConfigManager.lang = "tw";
    var srpgModuleAlias = srpgModuleAlias || {};
    (srpgModuleAlias.configManager = srpgModuleAlias.configManager || {}),
      (srpgModuleAlias.windowOptions = srpgModuleAlias.windowOptions || {});
    const pluginName = "Chimaki_Lang",
      chimaki_params = PluginManager.parameters(pluginName),
      defaultLang = chimaki_params.defaultLang || "tw",
      LANG_LIST = eval(chimaki_params.allLang),
      LANG_SHOW = eval(chimaki_params.allLangShow),
      LOAD_CSV = eval(chimaki_params.loadfileName),
      OPTION_TEXT = chimaki_params.showOnOption || "語言選擇";
    PluginManager.registerCommand(pluginName, "chageLang", (a) => {
      const e = a.lang;
      console.error("chimaki args", a),
        (ConfigManager.lang = e),
        console.error("chimaki ", ConfigManager.lang);
    }),
      console.error("chimaki ", LANG_LIST);
    var langMap = {};
    LANG_LIST.forEach((a, e) => {
      langMap[`${a}`] = LANG_SHOW[`${e}`];
    });
    class LangManager {
      static _data = {};
      static get data() {
        return this._data || {};
      }
      static set data(a) {
        for (let e in a) this._data[e] = a[e];
      }
      static loadCsv(a) {
        a
          ? ((a = a),
            CsvManager.parseLang(a).then((a) => {
              this.data = a;
            }))
          : console.warn("no file name");
      }
      static text(a) {
        let e = ConfigManager.lang;
        return console.error(`chimamki text ${e}`), this.data[e][a];
      }
    }
    (srpgModuleAlias.configManager.makerData = ConfigManager.makeData),
      (ConfigManager.makeData = function (a) {
        return (
          ((a =
            (a = srpgModuleAlias.configManager.makerData.call(this, a)) ||
            {}).lang = this.lang),
          a
        );
      }),
      (srpgModuleAlias.configManager.applyData = ConfigManager.applyData),
      (ConfigManager.applyData = function (a) {
        srpgModuleAlias.configManager.applyData.call(this, a),
          (this.lang = this.readLang(a));
      }),
      (ConfigManager.readLang = function (a) {
        return a.lang || "tw";
      }),
      (srpgModuleAlias.windowOptions.makeCommandList =
        Window_Options.prototype.makeCommandList),
      (Window_Options.prototype.makeCommandList = function () {
        srpgModuleAlias.windowOptions.makeCommandList.call(this),
          this.addLangOptions();
      }),
      (Window_Options.prototype.addGeneralOptions = function () {
        this.addCommand(TextManager.alwaysDash, "alwaysDash"),
          this.addCommand(TextManager.commandRemember, "commandRemember"),
          this.addCommand(TextManager.touchUI, "touchUI");
      }),
      (Window_Options.prototype.addLangOptions = function () {
        this.addCommand(OPTION_TEXT, "lang");
      }),
      (Window_Options.prototype.langStatusText = function (a) {
        return langMap[`${a}`];
      }),
      (Window_Options.prototype.isLangSymbol = function (a) {
        return "lang" == a;
      }),
      (Window_Options.prototype.changeLang = function (a, e) {
        let t = ConfigManager[a],
          n = LANG_LIST.indexOf(t);
        (n += e ? 1 : -1),
          n >= LANG_LIST.length && (n = LANG_LIST.length - 1),
          n < 0 && (n = 0),
          this.changeValue(a, LANG_LIST[n]);
      }),
      (Window_Options.prototype.statusText = function (a) {
        const e = this.commandSymbol(a),
          t = this.getConfigValue(e);
        return this.isVolumeSymbol(e)
          ? this.volumeStatusText(t)
          : this.isLangSymbol(e)
          ? this.langStatusText(t)
          : this.booleanStatusText(t);
      }),
      (Window_Options.prototype.getConfigValue = function (a) {
        return ConfigManager[a];
      }),
      (Window_Options.prototype.processOk = function () {
        const a = this.index(),
          e = this.commandSymbol(a);
        this.isVolumeSymbol(e)
          ? this.changeVolume(e, !0, !0)
          : this.isLangSymbol(e)
          ? this.changeLang(e, !0)
          : this.changeValue(e, !this.getConfigValue(e));
      }),
      (Window_Options.prototype.cursorRight = function () {
        const a = this.index(),
          e = this.commandSymbol(a);
        this.isVolumeSymbol(e)
          ? this.changeVolume(e, !0, !1)
          : this.isLangSymbol(e)
          ? this.changeLang(e, !0)
          : this.changeValue(e, !0);
      }),
      (Window_Options.prototype.cursorLeft = function () {
        const a = this.index(),
          e = this.commandSymbol(a);
        this.isVolumeSymbol(e)
          ? this.changeVolume(e, !1, !1)
          : this.isLangSymbol(e)
          ? this.changeLang(e, !1)
          : this.changeValue(e, !1);
      }),
      (Game_Message.prototype.add = function (a) {
        this._texts.push(this.processLangChange(a));
      }),
      (Game_Message.prototype.processLangChange = function (a) {
        return checkLangText(a);
      }),
      (Game_Message.prototype.setSpeakerName = function (a) {
        this._speakerName = checkLangText(a);
      }),
      (Game_Interpreter.prototype.setupChoices = function (a) {
        const e = a[0].clone();
        for (let a = 0; a < e.length; a++)
          e[a] = $gameMessage.processLangChange(e[a]);
        const t = a[1] < e.length ? a[1] : -2,
          n = a.length > 2 ? a[2] : 0,
          o = a.length > 3 ? a[3] : 2,
          i = a.length > 4 ? a[4] : 0;
        $gameMessage.setChoices(e, n, t),
          $gameMessage.setChoiceBackground(i),
          $gameMessage.setChoicePositionType(o),
          $gameMessage.setChoiceCallback((a) => {
            this._branch[this._indent] = a;
          });
      });
    class CsvManager {
      static async parseLang(a) {
        let e = {};
        LANG_LIST.forEach((a) => {
          e[`${a}`] = {};
        });
        let t = {};
        LANG_LIST.forEach((a) => {
          t[`${a}`] = LANG_LIST.indexOf(a) + 2;
        });
        const n = __webpack_require__(823);
        return new Promise((o, i) => {
          n.readFile(`./csv/${a}.csv`, "utf8", (a, n) => {
            let i = n.split(/\r/);
            for (let a = 1; a < i.length; a++) {
              let n = i[a].split(",");
              for (let a = 0; a < n.length; a++) {
                let o = n[a].trim();
                if (0 == a)
                  for (let a in e)
                    if (t[a]) {
                      let i = t[a],
                        s = n[i];
                      if (n[i] && n[i].split("\n").length >= 2) {
                        let a = s.length;
                        s = s.substr(1, a - 2);
                      }
                      e[a][o] = s;
                    }
              }
            }
            o(e);
          });
        });
      }
    }
    function checkLangText(a) {
      return a
        ? (a = (a = (a = (a += "").replace(/\\/g, "")).replace(
            /\x1b\x1b/g,
            "\\"
          )).replace(
            /\x1bT\[(\w+)\]/gi,
            (a, e) => (console.error("chimaki ", e), LangManager.text(e))
          ))
        : a;
    }
    (Window_Base.prototype.drawTextEx = function (a, e, t, n) {
      (a = checkLangText(a)), this.resetFontSettings();
      const o = this.createTextState(a, e, t, n);
      return this.processAllText(o), o.outputWidth;
    }),
      (Window_Help.prototype.setText = function (a) {
        (a = checkLangText(a)),
          this._text !== a && ((this._text = a), this.refresh());
      }),
      (Bitmap.prototype.drawText = function (a, e, t, n, o, i) {
        a = checkLangText(a);
        const s = this.context,
          r = s.globalAlpha;
        n = n || 4294967295;
        let g = e,
          l = Math.round(t + o / 2 + 0.35 * this.fontSize);
        "center" === i && (g += n / 2),
          "right" === i && (g += n),
          s.save(),
          (s.font = this._makeFontNameText()),
          (s.textAlign = i),
          (s.textBaseline = "alphabetic"),
          (s.globalAlpha = 1),
          this._drawTextOutline(a, g, l, n),
          (s.globalAlpha = r),
          this._drawTextBody(a, g, l, n),
          s.restore(),
          this._baseTexture.update();
      }),
      LOAD_CSV.forEach((a) => {
        LangManager.loadCsv(a);
      });
  })();
})();
