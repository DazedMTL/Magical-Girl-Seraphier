//=============================================================================
// PANDA_ConvertDataName.js
//=============================================================================
// [Update History]
// 2020-08-22 Ver.1.0.0 First Release for MV/MZ.

/*:
 * @target MV MZ
 * @plugindesc show the name and icon of item, skill or enemy etc. in messages.
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20200822124150.html
 *
 * @help [How to Use]
 * Replace the following escape characters with their names in messages.
 *  \class[n]  : Class name of ID = n
 *  \skill[n]  : Skill name of ID = n
 *  \item[n]   : Item name of ID = n
 *  \weapon[n] : Weapon name of ID = n
 *  \armor[n]  : Armor name of ID = n
 *  \enemy[n]  : Enemy name of ID = n
 *  \troop[n]  : Troop name of ID = n
 *  \state[n]  : State name of ID = n
 *
 * Such as \item[\V[1]], you can use a variable for n.
 * In this case, the name of the item ID 1 is displayed.
 *
 * Such as \*skill[n], you can display an icon for the skill by adding *.
 * item, weapon, armor, state as the same.
 * class, enemy, troop will not.
 *
 * [License]
 * this plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 *
 * [Reference]
 * ItemNameMsg.js by Sasuke KANNAZUKI
 */

/*:ja
 * @target MV MZ
 * @plugindesc 文章中にアイテムやスキル、敵キャラ等の名前やアイコンを表示します。
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20200822124150.html
 *
 * @help ■ 使い方
 * 文章の表示や説明文等で、以下の制御文字をそれぞれの名前に置き換えます。
 *  \class[n]  : n番の職業名
 *  \skill[n]  : n番のスキル名
 *  \item[n]   : n番のアイテム名
 *  \weapon[n] : n番の武器名
 *  \armor[n]  : n番の防具名
 *  \enemy[n]  : n番の敵キャラ名
 *  \troop[n]  : n番の敵グループ名
 *  \state[n]  : n番のステート名
 *
 * \item[\V[1]] のように、nに変数を用いることも可能です。
 * この場合、1番の変数に格納されているID番号のアイテム名が表示されます。
 *
 * \*skill[n] のように*を付けると、そのスキルのアイコンを表示できます。
 * item、weapon、armor、state も同様です。
 * class、enemy、troop は、*を付けてもアイコンは表示されません。
 *
 * ■ 利用規約
 * このプラグインはMITライセンスで配布されます。
 * ご自由にお使いください。
 * https://opensource.org/licenses/mit-license.php
 *
 * ■ 参考
 * ItemNameMsg.js by 神無月サスケ様
 */

(() => {
  "use strict";

  const _Window_Base_convertEscapeCharacters =
    Window_Base.prototype.convertEscapeCharacters;
  Window_Base.prototype.convertEscapeCharacters = function (text) {
    // Original Processing
    text = _Window_Base_convertEscapeCharacters.call(this, text);

    // Convert Data Name and Icon
    text = text.replace(
      /\x1b(\*)?(class|skill|item|weapon|armor|enemy|troop|state)\[(\d+)\]/gi,
      function () {
        var text = "";
        var icon = arguments[1];
        var type = arguments[2].toLowerCase();
        var id = parseInt(arguments[3]);
        // get object
        var obj = null;
        if (id >= 1) {
          switch (type) {
            case "class":
              obj = $dataClasses[id];
              break;
            case "skill":
              obj = $dataSkills[id];
              break;
            case "item":
              obj = $dataItems[id];
              break;
            case "weapon":
              obj = $dataWeapons[id];
              break;
            case "armor":
              obj = $dataArmors[id];
              break;
            case "enemy":
              obj = $dataEnemies[id];
              break;
            case "troop":
              obj = $dataTroops[id];
              break;
            case "state":
              obj = $dataStates[id];
              break;
          }
        }
        if (obj) {
          // get object name
          text = obj.name;
          // get object icon
          if (icon === "*") {
            switch (type) {
              case "skill":
              case "item":
              case "weapon":
              case "armor":
              case "state":
                text = "\x1bI[" + obj.iconIndex + "]" + text;
            }
          }
        }
        return text;
      }.bind(this)
    );

    return text;
  };
})();
