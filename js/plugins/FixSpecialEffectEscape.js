//=============================================================================
// RPG Maker MZ - Fixed Special Effect:Escape bug
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 特殊効果：逃げるのバグ修正
 * @author grayOgre
 *
 * @help FixSpecialEffectEscape.js
 * @help
 *
 * このプラグインは、味方全体に対して。スキルの特殊効果：逃げるを使用した場合、
 * ゲームオーバーになるバグを修正するものです。
 *
 * プラグインコマンドはありません。
 */

(() => {
  const _Game_Battler_escape = Game_Battler.prototype.escape;
  Game_Battler.prototype.escape = function () {
    _Game_Battler_escape.apply(this, arguments);
    BattleManager._escaped = true;
  };
})();
