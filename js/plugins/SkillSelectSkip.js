#==============================================================================
# ■ メニューコマンドでスキルタイプを分けて表示
#------------------------------------------------------------------------------
#
#==============================================================================
module Frog
  MENU_STYPE_ID_1 = 1
  MENU_STYPE_ID_2 = 2
end

class Window_MenuCommand < Window_Command
  #--------------------------------------------------------------------------
  # ○ 主要コマンドをリストに追加
  #--------------------------------------------------------------------------
  def add_main_commands
    add_command(Vocab::item,   :item,   main_commands_enabled)
    add_command($data_system.skill_types[Frog::MENU_STYPE_ID_1], :skill1, main_commands_enabled, Frog::MENU_STYPE_ID_1)
    add_command($data_system.skill_types[Frog::MENU_STYPE_ID_2], :skill2, main_commands_enabled, Frog::MENU_STYPE_ID_2)
    add_command(Vocab::equip,  :equip,  main_commands_enabled)
    add_command(Vocab::status, :status, main_commands_enabled)
  end
end

class Window_SkillStatus < Window_Base
  #--------------------------------------------------------------------------
  # ○ ウィンドウ幅の取得
  #--------------------------------------------------------------------------
  def window_width
    Graphics.width
  end
end

class Scene_Menu < Scene_MenuBase
  #--------------------------------------------------------------------------
  # ○ コマンドウィンドウの作成
  #--------------------------------------------------------------------------
  def create_command_window
    @command_window = Window_MenuCommand.new
    @command_window.set_handler(:item,      method(:command_item))
    @command_window.set_handler(:skill1,    method(:command_personal))
    @command_window.set_handler(:skill2,    method(:command_personal))
    @command_window.set_handler(:equip,     method(:command_personal))
    @command_window.set_handler(:status,    method(:command_personal))
    @command_window.set_handler(:formation, method(:command_formation))
    @command_window.set_handler(:save,      method(:command_save))
    @command_window.set_handler(:game_end,  method(:command_game_end))
    @command_window.set_handler(:cancel,    method(:return_scene))
  end
  #--------------------------------------------------------------------------
  # ○ 個人コマンド［決定］
  #--------------------------------------------------------------------------
  def on_personal_ok
    case @command_window.current_symbol
    when :skill1, :skill2
      SceneManager.call(Scene_Skill)
      SceneManager.scene.prepare(@command_window.current_ext)
    when :equip
      SceneManager.call(Scene_Equip)
    when :status
      SceneManager.call(Scene_Status)
    end
  end
end

class Scene_Skill < Scene_ItemBase
  #--------------------------------------------------------------------------
  # ● 準備処理
  #--------------------------------------------------------------------------
  def prepare(stype_id)
    @stype_id = stype_id
  end
  #--------------------------------------------------------------------------
  # ○ 開始処理
  #--------------------------------------------------------------------------
  def start
    super
    create_help_window
    create_status_window
    create_item_window
  end
  #--------------------------------------------------------------------------
  # ○ ステータスウィンドウの作成
  #--------------------------------------------------------------------------
  def create_status_window
    y = @help_window.height
    @status_window = Window_SkillStatus.new(0, y)
    @status_window.viewport = @viewport
    @status_window.actor = @actor
  end
  #--------------------------------------------------------------------------
  # ○ アイテムウィンドウの作成
  #--------------------------------------------------------------------------
  def create_item_window
    wx = 0
    wy = @status_window.y + @status_window.height
    ww = Graphics.width
    wh = Graphics.height - wy
    @item_window = Window_SkillList.new(wx, wy, ww, wh)
    @item_window.actor = @actor
    @item_window.viewport = @viewport
    @item_window.help_window = @help_window
    @item_window.set_handler(:ok,     method(:on_item_ok))
    @item_window.set_handler(:cancel, method(:return_scene))
    @item_window.set_handler(:pagedown, method(:next_actor))
    @item_window.set_handler(:pageup,   method(:prev_actor))
    @item_window.stype_id = @stype_id
    @item_window.select(0)
    @item_window.activate
  end
  #--------------------------------------------------------------------------
  # ○ アクターの切り替え
  #--------------------------------------------------------------------------
  def on_actor_change
    @status_window.actor = @actor
    @item_window.actor = @actor
    @item_window.activate
  end
end