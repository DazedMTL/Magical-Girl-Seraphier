Window_PartyCommand.prototype.makeCommandList = function () {
  this.addCommand(TextManager.fight, "fight");
  if ($gameSwitches.value(1)) {
    this.addCommand(TextManager.escape, "escape", BattleManager.canEscape());
  }
};
