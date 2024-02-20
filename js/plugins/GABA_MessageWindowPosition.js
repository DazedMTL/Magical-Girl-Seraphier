//=============================================================================
// RPG Maker MZ - Message Window Position
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Adjust the position of the message window.
 * @author gabacho(Ichiro Meiken)
 * @url https://star-write-dream.com/
 * @help GABA_MessageWindowPosition.js(ver1.0.0)
 *
 * Adjust the position of the message window.
 *
 * --------------------------
 * Copyright (c) 2021 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
 *
 * @param upX
 * @text Upper window adjustment X
 * @type number
 * @desc Specify the value to adjust the horizontal position of the message window in pixels. Affects when the window position is "up".
 * @default 0
 * @min -999
 *
 * @param upY
 * @text Upper window adjustment Y
 * @type number
 * @desc Specify the value to adjust the vertical position of the message window in pixels. Affects when the window position is "up".
 * @default 0
 * @min -999
 *
 * @param midX
 * @text Middle window adjustment X
 * @type number
 * @desc Specify the value to adjust the horizontal position of the message window in pixels. Affects when the window position is "middle".
 * @default 0
 * @min -999
 *
 * @param midY
 * @text Middle window adjustment Y
 * @type number
 * @desc Specify the value to adjust the vertical position of the message window in pixels. Affects when the window position is "middle".
 * @default 0
 * @min -999
 *
 * @param downX
 * @text Low window adjustment X
 * @type number
 * @desc Specify the value to adjust the horizontal position of the message window in pixels. Affects when the window position is "low".
 * @default 0
 * @min -999
 *
 * @param downY
 * @text Low window adjustment Y
 * @type number
 * @desc Specify the value to adjust the vertical position of the message window in pixels. Affects when the window position is "low".
 * @default 0
 * @min -999
 *
 */

/*:ja
 * @target MZ
 * @plugindesc メッセージウィンドウの位置を調整します。
 * @author ガバチョ（溟犬一六）
 * @url https://star-write-dream.com/
 *
 * @help GABA_MessageWindowPosition.js(ver1.0.0)
 *
 * マップでのメッセージウィンドウの位置を調整します。
 * ※戦闘時のメッセージウィンドウには効果ありません。
 *
 * プラグインコマンドはありません。
 *
 * プラグインパラメーターで位置を調整してください。
 *
 * --------------------------
 * Copyright (c) 2021 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
 *
 * @param upX
 * @text 上ウィンドウ調整X
 * @type number
 * @desc メッセージウィンドウの横位置を調整する値をピクセル数で指定。ウィンドウ位置が「上」の時に影響します。（初期値：0）
 * @default 0
 * @min -999
 *
 * @param upY
 * @text 上ウィンドウ調整Y
 * @type number
 * @desc メッセージウィンドウの縦位置を調整する値をピクセル数で指定。ウィンドウ位置が「上」の時に影響します。（初期値：0）
 * @default 0
 * @min -999
 *
 * @param midX
 * @text 中ウィンドウ調整X
 * @type number
 * @desc メッセージウィンドウの横位置を調整する値をピクセル数で指定。ウィンドウ位置が「中」の時に影響します。（初期値：0）
 * @default 0
 * @min -999
 *
 * @param midY
 * @text 中ウィンドウ調整Y
 * @type number
 * @desc メッセージウィンドウの縦位置を調整する値をピクセル数で指定。ウィンドウ位置が「中」の時に影響します。（初期値：0）
 * @default 0
 * @min -999
 *
 * @param downX
 * @text 下ウィンドウ調整X
 * @type number
 * @desc メッセージウィンドウの横位置を調整する値をピクセル数で指定。ウィンドウ位置が「下」の時に影響します。（初期値：0）
 * @default 0
 * @min -999
 *
 * @param downY
 * @text 下ウィンドウ調整Y
 * @type number
 * @desc メッセージウィンドウの縦位置を調整する値をピクセル数で指定。ウィンドウ位置が「下」の時に影響します。（初期値：0）
 * @default 0
 * @min -999
 *
 */

(() => {
  const pluginName = "GABA_MessageWindowPosition";

  const parameters = PluginManager.parameters(pluginName);
  const uX = parseInt(parameters["upX"]) || 0;
  const uY = parseInt(parameters["upY"]) || 0;
  const mX = parseInt(parameters["midX"]) || 0;
  const mY = parseInt(parameters["midY"]) || 0;
  const dX = parseInt(parameters["downX"]) || 0;
  const dY = parseInt(parameters["downY"]) || 0;

  GABA_MessageWindowPosition_Adjust = function (target) {
    //マップシーンに限定
    if (SceneManager._scene.constructor != Scene_Map) {
      return;
    }

    target.x = 0;
    switch (target._positionType) {
      case 0:
        target.x += uX;
        target.y += uY;
        break;
      case 1:
        target.x += mX;
        target.y += mY;
        break;
      case 2:
        target.x += dX;
        target.y += dY;
        break;
      default:
        break;
    }
  };

  const _Window_Message_updatePlacement =
    Window_Message.prototype.updatePlacement;
  Window_Message.prototype.updatePlacement = function () {
    _Window_Message_updatePlacement.apply(this, arguments);
    GABA_MessageWindowPosition_Adjust(this);
  };
})();
