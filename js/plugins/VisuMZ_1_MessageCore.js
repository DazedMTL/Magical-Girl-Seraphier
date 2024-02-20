//=============================================================================
// VisuStella MZ - Message Core
// VisuMZ_1_MessageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MessageCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MessageCore = VisuMZ.MessageCore || {};
VisuMZ.MessageCore.version = 1.29;

//=============================================================================
/*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.29] [MessageCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Message_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Message Core plugin extends and builds upon the message functionality of
 * RPG Maker MZ and allows you, the game dev, to customize the workflow for
 * your game's message system.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general message settings.
 * * Auto-Color key words and/or database entries.
 * * Increases the text codes available to perform newer functions/effects.
 * * Ability for you to implement custom Text Code actions.
 * * Ability for you to implement custom Text code string replacements.
 * * Invoke a macro system to speed up the dev process.
 * * Add a Text Speed option to the Options menu.
 * * Add the ever so useful Word Wrap to your message system.
 * * Extend the choice selection process to your liking.
 * * The ability to enable/disable as well as show/hide certain choices.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Dim Background Extension
 *
 * Before, when using the Dim Background as a part of a Show Text event, its
 * size is only the same as the message window's width itself. This looked
 * really ugly because it had hard edges cutting off while gradients are seen
 * elsewhere. To make it look better, we extended the dimmed background to span
 * the width of the screen instead.
 *
 * ---
 *
 * Extended Messages
 *
 * If you decide to expand the size of the message window to allow for more
 * rows to be displayed, you can type in the data for them by chaining together
 * Show Message events. They will take data from each other and display them in
 * the same message window as long as there are enough rows.
 *
 * ---
 *
 * Extended Choice Lists
 *
 * Choice lists can be extended by just chaining one Choice List event after
 * the other in succession along the same indentation. They do not extend if
 * there is any event other than a Choice List option between them on the same
 * indentation level.
 *
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. Some of
 * these are original text codes provided by RPG Maker MZ, while others are
 * new text codes added through this plugin. You may even add your own text
 * codes through the plugin parameters.
 *
 * === RPG Maker MZ Text Codes ===
 *
 * The following are text codes that come with RPG Maker MZ. These text codes
 * cannot be edited through the Plugin Parameters.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \V[x]                Replaced by the value of variable 'x'.
 * \N[x]                Replaced by the name of actor 'x'.
 * \P[x]                Replaced by the name of party member 'x'.
 * \C[x]                Draw the subsequent text with window skin color 'x'.
 * \I[x]                Draw icon 'x'.
 *
 * \PX[x]               Moves text x position to 'x'.
 * \PY[x]               Moves text y position to 'y'.
 *
 * \G                   Replaced by the currency unit.
 *
 * \{                   Increase the text font size by one step.
 * \}                   Decrease the text font size by one step.
 * \FS[x]               Changes the text font size to 'x'.
 *
 * \\                   Replaced by the backslash character.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \$                   Opens the gold window.
 * \.                   Waits a 1/4 second.
 * \|                   Waits a full second.
 * \!                   Waits for button input.
 * \>                   Display remaining text on same line all at once.
 * \<                   Cancel the effect that displays text all at once.
 * \^                   Do not wait for input after displaying text to move on.
 *
 * ---
 *
 * === Message Core Hard-Coded Text Codes ===
 *
 * The following text codes are hard-coded into VisuStella MZ Message Core's
 * code. These text codes cannot be edited through the Plugin Parameters.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <b>                  Makes subsequent text bold.
 * </b>                 Removes bold from subsequent text.
 * <i>                  Makes subsequent text italic.
 * </i>                 Removes italic from subsequent text.
 *
 * <left>               Makes subsequent text left-aligned.
 * </left>              Removes left-alignment for subsequent text.
 * <center>             Makes subsequent text center-aligned.
 * </center>            Removes center-alignment for subsequent text.
 * <right>              Makes subsequent text right-aligned.
 * </right>             Removes right-alignment for subsequent text.
 *
 * Note1: Use at line-start.
 *
 * <ColorLock>          Text codes can't change text color for subsequent text.
 * </ColorLock>         Removes Color Lock property.
 *
 * <WordWrap>           Enables Word Wrap for this window. *Note2*
 * </WordWrap>          Disables Word Wrap for this window. *Note2*
 * <br>                 Adds a line break. Requires Word Wrap enabled.
 * <line break>         Adds a line break. Requires Word Wrap enabled.
 *
 * Note2: Some windows cannot use Word Wrap such as the Choice Window.
 *
 * \picture<x>          Draws picture x (filename) at current text position.
 * \CenterPicture<x>    Draws picture x (filename) centered at the window.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \CommonEvent[x]      Runs common event x when text code is reached.
 * \Wait[x]             Makes the message wait x frames before continuing.
 *
 * <Auto>               Resizes message window dimensions to fit text. *Note3*
 * <Auto Width>         Resizes message window width to fit text. *Note3*
 * <Auto Height>        Resizes message window height to fit text. *Note3*
 *
 * <Auto Actor: x>      Resizes message window and positions it over actor x
 *                      sprite's head. *Note3*
 * <Auto Party: x>      Resizes message window and positions it over party
 *                      member x sprite's head. *Note3*
 * <Auto Player>        Map-Only. Resizes message window and positions it over
 *                      the player sprite's head. *Note3*
 * <Auto Event: x>      Map-Only. Resizes message window and positions it over
 *                      event x sprite's head. *Note3*
 * <Auto Enemy: x>      Battle-Only. Resizes message window and positions it
 *                      over enemy x sprite's head. *Note3*
 *
 * Note3: Upon using these text codes, the message window's settings will be
 * reset for the upcoming message. These effects do not work with Word Wrap.
 *
 * ---
 *
 * ----------------------------   ---------------------------------------------
 * Text Code                      Effect (Battle Only)
 * ----------------------------   ---------------------------------------------
 * <Current Battle Target>        Replaces text code with the current target of
 *                                an action in battle.
 * <Current Battle User>          Replaces text code with the currently active
 *                                user in battle.
 * <Current Battle Action>        Replaces text code with the current battle
 *                                action's name with an icon in front.
 * <Current Battle Action Name>   Replaces text code with the current battle
 *                                action's name without an icon.
 *
 * If there is no battle, no target, no user, or no action, then the text code
 * will just be replaced with no text.
 *
 * These text codes are NOT recommended to be used inside of Help Descriptions.
 * They are best used with "Show Text" event commands.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Effect (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * <Show>                         Choice is always shown.
 * <Show Switch: x>               Choice shown if switch x is ON.
 * <Show Switches: x,x,x>         Choice shown if the x switches are all ON.
 * <Show All Switches: x,x,x>     Choice shown if the x switches are all ON.
 * <Show Any Switches: x,x,x>     Choice shown if any of x switches are ON.
 *
 * <Hide>                         Choice is always hidden.
 * <Hide Switch: x>               Choice hidden if switch x is ON.
 * <Hide Switches: x,x,x>         Choice hidden if the x switches are all ON.
 * <Hide All Switches: x,x,x>     Choice hidden if the x switches are all ON.
 * <Hide Any Switches: x,x,x>     Choice hidden if any of x switches are ON.
 *
 * <Enable>                       Choice is always enabled.
 * <Enable Switch: x>             Choice enabled if switch x is ON.
 * <Enable Switches: x,x,x>       Choice enabled if the x switches are all ON.
 * <Enable All Switches: x,x,x>   Choice enabled if the x switches are all ON.
 * <Enable Any Switches: x,x,x>   Choice enabled if any of x switches are ON.
 *
 * <Disable>                      Choice is always disabled.
 * <Disable Switch: x>            Choice disabled if switch x is ON.
 * <Disable Switches: x,x,x>      Choice disabled if the x switches are all ON.
 * <Disable All Switches: x,x,x>  Choice disabled if the x switches are all ON.
 * <Disable Any Switches: x,x,x>  Choice disabled if any of x switches are ON.
 *
 * ---
 *
 * -----------------  ---------------------------------------------------------
 * Text Code          Effect (Name Window Only)
 * -----------------  ---------------------------------------------------------
 * <Left>             Positions the name box window to the left.
 * <Center>           Positions the name box window to the center.
 * <Right>            Positions the name box window to the right.
 * <Position: x>      Replace 'x' with a number from 0 to 10. This positions
 *                    the name box window on the screen relative to the
 *                    position of the value 'x' represents.
 * \NormalBG          Changes background type of window to normal type.
 * \DimBG             Changes background type of window to dim type.
 * \TransparentBG     Changes background type of window to transparent type.
 *
 * ---
 *
 * -------------------------------   ------------------------------------------
 * Text Code                         Effect (Message Window Only)
 * -------------------------------   ------------------------------------------
 *
 * <Position: x, y, width, height>   Forces the message window to exact listed
 *                                   coordinates and dimensions. Replace each
 *                                   of the arguments with numbers. *Note*
 *
 * <Coordinates: x, y>               Forces the message window to the exact
 *                                   listed coordinates. Replace each of the
 *                                   arguments with numbers. *Note*
 *
 * <Dimensions: width, height>       Forces the message window size to the
 *                                   exact listed dimensions. Replace each of
 *                                   the arguments with numbers. *Note*
 *
 * *NOTE* These text codes do not work with Word Wrap.
 *
 * ---
 *
 * === Message Core Customizable Text Codes ===
 *
 * The following text codes can be altered through the Message Core's various
 * Plugin Parameters to adjust replacements and actions.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \Class[x]            Draws class x's icon (if have) and name.
 * \ClassName[x]        Draws class x's name only.
 *
 * \Skill[x]            Draws skill x's icon (if have) and name.
 * \SkillName[x]        Draws skill x's name only.
 *
 * \Item[x]             Draws item x's icon (if have) and name.
 * \ItemName[x]         Draws item x's name only.
 * \ItemQuantity[x]     Inserts the number of item x's owned by the party.
 *
 * \Weapon[x]           Draws weapon x's icon (if have) and name.
 * \WeaponName[x]       Draws weapon x's name only.
 * \WeaponQuantity[x]   Inserts the number of weapon x's owned by the party.
 *
 * \Armor[x]            Draws armor x's icon (if have) and name.
 * \ArmorName[x]        Draws armor x's name only.
 * \ArmorQuantity[x]    Inserts the number of armor x's owned by the party.
 *
 * \LastGainObj         Draws the icon + name of the last party-gained object.
 * \LastGainObjName     Draws the name of the last party-gained object.
 * \LastGainObjQuantity Inserts the quantity of the last party-gained object.
 *
 * \State[x]            Draws state x's icon (if have) and name.
 * \StateName[x]        Draws state x's name only.
 *
 * \Enemy[x]            Draws enemy x's icon (if have) and name.
 * \EnemyName[x]        Draws enemy x's name only.
 *
 * \Troop[x]            Draws troop x's icon (if have) and name.
 * \TroopName[x]        Draws troop x's name only.
 *
 * \TroopMember[x]      Draws troop member x's icon (if have) and name. *Note1*
 * \TroopNameMember[x]  Draws troop member x's name only. *Note1*
 *
 * Note1: Only works in battle.
 *
 * \NormalBG            Changes background type of window to normal type.
 * \DimBG               Changes background type of window to dim type.
 * \TransparentBG       Changes background type of window to transparent type.
 *
 * \FontChange<x>       Changes font face to x font name.
 * \ResetFont           Resets font settings.
 *
 * \ResetColor          Resets color settings.
 * \HexColor<x>         Changes text color to x hex color (ie. #123abc).
 * \OutlineColor[x]     Changes outline color to text color x.
 * \OutlineHexColor<x>  Changes outline color to x hex color (ie. #123abc).
 * \OutlineWidth[x]     Changes outline width to x thickness.
 *
 * \WindowMoveTo<?>     Moves window to exact coordinates. *Note2*
 * \WindowMoveBy<?>     Moves window by relative values. *Note2*
 * \WindowReset         Resets window position to original position.
 *
 * Note2: Replace '?' with the following format:
 *   targetX, targetY, targetWidth, targetHeight, duration, easingType
 *   Only targetX and targetY are required arguments. These will only alter the
 *   window dimensions when the text has arrived at that point. They will not
 *   alter the window preemptively. This is not used as a window positioner.
 *   Use the <Position: x, y, width, height> text code for that.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \ActorFace[x]        Inserts actor x's face into the Message Window.
 * \PartyFace[x]        Inserts party member x's face into the Message Window.
 * \ChangeFace<x,y>     Changes message face to x filename, y index.
 * \FaceIndex[x]        Changes message face index to x.
 *
 * \TextDelay[x]        Sets delay in frames between characters to x frames.
 *
 * ---
 *
 * As these text codes can be added, removed, and/or altered, their functions
 * may or may not be the same depending on how you've altered them. VisuStella
 * is not responsible for any errors caused by changes made to pre-made text
 * codes nor any new text codes they did not make.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 *
 * === Message Plugin Commands ===
 *
 * ---
 *
 * Message: Properties
 *   Change the various properties of the Message Window.
 *
 *   Rows:
 *   - Change the number of Message Window rows.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Width:
 *   - Change the Message Window width in pixels.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Center:
 *   - Center the window X after changing its width?
 *
 *   Word Wrap:
 *   - Enable or disable Word Wrap for the Message Window?
 *
 * ---
 *
 * === Choice Plugin Commands ===
 *
 * ---
 *
 * Choice: Properties
 *   Change the properties found in the Show Choices event command.
 *
 *   Line Height:
 *   - Change the line height for the show choices.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Rows:
 *   - Maximum number of choice rows to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Columns:
 *   - Maximum number of choice columns to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Text Alignment:
 *   - Text alignment for Show Choice window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings involving the message system. These settings range from
 * adjust how the Message Window looks to more intricate settings like how
 * some of the default text codes work.
 *
 * ---
 *
 * Message Window
 *
 *   Default Rows:
 *   - Default number of rows to display for the Message Window.
 *
 *   Default Width:
 *   - Default Message Window width in pixels.
 *
 *   Fast Forward Key:
 *   - This is the key used for fast forwarding messages.
 *   - WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 *
 *   Text Delay:
 *   - How many frames to wait between characters drawn?
 *   - Use 0 for instant.
 *
 *   Default Outline Width:
 *   - Changes the default outline width to this many pixels thick.
 *
 * ---
 *
 * Name Box Window
 *
 *   Default Color:
 *   - Default color for the Name Box Window's text.
 *
 *   Offset X:
 *   - How much to offset the name box window X by
 *     (as long as it doesn't go offscreen).
 *
 *   Offset Y:
 *   - How much to offset the name box window Y by
 *     (as long as it doesn't go offscreen).
 *
 * ---
 *
 * Choice List Window
 *
 *   Line Height:
 *   - What is the default line height for Show Choices?
 *
 *   Max Rows:
 *   - Maximum number of rows to visibly display?
 *
 *   Max Columns:
 *   - Maximum number of columns to visibly display?
 *
 *   Text Alignment:
 *   - Default alignment for Show Choice window.
 *
 * ---
 *
 * Default Text Codes
 *
 *   Relative \PX \PY:
 *   - Make \PX[x] and \PY[x] adjust relative starting position than
 *     exact coordinates.
 *
 *   \{ Maximum:
 *   - Determine the maximum size that \{ can reach.
 *
 *   \} Minimum:
 *   - Determine the minimum size that \} can reach.
 *
 *   \{ Change \}
 *   - How much does \{ and \} change font size by?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto-Color Settings
 * ============================================================================
 *
 * For certain windows such as the Message Window, Help Window, and Choice
 * Window, Auto-Color is enabled to automatically highlight and color certain
 * database entries, keywords, and just about anything you, the game dev, wants
 * to be automatically colored. This is done to avoid typing out \C[6]Jack\C[0]
 * every time Jack's name is written out as it will be automatically colored in
 * those specific windows.
 *
 * The Plugin Parameters will give you full reign over which database entries
 * and keywords you want to be automatically colored as long as they follow a
 * few rules:
 *
 * -----------------
 * Auto-Color Rules:
 * -----------------
 *
 * 1. Database names and keywords are case sensitive.
 *    This means if "Potion" is a marked keyword, typing out "potion" will not
 *    prompt the auto-color to highlight "potion". You must add the lowercase
 *    version of the word into the keyword list if you want it to count.
 *
 * 2. Database names and keywords are exact size (for Roman languages)
 *    This means if "Potion" is a marked keyword, typing out "potions" will not
 *    prompt the auto-color to highlight "potions". You must type out all of
 *    the variations of the words you want affected into the keyword list to
 *    prompt the auto-color highlight.
 *
 *    This does not apply to Japanese, Korean, or Chinese languages.
 *
 * 3. Possessive cases and other language symbols aren't counted.
 *    Symbols such as periods, commas, quotes, parentheses, and similar symbols
 *    do no count towards Rule 2. This means if "Potion" is a marked keyword,
 *    the typing out "(Potion)" will still highlight the "Potion" part of the
 *    word according to the auto-color.
 *
 * 4. Names with special characters like !, ?, [, ], etc. will be ignored.
 *    These cause conflicts with how auto-colors are detected.
 *
 * ---
 *
 * Database Highlighting
 *
 *   Actors:
 *   Classes:
 *   Skills:
 *   Items:
 *   Weapons:
 *   Armors:
 *   Enemies:
 *   States:
 *   - Any usage of a the selected database entry's name is auto-colored with
 *     the text code number.
 *   - Use 0 to not auto-color.
 *
 * ---
 *
 * Word Highlighting
 *
 *   \C[x]: Color
 *   - These are lists of all the words that will be automatically colored with
 *     the x text color.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Actions
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * performing actions. These actions can be done through each JavaScript or by
 * a common event (if it is used in the Message Window). Adequate knowledge of
 * both is recommended before attempting to modify and/or add new Text Code
 * Actions to the Plugin Parameters.
 *
 * Each of the Text Code Actions are formatted in such a way:
 *
 * ---
 *
 * Text Code Action
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   Common Event:
 *   - Select a common event to run when this text code is used in a message.
 *
 *   JS: Action:
 *   - JavaScript code used to perform an action when this text code appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Replacements
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * replacing the text codes with text data. Text data can be replaced with
 * an exact exchange of text or dynamically through JavaScript. Adding a new
 * Text Code Replacement is done through the Plugin Parameters.
 *
 * Each of the Text Code Replacements are formatted in such a way:
 *
 * ---
 *
 * Text Code Replacement
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   STR: Text:
 *   - The text that will appear if this match appears.
 *     If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     match appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Macros
 * ============================================================================
 *
 * Text macros are used in similar fashion to text codes replacements to
 * replace themselves with text data. The primary difference is that macros are
 * made in a different format with no conditional argument modifiers (ie the
 * [x] that follows a text code).
 *
 * To use a text macro, type in the matching keyword between two [brackets] and
 * it will be replaced by the string data or run the JavaScript code found in
 * the Plugin Parameter settings.
 *
 * For example, if you have the text macro "Leader", made to return the party
 * leader's name, you can type in [Leader] in the Message Window and it will be
 * replaced with the party leader's name. The output can also output text codes
 * into the resulting text.
 *
 * This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 * Use the method stated before with the brackets to [MacroName] instead.
 *
 * Each of the Text Macros are formatted in such a way:
 *
 * ---
 *
 * Text Macro
 *
 *   Match:
 *   - This is what needs to be matched in order for this macro to work.
 *   - In [Leader], this would be the 'Leader' text.
 *
 *   STR: Text:
 *   - The replacement text that will appear from the macro.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     macro appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Speed Option Settings
 * ============================================================================
 *
 * Modern RPG's on the market have the option to adjust the message speed rate
 * for players. These Plugin Parameters allow you to add that option to the
 * Options Menu as well.
 *
 * ---
 *
 * Text Speed Option Settings
 *
 *   Add Option?:
 *   - Add the 'Text Speed' option to the Options menu?
 *
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 *
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - 1 - 10, slowest to fastest.
 *   - 11 is instant value.
 *
 *   Instant Speed:
 *   - Text to show "instant" text.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Word Wrap Settings
 * ============================================================================
 *
 * Word wrap is a property that will cause any overflowing text to wrap around
 * and move into the next line. This property can only be enabled inside text
 * that accept text codes, such as the Message Window and Help Window. However,
 * word wrap is disabled for the Choice Window due to the nature of the Choice
 * Window's base properties.
 *
 * Word wrap can be enabled or disabled in three ways. One is by using the text
 * code <WordWrap> to enable it or </WordWrap> to disable it. The second method
 * is by enabling it with the Plugin Command: 'Message: Properties'. The third
 * method is by enabling it by default with the Plugin Parameters.
 *
 * ---
 *
 * Enable Word Wrap
 *
 *   Message Window:
 *   - Automatically enable Word Wrap for this window?
 *
 *   Help Window:
 *   - Automatically enable Word Wrap for this window?
 *
 * ---
 *
 * Rules
 *
 *   Link Break -> Space:
 *   - Convert manually placed (non tagged) line breaks with spaces?
 *   - Line breaks must be inserted using the <br> text code.
 *
 *   Tight Wrap:
 *   - If a face graphic is present in a message, word wrap will be tighter.
 *
 *   End Padding:
 *   - Add extra padding to your window to make text wrap further away from the
 *     end of the window.
 *   - This will default to 0.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 *
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 *
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 *
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 *
 * If you are using this plugin, credit the following people in your game:
 *
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.29: October 21, 2021
 * * Feature Update
 * ** Word Wrap flags are now properly adjusted when converting macros and
 *    adding bypasses towards regular messages. Update by Irina.
 *
 * Version 1.28: October 14, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 *
 * Version 1.27: October 7, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 *
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** Macros should now work properly with any \x<n> based text codes.
 *    Fix made by Irina.
 *
 * Version 1.25: August 27, 2021
 * * Feature Update!
 * ** Macros should now work with the <WordWrap> text code. Update by Irina.
 *
 * Version 1.24: August 20, 2021
 * * Feature Update!
 * ** Macros should now work with window placement and resize options.
 *    Update made by Irina.
 * ** Macros should now work with choice-related enable and visibility options.
 *    Update made by Irina.
 *
 * Version 1.23: July 16, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Word Wrap Settings > End Padding
 * **** Add extra padding to your window to make text wrap further away from
 *      the end of the window. This will default to 0.
 *
 * Version 1.22: July 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Text Codes added by Irina and sponsored by AndyL:
 * *** <Current Battle Target>
 * *** <Current Battle User>
 * **** Replaces the text code with the current target or current user's name
 *      in-battle. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * *** <Current Battle Action>
 * *** <Current Battle Action Name>
 * **** Replaces the text code with the current battle action's name with the
 *      icon or without it respectively. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 *
 * Version 1.21: June 4, 2021
 * * Documentation Update!
 * ** Added extra note to the new <Position: x, y, width, height> text codes
 *    that they do not work with Word Wrap.
 * * Feature Update!
 * ** Added fail safe for preventing Common Events that don't exist from being
 *    ran at all by the Message Window. Added by Arisu.
 *
 * Version 1.20: May 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added additional clarity for \WindowMoveTo<?> and \WindowMoveBy<?> and
 *    \WindowReset text codes with "Note 2".
 * *** Replace '?' with the following format: targetX, targetY, targetWidth,
 *     targetHeight, duration, easingType. Only targetX and targetY are
 *     required arguments. These will only alter the window dimensions when the
 *     text has arrived at that point. They will not alter the window
 *     preemptively. This is not used as a window positioner. Use the
 *     <Position: x, y, width, height> text code for that.
 * * New Features!
 * ** New hard-coded text codes added for Message Window Only. Added by Irina.
 * *** <Position: x, y, width, height>
 * *** <Coordinates: x, y>
 * *** <Dimensions: width, height>
 *
 * Version 1.19: May 14, 2021
 * * Feature Updates!
 * ** <br> line breaks can now be used by Show Choices. Make sure that there is
 *    enough room to contain the text through Plugin Commands. Update by Irina.
 *
 * Version 1.18: April 30, 2021
 * * Bug Fixes!
 * ** Moving windows with 0 duration via text code should now instantly move
 *    the windows to the desired location with no delay. Fix made by Olivia.
 *
 * Version 1.17: April 9, 2021
 * * Feature Update!
 * ** <Auto> text codes for message windows will round up calculations for the
 *    message width to the nearest even number for better calculations.
 *
 * Version 1.16: April 2, 2021
 * * Bug Fixes!
 * ** \CommonEvent[x] text code will no longer run upon message window size
 *    calculation. Fix made by Arisu.
 * * Documentation Update!
 * ** Added further clarification for "Text Macros" section.
 * *** This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 *     Use the method stated before with the brackets to [MacroName] instead.
 *
 * Version 1.15: March 5, 2021
 * * Bug Fixes!
 * ** Hidden choices by switches will no longer count towards the maximum line
 *    count for Show Choice options. Fix made by Irina.
 *
 * Version 1.14: February 12, 2021
 * * Bug Fixes!
 * ** Auto positioned messages in battle will no longer cover the battler in
 *    question. Fix made by Irina.
 *
 * Version 1.13: February 5, 2021
 * * Bug Fixes!
 * ** Choice List Window with a dimmed background should now have a more
 *    consistent sized dim sprite. Fix made by Irina.
 *
 * Version 1.12: January 22, 2021
 * * Feature Update!
 * ** Name Box Window Default Color is now disabled by default to 0 because
 *    users do not understand why their names are showing up yellow and did not
 *    bother reading the documentation. If users want this feature turned on,
 *    they will have to do it manually from now on. Update made by Irina.
 *
 * Version 1.11: January 15, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 *
 * Version 1.10: January 8, 2021
 * * Bug Fixes!
 * ** <Auto Actor: x> and <Auto Party: x> text codes should now work properly.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Auto Color Plugin Parameters now have their default settings set to 0.
 *    This is due to an influx of "bug reports" from users who do not
 *    understand how this feature works, and the VisuStella team has decided it
 *    is better for the feature to default to an inactive state until users
 *    decide to search and utilize it themselves. Update made by Irina.
 *
 * Version 1.09: January 1, 2021
 * * Feature Update!
 * ** Auto-color no longer applies to database names that are only numbers.
 *    Auto-color entries that are only numbers will also be ignored. This is to
 *    prevent breaking the text code parsing. Update made by Yanfly.
 *
 * Version 1.08: November 15, 2020
 * * Documentation Update!
 * ** Some text codes left for the Name Box Window have been accidentally left
 *    out. These text codes allow for the positioning of the Name Box Window.
 *    Also, added to this section are the \NormalBG, \DimBG, and \TransparentBG
 *    text codes since people have been asking for how to change the name box
 *    window's background, but have skimmed over those text codes in different
 *    sections of the help file.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 *
 * Version 1.07: November 8, 2020
 * * Bug Fixes!
 * ** When using auto size functions, the message pause symbol will no longer
 *    appear semi-transparent the whole time. Fix made by Irina.
 *
 * Version 1.06: October 25, 2020
 * * Documentation Update!
 * ** Added a warning message to the Fast Forward Key plugin parameter:
 * *** WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 * ** Updated help file for new features.
 * * Feature Update!
 * ** The default Fast Forward Key setting has now been changed from "Shift" to
 *    "Page Down". Change made by Yanfly
 * * New Feature!
 * ** New Plugin Parameter added by Irina.
 * *** Plugin Parameters > General > Default Outline Width
 * **** Changes the default outline width to this many pixels thick.
 *
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Setting an actor's autocolor will now disable it from \N[x] and \P[x]
 *    text codes. Fix made by Irina.
 *
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Auto Position text codes not place positions properly if the screen width
 *    and height differ from the box width and box height. Fix made by Irina.
 *
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Word wrap no longer affects specific battle messages. Fix made by Irina.
 * ** Word wrap now updates properly after using the 'Message: Properties'
 *    Plugin Command. Fix made by Arisu.
 *
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Autoplacement of the name box window now takes its offset Y setting into
 *    account before sending it to the bottom of the message window. Fix made
 *    by Yanfly.
 * ** Added automatic feature setting to turn off word wrap when using the
 *    auto-size and auto-position text codes. This is because the auto-size and
 *    auto-position effects don't work properly with Word Wrap based on how
 *    they both clash when adjusting the window settings. Fix made by Irina.
 * ** New message pages after auto-sizing no longer put out empty messages.
 *    Fix made by Irina and Shiro.
 * * Documentation Update!
 * ** Extended the note for auto-size and auto-position text codes to include
 *    that they do not work with Word Wrap. Added by Irina.
 *
 * Version 1.02: August 30, 2020
 * * New Features!
 * ** Added new hard-coded text codes for auto-sizing and auto-positioning:
 * *** <Auto>, <Auto Width>, <Auto Height>
 * *** <Auto Actor: x>, <Auto Party: x>, <Auto Enemy: x>
 * *** <Auto Player>, <Auto Actor: x>, <Auto Party: x>, <Auto Event: x>
 * **** New features added by Irina.
 *
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** </Wordwrap> now works.
 * ** \ActorFace[x] text code now fixed.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Text Code Replacements > ActorFace >
 *     JS: Text > and changing "$gameActors.actor(1)" to
 *     "$gameActors.actor(actorId)"
 * ** Actors with empty names would cause auto hightlight problems. Fixed!
 * ** Auto-colors now ignore names with special characters like !, ?, [, ], and
 *    so on.
 * ** Line break spacing fixed.
 * * New Features!
 * ** Wordwrap now works with <left>, <center> and <right> alignment tags.
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MessageWindowProperties
 * @text Message: Properties
 * @desc Change the various properties of the Message Window.
 *
 * @arg Rows:num
 * @text Rows
 * @type number
 * @min 0
 * @desc Change the number of Message Window rows.
 * Leave at 0 to keep it unchanged.
 * @default 4
 *
 * @arg Width:num
 * @text Width
 * @type number
 * @min 0
 * @desc Change the Message Window width in pixels.
 * Leave at 0 to keep it unchanged.
 * @default 816
 *
 * @arg Center:eval
 * @text Center Window X?
 * @parent Width
 * @type boolean
 * @on Center
 * @off Don't
 * @desc Center the window X after changing its width?
 * @default true
 *
 * @arg WordWrap:str
 * @text Word Wrap
 * @type select
 * @option No Change
 * @value No Change
 * @option Enable
 * @value true
 * @option Disable
 * @value false
 * @desc Enable or disable Word Wrap for the Message Window?
 * @default No Change
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowProperties
 * @text Choices: Properties
 * @desc Change the properties found in the Show Choices event command.
 *
 * @arg LineHeight:num
 * @text Line Height
 * @type number
 * @min 0
 * @desc Change the line height for the show choices.
 * Leave at 0 to keep this unchanged.
 * @default 36
 *
 * @arg MaxRows:num
 * @text Max Rows
 * @type number
 * @min 0
 * @desc Maximum number of choice rows to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 8
 *
 * @arg MaxCols:num
 * @text Max Columns
 * @type number
 * @min 0
 * @desc Maximum number of choice columns to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 1
 *
 * @arg TextAlign:str
 * @text Text Alignment
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Text alignment for Show Choice window.
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param MessageCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings involving the message system.
 * @default {"MessageWindow":"","MessageRows:num":"4","MessageWidth:num":"816","FastForwardKey:str":"pagedown","MessageTextDelay:num":"1","StretchDimmedBg:eval":"true","DefaultOutlineWidth:num":"3","NameBoxWindow":"","NameBoxWindowDefaultColor:num":"0","NameBoxWindowOffsetX:num":"0","NameBoxWindowOffsetY:num":"0","ChoiceListWindow":"","ChoiceWindowLineHeight:num":"36","ChoiceWindowMaxRows:num":"8","ChoiceWindowMaxCols:num":"1","ChoiceWindowTextAlign:str":"default","DefaultTextCodes":"","RelativePXPY:eval":"true","FontBiggerCap:eval":"108","FontSmallerCap:eval":"12","FontChangeValue:eval":"12"}
 *
 * @param AutoColor:struct
 * @text Auto-Color Settings
 * @type struct<AutoColor>
 * @desc Automatically color certain keywords a specific way.
 * @default {"DatabaseHighlighting":"","Actors:str":"0","Classes:str":"0","Skills:str":"0","Items:str":"0","Weapons:str":"0","Armors:str":"0","Enemies:str":"0","States:str":"0","WordHighlighting":"","TextColor1:arraystr":"[]","TextColor2:arraystr":"[]","TextColor3:arraystr":"[]","TextColor4:arraystr":"[]","TextColor5:arraystr":"[]","TextColor6:arraystr":"[]","TextColor7:arraystr":"[]","TextColor8:arraystr":"[]","TextColor9:arraystr":"[]","TextColor10:arraystr":"[]","TextColor11:arraystr":"[]","TextColor12:arraystr":"[]","TextColor13:arraystr":"[]","TextColor14:arraystr":"[]","TextColor15:arraystr":"[]","TextColor16:arraystr":"[]","TextColor17:arraystr":"[]","TextColor18:arraystr":"[]","TextColor19:arraystr":"[]","TextColor20:arraystr":"[]","TextColor21:arraystr":"[]","TextColor22:arraystr":"[]","TextColor23:arraystr":"[]","TextColor24:arraystr":"[]","TextColor25:arraystr":"[]","TextColor26:arraystr":"[]","TextColor27:arraystr":"[]","TextColor28:arraystr":"[]","TextColor29:arraystr":"[]","TextColor30:arraystr":"[]","TextColor31:arraystr":"[]"}
 *
 * @param TextCodeActions:arraystruct
 * @text Text Code Actions
 * @type struct<TextCodeAction>[]
 * @desc Text codes that perform actions.
 * @default ["{\"Match:str\":\"ChangeFace\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const filename = data[0].trim();\\\\n    const index = parseInt(data[1] || '0');\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"FaceIndex\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    const filename = $gameMessage.faceName();\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"TextDelay\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst delay = this.obtainEscapeParam(textState);\\\\nif (textState.drawing && this.constructor === Window_Message) {\\\\n    this.setTextDelay(delay);\\\\n}\\\"\"}","{\"Match:str\":\"NormalBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(0);\\\\n}\\\"\"}","{\"Match:str\":\"DimBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(1);\\\\n}\\\"\"}","{\"Match:str\":\"TransparentBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(2);\\\\n}\\\"\"}","{\"Match:str\":\"FontChange\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst fontName = this.obtainEscapeString(textState);\\\\nthis.contents.fontFace = fontName;\\\"\"}","{\"Match:str\":\"ResetFont\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetFontSettings();\\\"\"}","{\"Match:str\":\"ResetColor\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetTextColor();\\\"\"}","{\"Match:str\":\"HexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeTextColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineColor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst colorIndex = this.obtainEscapeParam(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(ColorManager.textColor(colorIndex));\\\\n}\\\"\"}","{\"Match:str\":\"OutlineHexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineWidth\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst width = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    this.contents.outlineWidth = width;\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveTo\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : this.x;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : this.y;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : this.width;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : this.height;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveTo(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveBy\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : 0;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : 0;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : 0;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : 0;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveBy(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowReset\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    const frames = 20;\\\\n    const easingType = 0;\\\\n    this.resetRect(frames, easingType);\\\\n}\\\"\"}"]
 *
 * @param TextCodeReplace:arraystruct
 * @text Text Code Replacements
 * @type struct<TextCodeReplace>[]
 * @desc Text codes that replace themselves with text.
 * @default ["{\"Match:str\":\"ActorFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const actorId = parseInt(arguments[1]);\\\\nconst actor = $gameActors.actor(actorId);\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"PartyFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const index = parseInt(arguments[1]) - 1;\\\\nconst actor = $gameParty.members()[index];\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"Class\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ClassName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Skill\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"SkillName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Item\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Weapon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"LastGainObj\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = true;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjName\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = false;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjQuantity\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectQuantity();\\\"\"}","{\"Match:str\":\"Armor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"State\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"StateName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Enemy\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"EnemyName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Troop\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMember\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMemberName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}"]
 *
 * @param TextMacros:arraystruct
 * @text Text Macros
 * @type struct<TextMacro>[]
 * @desc Macros that are used to quickly write batches of text.
 * @default ["{\"Match:str\":\"Example Macro\",\"TextStr:str\":\"This is the text that will be displayed when you type [Example Macro].\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}","{\"Match:str\":\"Leader\",\"TextStr:str\":\"\\\\P[1]\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}"]
 *
 * @param TextSpeed:struct
 * @text Text Speed Option Settings
 * @type struct<TextSpeed>
 * @desc Text Speed Options Menu settings.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Speed","Default:num":"10","Instant:str":"Instant"}
 *
 * @param WordWrap:struct
 * @text Word Wrap Settings
 * @type struct<WordWrap>
 * @desc Settings involving Word Wrap.
 * @default {"EnableWordWrap":"","MessageWindow:eval":"false","HelpWindow:eval":"false","Rules":"","LineBreakSpace:eval":"true","TightWrap:eval":"false","EndPadding:num":"0"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param MessageWindow
 * @text Message Window
 *
 * @param MessageRows:num
 * @text Default Rows
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default number of rows to display for the Message Window.
 * @default 4
 *
 * @param MessageWidth:num
 * @text Default Width
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default Message Window width in pixels.
 * @default 816
 *
 * @param FastForwardKey:str
 * @text Fast Forward Key
 * @parent MessageWindow
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for fast forwarding messages.
 * @default pagedown
 *
 * @param MessageTextDelay:num
 * @text Text Delay
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc How many frames to wait between characters drawn?
 * Use 0 for instant.
 * @default 1
 *
 * @param StretchDimmedBg:eval
 * @text Stretch Dimmed BG
 * @parent MessageWindow
 * @type boolean
 * @on Stretch
 * @off Don't
 * @desc Stretch dimmed window background to fit the whole screen.
 * @default true
 *
 * @param DefaultOutlineWidth:num
 * @text Default Outline Width
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc Changes the default outline width to this many pixels thick.
 * @default 3
 *
 * @param NameBoxWindow
 * @text Name Box Window
 *
 * @param NameBoxWindowDefaultColor:num
 * @text Default Color
 * @parent NameBoxWindow
 * @min 0
 * @max 31
 * @desc Default color for the Name Box Window's text.
 * @default 0
 *
 * @param NameBoxWindowOffsetX:num
 * @text Offset X
 * @parent NameBoxWindow
 * @desc How much to offset the name box window X by (as long as it doesn't go offscreen).
 * @default 0
 *
 * @param NameBoxWindowOffsetY:num
 * @text Offset Y
 * @parent NameBoxWindow
 * @desc How much to offset the name box window Y by (as long as it doesn't go offscreen).
 * @default 0
 *
 * @param ChoiceListWindow
 * @text Choice List Window
 *
 * @param ChoiceWindowLineHeight:num
 * @text Line Height
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc What is the default line height for Show Choices?
 * @default 36
 *
 * @param ChoiceWindowMaxRows:num
 * @text Max Rows
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of rows to visibly display?
 * @default 8
 *
 * @param ChoiceWindowMaxCols:num
 * @text Max Columns
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of columns to visibly display?
 * @default 1
 *
 * @param ChoiceWindowTextAlign:str
 * @text Text Alignment
 * @parent ChoiceListWindow
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Default alignment for Show Choice window.
 * @default default
 *
 * @param DefaultTextCodes
 * @text Default Text Codes
 *
 * @param RelativePXPY:eval
 * @text Relative \PX \PY
 * @parent DefaultTextCodes
 * @type boolean
 * @on Better
 * @off Normal
 * @desc Make \PX[x] and \PY[x] adjust relative starting position than exact coordinates.
 * @default true
 *
 * @param FontBiggerCap:eval
 * @text \{ Maximum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the maximum size that \{ can reach.
 * @default 108
 *
 * @param FontSmallerCap:eval
 * @text \} Minimum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the minimum size that \} can reach.
 * @default 12
 *
 * @param FontChangeValue:eval
 * @text \{ Change \}
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc How much does \{ and \} change font size by?
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Auto Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoColor:
 *
 * @param DatabaseHighlighting
 * @text Database Highlighting
 *
 * @param Actors:str
 * @text Actors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Actor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Classes:str
 * @text Classes
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Class's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Skills:str
 * @text Skills
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Skill's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Items:str
 * @text Items
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Item's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Weapons:str
 * @text Weapons
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Weapon's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Armors:str
 * @text Armors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Armor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Enemies:str
 * @text Enemies
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Enemy's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param States:str
 * @text States
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a State's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param WordHighlighting
 * @text Word Highlighting
 *
 * @param TextColor1:arraystr
 * @text \C[1]: Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor2:arraystr
 * @text \C[2]: Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor3:arraystr
 * @text \C[3]: Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor4:arraystr
 * @text \C[4]: Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor5:arraystr
 * @text \C[5]: Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor6:arraystr
 * @text \C[6]: Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor7:arraystr
 * @text \C[7]: Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor8:arraystr
 * @text \C[8]: Light Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor9:arraystr
 * @text \C[9]: Dark Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor10:arraystr
 * @text \C[10]: Dark Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor11:arraystr
 * @text \C[11]: Dark Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor12:arraystr
 * @text \C[12]: Dark Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor13:arraystr
 * @text \C[13]: Dark Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor14:arraystr
 * @text \C[14]: Solid Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor15:arraystr
 * @text \C[15]: Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor16:arraystr
 * @text \C[16]: System Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor17:arraystr
 * @text \C[17]: Crisis Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor18:arraystr
 * @text \C[18]: Dead Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor19:arraystr
 * @text \C[19]: Outline Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor20:arraystr
 * @text \C[20]: HP Orange 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor21:arraystr
 * @text \C[21]: HP Orange 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor22:arraystr
 * @text \C[22]: MP Blue 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor23:arraystr
 * @text \C[23]: MP Blue 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor24:arraystr
 * @text \C[24]: Param Up Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor25:arraystr
 * @text \C[25]: Param Down Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor26:arraystr
 * @text \C[26]: System Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor27:arraystr
 * @text \C[27]: System Pink
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor28:arraystr
 * @text \C[28]: TP Green 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor29:arraystr
 * @text \C[29]: TP Green 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor30:arraystr
 * @text \C[30]: EXP Purple 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor31:arraystr
 * @text \C[31]: EXP Purple 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Actions
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeAction:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default
 *
 * @param CommonEvent:num
 * @text Common Event
 * @type common_event
 * @desc Select a common event to run when this text code is used in a message.
 * @default 0
 *
 * @param ActionJS:func
 * @text JS: Action
 * @type note
 * @desc JavaScript code used to perform an action when this text code appears.
 * @default "const textState = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Replacements
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeReplace:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The text that will appear if this match appears.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this match appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Macro
 * ----------------------------------------------------------------------------
 */
/*~struct~TextMacro:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this macro to work.
 * @default Key
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The replacement text that will appear from the macro.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this macro appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Speed Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TextSpeed:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Text Speed' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @desc Command name of the option.
 * @default Text Speed
 *
 * @param Default:num
 * @text Default Value
 * @type number
 * @min 1
 * @max 11
 * @desc 1 - 10, slowest to fastest.
 * 11 is instant value.
 * @default 10
 *
 * @param Instant:str
 * @text Instant Speed
 * @desc Text to show "instant" text.
 * @default Instant
 *
 */
/* ----------------------------------------------------------------------------
 * Word Wrap Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WordWrap:
 *
 * @param EnableWordWrap
 * @text Enable Word Wrap
 *
 * @param MessageWindow:eval
 * @text Message Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param HelpWindow:eval
 * @text Help Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param Rules
 * @text Rules
 *
 * @param LineBreakSpace:eval
 * @text Link Break -> Space
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Convert manually placed (non tagged) line breaks with spaces?
 * @default true
 *
 * @param TightWrap:eval
 * @text Tight Wrap
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc If a face graphic is present in a message, word wrap will be tighter.
 * @default false
 *
 * @param EndPadding:num
 * @text End Padding
 * @parent Rules
 * @type number
 * @desc Add extra padding to your window to make text wrap further away from the end of the window.
 * @default 0
 *
 */
//=============================================================================

const _0x276037 = _0x41c9;
(function (_0x1c9b86, _0x4164a3) {
  const _0x1c5f81 = _0x41c9,
    _0x2b6deb = _0x1c9b86();
  while (!![]) {
    try {
      const _0x5f005d =
        parseInt(_0x1c5f81(0x297)) / 0x1 +
        (-parseInt(_0x1c5f81(0x175)) / 0x2) *
          (parseInt(_0x1c5f81(0x1a7)) / 0x3) +
        -parseInt(_0x1c5f81(0x2bf)) / 0x4 +
        parseInt(_0x1c5f81(0x153)) / 0x5 +
        parseInt(_0x1c5f81(0x347)) / 0x6 +
        (parseInt(_0x1c5f81(0x287)) / 0x7) *
          (parseInt(_0x1c5f81(0x21b)) / 0x8) +
        (-parseInt(_0x1c5f81(0x1da)) / 0x9) *
          (-parseInt(_0x1c5f81(0x26c)) / 0xa);
      if (_0x5f005d === _0x4164a3) break;
      else _0x2b6deb["push"](_0x2b6deb["shift"]());
    } catch (_0x52326d) {
      _0x2b6deb["push"](_0x2b6deb["shift"]());
    }
  }
})(_0x3acf, 0x2a09c);
function _0x3acf() {
  const _0x54e657 = [
    "ParseSkillNotetags",
    "choicePositionType",
    "convertShowChoiceEscapeCodes",
    "XCQrq",
    "TextMacros",
    "registerResetRect",
    "databaseObjectName",
    "prepareShowTextCommand",
    "isTriggered",
    "convertMessageCoreEscapeReplacements",
    "MessageCore",
    "processAllText",
    "_autoColorActorNames",
    "none",
    "isWordWrapEnabled",
    "ChoiceWindowMaxRows",
    "message",
    "addContinuousShowTextCommands",
    "setMessageWindowWidth",
    "convertBackslashCharacters",
    "_moveTargetWidth",
    "maxLines",
    "QNVSg",
    "resetFontSettings",
    "toUpperCase",
    "_scene",
    "_centerMessageWindow",
    "return\x200",
    "pWuoO",
    "ActionJS",
    "min",
    "8MjzoaQ",
    "getChoiceListTextAlign",
    "addGeneralOptions",
    "prototype",
    "lVWxp",
    "</CENTER>",
    "registerCommand",
    "width",
    "EQEfv",
    "jQhYN",
    "processDrawPicture",
    "floor",
    "</RIGHT>",
    "drawBackPicture",
    "process_VisuMZ_MessageCore_AutoColor",
    "_autoPosRegExp",
    "Poflc",
    "Game_Party_gainItem",
    "initMessageCore",
    "faceName",
    "updatePlacement",
    "Window_Base_initialize",
    "EbfWJ",
    "value",
    "resetWordWrap",
    "_forcedPosition",
    "actorName",
    "Window_Help_refresh",
    "_data",
    "_action",
    "oNwwN",
    "QCddh",
    "fontSize",
    "list",
    "processAutoColorWords",
    "push",
    "_index",
    "FontSmallerCap",
    "Game_Party_initialize",
    "levelUp",
    "TEXTALIGNMENT",
    "calcWindowHeight",
    "filter",
    "messageRows",
    "battleTargetName",
    "\x1bCOLORLOCK[1]",
    "lastGainedObjectName",
    "updateMessageCommonEvents",
    "emerge",
    "changeOutlineColor",
    "iconIndex",
    "General",
    "ParseWeaponNotetags",
    "<CENTER>",
    "battle\x20party",
    "windowWidth",
    "BOLD",
    "TextColor%1",
    "GjmLo",
    "Window_Options_changeVolume",
    "isItem",
    "LineHeight",
    "ConvertParams",
    "</LEFT>",
    "isMessageWindowWordWrap",
    "openness",
    "max",
    "selectDefault",
    "lastGainedObjectQuantity",
    "CyMWK",
    "_MessageCoreSettings",
    "HzhYP",
    "makeData",
    "follower",
    "maxCommands",
    "call",
    "helpWordWrap",
    "Window_Base_processEscapeCharacter",
    "ParseStateNotetags",
    "setLastGainedItemData",
    "bUfPQ",
    "430Ienvow",
    "choiceCols",
    "moveBy",
    "TKqXQ",
    "Game_Map_setupEvents",
    "blt",
    "itemHeight",
    "_autoPositionTarget",
    "qstmm",
    "Armors",
    "process_VisuMZ_MessageCore_TextCodes_Action",
    "wDzRO",
    "IQmQL",
    "isContinuePrepareShowTextCommands",
    "StretchDimmedBg",
    "_moveTargetY",
    "toLowerCase",
    "EpxkK",
    "followers",
    "battle\x20actor",
    "obtainExp",
    "convertTextAlignmentEscapeCharacters",
    "\x1bITALIC[0]",
    "setChoiceListMaxColumns",
    "split",
    "rFvsp",
    "addLoadListener",
    "145523uhOOvn",
    "process_VisuMZ_MessageCore_TextMacros",
    "getTextAlignment",
    "XBuMV",
    "klqSO",
    "startX",
    "faceWidth",
    "convertChoiceMacros",
    "FMPot",
    "easeOut",
    "OFski",
    "isChoiceVisible",
    "_list",
    "_colorLock",
    "textSizeExTextAlignment",
    "</COLORLOCK>",
    "254256woRvmq",
    "refreshDimmerBitmap",
    "map",
    "Window_Message_clearFlags",
    "Window_Base_processNewLine",
    "\x1bI[%1]",
    "open",
    "\x1bWrapBreak[0]",
    "isSceneBattle",
    "addMessageCoreCommands",
    "ParseEnemyNotetags",
    "setup",
    "Hditb",
    "update",
    "resetRect",
    "SfwUd",
    "%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.",
    "setTextAlignment",
    "jrsCk",
    "Scene_Boot_onDatabaseLoaded",
    "Default",
    "changeVolume",
    "nSaTp",
    "obtainEscapeString",
    "remove",
    "PXdSf",
    "HelpWindow",
    "\x1bITALIC[1]",
    "STR",
    "getConfigValue",
    "processActorNameAutoColorChanges",
    "adjustShowChoiceCancel",
    "isAutoColorAffected",
    "textCodeResult",
    "contents",
    "zBxvh",
    "hscbk",
    "setChoiceListTextAlign",
    "Scene_Options_maxCommands",
    "ucmRk",
    "1375520LbtjXV",
    "ParseAllNotetags",
    "includes",
    "preConvertEscapeCharacters",
    "MessageWindowProperties",
    "processFontChangeItalic",
    "launchMessageCommonEvent",
    "returnPreservedFontSettings",
    "updateNameBoxMove",
    "MaxCols",
    "getChoiceListLineHeight",
    "onDatabaseLoaded",
    "ConvertTextAutoColorRegExpFriendly",
    "\x1bi[%1]%2",
    "processWrapBreak",
    "mVOGu",
    "eEfQv",
    "processCommonEvent",
    "isInputting",
    "setupItemChoice",
    "itemRectWithPadding",
    "_eventId",
    "ccSus",
    "updateMove",
    "resetPositionX",
    "innerWidth",
    "addedHeight",
    "getMessageWindowRows",
    "addWrapBreakAfterPunctuation",
    "currentExt",
    "false",
    "parameters",
    "yTIWu",
    "setColorLock",
    "<COLORLOCK>",
    "updateRelativePosition",
    "quantity",
    "join",
    "calcMoveEasing",
    "outlineWidth",
    "ENABLE",
    "HAxXi",
    "maxChoiceWidth",
    "_messageCommonEvents",
    "OqVBq",
    "XuLvw",
    "mORhc",
    "\x1bTEXTALIGNMENT",
    "Window_Base_update",
    "unshift",
    "_commonEventId",
    "%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.",
    "WcFZl",
    "Window_Options_addGeneralOptions",
    "sort",
    "sdIeq",
    "\x1bTEXTALIGNMENT[3]",
    "TightWrap",
    "terminateMessage",
    "SortObjectByKeyLength",
    "getChoiceListMaxColumns",
    "choiceTextAlign",
    "addCommand",
    "Window_ChoiceList_windowX",
    "Type",
    "prepareShowTextFollowups",
    "_autoSizeRegexp",
    "nCBso",
    "easeInOut",
    "lineHeight",
    "normalColor",
    "\x1bBOLD[1]",
    "Rows",
    "convertLockColorsEscapeCharacters",
    "preFlushTextState",
    "clearActorNameAutoColor",
    "numVisibleRows",
    "process_VisuMZ_MessageCore_TextCodes_Replace",
    "outputHeight",
    "processCharacter",
    "convertEscapeCharacters",
    "TWhCI",
    "wijoA",
    "\x5c%1",
    "length",
    "getPreservedFontSettings",
    "Items",
    "contentsHeight",
    "Settings",
    "CreateAutoColorRegExpListEntries",
    "add",
    "textSizeEx",
    "processFontChangeBold",
    "adjustShowChoiceDefault",
    "name",
    "TextCodeActions",
    "anchor",
    "convertHardcodedEscapeReplacements",
    "actor",
    "\x1bCOLORLOCK[0]",
    "return\x20\x27",
    "QUjYs",
    "Window_Base_processControlCharacter",
    "getMessageWindowWidth",
    "addMessageCoreTextSpeedCommand",
    "XGgjt",
    "\x1bTEXTALIGNMENT[2]",
    "updateEvents",
    "DISABLE",
    "EvkEP",
    "TextManager_message",
    "setSpeakerName",
    "loadPicture",
    "ANY",
    "AddOption",
    "parse",
    "height",
    "Jbgqv",
    "fEhSF",
    "partyMemberName",
    "JbRrP",
    "TxHOc",
    "Window_NameBox_refresh",
    "vnYbe",
    "clamp",
    "preemptive",
    "EVAL",
    "ROylP",
    "ParseClassNotetags",
    "_target",
    "ARRAYFUNC",
    "outputWidth",
    "processEscapeCharacter",
    "drawItem",
    "makeFontBigger",
    "getChoiceListMaxRows",
    "1897104RiArWQ",
    "_interpreter",
    "applyMoveEasing",
    "currencyUnit",
    "NameBoxWindowDefaultColor",
    "Match",
    "windowPadding",
    "moveTo",
    "hGGGV",
    "qUOLy",
    "_textColorStack",
    "padding",
    "processCustomWait",
    "adjustShowChoiceExtension",
    "nextEventCode",
    "updateBackground",
    "ceil",
    "TextSpeed",
    "choiceRows",
    "instantTextSpeed",
    "startWait",
    "updateOverlappingY",
    "ConfigManager_makeData",
    "CreateAutoColorRegExpLists",
    "clearCommandList",
    "KZIOw",
    "ChoiceWindowProperties",
    "setChoiceListMaxRows",
    "FastForwardKey",
    "setHelpWindowWordWrap",
    "center",
    "PICTURE",
    "setupChoices",
    "event",
    "type",
    "gainItem",
    "processNewLine",
    "code",
    "OUQMz",
    "Window_Options_isVolumeSymbol",
    "processPreviousColor",
    "_messageWindow",
    "isBreakShowTextCommands",
    "isHelpWindowWordWrap",
    "TextCodeReplace",
    "messagePositionReset",
    "substring",
    "members",
    "TextAlign",
    "_textMacroFound",
    "_textDelayCount",
    "messageWindowRect",
    "colSpacing",
    "fontItalic",
    "MGwbQ",
    "TextColor",
    "addedWidth",
    "updateForcedPlacement",
    "messageWidth",
    "TextStr",
    "NameBoxWindowOffsetX",
    "format",
    "obtainItem",
    "changeValue",
    "canMove",
    "textColor",
    "_moveTargetX",
    "CommonEvent",
    "outlineColor",
    "setupNumInput",
    "_wordWrap",
    "constructor",
    "processTextAlignmentChange",
    "aUVcI",
    "AAUas",
    "paintOpacity",
    "scale",
    "_macroBypassWordWrap",
    "processAutoSize",
    "LineBreakSpace",
    "statusText",
    "NJPhR",
    "indexOf",
    "_dimmerSprite",
    "updateOffsetPosition",
    "%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.",
    "addMessageCommonEvent",
    "YufJD",
    "victory",
    "bind",
    "isRTL",
    "Window_Base_textSizeEx",
    "applyData",
    "ieDQN",
    "createContents",
    "start",
    "Window_NameBox_updatePlacement",
    "ARRAYSTR",
    "Window_Base_processAllText",
    "round",
    "ZfHDB",
    "_moveDuration",
    "Instant",
    "yxwQX",
    "ORCGp",
    "windowX",
    "vpDqC",
    "convertVariableEscapeCharacters",
    "textSpeed",
    "battleUserName",
    "right",
    "Window_Options_statusText",
    "convertMessageCoreEscapeActions",
    "yJJEz",
    "isRunning",
    "AutoColorBypassList",
    "fontFace",
    "Width",
    "isCommandEnabled",
    "textSizeExWordWrap",
    "processDrawCenteredPicture",
    "getLastGainedItemData",
    "isChoiceEnabled",
    "ConfigManager_applyData",
    "flushTextState",
    "version",
    "innerHeight",
    "makeDeepCopy",
    "NameBoxWindowOffsetY",
    "Game_System_initialize",
    "isColorLocked",
    "convertNewPageTextStateMacros",
    "MaxRows",
    "updateTransform",
    "STRUCT",
    "rtl",
    "XhKEH",
    "Window_Message_isTriggered",
    "synchronizeNameBox",
    "drawTextEx",
    "qZGvK",
    "textCodeCheck",
    "Game_Map_updateEvents",
    "stretchDimmerSprite",
    "setMessageWindowWordWrap",
    "clearFlags",
    "setRelativePosition",
    "RifKA",
    "ARRAYNUM",
    "placeCancelButton",
    "WORD_WRAP_PADDING",
    "FUNC",
    "Undefined",
    "choiceLineHeight",
    "prepareForcedPositionEscapeCharacters",
    "_wholeMoveDuration",
    "<%1>",
    "match",
    "FontBiggerCap",
    "status",
    "obtainEscapeParam",
    "_messagePositionReset",
    "WAIT",
    "Window_Message_terminateMessage",
    "\x1bTEXTALIGNMENT[0]",
    "Window_Message_processEscapeCharacter",
    "indent",
    "startY",
    "HIwhj",
    "obtainGold",
    "drawBackCenteredPicture",
    "convertFontSettingsEscapeCharacters",
    "messageCoreTextSpeed",
    "JGWSr",
    "processStoredAutoColorChanges",
    "shift",
    "defaultColor",
    "_indent",
    "onNewPageMessageCore",
    "processPxTextCode",
    "TWIFZ",
    "outLineColor",
    "choices",
    "Ijwjm",
    "drawing",
    "1204095uxnezh",
    "RYqLx",
    "Window_ChoiceList_updatePlacement",
    "<RIGHT>",
    "map\x20actor",
    "hUGxH",
    "_moveTargetHeight",
    "(((",
    "setMessageWindowRows",
    "replace",
    "updateDimensions",
    "test",
    "_moveEasingType",
    "TextJS",
    "Window_Message_synchronizeNameBox",
    "_relativePosition",
    "processPyTextCode",
    "ParseArmorNotetags",
    "ARRAYEVAL",
    "substr",
    "maxCols",
    "onProcessCharacter",
    "bhbHP",
    "Window_Message_newPage",
    "postConvertEscapeCharacters",
    "<B>",
    "callOkHandler",
    "AddAutoColor",
    "DefaultOutlineWidth",
    "_textAlignment",
    "ParseItemNotetags",
    "tYnwN",
    "choice",
    "WKDcl",
    "4lAjTGz",
    "clampPlacementPosition",
    "<LINE\x20BREAK>",
    "updateAutoPosition",
    "changeTextSpeed",
    "isVolumeSymbol",
    "_cancelButton",
    "RelativePXPY",
    "processAutoPosition",
    "<BR>",
    "textSpeedStatusText",
    "</I>",
    "[0]",
    "\x1bC[%1]%2\x1bPREVCOLOR[0]",
    "COMMONEVENT",
    "map\x20party",
    "addExtraShowChoices",
    "currentCommand",
    "ynXwS",
    "refresh",
    "messageWordWrap",
    "makeCommandList",
    "itemPadding",
    "exnwE",
    "processMessageCoreEscapeActions",
    "HIDE",
    "AutoColorRegExp",
    "isPressed",
    "PREVCOLOR",
    "contentsBack",
    "index",
    "WordWrap",
    "XNNvB",
    "_autoSizeCheck",
    "BVhWu",
    "dkkXG",
    "messageCoreWindowX",
    "surprise",
    "PPTwg",
    "slice",
    ")))",
    "initTextAlignement",
    "sYFYi",
    "newPage",
    "States",
    "ARRAYSTRUCT",
    "NUM",
    "Weapons",
    "findTargetSprite",
    "commandSymbol",
    "500028HaLwBQ",
    "qYapo",
    "FKEIc",
    "setChoiceListLineHeight",
    "Window_Message_updatePlacement",
    "_showFast",
    "item",
    "createTextState",
    "convertTextMacros",
    "jgOuV",
    "splice",
    "prepareAutoSizeEscapeCharacters",
    "ChoiceWindowLineHeight",
    "textWidth",
    "isArmor",
    "changeTextColor",
    "akeCz",
    "Skills",
    "processTextAlignmentX",
    "cSNWM",
    "mainFontFace",
    "prepareWordWrapEscapeCharacters",
    "processControlCharacter",
    "fontBold",
    "FontChangeValue",
    "AutoColor",
    "_lastGainedItemData",
    "yabaP",
    "exec",
    "Actors",
    "Enemies",
    "commandName",
    "setTextDelay",
    "serQx",
    "postFlushTextState",
    "Game_Map_initialize",
    "addContinuousShowChoices",
    "inBattle",
    "isWeapon",
    "processFsTextCode",
    "CENTERPICTURE",
    "resetTextColor",
    "nmsOz",
    "_resetRect",
    "inputtingAction",
    "</B>",
    "_targets",
    "map\x20player",
    "_spriteset",
    "easeIn",
    "_texts",
    "3636VJBOio",
    "</WORDWRAP>",
    "yOnVF",
    "ChoiceWindowTextAlign",
    "updateAutoSizePosition",
    "SWITCHES",
    "battle\x20enemy",
    "makeFontSmaller",
    "exit",
    "left",
    "text",
    "CreateAutoColorFor",
    "_nameBoxWindow",
    "setWordWrap",
    "boxWidth",
    "kyhmS",
    "changePaintOpacity",
    "_subject",
    "Classes",
    "registerActorNameAutoColorChanges",
    "description",
    "COLORLOCK",
    "boxHeight",
    "clear",
    "cnOiL",
    "isBusy",
    "setupEvents",
    "default",
    "parseChoiceText",
    "battleActionName",
    "initialize",
    "convertBaseEscapeCharacters",
    "Ehqct",
    "trim",
  ];
  _0x3acf = function () {
    return _0x54e657;
  };
  return _0x3acf();
}
var label = _0x276037(0x206),
  tier = tier || 0x0,
  dependencies = [],
  pluginData = $plugins["filter"](function (_0x25af03) {
    const _0x23929e = _0x276037;
    return (
      _0x25af03[_0x23929e(0x139)] &&
      _0x25af03[_0x23929e(0x1ee)][_0x23929e(0x2c1)]("[" + label + "]")
    );
  })[0x0];
(VisuMZ[label][_0x276037(0x317)] = VisuMZ[label][_0x276037(0x317)] || {}),
  (VisuMZ[_0x276037(0x259)] = function (_0x5f24d1, _0x2cf291) {
    const _0x8574c6 = _0x276037;
    for (const _0x17f053 in _0x2cf291) {
      if (_0x17f053[_0x8574c6(0x137)](/(.*):(.*)/i)) {
        if (_0x8574c6(0x274) === _0x8574c6(0x274)) {
          const _0x6af81f = String(RegExp["$1"]),
            _0x1ad117 = String(RegExp["$2"])
              ["toUpperCase"]()
              [_0x8574c6(0x1fb)]();
          let _0xa0b917, _0x114f2d, _0x2167eb;
          switch (_0x1ad117) {
            case _0x8574c6(0x1a3):
              _0xa0b917 =
                _0x2cf291[_0x17f053] !== ""
                  ? Number(_0x2cf291[_0x17f053])
                  : 0x0;
              break;
            case _0x8574c6(0x12e):
              (_0x114f2d =
                _0x2cf291[_0x17f053] !== ""
                  ? JSON[_0x8574c6(0x332)](_0x2cf291[_0x17f053])
                  : []),
                (_0xa0b917 = _0x114f2d["map"]((_0x2f62a1) =>
                  Number(_0x2f62a1)
                ));
              break;
            case _0x8574c6(0x33d):
              _0xa0b917 =
                _0x2cf291[_0x17f053] !== "" ? eval(_0x2cf291[_0x17f053]) : null;
              break;
            case _0x8574c6(0x165):
              (_0x114f2d =
                _0x2cf291[_0x17f053] !== ""
                  ? JSON[_0x8574c6(0x332)](_0x2cf291[_0x17f053])
                  : []),
                (_0xa0b917 = _0x114f2d[_0x8574c6(0x299)]((_0x230c98) =>
                  eval(_0x230c98)
                ));
              break;
            case "JSON":
              _0xa0b917 =
                _0x2cf291[_0x17f053] !== ""
                  ? JSON["parse"](_0x2cf291[_0x17f053])
                  : "";
              break;
            case "ARRAYJSON":
              (_0x114f2d =
                _0x2cf291[_0x17f053] !== ""
                  ? JSON["parse"](_0x2cf291[_0x17f053])
                  : []),
                (_0xa0b917 = _0x114f2d[_0x8574c6(0x299)]((_0x75d850) =>
                  JSON["parse"](_0x75d850)
                ));
              break;
            case _0x8574c6(0x131):
              _0xa0b917 =
                _0x2cf291[_0x17f053] !== ""
                  ? new Function(JSON[_0x8574c6(0x332)](_0x2cf291[_0x17f053]))
                  : new Function(_0x8574c6(0x217));
              break;
            case _0x8574c6(0x341):
              (_0x114f2d =
                _0x2cf291[_0x17f053] !== ""
                  ? JSON[_0x8574c6(0x332)](_0x2cf291[_0x17f053])
                  : []),
                (_0xa0b917 = _0x114f2d["map"](
                  (_0x411119) => new Function(JSON[_0x8574c6(0x332)](_0x411119))
                ));
              break;
            case _0x8574c6(0x2b3):
              _0xa0b917 =
                _0x2cf291[_0x17f053] !== "" ? String(_0x2cf291[_0x17f053]) : "";
              break;
            case _0x8574c6(0xfb):
              (_0x114f2d =
                _0x2cf291[_0x17f053] !== ""
                  ? JSON["parse"](_0x2cf291[_0x17f053])
                  : []),
                (_0xa0b917 = _0x114f2d[_0x8574c6(0x299)]((_0xdc0b3f) =>
                  String(_0xdc0b3f)
                ));
              break;
            case _0x8574c6(0x120):
              (_0x2167eb =
                _0x2cf291[_0x17f053] !== ""
                  ? JSON["parse"](_0x2cf291[_0x17f053])
                  : {}),
                (_0x5f24d1[_0x6af81f] = {}),
                VisuMZ["ConvertParams"](_0x5f24d1[_0x6af81f], _0x2167eb);
              continue;
            case _0x8574c6(0x1a2):
              (_0x114f2d =
                _0x2cf291[_0x17f053] !== ""
                  ? JSON[_0x8574c6(0x332)](_0x2cf291[_0x17f053])
                  : []),
                (_0xa0b917 = _0x114f2d[_0x8574c6(0x299)]((_0x732be2) =>
                  VisuMZ[_0x8574c6(0x259)](
                    {},
                    JSON[_0x8574c6(0x332)](_0x732be2)
                  )
                ));
              break;
            default:
              continue;
          }
          _0x5f24d1[_0x6af81f] = _0xa0b917;
        } else return this[_0x8574c6(0x355)]() === 0x191;
      }
    }
    return _0x5f24d1;
  }),
  ((_0x43701d) => {
    const _0x2c817c = _0x276037,
      _0x315840 = _0x43701d["name"];
    for (const _0x3b7003 of dependencies) {
      if (!Imported[_0x3b7003]) {
        alert(_0x2c817c(0x2f2)[_0x2c817c(0x384)](_0x315840, _0x3b7003)),
          SceneManager[_0x2c817c(0x1e2)]();
        break;
      }
    }
    const _0x1fbe8b = _0x43701d[_0x2c817c(0x1ee)];
    if (_0x1fbe8b[_0x2c817c(0x137)](/\[Version[ ](.*?)\]/i)) {
      if (_0x2c817c(0x195) !== _0x2c817c(0x324)) {
        const _0x17d321 = Number(RegExp["$1"]);
        _0x17d321 !== VisuMZ[label][_0x2c817c(0x117)] &&
          (alert(_0x2c817c(0xef)["format"](_0x315840, _0x17d321)),
          SceneManager[_0x2c817c(0x1e2)]());
      } else return _0x4cde06;
    }
    if (_0x1fbe8b[_0x2c817c(0x137)](/\[Tier[ ](\d+)\]/i)) {
      if (_0x2c817c(0x1e9) === _0x2c817c(0x1e9)) {
        const _0x50e9a6 = Number(RegExp["$1"]);
        _0x50e9a6 < tier
          ? (alert(_0x2c817c(0x2a7)["format"](_0x315840, _0x50e9a6, tier)),
            SceneManager["exit"]())
          : (tier = Math[_0x2c817c(0x25d)](_0x50e9a6, tier));
      } else {
        if (!_0x3d5726[_0x206e9c]) return;
        this[_0x2c817c(0x2ea)] = this[_0x2c817c(0x2ea)] || [];
        const _0x442c92 = this[_0x2c817c(0x348)][_0x2c817c(0x2d4)],
          _0x23af0b = new _0x3f8db1(_0x5107d3, _0x442c92);
        this[_0x2c817c(0x2ea)][_0x2c817c(0x23e)](_0x23af0b);
      }
    }
    VisuMZ[_0x2c817c(0x259)](
      VisuMZ[label][_0x2c817c(0x317)],
      _0x43701d[_0x2c817c(0x2de)]
    );
  })(pluginData),
  PluginManager[_0x276037(0x221)](
    pluginData["name"],
    _0x276037(0x361),
    (_0x7de458) => {
      const _0x4b2a23 = _0x276037;
      VisuMZ[_0x4b2a23(0x259)](_0x7de458, _0x7de458);
      const _0x547fc8 =
          _0x7de458[_0x4b2a23(0x258)] || $gameSystem[_0x4b2a23(0x2c9)]() || 0x1,
        _0x207f76 =
          _0x7de458[_0x4b2a23(0x11e)] || $gameSystem[_0x4b2a23(0x346)]() || 0x1,
        _0xfdbd1c =
          _0x7de458[_0x4b2a23(0x2c8)] ||
          $gameSystem["getChoiceListMaxColumns"]() ||
          0x1,
        _0x9618e9 =
          _0x7de458[_0x4b2a23(0x377)]["toLowerCase"]() || _0x4b2a23(0x1f5);
      $gameSystem["setChoiceListLineHeight"](_0x547fc8),
        $gameSystem[_0x4b2a23(0x362)](_0x207f76),
        $gameSystem[_0x4b2a23(0x283)](_0xfdbd1c),
        $gameSystem["setChoiceListTextAlign"](_0x9618e9);
    }
  ),
  PluginManager[_0x276037(0x221)](
    pluginData[_0x276037(0x31d)],
    _0x276037(0x2c3),
    (_0x2e5aec) => {
      const _0xd57581 = _0x276037;
      VisuMZ[_0xd57581(0x259)](_0x2e5aec, _0x2e5aec);
      const _0x22e60f =
          _0x2e5aec[_0xd57581(0x307)] || $gameSystem[_0xd57581(0x2da)]() || 0x1,
        _0x2a8a22 =
          _0x2e5aec[_0xd57581(0x10f)] || $gameSystem[_0xd57581(0x326)]() || 0x1;
      $gameTemp[_0xd57581(0x216)] = _0x2e5aec["Center"] || ![];
      const _0xbe178b = _0x2e5aec[_0xd57581(0x194)]["toLowerCase"]();
      $gameSystem[_0xd57581(0x15b)](_0x22e60f),
        $gameSystem[_0xd57581(0x20e)](_0x2a8a22);
      if (["true", _0xd57581(0x2dd)]["includes"](_0xbe178b)) {
        if ("Ijwjm" !== _0xd57581(0x151))
          return (
            _0x11c64a[_0xd57581(0x1d9)][_0xd57581(0x313)] >=
              _0x154b53["getMessageWindowRows"]() &&
            this[_0xd57581(0x355)]() !== 0x191
          );
        else $gameSystem[_0xd57581(0x12a)](eval(_0xbe178b));
      }
      const _0x1c5cfd = SceneManager[_0xd57581(0x215)]["_messageWindow"];
      _0x1c5cfd &&
        (_0xd57581(0x169) !== _0xd57581(0x169)
          ? (_0x507f99["x"] += _0x3561f4[_0xd57581(0x28c)])
          : (_0x1c5cfd[_0xd57581(0x233)](),
            _0x1c5cfd[_0xd57581(0x15d)](),
            _0x1c5cfd[_0xd57581(0xf8)]()));
    }
  ),
  (VisuMZ[_0x276037(0x206)][_0x276037(0x2aa)] =
    Scene_Boot[_0x276037(0x21e)][_0x276037(0x2ca)]),
  (Scene_Boot[_0x276037(0x21e)][_0x276037(0x2ca)] = function () {
    const _0x56cd62 = _0x276037;
    VisuMZ["MessageCore"][_0x56cd62(0x2aa)][_0x56cd62(0x266)](this),
      this[_0x56cd62(0x276)](),
      this[_0x56cd62(0x30c)](),
      this[_0x56cd62(0x288)](),
      this[_0x56cd62(0x229)]();
  }),
  (VisuMZ[_0x276037(0x206)][_0x276037(0x2fa)] = function (_0x413304) {
    const _0x3fcd69 = _0x276037,
      _0x3cf137 = VisuMZ[_0x3fcd69(0x206)][_0x3fcd69(0x317)][_0x413304];
    _0x3cf137[_0x3fcd69(0x2f5)]((_0x45e353, _0x6f92f4) => {
      const _0x5c9315 = _0x3fcd69;
      if (!_0x45e353 || !_0x6f92f4) return -0x1;
      return (
        _0x6f92f4[_0x5c9315(0x34c)][_0x5c9315(0x313)] -
        _0x45e353[_0x5c9315(0x34c)]["length"]
      );
    });
  }),
  (Scene_Boot[_0x276037(0x21e)]["process_VisuMZ_MessageCore_TextCodes_Action"] =
    function () {
      const _0x6cdcfc = _0x276037;
      VisuMZ[_0x6cdcfc(0x206)][_0x6cdcfc(0x2fa)](_0x6cdcfc(0x31e));
      for (const _0x178bc1 of VisuMZ["MessageCore"][_0x6cdcfc(0x317)][
        _0x6cdcfc(0x31e)
      ]) {
        if (_0x6cdcfc(0x2ec) !== _0x6cdcfc(0x2ec))
          _0x49a192 = this[_0x6cdcfc(0x2b9)][_0x6cdcfc(0x23b)];
        else {
          (_0x178bc1[_0x6cdcfc(0x34c)] =
            _0x178bc1["Match"][_0x6cdcfc(0x214)]()),
            (_0x178bc1[_0x6cdcfc(0x127)] = new RegExp(
              "\x1b" + _0x178bc1[_0x6cdcfc(0x34c)],
              "gi"
            )),
            (_0x178bc1[_0x6cdcfc(0x2b8)] = "\x1b" + _0x178bc1["Match"]);
          if (_0x178bc1[_0x6cdcfc(0x2ff)] === "")
            _0x178bc1["textCodeResult"] += _0x6cdcfc(0x181);
        }
      }
    }),
  (Scene_Boot["prototype"][_0x276037(0x30c)] = function () {
    const _0x49b3c9 = _0x276037;
    VisuMZ[_0x49b3c9(0x206)][_0x49b3c9(0x2fa)](_0x49b3c9(0x373));
    for (const _0x5d9f6f of VisuMZ[_0x49b3c9(0x206)]["Settings"][
      _0x49b3c9(0x373)
    ]) {
      if (_0x49b3c9(0x33a) === "vnYbe") {
        _0x5d9f6f["textCodeCheck"] = new RegExp(
          "\x1b" + _0x5d9f6f[_0x49b3c9(0x34c)] + _0x5d9f6f["Type"],
          "gi"
        );
        if (
          _0x5d9f6f[_0x49b3c9(0x382)] !== "" &&
          _0x5d9f6f[_0x49b3c9(0x382)] !== _0x49b3c9(0x132)
        ) {
          if (_0x49b3c9(0x187) === _0x49b3c9(0x36d)) {
            let _0xa779a8 =
              _0x847f05[_0x49b3c9(0x21e)][_0x49b3c9(0x316)][_0x49b3c9(0x266)](
                this
              );
            return (_0xa779a8 -= this["addedHeight"]()), _0xa779a8;
          } else
            _0x5d9f6f[_0x49b3c9(0x2b8)] = new Function(
              "return\x20\x27" +
                _0x5d9f6f[_0x49b3c9(0x382)][_0x49b3c9(0x15c)](/\\/g, "\x1b") +
                "\x27"
            );
        } else {
          if ("YIdLI" !== "rkzlQ")
            _0x5d9f6f[_0x49b3c9(0x2b8)] = _0x5d9f6f["TextJS"];
          else {
            if (_0x1dfa29[_0x49b3c9(0xf4)]()) return;
            this["_relativePosition"] = this[_0x49b3c9(0x162)] || 0x0;
            const _0xb48f31 = this["_messageWindow"],
              _0x3c7b4d = _0x10abef[_0x49b3c9(0x226)](
                (_0xb48f31[_0x49b3c9(0x222)] * this[_0x49b3c9(0x162)]) / 0xa
              );
            (this["x"] =
              _0xb48f31["x"] +
              _0x3c7b4d -
              _0x453255[_0x49b3c9(0x226)](this["width"] / 0x2)),
              (this["x"] = this["x"]["clamp"](
                _0xb48f31["x"],
                _0xb48f31["x"] + _0xb48f31[_0x49b3c9(0x222)] - this["width"]
              ));
          }
        }
      } else {
        const _0x585447 = _0x213e37[_0x49b3c9(0x150)]()
            [_0x49b3c9(0x299)]((_0x509ada) => this[_0x49b3c9(0x28e)](_0x509ada))
            [_0x49b3c9(0x245)]((_0x2e8694) =>
              this[_0x49b3c9(0x292)](_0x2e8694)
            ),
          _0x14314b = _0x40ef8a[_0x49b3c9(0x357)](
            _0x585447["length"] / this[_0x49b3c9(0x167)]()
          );
        return _0x3624bb["max"](
          0x1,
          _0x2f7de9[_0x49b3c9(0x21a)](_0x14314b, this["maxLines"]())
        );
      }
    }
  }),
  (Scene_Boot[_0x276037(0x21e)][_0x276037(0x288)] = function () {
    const _0x12e4de = _0x276037;
    for (const _0x100350 of VisuMZ[_0x12e4de(0x206)][_0x12e4de(0x317)][
      _0x12e4de(0x200)
    ]) {
      if ("vQbrJ" === _0x12e4de(0x1d1)) {
        for (const _0x3df79c of _0x2569f1[_0x12e4de(0x2de)][0x0]) {
          this[_0x12e4de(0x293)][_0x461de6][_0x12e4de(0x2de)][0x0][
            _0x12e4de(0x23e)
          ](_0x3df79c);
        }
        this[_0x12e4de(0x293)][_0x12e4de(0x1b1)](this["_index"] - 0x1, 0x2);
      } else {
        _0x100350[_0x12e4de(0x127)] = new RegExp(
          "\x5c[" + _0x100350["Match"] + "\x5c]",
          "gi"
        );
        if (
          _0x100350[_0x12e4de(0x382)] !== "" &&
          _0x100350[_0x12e4de(0x382)] !== _0x12e4de(0x132)
        ) {
          if (_0x12e4de(0xf7) !== "ieDQN") {
            const _0x58e090 = this["_messageWindow"],
              _0x2ec3e2 = _0x58e090 ? _0x58e090["y"] : 0x0,
              _0x472d6c = _0x58e090 ? _0x58e090["height"] : 0x0,
              _0x3b081d = _0x5b349e[_0x12e4de(0x1f0)] / 0x2;
            return _0x2ec3e2 < _0x3b081d && _0x2ec3e2 + _0x472d6c > _0x3b081d
              ? 0x4
              : _0x44880c[_0x12e4de(0x346)]();
          } else
            _0x100350[_0x12e4de(0x2b8)] = new Function(
              _0x12e4de(0x323) +
                _0x100350[_0x12e4de(0x382)][_0x12e4de(0x15c)](/\\/g, "\x1b") +
                "\x27"
            );
        } else
          "qMPVT" !== "QXtST"
            ? (_0x100350[_0x12e4de(0x2b8)] = _0x100350[_0x12e4de(0x160)])
            : ((this["contents"][_0x12e4de(0x23b)] +=
                _0x11ba59[_0x12e4de(0x206)][_0x12e4de(0x317)]["General"][
                  _0x12e4de(0x1bf)
                ]),
              (this["contents"]["fontSize"] = _0x5d9e0c["min"](
                this[_0x12e4de(0x2b9)][_0x12e4de(0x23b)],
                _0x431dea[_0x12e4de(0x206)][_0x12e4de(0x317)][_0x12e4de(0x24e)][
                  _0x12e4de(0x138)
                ]
              )));
      }
    }
  }),
  (Scene_Boot["prototype"][_0x276037(0x229)] = function () {
    const _0x5c7a2b = _0x276037,
      _0x52532b = VisuMZ[_0x5c7a2b(0x206)][_0x5c7a2b(0x317)][_0x5c7a2b(0x1c0)];
    !VisuMZ[_0x5c7a2b(0x2c0)] &&
      (VisuMZ["MessageCore"][_0x5c7a2b(0x16e)](
        $dataClasses,
        _0x52532b["Classes"]
      ),
      VisuMZ[_0x5c7a2b(0x206)][_0x5c7a2b(0x16e)](
        $dataSkills,
        _0x52532b[_0x5c7a2b(0x1b8)]
      ),
      VisuMZ[_0x5c7a2b(0x206)][_0x5c7a2b(0x16e)](
        $dataItems,
        _0x52532b[_0x5c7a2b(0x315)]
      ),
      VisuMZ[_0x5c7a2b(0x206)]["AddAutoColor"](
        $dataWeapons,
        _0x52532b[_0x5c7a2b(0x1a4)]
      ),
      VisuMZ[_0x5c7a2b(0x206)][_0x5c7a2b(0x16e)](
        $dataArmors,
        _0x52532b[_0x5c7a2b(0x275)]
      ),
      VisuMZ["MessageCore"]["AddAutoColor"](
        $dataEnemies,
        _0x52532b[_0x5c7a2b(0x1c5)]
      ),
      VisuMZ[_0x5c7a2b(0x206)]["AddAutoColor"](
        $dataStates,
        _0x52532b[_0x5c7a2b(0x1a1)]
      )),
      VisuMZ["MessageCore"][_0x5c7a2b(0x35e)]();
  }),
  (VisuMZ[_0x276037(0x206)]["AutoColorBypassList"] = [
    "V",
    "N",
    "P",
    "C",
    "I",
    "PX",
    "PY",
    "G",
    "{",
    "}",
    "<",
    ">",
    "FS",
    "\x5c",
    "$",
    ".",
    "|",
    "!",
    "<",
    ">",
    "^",
    _0x276037(0x16c),
    _0x276037(0x1d4),
    "<I>",
    _0x276037(0x180),
    "<LEFT>",
    _0x276037(0x25a),
    _0x276037(0x250),
    _0x276037(0x220),
    _0x276037(0x156),
    _0x276037(0x227),
    _0x276037(0x2e1),
    _0x276037(0x296),
    _0x276037(0x15a),
    _0x276037(0x19d),
    "<WORDWRAP>",
    _0x276037(0x1db),
    _0x276037(0x17e),
    _0x276037(0x177),
    _0x276037(0x366),
    _0x276037(0x1cf),
    _0x276037(0x183),
    _0x276037(0x13c),
    "SHOW",
    _0x276037(0x18e),
    _0x276037(0x2e7),
    _0x276037(0x32b),
    "SWITCH",
    _0x276037(0x1df),
    "ALL",
    _0x276037(0x330),
  ]),
  (VisuMZ[_0x276037(0x206)][_0x276037(0x16e)] = function (
    _0x5e2422,
    _0x5c84fd
  ) {
    const _0x32dcd3 = _0x276037;
    if (_0x5c84fd <= 0x0) return;
    const _0x599b12 = _0x5e2422;
    for (const _0xec4ab5 of _0x599b12) {
      if ("qqYGF" !== _0x32dcd3(0x2b0)) {
        if (!_0xec4ab5) continue;
        VisuMZ[_0x32dcd3(0x206)]["CreateAutoColorFor"](_0xec4ab5, _0x5c84fd);
      } else
        this[_0x32dcd3(0x379)]--,
          this[_0x32dcd3(0x379)] <= 0x0 &&
            (this[_0x32dcd3(0x168)](_0x4fb370),
            _0x329aa7["prototype"]["processCharacter"]["call"](
              this,
              _0x478260
            ));
    }
  }),
  (VisuMZ["MessageCore"][_0x276037(0x35e)] = function () {
    const _0x566002 = _0x276037;
    VisuMZ[_0x566002(0x206)]["AutoColorRegExp"] = [];
    for (let _0x372823 = 0x1; _0x372823 <= 0x1f; _0x372823++) {
      if (_0x566002(0x1f2) === "IKwqe")
        _0x121892[_0x566002(0x206)]["Window_Message_processEscapeCharacter"][
          _0x566002(0x266)
        ](this, _0x2c4688, _0x28fd17);
      else {
        const _0x49207f = _0x566002(0x254)["format"](_0x372823),
          _0x1cf867 =
            VisuMZ[_0x566002(0x206)]["Settings"][_0x566002(0x1c0)][_0x49207f];
        _0x1cf867[_0x566002(0x2f5)]((_0x53a7f9, _0x29180b) => {
          const _0x23b5d0 = _0x566002;
          if (!_0x53a7f9 || !_0x29180b) return -0x1;
          return _0x29180b[_0x23b5d0(0x313)] - _0x53a7f9[_0x23b5d0(0x313)];
        }),
          this[_0x566002(0x318)](_0x1cf867, _0x372823);
      }
    }
  }),
  (VisuMZ[_0x276037(0x206)][_0x276037(0x318)] = function (
    _0xcad2a0,
    _0x1a863b
  ) {
    const _0x4a7c8e = _0x276037;
    for (const _0x6513ce of _0xcad2a0) {
      if (_0x6513ce[_0x4a7c8e(0x313)] <= 0x0) continue;
      if (/^\d+$/["test"](_0x6513ce)) continue;
      let _0x592271 = VisuMZ[_0x4a7c8e(0x206)][_0x4a7c8e(0x2cb)](_0x6513ce);
      if (
        _0x6513ce[_0x4a7c8e(0x137)](
          /[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g
        )
      )
        var _0x226531 = new RegExp(_0x592271, "i");
      else var _0x226531 = new RegExp("\x5cb" + _0x592271 + "\x5cb", "g");
      VisuMZ[_0x4a7c8e(0x206)][_0x4a7c8e(0x18f)]["push"]([
        _0x226531,
        _0x4a7c8e(0x182)[_0x4a7c8e(0x384)](_0x1a863b, _0x6513ce),
      ]);
    }
  }),
  (VisuMZ[_0x276037(0x206)][_0x276037(0x2cb)] = function (_0x51ab49) {
    const _0x308a68 = _0x276037;
    return (
      (_0x51ab49 = _0x51ab49[_0x308a68(0x15c)](
        /(\W)/gi,
        (_0x120a17, _0x4ed12e) => _0x308a68(0x312)[_0x308a68(0x384)](_0x4ed12e)
      )),
      _0x51ab49
    );
  }),
  (VisuMZ["MessageCore"][_0x276037(0x33f)] = VisuMZ["ParseClassNotetags"]),
  (VisuMZ[_0x276037(0x33f)] = function (_0x162d04) {
    const _0x411382 = _0x276037;
    VisuMZ[_0x411382(0x206)]["ParseClassNotetags"][_0x411382(0x266)](
      this,
      _0x162d04
    );
    const _0x384c37 =
      VisuMZ[_0x411382(0x206)][_0x411382(0x317)][_0x411382(0x1c0)];
    VisuMZ[_0x411382(0x206)][_0x411382(0x1e5)](_0x162d04, _0x384c37["Classes"]);
  }),
  (VisuMZ[_0x276037(0x206)][_0x276037(0x1fc)] = VisuMZ[_0x276037(0x1fc)]),
  (VisuMZ[_0x276037(0x1fc)] = function (_0x536daa) {
    const _0x1822ae = _0x276037;
    VisuMZ[_0x1822ae(0x206)][_0x1822ae(0x1fc)][_0x1822ae(0x266)](
      this,
      _0x536daa
    );
    const _0x285751 =
      VisuMZ[_0x1822ae(0x206)][_0x1822ae(0x317)][_0x1822ae(0x1c0)];
    VisuMZ[_0x1822ae(0x206)][_0x1822ae(0x1e5)](
      _0x536daa,
      _0x285751[_0x1822ae(0x1b8)]
    );
  }),
  0x7,
  (VisuMZ[_0x276037(0x206)][_0x276037(0x171)] = VisuMZ[_0x276037(0x171)]),
  (VisuMZ[_0x276037(0x171)] = function (_0x349dda) {
    const _0x57e14c = _0x276037;
    VisuMZ["MessageCore"][_0x57e14c(0x171)][_0x57e14c(0x266)](this, _0x349dda);
    const _0x114840 = VisuMZ[_0x57e14c(0x206)][_0x57e14c(0x317)]["AutoColor"];
    VisuMZ["MessageCore"]["CreateAutoColorFor"](
      _0x349dda,
      _0x114840[_0x57e14c(0x315)]
    );
  }),
  (VisuMZ[_0x276037(0x206)][_0x276037(0x24f)] = VisuMZ[_0x276037(0x24f)]),
  (VisuMZ[_0x276037(0x24f)] = function (_0x2d1b95) {
    const _0x17928c = _0x276037;
    VisuMZ[_0x17928c(0x206)][_0x17928c(0x24f)][_0x17928c(0x266)](
      this,
      _0x2d1b95
    );
    const _0x15c497 = VisuMZ[_0x17928c(0x206)]["Settings"]["AutoColor"];
    VisuMZ[_0x17928c(0x206)]["CreateAutoColorFor"](
      _0x2d1b95,
      _0x15c497["Weapons"]
    );
  }),
  (VisuMZ[_0x276037(0x206)][_0x276037(0x164)] = VisuMZ[_0x276037(0x164)]),
  (VisuMZ["ParseArmorNotetags"] = function (_0x195d7f) {
    const _0x277add = _0x276037;
    VisuMZ[_0x277add(0x206)]["ParseArmorNotetags"][_0x277add(0x266)](
      this,
      _0x195d7f
    );
    const _0x51080a =
      VisuMZ[_0x277add(0x206)][_0x277add(0x317)][_0x277add(0x1c0)];
    VisuMZ[_0x277add(0x206)][_0x277add(0x1e5)](
      _0x195d7f,
      _0x51080a[_0x277add(0x275)]
    );
  }),
  (VisuMZ[_0x276037(0x206)]["ParseEnemyNotetags"] = VisuMZ[_0x276037(0x2a1)]),
  (VisuMZ[_0x276037(0x2a1)] = function (_0x11b2c3) {
    const _0xd0c758 = _0x276037;
    VisuMZ[_0xd0c758(0x206)][_0xd0c758(0x2a1)][_0xd0c758(0x266)](
      this,
      _0x11b2c3
    );
    const _0x270e01 =
      VisuMZ[_0xd0c758(0x206)][_0xd0c758(0x317)][_0xd0c758(0x1c0)];
    VisuMZ["MessageCore"][_0xd0c758(0x1e5)](
      _0x11b2c3,
      _0x270e01[_0xd0c758(0x1c5)]
    );
  }),
  (VisuMZ[_0x276037(0x206)]["ParseStateNotetags"] = VisuMZ[_0x276037(0x269)]),
  (VisuMZ[_0x276037(0x269)] = function (_0xcdf530) {
    const _0x76daad = _0x276037;
    VisuMZ[_0x76daad(0x206)]["ParseStateNotetags"][_0x76daad(0x266)](
      this,
      _0xcdf530
    );
    const _0x4fe853 =
      VisuMZ[_0x76daad(0x206)][_0x76daad(0x317)][_0x76daad(0x1c0)];
    VisuMZ[_0x76daad(0x206)][_0x76daad(0x1e5)](
      _0xcdf530,
      _0x4fe853[_0x76daad(0x1a1)]
    );
  }),
  (VisuMZ[_0x276037(0x206)]["CreateAutoColorFor"] = function (
    _0x363a0c,
    _0x116cdd
  ) {
    const _0xf99b69 = _0x276037;
    if (_0x116cdd <= 0x0) return;
    const _0x2d703f =
      VisuMZ[_0xf99b69(0x206)][_0xf99b69(0x317)][_0xf99b69(0x1c0)][
        _0xf99b69(0x37e) + _0x116cdd
      ];
    let _0x4bf122 = _0x363a0c[_0xf99b69(0x31d)][_0xf99b69(0x1fb)]();
    if (/^\d+$/["test"](_0x4bf122)) return;
    if (
      VisuMZ[_0xf99b69(0x206)][_0xf99b69(0x10d)]["includes"](
        _0x4bf122[_0xf99b69(0x214)]()
      )
    )
      return;
    (_0x4bf122 = _0x4bf122[_0xf99b69(0x15c)](/\\I\[(\d+)\]/gi, "")),
      (_0x4bf122 = _0x4bf122[_0xf99b69(0x15c)](/\x1bI\[(\d+)\]/gi, ""));
    if (_0x4bf122["length"] <= 0x0) return;
    if (_0x4bf122["match"](/-----/i)) return;
    _0x2d703f[_0xf99b69(0x23e)](_0x4bf122);
  }),
  (SceneManager[_0x276037(0x29f)] = function () {
    const _0x491ba1 = _0x276037;
    return (
      this[_0x491ba1(0x215)] &&
      this[_0x491ba1(0x215)][_0x491ba1(0xe1)] === Scene_Battle
    );
  }),
  (SceneManager["isSceneMap"] = function () {
    const _0x3a1407 = _0x276037;
    return (
      this[_0x3a1407(0x215)] &&
      this[_0x3a1407(0x215)][_0x3a1407(0xe1)] === Scene_Map
    );
  }),
  (VisuMZ["MessageCore"][_0x276037(0x32d)] = TextManager[_0x276037(0x20c)]),
  (TextManager[_0x276037(0x20c)] = function (_0x3525fe) {
    const _0x4cb527 = _0x276037,
      _0x28a91f = [
        _0x4cb527(0x242),
        _0x4cb527(0x24b),
        _0x4cb527(0x33c),
        _0x4cb527(0x19a),
        _0x4cb527(0xf2),
        "defeat",
        "escapeStart",
        _0x4cb527(0x280),
        _0x4cb527(0x143),
        _0x4cb527(0x385),
      ];
    let _0x2ce77b = VisuMZ[_0x4cb527(0x206)]["TextManager_message"]["call"](
      this,
      _0x3525fe
    );
    return (
      _0x28a91f[_0x4cb527(0x2c1)](_0x3525fe) &&
        (_0x2ce77b = _0x4cb527(0x1db) + _0x2ce77b),
      _0x2ce77b
    );
  }),
  (ConfigManager["textSpeed"] =
    VisuMZ[_0x276037(0x206)][_0x276037(0x317)][_0x276037(0x358)][
      _0x276037(0x2ab)
    ]),
  (VisuMZ[_0x276037(0x206)][_0x276037(0x35d)] =
    ConfigManager[_0x276037(0x263)]),
  (ConfigManager[_0x276037(0x263)] = function () {
    const _0x5148c0 = _0x276037,
      _0x3df622 = VisuMZ[_0x5148c0(0x206)][_0x5148c0(0x35d)]["call"](this);
    return (_0x3df622[_0x5148c0(0x106)] = this[_0x5148c0(0x106)]), _0x3df622;
  }),
  (VisuMZ[_0x276037(0x206)][_0x276037(0x115)] = ConfigManager[_0x276037(0xf6)]),
  (ConfigManager[_0x276037(0xf6)] = function (_0x7e30a0) {
    const _0x3b5c8d = _0x276037;
    VisuMZ["MessageCore"][_0x3b5c8d(0x115)][_0x3b5c8d(0x266)](this, _0x7e30a0),
      _0x3b5c8d(0x106) in _0x7e30a0
        ? (this[_0x3b5c8d(0x106)] = Number(_0x7e30a0[_0x3b5c8d(0x106)])[
            _0x3b5c8d(0x33b)
          ](0x1, 0xb))
        : (this["textSpeed"] =
            VisuMZ[_0x3b5c8d(0x206)][_0x3b5c8d(0x317)][_0x3b5c8d(0x358)][
              _0x3b5c8d(0x2ab)
            ]);
  }),
  (TextManager[_0x276037(0x146)] =
    VisuMZ[_0x276037(0x206)]["Settings"][_0x276037(0x358)]["Name"]),
  (TextManager[_0x276037(0x35a)] =
    VisuMZ["MessageCore"][_0x276037(0x317)]["TextSpeed"][_0x276037(0x100)]),
  (VisuMZ[_0x276037(0x206)]["Game_System_initialize"] =
    Game_System[_0x276037(0x21e)][_0x276037(0x1f8)]),
  (Game_System[_0x276037(0x21e)][_0x276037(0x1f8)] = function () {
    const _0x4b48a4 = _0x276037;
    VisuMZ[_0x4b48a4(0x206)][_0x4b48a4(0x11b)][_0x4b48a4(0x266)](this),
      this[_0x4b48a4(0x22d)]();
  }),
  (Game_System["prototype"]["initMessageCore"] = function () {
    const _0x4748f6 = _0x276037,
      _0x4a3ad1 = VisuMZ["MessageCore"]["Settings"][_0x4748f6(0x24e)],
      _0x2cbb5f = VisuMZ[_0x4748f6(0x206)]["Settings"][_0x4748f6(0x194)];
    this["_MessageCoreSettings"] = {
      messageRows: _0x4a3ad1["MessageRows"],
      messageWidth: _0x4a3ad1["MessageWidth"],
      messageWordWrap: _0x2cbb5f["MessageWindow"],
      helpWordWrap: _0x2cbb5f[_0x4748f6(0x2b1)],
      choiceLineHeight: _0x4a3ad1[_0x4748f6(0x1b3)],
      choiceRows: _0x4a3ad1[_0x4748f6(0x20b)],
      choiceCols: _0x4a3ad1["ChoiceWindowMaxCols"],
      choiceTextAlign: _0x4a3ad1[_0x4748f6(0x1dd)],
    };
  }),
  (Game_System[_0x276037(0x21e)][_0x276037(0x2da)] = function () {
    const _0x45776a = _0x276037;
    if (this[_0x45776a(0x261)] === undefined) this[_0x45776a(0x22d)]();
    if (this[_0x45776a(0x261)]["messageRows"] === undefined)
      this[_0x45776a(0x22d)]();
    return this[_0x45776a(0x261)][_0x45776a(0x246)];
  }),
  (Game_System[_0x276037(0x21e)][_0x276037(0x15b)] = function (_0x575e45) {
    const _0x1f7396 = _0x276037;
    if (this[_0x1f7396(0x261)] === undefined) this[_0x1f7396(0x22d)]();
    if (this[_0x1f7396(0x261)][_0x1f7396(0x246)] === undefined)
      this[_0x1f7396(0x22d)]();
    this[_0x1f7396(0x261)][_0x1f7396(0x246)] = _0x575e45 || 0x1;
  }),
  (Game_System[_0x276037(0x21e)][_0x276037(0x326)] = function () {
    const _0x337f9c = _0x276037;
    if (this[_0x337f9c(0x261)] === undefined) this["initMessageCore"]();
    if (this[_0x337f9c(0x261)][_0x337f9c(0x381)] === undefined)
      this["initMessageCore"]();
    return this["_MessageCoreSettings"][_0x337f9c(0x381)];
  }),
  (Game_System[_0x276037(0x21e)]["setMessageWindowWidth"] = function (
    _0x36c543
  ) {
    const _0x56e1f4 = _0x276037;
    if (this["_MessageCoreSettings"] === undefined) this[_0x56e1f4(0x22d)]();
    if (this[_0x56e1f4(0x261)]["messageWidth"] === undefined)
      this["initMessageCore"]();
    _0x36c543 = Math[_0x56e1f4(0x357)](_0x36c543);
    if (_0x36c543 % 0x2 !== 0x0) _0x36c543 += 0x1;
    this["_MessageCoreSettings"][_0x56e1f4(0x381)] = _0x36c543 || 0x2;
  }),
  (Game_System[_0x276037(0x21e)]["isMessageWindowWordWrap"] = function () {
    const _0x46b737 = _0x276037;
    if (this[_0x46b737(0x261)] === undefined) this[_0x46b737(0x22d)]();
    if (this[_0x46b737(0x261)][_0x46b737(0x189)] === undefined)
      this[_0x46b737(0x22d)]();
    return this[_0x46b737(0x261)][_0x46b737(0x189)];
  }),
  (Game_System["prototype"][_0x276037(0x12a)] = function (_0x20c878) {
    const _0x2d532c = _0x276037;
    if (this[_0x2d532c(0x261)] === undefined) this[_0x2d532c(0x22d)]();
    if (this["_MessageCoreSettings"][_0x2d532c(0x189)] === undefined)
      this[_0x2d532c(0x22d)]();
    this[_0x2d532c(0x261)][_0x2d532c(0x189)] = _0x20c878;
  }),
  (Game_System["prototype"][_0x276037(0x372)] = function () {
    const _0x81f175 = _0x276037;
    if (this[_0x81f175(0x261)] === undefined) this[_0x81f175(0x22d)]();
    if (this[_0x81f175(0x261)][_0x81f175(0x267)] === undefined)
      this[_0x81f175(0x22d)]();
    return this["_MessageCoreSettings"]["helpWordWrap"];
  }),
  (Game_System[_0x276037(0x21e)][_0x276037(0x364)] = function (_0x3d18c1) {
    const _0x305a79 = _0x276037;
    if (this[_0x305a79(0x261)] === undefined) this["initMessageCore"]();
    if (this[_0x305a79(0x261)][_0x305a79(0x267)] === undefined)
      this[_0x305a79(0x22d)]();
    this[_0x305a79(0x261)]["helpWordWrap"] = _0x3d18c1;
  }),
  (Game_System[_0x276037(0x21e)]["getChoiceListLineHeight"] = function () {
    const _0x45a0e7 = _0x276037;
    if (this["_MessageCoreSettings"] === undefined) this[_0x45a0e7(0x22d)]();
    if (this["_MessageCoreSettings"][_0x45a0e7(0x133)] === undefined)
      this[_0x45a0e7(0x22d)]();
    return this[_0x45a0e7(0x261)][_0x45a0e7(0x133)];
  }),
  (Game_System[_0x276037(0x21e)][_0x276037(0x1aa)] = function (_0x40a770) {
    const _0xc91b16 = _0x276037;
    if (this["_MessageCoreSettings"] === undefined) this[_0xc91b16(0x22d)]();
    if (this[_0xc91b16(0x261)]["choiceLineHeight"] === undefined)
      this[_0xc91b16(0x22d)]();
    this[_0xc91b16(0x261)]["choiceLineHeight"] = _0x40a770 || 0x1;
  }),
  (Game_System[_0x276037(0x21e)]["getChoiceListMaxRows"] = function () {
    const _0x145cd0 = _0x276037;
    if (this[_0x145cd0(0x261)] === undefined) this[_0x145cd0(0x22d)]();
    if (this[_0x145cd0(0x261)][_0x145cd0(0x359)] === undefined)
      this[_0x145cd0(0x22d)]();
    return this[_0x145cd0(0x261)][_0x145cd0(0x359)];
  }),
  (Game_System[_0x276037(0x21e)]["setChoiceListMaxRows"] = function (
    _0x2b1385
  ) {
    const _0x233bff = _0x276037;
    if (this[_0x233bff(0x261)] === undefined) this[_0x233bff(0x22d)]();
    if (this[_0x233bff(0x261)]["choiceRows"] === undefined)
      this[_0x233bff(0x22d)]();
    this[_0x233bff(0x261)]["choiceRows"] = _0x2b1385 || 0x1;
  }),
  (Game_System["prototype"][_0x276037(0x2fb)] = function () {
    const _0x3ac753 = _0x276037;
    if (this[_0x3ac753(0x261)] === undefined) this[_0x3ac753(0x22d)]();
    if (this[_0x3ac753(0x261)][_0x3ac753(0x26d)] === undefined)
      this[_0x3ac753(0x22d)]();
    return this["_MessageCoreSettings"][_0x3ac753(0x26d)];
  }),
  (Game_System["prototype"][_0x276037(0x283)] = function (_0x2e0ea9) {
    const _0x58335d = _0x276037;
    if (this[_0x58335d(0x261)] === undefined) this[_0x58335d(0x22d)]();
    if (this[_0x58335d(0x261)]["choiceCols"] === undefined)
      this[_0x58335d(0x22d)]();
    this["_MessageCoreSettings"]["choiceCols"] = _0x2e0ea9 || 0x1;
  }),
  (Game_System["prototype"][_0x276037(0x21c)] = function () {
    const _0x236bb5 = _0x276037;
    if (this[_0x236bb5(0x261)] === undefined) this[_0x236bb5(0x22d)]();
    if (this[_0x236bb5(0x261)][_0x236bb5(0x2fc)] === undefined)
      this[_0x236bb5(0x22d)]();
    return this[_0x236bb5(0x261)][_0x236bb5(0x2fc)];
  }),
  (Game_System[_0x276037(0x21e)][_0x276037(0x2bc)] = function (_0x4c41b2) {
    const _0x44851a = _0x276037;
    if (this[_0x44851a(0x261)] === undefined) this[_0x44851a(0x22d)]();
    if (this[_0x44851a(0x261)][_0x44851a(0x2fc)] === undefined)
      this[_0x44851a(0x22d)]();
    this["_MessageCoreSettings"][_0x44851a(0x2fc)] =
      _0x4c41b2[_0x44851a(0x27c)]();
  }),
  (VisuMZ[_0x276037(0x206)]["Game_Party_initialize"] =
    Game_Party[_0x276037(0x21e)][_0x276037(0x1f8)]),
  (Game_Party[_0x276037(0x21e)][_0x276037(0x1f8)] = function () {
    const _0x130771 = _0x276037;
    VisuMZ[_0x130771(0x206)][_0x130771(0x241)][_0x130771(0x266)](this),
      this["initMessageCore"]();
  }),
  (Game_Party[_0x276037(0x21e)][_0x276037(0x22d)] = function () {
    this["_lastGainedItemData"] = { type: 0x0, id: 0x0, quantity: 0x0 };
  }),
  (Game_Party[_0x276037(0x21e)]["getLastGainedItemData"] = function () {
    const _0x1549f2 = _0x276037;
    if (this[_0x1549f2(0x1c1)] === undefined) this["initMessageCore"]();
    return this[_0x1549f2(0x1c1)];
  }),
  (Game_Party[_0x276037(0x21e)][_0x276037(0x26a)] = function (
    _0x57c435,
    _0x5c370b
  ) {
    const _0x75804e = _0x276037;
    if (this[_0x75804e(0x1c1)] === undefined) this[_0x75804e(0x22d)]();
    if (!_0x57c435) return;
    if (DataManager[_0x75804e(0x257)](_0x57c435))
      this[_0x75804e(0x1c1)][_0x75804e(0x369)] = 0x0;
    else {
      if (DataManager[_0x75804e(0x1cd)](_0x57c435))
        this[_0x75804e(0x1c1)][_0x75804e(0x369)] = 0x1;
      else
        DataManager[_0x75804e(0x1b5)](_0x57c435) &&
          (this[_0x75804e(0x1c1)]["type"] = 0x2);
    }
    (this["_lastGainedItemData"]["id"] = _0x57c435["id"]),
      (this[_0x75804e(0x1c1)]["quantity"] = _0x5c370b);
  }),
  (VisuMZ["MessageCore"][_0x276037(0x22c)] =
    Game_Party[_0x276037(0x21e)][_0x276037(0x36a)]),
  (Game_Party[_0x276037(0x21e)][_0x276037(0x36a)] = function (
    _0x1233a8,
    _0x42c374,
    _0x16ff2b
  ) {
    const _0x2619cf = _0x276037;
    VisuMZ[_0x2619cf(0x206)][_0x2619cf(0x22c)][_0x2619cf(0x266)](
      this,
      _0x1233a8,
      _0x42c374,
      _0x16ff2b
    ),
      _0x42c374 > 0x0 && this[_0x2619cf(0x26a)](_0x1233a8, _0x42c374);
  }),
  (VisuMZ["MessageCore"][_0x276037(0x1ca)] =
    Game_Map["prototype"]["initialize"]),
  (Game_Map[_0x276037(0x21e)][_0x276037(0x1f8)] = function () {
    const _0x3778b4 = _0x276037;
    VisuMZ[_0x3778b4(0x206)][_0x3778b4(0x1ca)]["call"](this),
      (this[_0x3778b4(0x2ea)] = []);
  }),
  (VisuMZ[_0x276037(0x206)][_0x276037(0x270)] =
    Game_Map[_0x276037(0x21e)][_0x276037(0x1f4)]),
  (Game_Map[_0x276037(0x21e)][_0x276037(0x1f4)] = function () {
    const _0x4b83dd = _0x276037;
    VisuMZ[_0x4b83dd(0x206)][_0x4b83dd(0x270)][_0x4b83dd(0x266)](this),
      (this[_0x4b83dd(0x2ea)] = []);
  }),
  (VisuMZ[_0x276037(0x206)][_0x276037(0x128)] =
    Game_Map[_0x276037(0x21e)]["updateEvents"]),
  (Game_Map[_0x276037(0x21e)][_0x276037(0x32a)] = function () {
    const _0x2da67a = _0x276037;
    VisuMZ[_0x2da67a(0x206)][_0x2da67a(0x128)]["call"](this),
      this[_0x2da67a(0x24a)]();
  }),
  (Game_Map["prototype"][_0x276037(0xf0)] = function (_0x174b3d) {
    const _0x39b4ce = _0x276037;
    if (!$dataCommonEvents[_0x174b3d]) return;
    this[_0x39b4ce(0x2ea)] = this[_0x39b4ce(0x2ea)] || [];
    const _0x1db0e6 = this[_0x39b4ce(0x348)][_0x39b4ce(0x2d4)],
      _0x43d268 = new Game_MessageCommonEvent(_0x174b3d, _0x1db0e6);
    this["_messageCommonEvents"][_0x39b4ce(0x23e)](_0x43d268);
  }),
  (Game_Map["prototype"][_0x276037(0x24a)] = function () {
    const _0x4ab3df = _0x276037;
    this["_messageCommonEvents"] = this[_0x4ab3df(0x2ea)] || [];
    for (const _0x38b8c3 of this[_0x4ab3df(0x2ea)]) {
      if (_0x4ab3df(0x2bb) === _0x4ab3df(0x2bb)) {
        if (!_0x38b8c3[_0x4ab3df(0x348)]) {
          if ("IJTzR" !== _0x4ab3df(0x2a6))
            this[_0x4ab3df(0x2ea)][_0x4ab3df(0x2af)](_0x38b8c3);
          else {
            const _0x2676fe = _0x4ab3df(0x2cc);
            _0x56f7c4 = _0x2676fe[_0x4ab3df(0x384)](
              _0x26136c[_0x4ab3df(0x24d)],
              _0x414dc2[_0x4ab3df(0x31d)]
            );
          }
        } else {
          if ("OmOFo" === _0x4ab3df(0x239)) {
            if (this["_MessageCoreSettings"] === _0x3481eb)
              this["initMessageCore"]();
            if (this[_0x4ab3df(0x261)][_0x4ab3df(0x2fc)] === _0x33e20b)
              this[_0x4ab3df(0x22d)]();
            this[_0x4ab3df(0x261)][_0x4ab3df(0x2fc)] =
              _0x5cad27[_0x4ab3df(0x27c)]();
          } else _0x38b8c3[_0x4ab3df(0x2a4)]();
        }
      } else
        _0x412ad9[_0x4ab3df(0x2b8)] = new _0x39cd9d(
          _0x4ab3df(0x323) +
            _0x483d5a[_0x4ab3df(0x382)]["replace"](/\\/g, "\x1b") +
            "\x27"
        );
    }
  }),
  (Game_Interpreter[_0x276037(0x21e)]["command101"] = function (_0x2336b2) {
    const _0x31af39 = _0x276037;
    if ($gameMessage[_0x31af39(0x1f3)]()) return ![];
    return (
      this["prepareShowTextCommand"](_0x2336b2),
      this[_0x31af39(0x20d)](_0x2336b2),
      this[_0x31af39(0x300)](_0x2336b2),
      this["setWaitMode"](_0x31af39(0x20c)),
      !![]
    );
  }),
  (Game_Interpreter[_0x276037(0x21e)][_0x276037(0x203)] = function (_0x523e58) {
    const _0x2f1627 = _0x276037;
    $gameMessage["setFaceImage"](_0x523e58[0x0], _0x523e58[0x1]),
      $gameMessage["setBackground"](_0x523e58[0x2]),
      $gameMessage["setPositionType"](_0x523e58[0x3]),
      $gameMessage[_0x2f1627(0x32e)](_0x523e58[0x4]);
  }),
  (Game_Interpreter[_0x276037(0x21e)][_0x276037(0x20d)] = function (_0x5376dc) {
    const _0x56df58 = _0x276037;
    while (this[_0x56df58(0x279)]()) {
      this[_0x56df58(0x23f)]++;
      this[_0x56df58(0x186)]()[_0x56df58(0x36c)] === 0x191 &&
        $gameMessage[_0x56df58(0x319)](
          this[_0x56df58(0x186)]()[_0x56df58(0x2de)][0x0]
        );
      if (this[_0x56df58(0x371)]()) break;
    }
  }),
  (Game_Interpreter[_0x276037(0x21e)]["isContinuePrepareShowTextCommands"] =
    function () {
      const _0xa26df5 = _0x276037;
      return this["nextEventCode"]() === 0x65 &&
        $gameSystem["getMessageWindowRows"]() > 0x4
        ? _0xa26df5(0x310) !== _0xa26df5(0x328)
          ? !![]
          : ((_0x49c4b7 = _0x173bf5[_0xa26df5(0x15c)](/\\/g, "\x1b")),
            (_0x5a178d = _0x5db395["replace"](/\x1b\x1b/g, "\x5c")),
            _0x289b3a)
        : this["nextEventCode"]() === 0x191;
    }),
  (Game_Interpreter[_0x276037(0x21e)][_0x276037(0x371)] = function () {
    const _0x8c98b4 = _0x276037;
    return (
      $gameMessage[_0x8c98b4(0x1d9)][_0x8c98b4(0x313)] >=
        $gameSystem[_0x8c98b4(0x2da)]() && this["nextEventCode"]() !== 0x191
    );
  }),
  (Game_Interpreter[_0x276037(0x21e)][_0x276037(0x300)] = function (_0xc361b9) {
    const _0x33768a = _0x276037;
    switch (this["nextEventCode"]()) {
      case 0x66:
        this["_index"]++,
          this[_0x33768a(0x367)](this["currentCommand"]()[_0x33768a(0x2de)]);
        break;
      case 0x67:
        this[_0x33768a(0x23f)]++,
          this[_0x33768a(0x38c)](this["currentCommand"]()[_0x33768a(0x2de)]);
        break;
      case 0x68:
        this[_0x33768a(0x23f)]++,
          this[_0x33768a(0x2d2)](this[_0x33768a(0x186)]()[_0x33768a(0x2de)]);
        break;
    }
  }),
  (VisuMZ[_0x276037(0x206)]["Game_Interpreter_setupChoices"] =
    Game_Interpreter[_0x276037(0x21e)][_0x276037(0x367)]),
  (Game_Interpreter[_0x276037(0x21e)]["setupChoices"] = function (_0x199513) {
    const _0x337205 = _0x276037;
    (_0x199513 = this["addContinuousShowChoices"]()),
      VisuMZ[_0x337205(0x206)]["Game_Interpreter_setupChoices"][
        _0x337205(0x266)
      ](this, _0x199513);
  }),
  (Game_Interpreter[_0x276037(0x21e)][_0x276037(0x1cb)] = function () {
    const _0x385579 = _0x276037,
      _0x5eb750 = this[_0x385579(0x23f)],
      _0x57da47 = [];
    let _0x42179f = 0x0;
    this[_0x385579(0x23f)]++;
    while (this[_0x385579(0x23f)] < this[_0x385579(0x293)]["length"]) {
      if (
        this[_0x385579(0x186)]()[_0x385579(0x140)] === this[_0x385579(0x14b)]
      ) {
        if (
          this[_0x385579(0x186)]()[_0x385579(0x36c)] === 0x194 &&
          this[_0x385579(0x355)]() !== 0x66
        )
          break;
        else {
          if (this[_0x385579(0x186)]()[_0x385579(0x36c)] === 0x66)
            this["adjustShowChoiceExtension"](
              _0x42179f,
              this[_0x385579(0x186)](),
              _0x5eb750
            ),
              (this[_0x385579(0x23f)] -= 0x2);
          else
            this[_0x385579(0x186)]()[_0x385579(0x36c)] === 0x192 &&
              (_0x385579(0x2a3) === _0x385579(0x311)
                ? (_0x4a1c59[_0x385579(0x21e)][_0x385579(0x1d0)][
                    _0x385579(0x266)
                  ](this),
                  this[_0x385579(0x1b6)](this[_0x385579(0x14a)]()))
                : ((this[_0x385579(0x186)]()[_0x385579(0x2de)][0x0] =
                    _0x42179f),
                  _0x42179f++));
        }
      }
      this["_index"]++;
    }
    return (
      (this["_index"] = _0x5eb750), this[_0x385579(0x186)]()[_0x385579(0x2de)]
    );
  }),
  (Game_Interpreter[_0x276037(0x21e)][_0x276037(0x354)] = function (
    _0x474ac1,
    _0x81c1b1,
    _0x5e84cc
  ) {
    const _0x390106 = _0x276037;
    this[_0x390106(0x31c)](_0x474ac1, _0x81c1b1, _0x5e84cc),
      this[_0x390106(0x2b6)](_0x474ac1, _0x81c1b1, _0x5e84cc),
      this[_0x390106(0x185)](_0x81c1b1, _0x5e84cc);
  }),
  (Game_Interpreter["prototype"][_0x276037(0x31c)] = function (
    _0x433428,
    _0x240cb4,
    _0x388197
  ) {
    const _0x5d0216 = _0x276037;
    if (_0x240cb4[_0x5d0216(0x2de)][0x2] < 0x0) return;
    const _0x2cb16e = _0x240cb4["parameters"][0x2] + _0x433428;
    this["_list"][_0x388197][_0x5d0216(0x2de)][0x2] = _0x2cb16e;
  }),
  (Game_Interpreter[_0x276037(0x21e)][_0x276037(0x2b6)] = function (
    _0x402e8c,
    _0x2e326b,
    _0xb56d58
  ) {
    const _0x1941d0 = _0x276037;
    if (_0x2e326b[_0x1941d0(0x2de)][0x1] >= 0x0) {
      var _0x4c3598 = _0x2e326b[_0x1941d0(0x2de)][0x1] + _0x402e8c;
      this[_0x1941d0(0x293)][_0xb56d58][_0x1941d0(0x2de)][0x1] = _0x4c3598;
    } else
      _0x2e326b["parameters"][0x1] === -0x2 &&
        (_0x1941d0(0x231) !== _0x1941d0(0x231)
          ? ((this["_textColorStack"] = this[_0x1941d0(0x351)] || []),
            (this[_0x1941d0(0x2b9)][_0x1941d0(0x388)] =
              this["_textColorStack"][_0x1941d0(0x149)]() ||
              _0x16981b[_0x1941d0(0x305)]()))
          : (this[_0x1941d0(0x293)][_0xb56d58][_0x1941d0(0x2de)][0x1] =
              _0x2e326b["parameters"][0x1]));
  }),
  (Game_Interpreter["prototype"][_0x276037(0x185)] = function (
    _0x34494a,
    _0x4ffc8c
  ) {
    const _0x3f57ed = _0x276037;
    for (const _0x324713 of _0x34494a[_0x3f57ed(0x2de)][0x0]) {
      _0x3f57ed(0x212) !== _0x3f57ed(0x277)
        ? this[_0x3f57ed(0x293)][_0x4ffc8c][_0x3f57ed(0x2de)][0x0][
            _0x3f57ed(0x23e)
          ](_0x324713)
        : this[_0x3f57ed(0x2cd)](_0x3af981);
    }
    this[_0x3f57ed(0x293)][_0x3f57ed(0x1b1)](this[_0x3f57ed(0x23f)] - 0x1, 0x2);
  });
function _0x41c9(_0x476ab8, _0x3fa48c) {
  const _0x3acfc2 = _0x3acf();
  return (
    (_0x41c9 = function (_0x41c961, _0x2e6398) {
      _0x41c961 = _0x41c961 - 0xe1;
      let _0x41b29a = _0x3acfc2[_0x41c961];
      return _0x41b29a;
    }),
    _0x41c9(_0x476ab8, _0x3fa48c)
  );
}
function Game_MessageCommonEvent() {
  const _0x59f2fd = _0x276037;
  this[_0x59f2fd(0x1f8)](...arguments);
}
(Game_MessageCommonEvent["prototype"][_0x276037(0x1f8)] = function (
  _0x519863,
  _0x3f9526
) {
  const _0x295955 = _0x276037;
  (this["_commonEventId"] = _0x519863),
    (this["_eventId"] = _0x3f9526 || 0x0),
    this[_0x295955(0x188)]();
}),
  (Game_MessageCommonEvent[_0x276037(0x21e)]["event"] = function () {
    const _0x275ad5 = _0x276037;
    return $dataCommonEvents[this[_0x275ad5(0x2f1)]];
  }),
  (Game_MessageCommonEvent[_0x276037(0x21e)]["list"] = function () {
    const _0x380e6a = _0x276037;
    return this["event"]()[_0x380e6a(0x23c)];
  }),
  (Game_MessageCommonEvent["prototype"][_0x276037(0x188)] = function () {
    const _0x256508 = _0x276037;
    (this[_0x256508(0x348)] = new Game_Interpreter()),
      this[_0x256508(0x348)][_0x256508(0x2a2)](
        this[_0x256508(0x23c)](),
        this[_0x256508(0x2d4)]
      );
  }),
  (Game_MessageCommonEvent[_0x276037(0x21e)]["update"] = function () {
    const _0x4c2736 = _0x276037;
    this["_interpreter"] &&
      (_0x4c2736(0x2df) === _0x4c2736(0x2ce)
        ? _0x2bbd56[_0x4c2736(0x12a)](_0x3e111d(_0x4b3239))
        : this["_interpreter"][_0x4c2736(0x10c)]()
        ? this[_0x4c2736(0x348)][_0x4c2736(0x2a4)]()
        : this[_0x4c2736(0x1f1)]());
  }),
  (Game_MessageCommonEvent[_0x276037(0x21e)]["clear"] = function () {
    const _0x4201f3 = _0x276037;
    this[_0x4201f3(0x348)] = null;
  }),
  (Scene_Message[_0x276037(0x21e)][_0x276037(0x37a)] = function () {
    const _0x20d9ee = _0x276037,
      _0x422536 = Math[_0x20d9ee(0x21a)](
        Graphics[_0x20d9ee(0x222)],
        $gameSystem[_0x20d9ee(0x326)]()
      ),
      _0x54919c = $gameSystem[_0x20d9ee(0x2da)](),
      _0x6b0ae2 = this[_0x20d9ee(0x244)](_0x54919c, ![]),
      _0x3b67cb = (Graphics[_0x20d9ee(0x1e8)] - _0x422536) / 0x2,
      _0x188de9 = 0x0;
    return new Rectangle(_0x3b67cb, _0x188de9, _0x422536, _0x6b0ae2);
  }),
  (VisuMZ[_0x276037(0x206)][_0x276037(0x2bd)] =
    Scene_Options[_0x276037(0x21e)][_0x276037(0x265)]),
  (Scene_Options[_0x276037(0x21e)][_0x276037(0x265)] = function () {
    const _0x56cc0d = _0x276037;
    let _0x5f0900 = VisuMZ[_0x56cc0d(0x206)][_0x56cc0d(0x2bd)]["call"](this);
    const _0x259394 = VisuMZ[_0x56cc0d(0x206)][_0x56cc0d(0x317)];
    if (
      _0x259394["TextSpeed"][_0x56cc0d(0x331)] &&
      _0x259394["TextSpeed"]["AdjustRect"]
    )
      _0x5f0900++;
    return _0x5f0900;
  }),
  (VisuMZ["MessageCore"][_0x276037(0x230)] =
    Window_Base[_0x276037(0x21e)][_0x276037(0x1f8)]),
  (Window_Base[_0x276037(0x21e)]["initialize"] = function (_0x448f1e) {
    const _0x2272bf = _0x276037;
    this[_0x2272bf(0x22d)](_0x448f1e),
      VisuMZ[_0x2272bf(0x206)]["Window_Base_initialize"]["call"](
        this,
        _0x448f1e
      );
  }),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x22d)] = function (_0x508a48) {
    const _0x2c1b7f = _0x276037;
    this[_0x2c1b7f(0x19e)](),
      this["resetWordWrap"](),
      this[_0x2c1b7f(0x201)](_0x508a48);
  }),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x19e)] = function () {
    const _0x5e9466 = _0x276037;
    this["setTextAlignment"](_0x5e9466(0x1f5));
  }),
  (Window_Base["prototype"]["setTextAlignment"] = function (_0x5c6f5d) {
    const _0xe7412 = _0x276037;
    this[_0xe7412(0x170)] = _0x5c6f5d;
  }),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x289)] = function () {
    return this["_textAlignment"];
  }),
  (VisuMZ[_0x276037(0x206)][_0x276037(0xf5)] =
    Window_Base[_0x276037(0x21e)][_0x276037(0x31a)]),
  (Window_Base[_0x276037(0x21e)]["textSizeEx"] = function (_0x3426b8) {
    const _0x5ac41c = _0x276037;
    return (
      this[_0x5ac41c(0x233)](),
      VisuMZ[_0x5ac41c(0x206)]["Window_Base_textSizeEx"][_0x5ac41c(0x266)](
        this,
        _0x3426b8
      )
    );
  }),
  (VisuMZ[_0x276037(0x206)][_0x276037(0xfc)] =
    Window_Base[_0x276037(0x21e)][_0x276037(0x207)]),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x207)] = function (_0x37dde7) {
    const _0x5d6722 = _0x276037;
    VisuMZ[_0x5d6722(0x206)][_0x5d6722(0xfc)][_0x5d6722(0x266)](
      this,
      _0x37dde7
    );
    if (_0x37dde7[_0x5d6722(0x152)]) this[_0x5d6722(0x2a8)](_0x5d6722(0x1f5));
  }),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x233)] = function () {
    const _0x2e4210 = _0x276037;
    this[_0x2e4210(0x1e7)](![]);
  }),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x20a)] = function () {
    const _0x5a3cf4 = _0x276037;
    return this[_0x5a3cf4(0x38d)];
  }),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x1e7)] = function (_0x23ebed) {
    const _0x3f4d95 = _0x276037;
    return (this[_0x3f4d95(0x38d)] = _0x23ebed), "";
  }),
  (Window_Base[_0x276037(0x21e)]["registerResetRect"] = function (_0x347f0f) {
    const _0x5c5cb1 = _0x276037;
    this[_0x5c5cb1(0x1d2)] = JsonEx[_0x5c5cb1(0x119)](_0x347f0f);
  }),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x213)] = function () {
    const _0x4ac974 = _0x276037;
    (this["contents"]["fontFace"] = $gameSystem[_0x4ac974(0x1bb)]()),
      (this["contents"][_0x4ac974(0x23b)] = $gameSystem["mainFontSize"]()),
      (this["contents"][_0x4ac974(0x1be)] = ![]),
      (this[_0x4ac974(0x2b9)][_0x4ac974(0x37c)] = ![]),
      this[_0x4ac974(0x1d0)]();
  }),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x1d0)] = function () {
    const _0x25e645 = _0x276037;
    this[_0x25e645(0x1b6)](ColorManager[_0x25e645(0x305)]()),
      this[_0x25e645(0x24c)](ColorManager[_0x25e645(0x38b)]());
    const _0x59640d =
      VisuMZ[_0x25e645(0x206)][_0x25e645(0x317)][_0x25e645(0x24e)];
    if (_0x59640d[_0x25e645(0x16f)] === undefined) {
      if (_0x25e645(0x26f) === "KBAeh") {
        const _0x169581 = this["obtainEscapeParam"](_0x4aad15);
        if (_0x4e132f[_0x25e645(0x152)])
          this[_0x25e645(0x2e0)](_0x169581 > 0x0);
      } else _0x59640d[_0x25e645(0x16f)] = 0x3;
    }
    (this["contents"][_0x25e645(0x2e6)] = _0x59640d[_0x25e645(0x16f)]),
      this[_0x25e645(0x2e0)](![]);
  }),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x2e0)] = function (_0x3f06ab) {
    this["_colorLock"] = _0x3f06ab;
  }),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x11c)] = function () {
    const _0x36de6a = _0x276037;
    return this[_0x36de6a(0x294)];
  }),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x2b7)] = function () {
    return ![];
  }),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x314)] = function () {
    const _0x333215 = _0x276037,
      _0xd685b5 = [
        _0x333215(0x10e),
        _0x333215(0x23b),
        _0x333215(0x1be),
        _0x333215(0x37c),
        _0x333215(0x388),
        _0x333215(0x14f),
        "outlineWidth",
        _0x333215(0xe5),
      ];
    let _0x587fdc = {};
    for (const _0x431740 of _0xd685b5) {
      _0x587fdc[_0x431740] = this["contents"][_0x431740];
    }
    return _0x587fdc;
  }),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x2c6)] = function (_0x344f24) {
    const _0x1925d1 = _0x276037;
    for (const _0x2bf57b in _0x344f24) {
      "qUOLy" !== _0x1925d1(0x350)
        ? ((this[_0x1925d1(0x162)] = 0x0),
          _0x5dc71f[_0x1925d1(0x206)][_0x1925d1(0x339)]["call"](this))
        : (this[_0x1925d1(0x2b9)][_0x2bf57b] = _0x344f24[_0x2bf57b]);
    }
  }),
  (VisuMZ["MessageCore"][_0x276037(0x2ef)] =
    Window_Base[_0x276037(0x21e)][_0x276037(0x2a4)]),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x2a4)] = function () {
    const _0x2c23e2 = _0x276037;
    VisuMZ[_0x2c23e2(0x206)][_0x2c23e2(0x2ef)]["call"](this),
      this["updateMove"]();
  }),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x387)] = function () {
    return ![];
  }),
  (Window_Base["prototype"]["updateMove"] = function () {
    const _0x1667bc = _0x276037;
    this[_0x1667bc(0xff)] > 0x0 &&
      (this["canMove"]() &&
        ((this["x"] = this[_0x1667bc(0x349)](this["x"], this["_moveTargetX"])),
        (this["y"] = this[_0x1667bc(0x349)](this["y"], this[_0x1667bc(0x27b)])),
        (this[_0x1667bc(0x222)] = this[_0x1667bc(0x349)](
          this[_0x1667bc(0x222)],
          this[_0x1667bc(0x210)]
        )),
        (this[_0x1667bc(0x333)] = this[_0x1667bc(0x349)](
          this["height"],
          this[_0x1667bc(0x159)]
        )),
        this[_0x1667bc(0x176)]()),
      this[_0x1667bc(0xff)]--);
  }),
  (Window_Base["prototype"]["clampPlacementPosition"] = function (
    _0x2c48f6,
    _0x2bbe0f
  ) {
    const _0x54f580 = _0x276037;
    !_0x2c48f6 &&
      (_0x54f580(0x278) !== "IQmQL"
        ? this[_0x54f580(0x1e7)](_0x130e03[_0x54f580(0x372)]())
        : ((this[_0x54f580(0x222)] = Math[_0x54f580(0x21a)](
            this[_0x54f580(0x222)],
            Graphics[_0x54f580(0x222)]
          )),
          (this[_0x54f580(0x333)] = Math["min"](
            this[_0x54f580(0x333)],
            Graphics["height"]
          ))));
    if (!_0x2bbe0f) {
      const _0x3a4f0c = -(
          Math[_0x54f580(0x226)](
            Graphics["width"] - Graphics[_0x54f580(0x1e8)]
          ) / 0x2
        ),
        _0x5ffe92 =
          _0x3a4f0c + Graphics[_0x54f580(0x222)] - this[_0x54f580(0x222)],
        _0xefa724 = -(
          Math[_0x54f580(0x226)](Graphics["height"] - Graphics["boxHeight"]) /
          0x2
        ),
        _0x228d3f = _0xefa724 + Graphics["height"] - this[_0x54f580(0x333)];
      (this["x"] = this["x"][_0x54f580(0x33b)](_0x3a4f0c, _0x5ffe92)),
        (this["y"] = this["y"][_0x54f580(0x33b)](_0xefa724, _0x228d3f));
    }
  }),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x349)] = function (
    _0x394f80,
    _0x3b1f75
  ) {
    const _0x2dac6b = _0x276037,
      _0x44e9a9 = this["_moveDuration"],
      _0x1dc3db = this[_0x2dac6b(0x135)],
      _0x38192f = this[_0x2dac6b(0x2e5)]((_0x1dc3db - _0x44e9a9) / _0x1dc3db),
      _0x5eb53d = this[_0x2dac6b(0x2e5)](
        (_0x1dc3db - _0x44e9a9 + 0x1) / _0x1dc3db
      ),
      _0x1d331d = (_0x394f80 - _0x3b1f75 * _0x38192f) / (0x1 - _0x38192f);
    return _0x1d331d + (_0x3b1f75 - _0x1d331d) * _0x5eb53d;
  }),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x2e5)] = function (_0x33c08f) {
    const _0x54abec = _0x276037,
      _0x54df6f = 0x2;
    switch (this[_0x54abec(0x15f)]) {
      case 0x0:
        return _0x33c08f;
      case 0x1:
        return this[_0x54abec(0x1d8)](_0x33c08f, _0x54df6f);
      case 0x2:
        return this[_0x54abec(0x290)](_0x33c08f, _0x54df6f);
      case 0x3:
        return this[_0x54abec(0x303)](_0x33c08f, _0x54df6f);
      default:
        return Imported["VisuMZ_0_CoreEngine"]
          ? VisuMZ[_0x54abec(0x349)](_0x33c08f, this["_moveEasingType"])
          : _0x33c08f;
    }
  }),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x34e)] = function (
    _0x14e5d4,
    _0x459fe6,
    _0x183624,
    _0x527894,
    _0x411b45,
    _0x46fe96
  ) {
    const _0x595aa4 = _0x276037;
    (this[_0x595aa4(0x389)] = _0x14e5d4),
      (this[_0x595aa4(0x27b)] = _0x459fe6),
      (this[_0x595aa4(0x210)] = _0x183624 || this["width"]),
      (this["_moveTargetHeight"] = _0x527894 || this[_0x595aa4(0x333)]),
      (this["_moveDuration"] = _0x411b45 || 0x1);
    if (this["_moveDuration"] <= 0x0) this["_moveDuration"] = 0x1;
    (this[_0x595aa4(0x135)] = this[_0x595aa4(0xff)]),
      (this[_0x595aa4(0x15f)] = _0x46fe96 || 0x0);
    if (_0x411b45 <= 0x0) this[_0x595aa4(0x2d6)]();
  }),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x26e)] = function (
    _0x16d8ca,
    _0x594783,
    _0x3ac408,
    _0x2c5f2c,
    _0x282637,
    _0x445794
  ) {
    const _0x3760ff = _0x276037;
    (this[_0x3760ff(0x389)] = this["x"] + _0x16d8ca),
      (this["_moveTargetY"] = this["y"] + _0x594783),
      (this[_0x3760ff(0x210)] = this[_0x3760ff(0x222)] + (_0x3ac408 || 0x0)),
      (this[_0x3760ff(0x159)] = this[_0x3760ff(0x333)] + (_0x2c5f2c || 0x0)),
      (this[_0x3760ff(0xff)] = _0x282637 || 0x1);
    if (this[_0x3760ff(0xff)] <= 0x0) this[_0x3760ff(0xff)] = 0x1;
    (this[_0x3760ff(0x135)] = this["_moveDuration"]),
      (this["_moveEasingType"] = _0x445794 || 0x0);
    if (_0x282637 <= 0x0) this[_0x3760ff(0x2d6)]();
  }),
  (Window_Base[_0x276037(0x21e)]["resetRect"] = function (
    _0x13f427,
    _0x157102
  ) {
    const _0x361699 = _0x276037;
    this[_0x361699(0x34e)](
      this["_resetRect"]["x"],
      this[_0x361699(0x1d2)]["y"],
      this["_resetRect"][_0x361699(0x222)],
      this["_resetRect"][_0x361699(0x333)],
      _0x13f427,
      _0x157102
    );
  }),
  (VisuMZ[_0x276037(0x206)]["Window_Base_changeTextColor"] =
    Window_Base[_0x276037(0x21e)][_0x276037(0x1b6)]),
  (Window_Base[_0x276037(0x21e)]["changeTextColor"] = function (_0x24028d) {
    const _0x232f62 = _0x276037;
    if (this[_0x232f62(0x11c)]()) return;
    (_0x24028d = _0x24028d[_0x232f62(0x15c)](/\,/g, "")),
      (this[_0x232f62(0x351)] = this[_0x232f62(0x351)] || []),
      this[_0x232f62(0x351)][_0x232f62(0x2f0)](
        this[_0x232f62(0x2b9)]["textColor"]
      ),
      VisuMZ["MessageCore"]["Window_Base_changeTextColor"][_0x232f62(0x266)](
        this,
        _0x24028d
      );
  }),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x36f)] = function (_0x3c2708) {
    const _0x13a132 = _0x276037;
    this[_0x13a132(0x13a)](_0x3c2708);
    if (this[_0x13a132(0x11c)]()) return;
    if (_0x3c2708["drawing"]) {
      if ("eEfQv" !== _0x13a132(0x2cf)) {
        if (this[_0x13a132(0x261)] === _0x2257a0) this["initMessageCore"]();
        if (this[_0x13a132(0x261)]["helpWordWrap"] === _0x508dff)
          this[_0x13a132(0x22d)]();
        return this["_MessageCoreSettings"][_0x13a132(0x267)];
      } else
        (this["_textColorStack"] = this[_0x13a132(0x351)] || []),
          (this["contents"][_0x13a132(0x388)] =
            this["_textColorStack"][_0x13a132(0x149)]() ||
            ColorManager["normalColor"]());
    }
  }),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x30f)] = function (_0x324b94) {
    const _0x24f4bb = _0x276037;
    return (
      (_0x324b94 = this[_0x24f4bb(0x1af)](_0x324b94)),
      (_0x324b94 = this[_0x24f4bb(0x20f)](_0x324b94)),
      (_0x324b94 = this[_0x24f4bb(0x105)](_0x324b94)),
      (_0x324b94 = this[_0x24f4bb(0x2c2)](_0x324b94)),
      (_0x324b94 = this[_0x24f4bb(0x1fe)](_0x324b94)),
      (_0x324b94 = this["convertFontSettingsEscapeCharacters"](_0x324b94)),
      (_0x324b94 = this[_0x24f4bb(0x281)](_0x324b94)),
      (_0x324b94 = this[_0x24f4bb(0x308)](_0x324b94)),
      (_0x324b94 = this[_0x24f4bb(0x1f9)](_0x324b94)),
      (_0x324b94 = this[_0x24f4bb(0x320)](_0x324b94)),
      (_0x324b94 = this[_0x24f4bb(0x10a)](_0x324b94)),
      (_0x324b94 = this[_0x24f4bb(0x205)](_0x324b94)),
      (_0x324b94 = this[_0x24f4bb(0x16b)](_0x324b94)),
      (_0x324b94 = this[_0x24f4bb(0x105)](_0x324b94)),
      (_0x324b94 = this[_0x24f4bb(0x23d)](_0x324b94)),
      (_0x324b94 = this[_0x24f4bb(0x1bc)](_0x324b94)),
      _0x324b94
    );
  }),
  (Window_Base[_0x276037(0x21e)]["convertTextMacros"] = function (_0x40ba3d) {
    const _0x545561 = _0x276037;
    this[_0x545561(0x378)] = ![];
    for (const _0x24392e of VisuMZ[_0x545561(0x206)][_0x545561(0x317)][
      _0x545561(0x200)
    ]) {
      _0x40ba3d["match"](_0x24392e[_0x545561(0x127)]) &&
        ((this[_0x545561(0x378)] = !![]),
        (_0x40ba3d = _0x40ba3d[_0x545561(0x15c)](
          _0x24392e[_0x545561(0x127)],
          _0x24392e["textCodeResult"]["bind"](this)
        )));
    }
    return _0x40ba3d;
  }),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x20f)] = function (_0x21f39c) {
    return (
      (_0x21f39c = _0x21f39c["replace"](/\\/g, "\x1b")),
      (_0x21f39c = _0x21f39c["replace"](/\x1b\x1b/g, "\x5c")),
      _0x21f39c
    );
  }),
  (Window_Base["prototype"][_0x276037(0x105)] = function (_0x2359f8) {
    const _0x266c3d = _0x276037;
    for (;;) {
      if (_0x266c3d(0x1ba) === _0x266c3d(0x1ba)) {
        if (_0x2359f8[_0x266c3d(0x137)](/\\V\[(\d+)\]/gi)) {
          if (_0x266c3d(0x1a8) === "khdYq") {
            if (_0x4f5e26 === _0x266c3d(0x106)) return !![];
            return _0x27829e[_0x266c3d(0x206)]["Window_Options_isVolumeSymbol"][
              _0x266c3d(0x266)
            ](this, _0x2dd254);
          } else
            _0x2359f8 = _0x2359f8[_0x266c3d(0x15c)](
              /\\V\[(\d+)\]/gi,
              (_0xce944a, _0x5663a0) =>
                this["convertBackslashCharacters"](
                  String($gameVariables[_0x266c3d(0x232)](parseInt(_0x5663a0)))
                )
            );
        } else {
          if (_0x2359f8["match"](/\x1bV\[(\d+)\]/gi)) {
            if (_0x266c3d(0x1b7) === "UcDID") {
              const _0x5de8f7 = _0x3faa00[_0x266c3d(0x38a)] || 0x0;
              if (_0x5de8f7 > 0x0) this[_0x266c3d(0x2c5)](_0x5de8f7);
            } else
              _0x2359f8 = _0x2359f8[_0x266c3d(0x15c)](
                /\x1bV\[(\d+)\]/gi,
                (_0x21c461, _0xda31ab) =>
                  this[_0x266c3d(0x20f)](
                    String(
                      $gameVariables[_0x266c3d(0x232)](parseInt(_0xda31ab))
                    )
                  )
              );
          } else {
            if (_0x266c3d(0x26b) === _0x266c3d(0x26b)) break;
            else
              this[_0x266c3d(0x19e)](),
                this[_0x266c3d(0x233)](),
                this[_0x266c3d(0x201)](_0x433a77);
          }
        }
      } else {
        const _0x48d17e =
            _0x464e5f >= 0x1
              ? _0x570824[_0x266c3d(0x376)]()[_0x4193dc - 0x1]
              : null,
          _0xb537c3 = _0x48d17e ? _0x48d17e["name"]() : "",
          _0x1393d9 = _0x2c099a(
            _0x150f84[_0x266c3d(0x206)]["Settings"][_0x266c3d(0x1c0)][
              _0x266c3d(0x1c4)
            ]
          );
        return this["isAutoColorAffected"]() && _0x1393d9 !== 0x0
          ? "\x1bC[%1]%2\x1bPREVCOLOR[0]"[_0x266c3d(0x384)](
              _0x1393d9,
              _0xb537c3
            )
          : _0xb537c3;
      }
    }
    return _0x2359f8;
  }),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x2c2)] = function (_0x38a7f7) {
    const _0x360c5d = _0x276037;
    return this[_0x360c5d(0x1ed)](), _0x38a7f7;
  }),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x16b)] = function (_0x571035) {
    return _0x571035;
  }),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x1fe)] = function (_0x804bc4) {
    const _0x3b4d90 = _0x276037;
    return (
      (_0x804bc4 = _0x804bc4["replace"](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/i, "")),
      (_0x804bc4 = _0x804bc4[_0x3b4d90(0x15c)](
        /<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,
        ""
      )),
      (_0x804bc4 = _0x804bc4[_0x3b4d90(0x15c)](
        /<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,
        ""
      )),
      _0x804bc4
    );
  }),
  (Window_Base["prototype"][_0x276037(0x145)] = function (_0x167ccb) {
    const _0x3fd2a7 = _0x276037;
    return (
      (_0x167ccb = _0x167ccb[_0x3fd2a7(0x15c)](/<B>/gi, "\x1bBOLD[1]")),
      (_0x167ccb = _0x167ccb[_0x3fd2a7(0x15c)](/<\/B>/gi, "\x1bBOLD[0]")),
      (_0x167ccb = _0x167ccb[_0x3fd2a7(0x15c)](/<I>/gi, _0x3fd2a7(0x2b2))),
      (_0x167ccb = _0x167ccb[_0x3fd2a7(0x15c)](/<\/I>/gi, _0x3fd2a7(0x282))),
      _0x167ccb
    );
  }),
  (Window_Base["prototype"]["convertTextAlignmentEscapeCharacters"] = function (
    _0x1e1657
  ) {
    const _0x1c593b = _0x276037;
    return (
      (_0x1e1657 = _0x1e1657[_0x1c593b(0x15c)](
        /<LEFT>/gi,
        "\x1bTEXTALIGNMENT[1]"
      )),
      (_0x1e1657 = _0x1e1657[_0x1c593b(0x15c)](/<\/LEFT>/gi, _0x1c593b(0x13e))),
      (_0x1e1657 = _0x1e1657["replace"](/<CENTER>/gi, _0x1c593b(0x329))),
      (_0x1e1657 = _0x1e1657[_0x1c593b(0x15c)](
        /<\/CENTER>/gi,
        "\x1bTEXTALIGNMENT[0]"
      )),
      (_0x1e1657 = _0x1e1657["replace"](/<RIGHT>/gi, _0x1c593b(0x2f7))),
      (_0x1e1657 = _0x1e1657[_0x1c593b(0x15c)](
        /<\/RIGHT>/gi,
        _0x1c593b(0x13e)
      )),
      _0x1e1657
    );
  }),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x308)] = function (_0x370637) {
    const _0x27de6c = _0x276037;
    return (
      (_0x370637 = _0x370637[_0x27de6c(0x15c)](
        /<COLORLOCK>/gi,
        _0x27de6c(0x248)
      )),
      (_0x370637 = _0x370637[_0x27de6c(0x15c)](
        /<\/COLORLOCK>/gi,
        _0x27de6c(0x322)
      )),
      (_0x370637 = _0x370637[_0x27de6c(0x15c)](/\(\(\(/gi, "\x1bCOLORLOCK[1]")),
      (_0x370637 = _0x370637[_0x27de6c(0x15c)](/\)\)\)/gi, _0x27de6c(0x322))),
      _0x370637
    );
  }),
  (Window_Base["prototype"][_0x276037(0x1f9)] = function (_0x509b07) {
    const _0x56c247 = _0x276037;
    return (
      (_0x509b07 = _0x509b07[_0x56c247(0x15c)](
        /\x1bN\[(\d+)\]/gi,
        (_0xd8489a, _0x58cd81) => this[_0x56c247(0x235)](parseInt(_0x58cd81))
      )),
      (_0x509b07 = _0x509b07["replace"](
        /\x1bP\[(\d+)\]/gi,
        (_0x4627f6, _0x4f8622) => this[_0x56c247(0x336)](parseInt(_0x4f8622))
      )),
      (_0x509b07 = _0x509b07[_0x56c247(0x15c)](
        /\x1bG/gi,
        TextManager[_0x56c247(0x34a)]
      )),
      _0x509b07
    );
  }),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x320)] = function (_0x3389af) {
    const _0x762da1 = _0x276037;
    return (
      (_0x3389af = _0x3389af[_0x762da1(0x15c)](
        /\<(?:BATTLE|CURRENT BATTLE) TARGET\>/gi,
        this["battleTargetName"]()
      )),
      (_0x3389af = _0x3389af[_0x762da1(0x15c)](
        /\<(?:BATTLE|CURRENT BATTLE) (?:USER|SUBJECT)\>/gi,
        this[_0x762da1(0x107)]()
      )),
      (_0x3389af = _0x3389af["replace"](
        /\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION)\>/gi,
        this[_0x762da1(0x1f7)](!![])
      )),
      (_0x3389af = _0x3389af[_0x762da1(0x15c)](
        /\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION) NAME\>/gi,
        this[_0x762da1(0x1f7)](![])
      )),
      _0x3389af
    );
  }),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x247)] = function () {
    const _0x20c398 = _0x276037;
    if (!SceneManager[_0x20c398(0x29f)]()) return "";
    if (BattleManager[_0x20c398(0x340)])
      return BattleManager[_0x20c398(0x340)][_0x20c398(0x31d)]();
    if (BattleManager["_targets"][0x0])
      return BattleManager[_0x20c398(0x1d5)][0x0][_0x20c398(0x31d)]();
    return "";
  }),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x107)] = function () {
    const _0x53bbe1 = _0x276037;
    if (!SceneManager[_0x53bbe1(0x29f)]()) return "";
    let _0x1ba462 = null;
    return (
      (_0x1ba462 = BattleManager[_0x53bbe1(0x1eb)]),
      !_0x1ba462 &&
        BattleManager[_0x53bbe1(0x2d1)]() &&
        (_0x1ba462 = BattleManager[_0x53bbe1(0x321)]()),
      _0x1ba462 ? _0x1ba462[_0x53bbe1(0x31d)]() : ""
    );
  }),
  (Window_Base[_0x276037(0x21e)]["battleActionName"] = function (_0x25743a) {
    const _0x496806 = _0x276037;
    if (!SceneManager[_0x496806(0x29f)]()) return "";
    let _0x5fe5ad = BattleManager[_0x496806(0x238)] || null;
    if (!_0x5fe5ad && BattleManager[_0x496806(0x2d1)]()) {
      if (_0x496806(0x10b) === _0x496806(0x18c)) {
        if (this[_0x496806(0x261)] === _0x41d0b3) this[_0x496806(0x22d)]();
        if (this[_0x496806(0x261)][_0x496806(0x133)] === _0xda624e)
          this[_0x496806(0x22d)]();
        this[_0x496806(0x261)]["choiceLineHeight"] = _0x545af6 || 0x1;
      } else _0x5fe5ad = BattleManager[_0x496806(0x1d3)]();
    }
    if (_0x5fe5ad && _0x5fe5ad[_0x496806(0x1ad)]()) {
      let _0x1c7479 = "";
      if (_0x25743a)
        _0x1c7479 += _0x496806(0x29c)[_0x496806(0x384)](
          _0x5fe5ad["item"]()["iconIndex"]
        );
      return (_0x1c7479 += _0x5fe5ad["item"]()[_0x496806(0x31d)]), _0x1c7479;
    }
    return "";
  }),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x10a)] = function (_0x446fa2) {
    const _0x1352a1 = _0x276037;
    for (const _0x1d54d7 of VisuMZ[_0x1352a1(0x206)]["Settings"][
      _0x1352a1(0x31e)
    ]) {
      if (_0x1352a1(0x21f) === _0x1352a1(0x2f3)) return _0x432caf;
      else {
        if (_0x446fa2[_0x1352a1(0x137)](_0x1d54d7[_0x1352a1(0x127)])) {
          if ("HkWjC" !== "HkWjC") {
            const _0x17899e = _0x4aae8b["prototype"][_0x1352a1(0x2d0)][
              _0x1352a1(0x266)
            ](this, _0x1e8c85);
            _0x2370b8[_0x1352a1(0x152)] && this[_0x1352a1(0x2c5)](_0x17899e);
          } else
            (_0x446fa2 = _0x446fa2["replace"](
              _0x1d54d7[_0x1352a1(0x127)],
              _0x1d54d7[_0x1352a1(0x2b8)]
            )),
              (_0x446fa2 = this["convertVariableEscapeCharacters"](_0x446fa2));
        }
      }
    }
    return _0x446fa2;
  }),
  (Window_Base[_0x276037(0x21e)]["convertMessageCoreEscapeReplacements"] =
    function (_0x48c299) {
      const _0x24ec8f = _0x276037;
      for (const _0x20aff1 of VisuMZ[_0x24ec8f(0x206)]["Settings"][
        "TextCodeReplace"
      ]) {
        _0x48c299["match"](_0x20aff1["textCodeCheck"]) &&
          ((_0x48c299 = _0x48c299["replace"](
            _0x20aff1["textCodeCheck"],
            _0x20aff1[_0x24ec8f(0x2b8)][_0x24ec8f(0xf3)](this)
          )),
          (_0x48c299 = this[_0x24ec8f(0x105)](_0x48c299)));
      }
      return _0x48c299;
    }),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x235)] = function (_0x4ccba5) {
    const _0x31893a = _0x276037,
      _0x3187bd =
        _0x4ccba5 >= 0x1 ? $gameActors[_0x31893a(0x321)](_0x4ccba5) : null,
      _0x34c255 = _0x3187bd ? _0x3187bd[_0x31893a(0x31d)]() : "",
      _0x1dedfd = Number(
        VisuMZ[_0x31893a(0x206)][_0x31893a(0x317)][_0x31893a(0x1c0)][
          _0x31893a(0x1c4)
        ]
      );
    return this[_0x31893a(0x2b7)]() && _0x1dedfd !== 0x0
      ? _0x31893a(0x182)[_0x31893a(0x384)](_0x1dedfd, _0x34c255)
      : _0x34c255;
  }),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x336)] = function (_0x2b284e) {
    const _0x29e2c1 = _0x276037,
      _0x291186 =
        _0x2b284e >= 0x1
          ? $gameParty[_0x29e2c1(0x376)]()[_0x2b284e - 0x1]
          : null,
      _0x31480c = _0x291186 ? _0x291186[_0x29e2c1(0x31d)]() : "",
      _0x30fb20 = Number(
        VisuMZ[_0x29e2c1(0x206)][_0x29e2c1(0x317)][_0x29e2c1(0x1c0)][
          _0x29e2c1(0x1c4)
        ]
      );
    return this[_0x29e2c1(0x2b7)]() && _0x30fb20 !== 0x0
      ? _0x29e2c1(0x182)[_0x29e2c1(0x384)](_0x30fb20, _0x31480c)
      : _0x31480c;
  }),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x23d)] = function (_0x28d3f3) {
    const _0x2ea274 = _0x276037;
    if (this[_0x2ea274(0x2b7)]()) {
      if (_0x2ea274(0x14e) === _0x2ea274(0x14e))
        (_0x28d3f3 = this[_0x2ea274(0x148)](_0x28d3f3)),
          (_0x28d3f3 = this[_0x2ea274(0x2b5)](_0x28d3f3));
      else return _0x4ed44c["instantTextSpeed"];
    }
    return _0x28d3f3;
  }),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x148)] = function (_0x3edbd9) {
    const _0xb71e4b = _0x276037;
    for (autoColor of VisuMZ[_0xb71e4b(0x206)][_0xb71e4b(0x18f)]) {
      _0x3edbd9 = _0x3edbd9["replace"](autoColor[0x0], autoColor[0x1]);
    }
    return _0x3edbd9;
  }),
  (Window_Base["prototype"][_0x276037(0x30a)] = function () {
    const _0x251c48 = _0x276037;
    this[_0x251c48(0x208)] = [];
  }),
  (Window_Base[_0x276037(0x21e)]["registerActorNameAutoColorChanges"] =
    function () {
      const _0x4d2a77 = _0x276037;
      this["clearActorNameAutoColor"]();
      const _0x53e427 =
          VisuMZ[_0x4d2a77(0x206)][_0x4d2a77(0x317)][_0x4d2a77(0x1c0)],
        _0x5ce34e = _0x53e427[_0x4d2a77(0x1c4)];
      if (_0x5ce34e <= 0x0) return;
      for (const _0x34260f of $gameActors[_0x4d2a77(0x237)]) {
        if (_0x4d2a77(0x23a) !== _0x4d2a77(0x32c)) {
          if (!_0x34260f) continue;
          const _0x5f3eae = _0x34260f[_0x4d2a77(0x31d)]();
          if (_0x5f3eae[_0x4d2a77(0x1fb)]()["length"] <= 0x0) continue;
          if (/^\d+$/[_0x4d2a77(0x15e)](_0x5f3eae)) continue;
          if (_0x5f3eae[_0x4d2a77(0x137)](/-----/i)) continue;
          let _0x20683b =
            VisuMZ[_0x4d2a77(0x206)]["ConvertTextAutoColorRegExpFriendly"](
              _0x5f3eae
            );
          const _0xb05f5e = new RegExp("\x5cb" + _0x20683b + "\x5cb", "g"),
            _0x20fde3 = _0x4d2a77(0x182)[_0x4d2a77(0x384)](
              _0x5ce34e,
              _0x5f3eae
            );
          this[_0x4d2a77(0x208)][_0x4d2a77(0x23e)]([_0xb05f5e, _0x20fde3]);
        } else
          return (
            this[_0x4d2a77(0x215)] &&
            this[_0x4d2a77(0x215)][_0x4d2a77(0xe1)] === _0x1b6a3c
          );
      }
    }),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x2b5)] = function (_0x3ca618) {
    const _0x389fa4 = _0x276037;
    if (this["_autoColorActorNames"] === undefined) {
      if (_0x389fa4(0x1c2) === _0x389fa4(0x1c2)) this[_0x389fa4(0x1ed)]();
      else
        return _0x4f5637["prototype"][_0x389fa4(0x16b)][_0x389fa4(0x266)](
          this,
          _0x5d099c
        );
    }
    for (autoColor of this[_0x389fa4(0x208)]) {
      _0x389fa4(0x142) === _0x389fa4(0x142)
        ? (_0x3ca618 = _0x3ca618[_0x389fa4(0x15c)](
            autoColor[0x0],
            autoColor[0x1]
          ))
        : (_0xef7e4a = _0x5e4751[_0x389fa4(0x31d)]);
    }
    return _0x3ca618;
  }),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x202)] = function (
    _0x45ddf9,
    _0x407e86,
    _0x5c9a1a
  ) {
    const _0x3b9c19 = _0x276037;
    if (!_0x45ddf9) return "";
    const _0x50e507 = _0x45ddf9[_0x407e86];
    let _0x3a77b6 = "";
    if (_0x50e507 && _0x5c9a1a && _0x50e507[_0x3b9c19(0x24d)]) {
      if (_0x3b9c19(0x197) !== _0x3b9c19(0x1b0)) {
        const _0x486f7b = _0x3b9c19(0x2cc);
        _0x3a77b6 = _0x486f7b["format"](
          _0x50e507[_0x3b9c19(0x24d)],
          _0x50e507[_0x3b9c19(0x31d)]
        );
      } else
        (_0x324242 = _0x367074[_0x3b9c19(0x15c)](/[\n\r]+/g, "")),
          (_0x31070 = _0x396de6["replace"](/<(?:BR|LINEBREAK)>/gi, "\x0a"));
    } else
      _0x50e507 ? (_0x3a77b6 = _0x50e507[_0x3b9c19(0x31d)]) : (_0x3a77b6 = "");
    return (
      this[_0x3b9c19(0x2b7)]() &&
        (_0x3b9c19(0x360) !== _0x3b9c19(0x19f)
          ? (_0x3a77b6 = this["applyDatabaseAutoColor"](_0x3a77b6, _0x45ddf9))
          : (_0x41e758[_0x3b9c19(0x206)]["Game_Map_initialize"]["call"](this),
            (this[_0x3b9c19(0x2ea)] = []))),
      _0x3a77b6
    );
  }),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x249)] = function (_0x5a36be) {
    const _0x223e2e = _0x276037,
      _0x198ea5 = $gameParty[_0x223e2e(0x113)]();
    if (_0x198ea5["id"] < 0x0) return "";
    let _0x2f3393 = null;
    if (_0x198ea5[_0x223e2e(0x369)] === 0x0)
      _0x2f3393 = $dataItems[_0x198ea5["id"]];
    if (_0x198ea5[_0x223e2e(0x369)] === 0x1)
      _0x2f3393 = $dataWeapons[_0x198ea5["id"]];
    if (_0x198ea5[_0x223e2e(0x369)] === 0x2)
      _0x2f3393 = $dataArmors[_0x198ea5["id"]];
    if (!_0x2f3393) return "";
    return _0x5a36be
      ? _0x223e2e(0x2cc)[_0x223e2e(0x384)](
          _0x2f3393[_0x223e2e(0x24d)],
          _0x2f3393[_0x223e2e(0x31d)]
        )
      : _0x2f3393[_0x223e2e(0x31d)];
  }),
  (Window_Base["prototype"][_0x276037(0x25f)] = function () {
    const _0x5c1a22 = _0x276037,
      _0x164da5 = $gameParty[_0x5c1a22(0x113)]();
    if (_0x164da5["id"] <= 0x0) return "";
    return _0x164da5["quantity"];
  }),
  (Window_Base[_0x276037(0x21e)]["applyDatabaseAutoColor"] = function (
    _0x9e3073,
    _0x20b375
  ) {
    const _0x568d2a = _0x276037,
      _0x4b92ce = VisuMZ[_0x568d2a(0x206)]["Settings"][_0x568d2a(0x1c0)];
    let _0x51fc22 = 0x0;
    if (_0x20b375 === $dataActors) _0x51fc22 = _0x4b92ce[_0x568d2a(0x1c4)];
    if (_0x20b375 === $dataClasses) _0x51fc22 = _0x4b92ce[_0x568d2a(0x1ec)];
    if (_0x20b375 === $dataSkills) _0x51fc22 = _0x4b92ce["Skills"];
    if (_0x20b375 === $dataItems) _0x51fc22 = _0x4b92ce["Items"];
    if (_0x20b375 === $dataWeapons) _0x51fc22 = _0x4b92ce[_0x568d2a(0x1a4)];
    if (_0x20b375 === $dataArmors) _0x51fc22 = _0x4b92ce[_0x568d2a(0x275)];
    if (_0x20b375 === $dataEnemies) _0x51fc22 = _0x4b92ce["Enemies"];
    if (_0x20b375 === $dataStates) _0x51fc22 = _0x4b92ce[_0x568d2a(0x1a1)];
    return (
      _0x51fc22 > 0x0 &&
        (_0x9e3073 = "\x1bC[%1]%2\x1bPREVCOLOR[0]"[_0x568d2a(0x384)](
          _0x51fc22,
          _0x9e3073
        )),
      _0x9e3073
    );
  }),
  (Window_Base["prototype"]["prepareWordWrapEscapeCharacters"] = function (
    _0x5c7863
  ) {
    const _0x1b3167 = _0x276037;
    (_0x5c7863 = _0x5c7863[_0x1b3167(0x15c)](
      /<(?:WORDWRAP|WORD WRAP)>/gi,
      (_0x4bb314, _0x1c961a) => this[_0x1b3167(0x1e7)](!![])
    )),
      (_0x5c7863 = _0x5c7863[_0x1b3167(0x15c)](
        /<(?:NOWORDWRAP|NO WORD WRAP)>/gi,
        (_0x1f13dc, _0x347429) => this[_0x1b3167(0x1e7)](![])
      )),
      (_0x5c7863 = _0x5c7863["replace"](
        /<\/(?:WORDWRAP|WORD WRAP)>/gi,
        (_0x871221, _0x254a33) => this[_0x1b3167(0x1e7)](![])
      ));
    if (_0x5c7863["match"](Window_Message[_0x1b3167(0x301)]))
      _0x1b3167(0x101) === _0x1b3167(0x101)
        ? this[_0x1b3167(0x1e7)](![])
        : this[_0x1b3167(0x34e)](
            this[_0x1b3167(0x1d2)]["x"],
            this[_0x1b3167(0x1d2)]["y"],
            this[_0x1b3167(0x1d2)][_0x1b3167(0x222)],
            this[_0x1b3167(0x1d2)][_0x1b3167(0x333)],
            _0x1c537f,
            _0xa55fc2
          );
    else {
      if (_0x5c7863[_0x1b3167(0x137)](Window_Message[_0x1b3167(0x22a)])) {
        if ("nCBso" !== _0x1b3167(0x302))
          for (const _0x50462a of _0x1f9d16[_0x1b3167(0x206)][_0x1b3167(0x317)][
            _0x1b3167(0x200)
          ]) {
            (_0x50462a[_0x1b3167(0x127)] = new _0x3796bc(
              "\x5c[" + _0x50462a[_0x1b3167(0x34c)] + "\x5c]",
              "gi"
            )),
              _0x50462a[_0x1b3167(0x382)] !== "" &&
              _0x50462a[_0x1b3167(0x382)] !== _0x1b3167(0x132)
                ? (_0x50462a["textCodeResult"] = new _0x10bb12(
                    _0x1b3167(0x323) +
                      _0x50462a["TextStr"][_0x1b3167(0x15c)](/\\/g, "\x1b") +
                      "\x27"
                  ))
                : (_0x50462a["textCodeResult"] = _0x50462a[_0x1b3167(0x160)]);
          }
        else this["setWordWrap"](![]);
      }
    }
    if (!this[_0x1b3167(0x20a)]()) return _0x5c7863;
    if (_0x5c7863["length"] <= 0x0) return _0x5c7863;
    return (
      VisuMZ[_0x1b3167(0x206)][_0x1b3167(0x317)][_0x1b3167(0x194)][
        _0x1b3167(0xe9)
      ]
        ? ((_0x5c7863 = _0x5c7863[_0x1b3167(0x15c)](/[\n\r]+/g, "\x20")),
          (_0x5c7863 = _0x5c7863["replace"](
            /<(?:BR|LINEBREAK)>/gi,
            "\x20\x0a"
          )))
        : ((_0x5c7863 = _0x5c7863[_0x1b3167(0x15c)](/[\n\r]+/g, "")),
          (_0x5c7863 = _0x5c7863[_0x1b3167(0x15c)](
            /<(?:BR|LINEBREAK)>/gi,
            "\x0a"
          ))),
      (_0x5c7863 = this[_0x1b3167(0x2db)](_0x5c7863)),
      (_0x5c7863 = _0x5c7863[_0x1b3167(0x284)]("\x20")[_0x1b3167(0x2e4)](
        _0x1b3167(0x29e)
      )),
      (_0x5c7863 = _0x5c7863[_0x1b3167(0x15c)](/<(?:BR|LINEBREAK)>/gi, "\x0a")),
      (_0x5c7863 = _0x5c7863["replace"](
        /<LINE\x1bWrapBreak[0]BREAK>/gi,
        "\x0a"
      )),
      _0x5c7863
    );
  }),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x2db)] = function (_0x2a9171) {
    return _0x2a9171;
  }),
  (VisuMZ["MessageCore"][_0x276037(0x29b)] =
    Window_Base["prototype"][_0x276037(0x36b)]),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x36b)] = function (_0xc59793) {
    const _0x434e8e = _0x276037;
    VisuMZ[_0x434e8e(0x206)][_0x434e8e(0x29b)][_0x434e8e(0x266)](
      this,
      _0xc59793
    ),
      this["processTextAlignmentX"](_0xc59793);
  }),
  (VisuMZ[_0x276037(0x206)][_0x276037(0x325)] =
    Window_Base[_0x276037(0x21e)][_0x276037(0x1bd)]),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x1bd)] = function (
    _0x4a8c09,
    _0x34a7fc
  ) {
    const _0x297f11 = _0x276037;
    VisuMZ[_0x297f11(0x206)]["Window_Base_processControlCharacter"][
      _0x297f11(0x266)
    ](this, _0x4a8c09, _0x34a7fc),
      _0x34a7fc === _0x297f11(0x29e) && this["processWrapBreak"](_0x4a8c09);
  }),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x2ae)] = function (_0x41bc02) {
    const _0x3d3898 = _0x276037;
    var _0x7910f7 = /^\<(.*?)\>/[_0x3d3898(0x1c3)](
      _0x41bc02[_0x3d3898(0x1e4)]["slice"](_0x41bc02["index"])
    );
    return _0x7910f7
      ? ((_0x41bc02[_0x3d3898(0x193)] += _0x7910f7[0x0]["length"]),
        String(
          _0x7910f7[0x0][_0x3d3898(0x19c)](
            0x1,
            _0x7910f7[0x0][_0x3d3898(0x313)] - 0x1
          )
        ))
      : "";
  }),
  (VisuMZ[_0x276037(0x206)]["Window_Base_processEscapeCharacter"] =
    Window_Base[_0x276037(0x21e)]["processEscapeCharacter"]),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x343)] = function (
    _0x40adb6,
    _0x4e93d1
  ) {
    const _0x9e4987 = _0x276037;
    switch (_0x40adb6) {
      case "C":
        if (_0x4e93d1[_0x9e4987(0x152)])
          VisuMZ["MessageCore"][_0x9e4987(0x268)]["call"](
            this,
            _0x40adb6,
            _0x4e93d1
          );
        else {
          if (_0x9e4987(0x154) !== "RYqLx")
            return (this[_0x9e4987(0x38d)] = _0x1ef1a7), "";
          else this["obtainEscapeParam"](_0x4e93d1);
        }
        break;
      case "I":
      case "{":
      case "}":
        VisuMZ[_0x9e4987(0x206)]["Window_Base_processEscapeCharacter"]["call"](
          this,
          _0x40adb6,
          _0x4e93d1
        );
        break;
      case "FS":
        this["processFsTextCode"](_0x4e93d1);
        break;
      case "PX":
        this[_0x9e4987(0x14d)](_0x4e93d1);
        break;
      case "PY":
        this[_0x9e4987(0x163)](_0x4e93d1);
        break;
      case _0x9e4987(0x253):
        this["processFontChangeBold"](this[_0x9e4987(0x13a)](_0x4e93d1));
        break;
      case "CENTERPICTURE":
        this[_0x9e4987(0x112)](_0x4e93d1);
        break;
      case _0x9e4987(0x1ef):
        this["processColorLock"](_0x4e93d1);
        break;
      case _0x9e4987(0x183):
        this["processCommonEvent"](_0x4e93d1);
        break;
      case "ITALIC":
        this[_0x9e4987(0x2c4)](this[_0x9e4987(0x13a)](_0x4e93d1));
        break;
      case _0x9e4987(0x366):
        this["processDrawPicture"](_0x4e93d1);
        break;
      case _0x9e4987(0x191):
        this[_0x9e4987(0x36f)](_0x4e93d1);
        break;
      case _0x9e4987(0x243):
        this["processTextAlignmentChange"](_0x4e93d1);
        break;
      case "WAIT":
        this[_0x9e4987(0x353)](_0x4e93d1);
        break;
      case "WRAPBREAK":
        this[_0x9e4987(0x2cd)](_0x4e93d1);
        break;
      default:
        this["processMessageCoreEscapeActions"](_0x40adb6, _0x4e93d1);
    }
  }),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x18d)] = function (
    _0x59082a,
    _0x523b6d
  ) {
    const _0x342c39 = _0x276037;
    for (const _0x3a4d6c of VisuMZ[_0x342c39(0x206)][_0x342c39(0x317)][
      _0x342c39(0x31e)
    ]) {
      if (_0x3a4d6c["Match"] === _0x59082a) {
        if ("LBvpj" !== _0x342c39(0x285)) {
          if (_0x3a4d6c["Type"] === "") this[_0x342c39(0x13a)](_0x523b6d);
          _0x3a4d6c[_0x342c39(0x219)]["call"](this, _0x523b6d);
          if (this[_0x342c39(0xe1)] === Window_Message) {
            if (_0x342c39(0x2ba) === _0x342c39(0x2ba)) {
              const _0x6d9c46 = _0x3a4d6c["CommonEvent"] || 0x0;
              if (_0x6d9c46 > 0x0) this["launchMessageCommonEvent"](_0x6d9c46);
            } else {
              const _0x452566 = this[_0x342c39(0x2b4)](_0x4f0ef6),
                _0x46bf94 = 0x1,
                _0x5c9bde = _0x452566 + (_0x5affa8 ? _0x46bf94 : -_0x46bf94);
              _0x5c9bde > 0xb && _0x3bec25
                ? this["changeValue"](_0x1243a9, 0x1)
                : this[_0x342c39(0x386)](
                    _0x1ed878,
                    _0x5c9bde[_0x342c39(0x33b)](0x1, 0xb)
                  );
            }
          }
        } else {
          for (const _0x4c457a of _0x9a4428[_0x342c39(0x206)][_0x342c39(0x317)][
            _0x342c39(0x373)
          ]) {
            _0x42dcbd[_0x342c39(0x137)](_0x4c457a[_0x342c39(0x127)]) &&
              ((_0x3bd856 = _0x4db752["replace"](
                _0x4c457a[_0x342c39(0x127)],
                _0x4c457a["textCodeResult"][_0x342c39(0xf3)](this)
              )),
              (_0x4eaebe = this[_0x342c39(0x105)](_0x499db4)));
          }
          return _0x20db06;
        }
      }
    }
  }),
  (Window_Base["prototype"][_0x276037(0x345)] = function () {
    const _0x55c35c = _0x276037;
    (this[_0x55c35c(0x2b9)]["fontSize"] +=
      VisuMZ[_0x55c35c(0x206)][_0x55c35c(0x317)][_0x55c35c(0x24e)][
        _0x55c35c(0x1bf)
      ]),
      (this[_0x55c35c(0x2b9)][_0x55c35c(0x23b)] = Math[_0x55c35c(0x21a)](
        this[_0x55c35c(0x2b9)][_0x55c35c(0x23b)],
        VisuMZ["MessageCore"][_0x55c35c(0x317)]["General"]["FontBiggerCap"]
      ));
  }),
  (Window_Base["prototype"]["makeFontSmaller"] = function () {
    const _0x3713d0 = _0x276037;
    (this[_0x3713d0(0x2b9)]["fontSize"] -=
      VisuMZ[_0x3713d0(0x206)][_0x3713d0(0x317)][_0x3713d0(0x24e)][
        _0x3713d0(0x1bf)
      ]),
      (this[_0x3713d0(0x2b9)][_0x3713d0(0x23b)] = Math["max"](
        this[_0x3713d0(0x2b9)]["fontSize"],
        VisuMZ[_0x3713d0(0x206)][_0x3713d0(0x317)][_0x3713d0(0x24e)][
          "FontSmallerCap"
        ]
      ));
  }),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x1ce)] = function (_0x1f4d47) {
    const _0x146076 = _0x276037,
      _0x1ace35 = this["obtainEscapeParam"](_0x1f4d47);
    this[_0x146076(0x2b9)][_0x146076(0x23b)] = _0x1ace35[_0x146076(0x33b)](
      VisuMZ[_0x146076(0x206)]["Settings"][_0x146076(0x24e)][_0x146076(0x240)],
      VisuMZ[_0x146076(0x206)][_0x146076(0x317)]["General"][_0x146076(0x138)]
    );
  }),
  (Window_Base[_0x276037(0x21e)]["maxFontSizeInLine"] = function (_0x4d7b85) {
    const _0xb5281f = _0x276037;
    let _0x455125 = this["contents"][_0xb5281f(0x23b)];
    const _0xa30c93 = /\x1b({|}|FS)(\[(\d+)])?/gi;
    for (;;) {
      const _0x140a9e = _0xa30c93[_0xb5281f(0x1c3)](_0x4d7b85);
      if (!_0x140a9e) {
        if (_0xb5281f(0x12d) !== _0xb5281f(0x12d))
          _0x59faf7["text"] =
            _0xb03583["text"][_0xb5281f(0x19c)](
              0x0,
              _0x1246b6[_0xb5281f(0x193)]
            ) +
            "\x0a" +
            _0x336e54[_0xb5281f(0x1e4)][_0xb5281f(0x166)](
              _0x2d7c08[_0xb5281f(0x193)]
            );
        else break;
      }
      const _0x30760e = String(_0x140a9e[0x1])["toUpperCase"]();
      if (_0x30760e === "{") this["makeFontBigger"]();
      else {
        if (_0x30760e === "}")
          _0xb5281f(0x172) === "IyZVa"
            ? this["_interpreter"] &&
              (this[_0xb5281f(0x348)]["isRunning"]()
                ? this["_interpreter"][_0xb5281f(0x2a4)]()
                : this[_0xb5281f(0x1f1)]())
            : this[_0xb5281f(0x1e1)]();
        else
          _0x30760e === "FS" &&
            (this["contents"][_0xb5281f(0x23b)] = parseInt(_0x140a9e[0x3])[
              _0xb5281f(0x33b)
            ](
              VisuMZ[_0xb5281f(0x206)][_0xb5281f(0x317)][_0xb5281f(0x24e)][
                "FontSmallerCap"
              ],
              VisuMZ[_0xb5281f(0x206)]["Settings"]["General"]["FontBiggerCap"]
            ));
      }
      if (this[_0xb5281f(0x2b9)][_0xb5281f(0x23b)] > _0x455125) {
        if (_0xb5281f(0x1dc) !== _0xb5281f(0x1dc)) {
          _0x52a915[_0xb5281f(0x206)][_0xb5281f(0x1fc)][_0xb5281f(0x266)](
            this,
            _0x1ceb49
          );
          const _0x1712c7 =
            _0x2609df[_0xb5281f(0x206)]["Settings"]["AutoColor"];
          _0x2b53bb[_0xb5281f(0x206)][_0xb5281f(0x1e5)](
            _0x255333,
            _0x1712c7[_0xb5281f(0x1b8)]
          );
        } else _0x455125 = this[_0xb5281f(0x2b9)][_0xb5281f(0x23b)];
      }
    }
    return _0x455125;
  }),
  (Window_Base[_0x276037(0x21e)]["processPxTextCode"] = function (_0x1c6a4e) {
    const _0x45b093 = _0x276037;
    (_0x1c6a4e["x"] = this["obtainEscapeParam"](_0x1c6a4e)),
      VisuMZ["MessageCore"]["Settings"]["General"][_0x45b093(0x17c)] &&
        (_0x1c6a4e["x"] += _0x1c6a4e[_0x45b093(0x28c)]);
  }),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x163)] = function (_0x59a804) {
    const _0x36af00 = _0x276037;
    (_0x59a804["y"] = this["obtainEscapeParam"](_0x59a804)),
      VisuMZ[_0x36af00(0x206)][_0x36af00(0x317)][_0x36af00(0x24e)][
        _0x36af00(0x17c)
      ] && (_0x59a804["y"] += _0x59a804[_0x36af00(0x141)]);
  }),
  (Window_Base["prototype"][_0x276037(0x31b)] = function (_0x372eef) {
    const _0x6c9d95 = _0x276037;
    this[_0x6c9d95(0x2b9)][_0x6c9d95(0x1be)] = !!_0x372eef;
  }),
  (Window_Base[_0x276037(0x21e)]["processFontChangeItalic"] = function (
    _0x31e173
  ) {
    const _0x59d984 = _0x276037;
    this[_0x59d984(0x2b9)][_0x59d984(0x37c)] = !!_0x31e173;
  }),
  (Window_Base["prototype"][_0x276037(0xe2)] = function (_0x4042fa) {
    const _0x5a8485 = _0x276037,
      _0x525a9b = this["obtainEscapeParam"](_0x4042fa);
    if (!_0x4042fa[_0x5a8485(0x152)]) return;
    switch (_0x525a9b) {
      case 0x0:
        this[_0x5a8485(0x2a8)](_0x5a8485(0x1f5));
        return;
      case 0x1:
        this[_0x5a8485(0x2a8)](_0x5a8485(0x1e3));
        break;
      case 0x2:
        this[_0x5a8485(0x2a8)]("center");
        break;
      case 0x3:
        this["setTextAlignment"](_0x5a8485(0x108));
        break;
    }
    this["processTextAlignmentX"](_0x4042fa);
  }),
  (Window_Base["prototype"][_0x276037(0x1b9)] = function (_0x3acecf) {
    const _0x1296dc = _0x276037;
    if (!_0x3acecf[_0x1296dc(0x152)]) return;
    if (_0x3acecf["rtl"]) return;
    if (this[_0x1296dc(0x289)]() === _0x1296dc(0x1f5)) return;
    let _0x56ca19 = _0x3acecf[_0x1296dc(0x1e4)][_0x1296dc(0xec)](
        _0x1296dc(0x2ee),
        _0x3acecf[_0x1296dc(0x193)] + 0x1
      ),
      _0x2856c5 = _0x3acecf[_0x1296dc(0x1e4)][_0x1296dc(0xec)](
        "\x0a",
        _0x3acecf[_0x1296dc(0x193)] + 0x1
      );
    if (_0x56ca19 < 0x0)
      _0x56ca19 = _0x3acecf[_0x1296dc(0x1e4)][_0x1296dc(0x313)] + 0x1;
    if (_0x2856c5 > 0x0) _0x56ca19 = Math["min"](_0x56ca19, _0x2856c5);
    const _0x5ec98e = _0x3acecf["text"]["substring"](
        _0x3acecf[_0x1296dc(0x193)],
        _0x56ca19
      ),
      _0x257374 = this[_0x1296dc(0x295)](_0x5ec98e)["width"],
      _0x3a1203 = _0x3acecf[_0x1296dc(0x222)] || this["innerWidth"] - 0x8,
      _0x4bed3c =
        this[_0x1296dc(0xe1)] === Window_Message &&
        $gameMessage[_0x1296dc(0x22e)]() !== "";
    switch (this[_0x1296dc(0x289)]()) {
      case _0x1296dc(0x1e3):
        _0x3acecf["x"] = _0x3acecf[_0x1296dc(0x28c)];
        break;
      case _0x1296dc(0x365):
        (_0x3acecf["x"] = _0x3acecf[_0x1296dc(0x28c)]),
          (_0x3acecf["x"] += Math[_0x1296dc(0x226)](
            (_0x3a1203 - _0x257374) / 0x2
          ));
        if (_0x4bed3c) {
          if (_0x1296dc(0x19b) === _0x1296dc(0xe3)) {
            if (this[_0x1296dc(0x261)] === _0x53ce11) this[_0x1296dc(0x22d)]();
            if (this[_0x1296dc(0x261)][_0x1296dc(0x359)] === _0x582dc7)
              this[_0x1296dc(0x22d)]();
            return this[_0x1296dc(0x261)][_0x1296dc(0x359)];
          } else _0x3acecf["x"] -= _0x3acecf[_0x1296dc(0x28c)] / 0x2;
        }
        break;
      case _0x1296dc(0x108):
        _0x3acecf["x"] = _0x3a1203 - _0x257374 + _0x3acecf[_0x1296dc(0x28c)];
        _0x4bed3c && (_0x3acecf["x"] -= _0x3acecf[_0x1296dc(0x28c)]);
        break;
    }
  }),
  (Window_Base[_0x276037(0x21e)]["textSizeExTextAlignment"] = function (
    _0x31a536
  ) {
    const _0x4d0aa8 = _0x276037;
    (_0x31a536 = _0x31a536["replace"](/\x1b!/g, "")),
      (_0x31a536 = _0x31a536["replace"](/\x1b\|/g, "")),
      (_0x31a536 = _0x31a536["replace"](/\x1b\./g, ""));
    const _0x244d12 = this[_0x4d0aa8(0x1ae)](_0x31a536, 0x0, 0x0, 0x0),
      _0x950539 = this[_0x4d0aa8(0x314)]();
    return (
      (_0x244d12[_0x4d0aa8(0x152)] = ![]),
      this[_0x4d0aa8(0x207)](_0x244d12),
      this[_0x4d0aa8(0x2c6)](_0x950539),
      {
        width: _0x244d12[_0x4d0aa8(0x342)],
        height: _0x244d12[_0x4d0aa8(0x30d)],
      }
    );
  }),
  (Window_Base[_0x276037(0x130)] =
    VisuMZ["MessageCore"]["Settings"][_0x276037(0x194)]["EndPadding"] || 0x0),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x2cd)] = function (_0x368323) {
    const _0x1ee532 = _0x276037,
      _0x4b9d02 =
        (_0x368323["rtl"] ? -0x1 : 0x1) * this[_0x1ee532(0x1b4)]("\x20");
    _0x368323["x"] += _0x4b9d02;
    if (this[_0x1ee532(0x13a)](_0x368323) > 0x0) _0x368323["x"] += _0x4b9d02;
    if (_0x368323[_0x1ee532(0x121)]) return;
    let _0x4b2335 = _0x368323[_0x1ee532(0x1e4)][_0x1ee532(0xec)](
        _0x1ee532(0x29e),
        _0x368323[_0x1ee532(0x193)] + 0x1
      ),
      _0x28144b = _0x368323[_0x1ee532(0x1e4)]["indexOf"](
        "\x0a",
        _0x368323[_0x1ee532(0x193)] + 0x1
      );
    if (_0x4b2335 < 0x0)
      _0x4b2335 = _0x368323[_0x1ee532(0x1e4)]["length"] + 0x1;
    if (_0x28144b > 0x0) _0x4b2335 = Math["min"](_0x4b2335, _0x28144b);
    const _0x2a1cb4 = _0x368323[_0x1ee532(0x1e4)][_0x1ee532(0x375)](
        _0x368323[_0x1ee532(0x193)],
        _0x4b2335
      ),
      _0x183fb7 = this[_0x1ee532(0x111)](_0x2a1cb4)[_0x1ee532(0x222)];
    let _0x4a4f80 = _0x368323[_0x1ee532(0x222)] || this[_0x1ee532(0x2d8)];
    _0x4a4f80 -= Window_Base["WORD_WRAP_PADDING"];
    if (this[_0x1ee532(0xe1)] === Window_Message) {
      const _0x1817b4 =
        $gameMessage[_0x1ee532(0x22e)]() === ""
          ? 0x0
          : ImageManager[_0x1ee532(0x28d)] + 0x14;
      (_0x4a4f80 -= _0x1817b4),
        VisuMZ[_0x1ee532(0x206)][_0x1ee532(0x317)][_0x1ee532(0x194)][
          _0x1ee532(0x2f8)
        ] && (_0x4a4f80 -= _0x1817b4);
    }
    let _0x5b312e = ![];
    if (_0x368323["x"] + _0x183fb7 > _0x368323[_0x1ee532(0x28c)] + _0x4a4f80)
      _0x5b312e = !![];
    if (_0x183fb7 === 0x0) _0x5b312e = !![];
    _0x5b312e &&
      (_0x1ee532(0x37d) !== "XOTGE"
        ? (_0x368323[_0x1ee532(0x1e4)] =
            _0x368323[_0x1ee532(0x1e4)][_0x1ee532(0x19c)](
              0x0,
              _0x368323["index"]
            ) +
            "\x0a" +
            _0x368323[_0x1ee532(0x1e4)]["substr"](_0x368323[_0x1ee532(0x193)]))
        : (_0x28d317 = _0x276375["replace"](
            /\\V\[(\d+)\]/gi,
            (_0x2850f3, _0x3d4044) =>
              this[_0x1ee532(0x20f)](
                _0x1e7de5(_0x32e52f[_0x1ee532(0x232)](_0x43006c(_0x3d4044)))
              )
          )));
  }),
  (Window_Base[_0x276037(0x21e)]["textSizeExWordWrap"] = function (_0x49735f) {
    const _0x1fbade = _0x276037,
      _0x23e73c = this[_0x1fbade(0x1ae)](_0x49735f, 0x0, 0x0, 0x0),
      _0x13d3f6 = this[_0x1fbade(0x314)]();
    return (
      (_0x23e73c["drawing"] = ![]),
      this[_0x1fbade(0x1e7)](![]),
      this[_0x1fbade(0x207)](_0x23e73c),
      this[_0x1fbade(0x1e7)](!![]),
      this[_0x1fbade(0x2c6)](_0x13d3f6),
      {
        width: _0x23e73c[_0x1fbade(0x342)],
        height: _0x23e73c[_0x1fbade(0x30d)],
      }
    );
  }),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x2d0)] = function (_0x34f656) {
    const _0x206ad2 = _0x276037;
    return this[_0x206ad2(0x13a)](_0x34f656);
  }),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x225)] = function (_0x5f355c) {
    const _0x11ea93 = _0x276037,
      _0x4dc307 = this[_0x11ea93(0x2ae)](_0x5f355c)[_0x11ea93(0x284)](",");
    if (!_0x5f355c["drawing"]) return;
    const _0x268be5 = _0x4dc307[0x0][_0x11ea93(0x1fb)](),
      _0x3cbfc5 = _0x4dc307[0x1] || 0x0,
      _0x3ab47a = _0x4dc307[0x2] || 0x0,
      _0x3b4c03 = ImageManager[_0x11ea93(0x32f)](_0x268be5),
      _0xb12818 = this[_0x11ea93(0x2b9)][_0x11ea93(0xe5)];
    _0x3b4c03[_0x11ea93(0x286)](
      this[_0x11ea93(0x228)][_0x11ea93(0xf3)](
        this,
        _0x3b4c03,
        _0x5f355c["x"],
        _0x5f355c["y"],
        _0x3cbfc5,
        _0x3ab47a,
        _0xb12818
      )
    );
  }),
  (Window_Base[_0x276037(0x21e)]["drawBackPicture"] = function (
    _0x53e380,
    _0x5795bb,
    _0x495f4b,
    _0x2d0876,
    _0x58b7ec,
    _0x5115cb
  ) {
    const _0x213894 = _0x276037;
    (_0x2d0876 = _0x2d0876 || _0x53e380[_0x213894(0x222)]),
      (_0x58b7ec = _0x58b7ec || _0x53e380["height"]),
      (this["contentsBack"][_0x213894(0xe5)] = _0x5115cb),
      this[_0x213894(0x192)][_0x213894(0x271)](
        _0x53e380,
        0x0,
        0x0,
        _0x53e380[_0x213894(0x222)],
        _0x53e380[_0x213894(0x333)],
        _0x5795bb,
        _0x495f4b,
        _0x2d0876,
        _0x58b7ec
      ),
      (this[_0x213894(0x192)][_0x213894(0xe5)] = 0xff);
  }),
  (Window_Base[_0x276037(0x21e)]["processDrawCenteredPicture"] = function (
    _0x25330b
  ) {
    const _0x6e2bda = _0x276037,
      _0x31726b = this[_0x6e2bda(0x2ae)](_0x25330b)[_0x6e2bda(0x284)](",");
    if (!_0x25330b[_0x6e2bda(0x152)]) return;
    const _0x135e25 = _0x31726b[0x0][_0x6e2bda(0x1fb)](),
      _0x21413b = ImageManager[_0x6e2bda(0x32f)](_0x135e25),
      _0x301621 = JsonEx[_0x6e2bda(0x119)](_0x25330b),
      _0x67486f = this[_0x6e2bda(0x2b9)][_0x6e2bda(0xe5)];
    _0x21413b[_0x6e2bda(0x286)](
      this[_0x6e2bda(0x144)][_0x6e2bda(0xf3)](
        this,
        _0x21413b,
        _0x301621,
        _0x67486f
      )
    );
  }),
  (Window_Base["prototype"][_0x276037(0x144)] = function (
    _0x6909e0,
    _0x40b9d6,
    _0x10d0bf
  ) {
    const _0x53c894 = _0x276037,
      _0x5833b2 = _0x40b9d6["width"] || this["innerWidth"],
      _0x385a49 =
        this["_index"] !== undefined
          ? this["itemHeight"]()
          : this[_0x53c894(0x118)],
      _0x4c873c = _0x5833b2 / _0x6909e0["width"],
      _0x42af63 = _0x385a49 / _0x6909e0[_0x53c894(0x333)],
      _0x14dbfc = Math["min"](_0x4c873c, _0x42af63, 0x1),
      _0x2a8e81 =
        this[_0x53c894(0x23f)] !== undefined
          ? (this[_0x53c894(0x2d3)](0x0)[_0x53c894(0x333)] -
              this["lineHeight"]()) /
            0x2
          : 0x0,
      _0x4bc70f = _0x6909e0[_0x53c894(0x222)] * _0x14dbfc,
      _0x3a10a1 = _0x6909e0[_0x53c894(0x333)] * _0x14dbfc,
      _0x519b88 =
        Math[_0x53c894(0x226)]((_0x5833b2 - _0x4bc70f) / 0x2) +
        _0x40b9d6["startX"],
      _0x5cf0fd =
        Math[_0x53c894(0x226)]((_0x385a49 - _0x3a10a1) / 0x2) +
        _0x40b9d6[_0x53c894(0x141)] -
        _0x2a8e81 * 0x2;
    (this[_0x53c894(0x192)][_0x53c894(0xe5)] = _0x10d0bf),
      this[_0x53c894(0x192)][_0x53c894(0x271)](
        _0x6909e0,
        0x0,
        0x0,
        _0x6909e0[_0x53c894(0x222)],
        _0x6909e0[_0x53c894(0x333)],
        _0x519b88,
        _0x5cf0fd,
        _0x4bc70f,
        _0x3a10a1
      ),
      (this[_0x53c894(0x192)][_0x53c894(0xe5)] = 0xff);
  }),
  (Window_Base[_0x276037(0x21e)]["processColorLock"] = function (_0xe7408d) {
    const _0x58ce73 = _0x276037,
      _0x1a4b54 = this[_0x58ce73(0x13a)](_0xe7408d);
    if (_0xe7408d[_0x58ce73(0x152)]) this["setColorLock"](_0x1a4b54 > 0x0);
  }),
  (Window_Base[_0x276037(0x21e)][_0x276037(0x353)] = function (_0xa9aa47) {
    const _0x36fb80 = _0x276037,
      _0x991cd6 = this[_0x36fb80(0x13a)](_0xa9aa47);
    this["constructor"] === Window_Message &&
      _0xa9aa47[_0x36fb80(0x152)] &&
      (_0x36fb80(0x1c8) !== _0x36fb80(0x104)
        ? this[_0x36fb80(0x35b)](_0x991cd6)
        : (this[_0x36fb80(0x348)] = null));
  }),
  (Window_Help[_0x276037(0x21e)][_0x276037(0x233)] = function () {
    const _0x5a0e04 = _0x276037;
    this[_0x5a0e04(0x1e7)]($gameSystem[_0x5a0e04(0x372)]());
  }),
  (Window_Help[_0x276037(0x21e)][_0x276037(0x2b7)] = function () {
    return !![];
  }),
  (VisuMZ[_0x276037(0x206)]["Window_Help_refresh"] =
    Window_Help[_0x276037(0x21e)][_0x276037(0x188)]),
  (Window_Help[_0x276037(0x21e)][_0x276037(0x188)] = function () {
    const _0x855f7 = _0x276037;
    this[_0x855f7(0x30a)](),
      VisuMZ[_0x855f7(0x206)][_0x855f7(0x236)][_0x855f7(0x266)](this),
      this[_0x855f7(0x233)]();
  }),
  (VisuMZ["MessageCore"][_0x276037(0x2f4)] =
    Window_Options[_0x276037(0x21e)][_0x276037(0x21d)]),
  (Window_Options[_0x276037(0x21e)]["addGeneralOptions"] = function () {
    const _0xa24234 = _0x276037;
    VisuMZ[_0xa24234(0x206)][_0xa24234(0x2f4)]["call"](this),
      this[_0xa24234(0x2a0)]();
  }),
  (Window_Options[_0x276037(0x21e)][_0x276037(0x2a0)] = function () {
    const _0x2c417f = _0x276037;
    if (
      VisuMZ[_0x2c417f(0x206)][_0x2c417f(0x317)][_0x2c417f(0x358)][
        _0x2c417f(0x331)
      ]
    ) {
      if ("pHdZI" !== "jKlgZ") this[_0x2c417f(0x327)]();
      else {
        const _0x34dd26 = _0x432ceb[_0x2c417f(0x222)] || this["innerWidth"],
          _0x4a069a =
            this[_0x2c417f(0x23f)] !== _0x799ebe
              ? this["itemHeight"]()
              : this["innerHeight"],
          _0x277514 = _0x34dd26 / _0x489b21[_0x2c417f(0x222)],
          _0x7421c1 = _0x4a069a / _0x8db5a4[_0x2c417f(0x333)],
          _0x46593f = _0x142998[_0x2c417f(0x21a)](_0x277514, _0x7421c1, 0x1),
          _0x3bf154 =
            this[_0x2c417f(0x23f)] !== _0x595a30
              ? (this[_0x2c417f(0x2d3)](0x0)[_0x2c417f(0x333)] -
                  this[_0x2c417f(0x304)]()) /
                0x2
              : 0x0,
          _0x32b965 = _0x13bd65[_0x2c417f(0x222)] * _0x46593f,
          _0x1d629f = _0x8631a[_0x2c417f(0x333)] * _0x46593f,
          _0x22fd23 =
            _0x2c8dfd[_0x2c417f(0x226)]((_0x34dd26 - _0x32b965) / 0x2) +
            _0x2c6b02[_0x2c417f(0x28c)],
          _0xe1c156 =
            _0x3dd33d[_0x2c417f(0x226)]((_0x4a069a - _0x1d629f) / 0x2) +
            _0x52b4ab[_0x2c417f(0x141)] -
            _0x3bf154 * 0x2;
        (this["contentsBack"][_0x2c417f(0xe5)] = _0x381352),
          this["contentsBack"]["blt"](
            _0x10593d,
            0x0,
            0x0,
            _0x479577[_0x2c417f(0x222)],
            _0x5e820e[_0x2c417f(0x333)],
            _0x22fd23,
            _0xe1c156,
            _0x32b965,
            _0x1d629f
          ),
          (this["contentsBack"]["paintOpacity"] = 0xff);
      }
    }
  }),
  (Window_Options["prototype"][_0x276037(0x327)] = function () {
    const _0x439fa8 = _0x276037,
      _0x2ee892 = TextManager[_0x439fa8(0x146)],
      _0x4c1f02 = _0x439fa8(0x106);
    this[_0x439fa8(0x2fd)](_0x2ee892, _0x4c1f02);
  }),
  (VisuMZ[_0x276037(0x206)][_0x276037(0x109)] =
    Window_Options[_0x276037(0x21e)][_0x276037(0xea)]),
  (Window_Options[_0x276037(0x21e)][_0x276037(0xea)] = function (_0x599bd3) {
    const _0x51bf9c = _0x276037,
      _0x2b3797 = this[_0x51bf9c(0x1a6)](_0x599bd3);
    if (_0x2b3797 === _0x51bf9c(0x106)) return this[_0x51bf9c(0x17f)]();
    return VisuMZ[_0x51bf9c(0x206)][_0x51bf9c(0x109)][_0x51bf9c(0x266)](
      this,
      _0x599bd3
    );
  }),
  (VisuMZ[_0x276037(0x206)][_0x276037(0x36e)] =
    Window_Options[_0x276037(0x21e)]["isVolumeSymbol"]),
  (Window_Options[_0x276037(0x21e)][_0x276037(0x17a)] = function (_0x4a153d) {
    const _0x32aaf7 = _0x276037;
    if (_0x4a153d === _0x32aaf7(0x106)) return !![];
    return VisuMZ["MessageCore"][_0x32aaf7(0x36e)][_0x32aaf7(0x266)](
      this,
      _0x4a153d
    );
  }),
  (Window_Options["prototype"][_0x276037(0x17f)] = function () {
    const _0x41dbaf = _0x276037,
      _0x2d8349 = this[_0x41dbaf(0x2b4)]("textSpeed");
    return _0x2d8349 > 0xa
      ? TextManager[_0x41dbaf(0x35a)]
      : "XhKEH" === _0x41dbaf(0x122)
      ? _0x2d8349
      : ((_0x55213f = _0x247594[_0x41dbaf(0x15c)](/<B>/gi, _0x41dbaf(0x306))),
        (_0x56b917 = _0x433b46[_0x41dbaf(0x15c)](/<\/B>/gi, "\x1bBOLD[0]")),
        (_0x1c265c = _0xfd0711["replace"](/<I>/gi, _0x41dbaf(0x2b2))),
        (_0x1306c4 = _0x133488[_0x41dbaf(0x15c)](/<\/I>/gi, _0x41dbaf(0x282))),
        _0x516289);
  }),
  (VisuMZ[_0x276037(0x206)][_0x276037(0x256)] =
    Window_Options[_0x276037(0x21e)][_0x276037(0x2ac)]),
  (Window_Options["prototype"][_0x276037(0x2ac)] = function (
    _0x4820e8,
    _0x6a04ce,
    _0x3e8c75
  ) {
    const _0x59fb1f = _0x276037;
    if (_0x4820e8 === "textSpeed")
      return this["changeTextSpeed"](_0x4820e8, _0x6a04ce, _0x3e8c75);
    VisuMZ[_0x59fb1f(0x206)]["Window_Options_changeVolume"][_0x59fb1f(0x266)](
      this,
      _0x4820e8,
      _0x6a04ce,
      _0x3e8c75
    );
  }),
  (Window_Options[_0x276037(0x21e)][_0x276037(0x179)] = function (
    _0x22ee0a,
    _0x322243,
    _0x2cf2b7
  ) {
    const _0x331851 = _0x276037,
      _0xb139f2 = this["getConfigValue"](_0x22ee0a),
      _0x412675 = 0x1,
      _0x2ae9fb = _0xb139f2 + (_0x322243 ? _0x412675 : -_0x412675);
    if (_0x2ae9fb > 0xb && _0x2cf2b7) this["changeValue"](_0x22ee0a, 0x1);
    else {
      if (_0x331851(0x337) === "JbRrP")
        this["changeValue"](_0x22ee0a, _0x2ae9fb["clamp"](0x1, 0xb));
      else
        return (
          this[_0x331851(0xe8)](_0x3968a0, !![], !![]),
          this[_0x331851(0x17d)](_0x331851(0x157), _0x2ba618(_0xd0e41c) || 0x1),
          ""
        );
    }
  }),
  (Window_Message[_0x276037(0x21e)]["contentsHeight"] = function () {
    const _0x40edbf = _0x276037;
    let _0x4ec919 =
      Window_Base[_0x40edbf(0x21e)][_0x40edbf(0x316)][_0x40edbf(0x266)](this);
    return (_0x4ec919 -= this[_0x40edbf(0x2d9)]()), _0x4ec919;
  }),
  (Window_Message[_0x276037(0x21e)]["refreshDimmerBitmap"] = function () {
    const _0x118ea5 = _0x276037;
    Window_Base[_0x118ea5(0x21e)][_0x118ea5(0x298)]["call"](this);
    if (
      VisuMZ["MessageCore"][_0x118ea5(0x317)][_0x118ea5(0x24e)][
        _0x118ea5(0x27a)
      ]
    ) {
      if (_0x118ea5(0x126) === _0x118ea5(0x2d5)) {
        _0x2091a2[_0x118ea5(0x206)][_0x118ea5(0xfc)][_0x118ea5(0x266)](
          this,
          _0x34c65d
        );
        if (_0x391a8f[_0x118ea5(0x152)])
          this[_0x118ea5(0x2a8)](_0x118ea5(0x1f5));
      } else this[_0x118ea5(0x129)]();
    }
  }),
  (Window_Message[_0x276037(0x21e)][_0x276037(0x129)] = function () {
    const _0xdb6871 = _0x276037;
    (this[_0xdb6871(0xed)]["x"] = Math[_0xdb6871(0xfd)](this["width"] / 0x2)),
      (this[_0xdb6871(0xed)][_0xdb6871(0x31f)]["x"] = 0.5),
      (this[_0xdb6871(0xed)][_0xdb6871(0xe6)]["x"] = Graphics["width"]);
  }),
  (VisuMZ[_0x276037(0x206)][_0x276037(0x29a)] =
    Window_Message[_0x276037(0x21e)][_0x276037(0x12b)]),
  (Window_Message[_0x276037(0x21e)][_0x276037(0x12b)] = function () {
    const _0xee3654 = _0x276037;
    VisuMZ[_0xee3654(0x206)][_0xee3654(0x29a)][_0xee3654(0x266)](this),
      this[_0xee3654(0x30a)](),
      this[_0xee3654(0x233)](),
      this["setColorLock"](![]),
      this[_0xee3654(0x2a8)](_0xee3654(0x1f5)),
      this[_0xee3654(0x1c7)](
        VisuMZ[_0xee3654(0x206)][_0xee3654(0x317)][_0xee3654(0x24e)][
          "MessageTextDelay"
        ]
      );
  }),
  (Window_Message[_0x276037(0x21e)]["resetWordWrap"] = function () {
    const _0x14ddc8 = _0x276037;
    this[_0x14ddc8(0x1e7)]($gameSystem[_0x14ddc8(0x25b)]());
  }),
  (Window_Message[_0x276037(0x21e)][_0x276037(0x2b7)] = function () {
    return !![];
  }),
  (Window_Message[_0x276037(0x21e)][_0x276037(0x1c7)] = function (_0x219a8f) {
    const _0x206ca2 = _0x276037,
      _0x5169f4 = 0xb - ConfigManager[_0x206ca2(0x106)];
    (_0x219a8f = Math["round"](_0x219a8f * _0x5169f4)),
      (this[_0x206ca2(0x379)] = _0x219a8f),
      (this["_textDelay"] = _0x219a8f);
  }),
  (VisuMZ[_0x276037(0x206)][_0x276037(0x123)] =
    Window_Message[_0x276037(0x21e)][_0x276037(0x204)]),
  (Window_Message[_0x276037(0x21e)]["isTriggered"] = function () {
    const _0x1ba0ba = _0x276037;
    return (
      VisuMZ[_0x1ba0ba(0x206)]["Window_Message_isTriggered"][_0x1ba0ba(0x266)](
        this
      ) ||
      Input[_0x1ba0ba(0x190)](
        VisuMZ[_0x1ba0ba(0x206)][_0x1ba0ba(0x317)]["General"][_0x1ba0ba(0x363)]
      )
    );
  }),
  (VisuMZ[_0x276037(0x206)][_0x276037(0x1ab)] =
    Window_Message[_0x276037(0x21e)][_0x276037(0x22f)]),
  (Window_Message[_0x276037(0x21e)][_0x276037(0x22f)] = function () {
    const _0x1eead3 = _0x276037;
    let _0x40491a = this["y"];
    VisuMZ[_0x1eead3(0x206)][_0x1eead3(0x1ab)]["call"](this);
    if (this[_0x1eead3(0x273)]) this["y"] = _0x40491a;
    this[_0x1eead3(0x380)](), this[_0x1eead3(0x176)]();
  }),
  (VisuMZ[_0x276037(0x206)][_0x276037(0x16a)] =
    Window_Message[_0x276037(0x21e)][_0x276037(0x1a0)]),
  (Window_Message["prototype"][_0x276037(0x1a0)] = function (_0x57d77c) {
    const _0x4f1c90 = _0x276037;
    this[_0x4f1c90(0x11d)](_0x57d77c),
      this["onNewPageMessageCore"](_0x57d77c),
      VisuMZ[_0x4f1c90(0x206)]["Window_Message_newPage"]["call"](
        this,
        _0x57d77c
      ),
      this[_0x4f1c90(0xf8)]();
  }),
  (Window_Message[_0x276037(0x21e)]["convertNewPageTextStateMacros"] =
    function (_0x5c68d5) {
      const _0x219af8 = _0x276037;
      if (!_0x5c68d5) return;
      (this[_0x219af8(0xe7)] = ![]),
        (_0x5c68d5[_0x219af8(0x1e4)] = this[_0x219af8(0x1af)](
          _0x5c68d5[_0x219af8(0x1e4)]
        )),
        this[_0x219af8(0x378)] &&
          ((_0x5c68d5[_0x219af8(0x1e4)] = this[_0x219af8(0x1bc)](
            _0x5c68d5[_0x219af8(0x1e4)]
          )),
          (this[_0x219af8(0xe7)] = !![]));
    }),
  (Window_Message["prototype"][_0x276037(0x1bc)] = function (_0x15fb87) {
    const _0x550ea7 = _0x276037;
    if (this[_0x550ea7(0xe7)]) return _0x15fb87;
    return Window_Base[_0x550ea7(0x21e)]["prepareWordWrapEscapeCharacters"][
      "call"
    ](this, _0x15fb87);
  }),
  (Window_Message[_0x276037(0x21e)][_0x276037(0x14c)] = function (_0x1b4176) {
    const _0x2d95eb = _0x276037;
    this[_0x2d95eb(0x134)](_0x1b4176),
      this[_0x2d95eb(0x1b2)](_0x1b4176),
      this[_0x2d95eb(0x15d)]();
  }),
  (VisuMZ[_0x276037(0x206)][_0x276037(0x13d)] =
    Window_Message[_0x276037(0x21e)][_0x276037(0x2f9)]),
  (Window_Message[_0x276037(0x21e)][_0x276037(0x2f9)] = function () {
    const _0x52d876 = _0x276037;
    VisuMZ[_0x52d876(0x206)][_0x52d876(0x13d)][_0x52d876(0x266)](this),
      this[_0x52d876(0x12b)]();
    if (this[_0x52d876(0x13b)]) this[_0x52d876(0x374)]();
  }),
  (Window_Message[_0x276037(0x21e)][_0x276037(0x15d)] = function () {
    const _0xe6b378 = _0x276037;
    this[_0xe6b378(0x222)] =
      $gameSystem[_0xe6b378(0x326)]() + this[_0xe6b378(0x37f)]();
    this["width"] = Math[_0xe6b378(0x21a)](
      Graphics[_0xe6b378(0x222)],
      this["width"]
    );
    const _0x1782b0 = $gameSystem[_0xe6b378(0x2da)]();
    (this[_0xe6b378(0x333)] =
      SceneManager["_scene"][_0xe6b378(0x244)](_0x1782b0, ![]) +
      this["addedHeight"]()),
      (this["height"] = Math[_0xe6b378(0x21a)](
        Graphics[_0xe6b378(0x333)],
        this[_0xe6b378(0x333)]
      ));
    if ($gameTemp["_centerMessageWindow"]) this[_0xe6b378(0x2d7)]();
  }),
  (Window_Message["prototype"][_0x276037(0x37f)] = function () {
    return 0x0;
  }),
  (Window_Message[_0x276037(0x21e)][_0x276037(0x2d9)] = function () {
    return 0x0;
  }),
  (Window_Message["prototype"][_0x276037(0x2d7)] = function () {
    const _0x3c2e18 = _0x276037;
    (this["x"] = (Graphics[_0x3c2e18(0x1e8)] - this["width"]) / 0x2),
      ($gameTemp[_0x3c2e18(0x216)] = undefined),
      this[_0x3c2e18(0x176)]();
  }),
  (Window_Message[_0x276037(0x21e)][_0x276037(0x2d6)] = function () {
    const _0x74b858 = _0x276037,
      _0x3878fa = { x: this["x"], y: this["y"] };
    Window_Base[_0x74b858(0x21e)]["updateMove"]["call"](this),
      this[_0x74b858(0x2c7)](_0x3878fa);
  }),
  (Window_Message["prototype"][_0x276037(0x387)] = function () {
    return !![];
  }),
  (Window_Message[_0x276037(0x21e)][_0x276037(0x2c7)] = function (_0x48e00) {
    const _0x5532c7 = _0x276037;
    this["_nameBoxWindow"] &&
      ((this[_0x5532c7(0x1e6)]["x"] += this["x"] - _0x48e00["x"]),
      (this[_0x5532c7(0x1e6)]["y"] += this["y"] - _0x48e00["y"]));
  }),
  (Window_Message["prototype"][_0x276037(0x2a5)] = function (
    _0x2b8d06,
    _0x422ead
  ) {
    const _0x45898e = _0x276037;
    this[_0x45898e(0x34e)](
      this[_0x45898e(0x1d2)]["x"],
      (this["_positionType"] * (Graphics[_0x45898e(0x1f0)] - this["height"])) /
        0x2,
      this[_0x45898e(0x1d2)][_0x45898e(0x222)],
      this[_0x45898e(0x1d2)][_0x45898e(0x333)],
      _0x2b8d06,
      _0x422ead
    );
  }),
  (Window_Message["prototype"]["processCommonEvent"] = function (_0x26cc73) {
    const _0x65b3c3 = _0x276037,
      _0x1374f0 = Window_Base["prototype"][_0x65b3c3(0x2d0)][_0x65b3c3(0x266)](
        this,
        _0x26cc73
      );
    _0x26cc73["drawing"] && this[_0x65b3c3(0x2c5)](_0x1374f0);
  }),
  (Window_Message[_0x276037(0x21e)]["launchMessageCommonEvent"] = function (
    _0x2f28d9
  ) {
    const _0x82b1d4 = _0x276037;
    if ($gameParty[_0x82b1d4(0x1cc)]()) {
    } else $gameMap["addMessageCommonEvent"](_0x2f28d9);
  }),
  (Window_Message[_0x276037(0x21e)][_0x276037(0x30e)] = function (_0x2abb1d) {
    const _0x9d7cfc = _0x276037;
    this["_textDelayCount"]--,
      this[_0x9d7cfc(0x379)] <= 0x0 &&
        (_0x9d7cfc(0x174) === _0x9d7cfc(0x334)
          ? (this[_0x9d7cfc(0x1c1)]["type"] = 0x2)
          : (this["onProcessCharacter"](_0x2abb1d),
            Window_Base[_0x9d7cfc(0x21e)][_0x9d7cfc(0x30e)][_0x9d7cfc(0x266)](
              this,
              _0x2abb1d
            )));
  }),
  (Window_Message[_0x276037(0x21e)]["onProcessCharacter"] = function (
    _0x3dcfa1
  ) {
    const _0x34497b = _0x276037;
    this[_0x34497b(0x379)] = this["_textDelay"];
    if (this["_textDelay"] <= 0x0) this[_0x34497b(0x1ac)] = !![];
  }),
  (VisuMZ["MessageCore"][_0x276037(0x13f)] =
    Window_Message[_0x276037(0x21e)][_0x276037(0x343)]),
  (Window_Message[_0x276037(0x21e)][_0x276037(0x343)] = function (
    _0x580275,
    _0x17333f
  ) {
    const _0x156c63 = _0x276037;
    !_0x17333f[_0x156c63(0x152)]
      ? Window_Base[_0x156c63(0x21e)]["processEscapeCharacter"][
          _0x156c63(0x266)
        ](this, _0x580275, _0x17333f)
      : VisuMZ[_0x156c63(0x206)][_0x156c63(0x13f)][_0x156c63(0x266)](
          this,
          _0x580275,
          _0x17333f
        );
  }),
  (Window_Message[_0x276037(0x21e)][_0x276037(0x134)] = function (_0xad2bd8) {
    const _0x259667 = _0x276037;
    let _0x50be7a = _0xad2bd8["text"];
    this[_0x259667(0x234)] = {};
    if (this["isWordWrapEnabled"]()) return _0x50be7a;
    (_0x50be7a = _0x50be7a[_0x259667(0x15c)](
      /<POSITION:[ ]*(.*)>/gi,
      (_0x47fabb, _0x34a711) => {
        const _0x22a916 = _0x259667,
          _0x346bb9 = _0x34a711[_0x22a916(0x284)](",")[_0x22a916(0x299)](
            (_0x1dc4a5) => Number(_0x1dc4a5) || 0x0
          );
        if (_0x346bb9[0x0] !== undefined)
          this["_forcedPosition"]["x"] = Number(_0x346bb9[0x0]);
        if (_0x346bb9[0x1] !== undefined)
          this[_0x22a916(0x234)]["y"] = Number(_0x346bb9[0x1]);
        if (_0x346bb9[0x2] !== undefined)
          this[_0x22a916(0x234)][_0x22a916(0x222)] = Number(_0x346bb9[0x2]);
        if (_0x346bb9[0x3] !== undefined)
          this[_0x22a916(0x234)][_0x22a916(0x333)] = Number(_0x346bb9[0x3]);
        return "";
      }
    )),
      (_0x50be7a = _0x50be7a[_0x259667(0x15c)](
        /<COORDINATES:[ ]*(.*)>/gi,
        (_0x5078b8, _0xcb580a) => {
          const _0x3156f1 = _0x259667;
          if (_0x3156f1(0x28b) === _0x3156f1(0x28b)) {
            const _0x1c73a5 = _0xcb580a[_0x3156f1(0x284)](",")[
              _0x3156f1(0x299)
            ]((_0x229f1a) => Number(_0x229f1a) || 0x0);
            if (_0x1c73a5[0x0] !== undefined)
              this[_0x3156f1(0x234)]["x"] = Number(_0x1c73a5[0x0]);
            if (_0x1c73a5[0x1] !== undefined)
              this[_0x3156f1(0x234)]["y"] = Number(_0x1c73a5[0x1]);
            return "";
          } else return ![];
        }
      )),
      (_0x50be7a = _0x50be7a[_0x259667(0x15c)](
        /<DIMENSIONS:[ ]*(.*)>/gi,
        (_0x121e83, _0x499d2c) => {
          const _0x4113bf = _0x259667;
          if ("rICSF" !== _0x4113bf(0x28f)) {
            const _0x1a6d61 = _0x499d2c["split"](",")[_0x4113bf(0x299)](
              (_0x4ec9b2) => Number(_0x4ec9b2) || 0x0
            );
            if (_0x1a6d61[0x0] !== undefined)
              this["_forcedPosition"][_0x4113bf(0x222)] = Number(
                _0x1a6d61[0x2]
              );
            if (_0x1a6d61[0x1] !== undefined)
              this[_0x4113bf(0x234)][_0x4113bf(0x333)] = Number(_0x1a6d61[0x3]);
            return "";
          } else {
            (_0x5081f3[_0x4113bf(0x34c)] =
              _0x540e65[_0x4113bf(0x34c)][_0x4113bf(0x214)]()),
              (_0x2acdc8[_0x4113bf(0x127)] = new _0x2d7827(
                "\x1b" + _0x4adb09[_0x4113bf(0x34c)],
                "gi"
              )),
              (_0x5a93ae[_0x4113bf(0x2b8)] = "\x1b" + _0x5c1c62["Match"]);
            if (_0x31769e[_0x4113bf(0x2ff)] === "")
              _0x42545f["textCodeResult"] += _0x4113bf(0x181);
          }
        }
      )),
      (_0xad2bd8["text"] = _0x50be7a);
  }),
  (Window_Message[_0x276037(0x21e)]["updateForcedPlacement"] = function () {
    const _0x1bdc4e = _0x276037;
    this[_0x1bdc4e(0x234)] = this["_forcedPosition"] || {};
    const _0x30f1ac = ["x", "y", _0x1bdc4e(0x222), _0x1bdc4e(0x333)];
    for (const _0x4dce66 of _0x30f1ac) {
      this[_0x1bdc4e(0x234)][_0x4dce66] !== undefined &&
        (this[_0x4dce66] = Number(this[_0x1bdc4e(0x234)][_0x4dce66]));
    }
  }),
  (Window_Message[_0x276037(0x21e)][_0x276037(0x1b2)] = function (_0x9e72ca) {
    const _0x10cbf5 = _0x276037;
    let _0x32d660 = _0x9e72ca[_0x10cbf5(0x1e4)];
    (_0x32d660 = _0x32d660[_0x10cbf5(0x15c)](
      /<(?:AUTO|AUTOSIZE|AUTO SIZE)>/gi,
      () => {
        const _0x79e1c3 = _0x10cbf5;
        if (_0x79e1c3(0x158) === _0x79e1c3(0x158))
          return (
            this[_0x79e1c3(0xe8)](_0x32d660, !![], !![]),
            this[_0x79e1c3(0x17d)]("none"),
            ""
          );
        else {
          const _0x23c867 = _0x54ac7d[_0x79e1c3(0x332)](
            "[" + _0x1e732e["$1"][_0x79e1c3(0x137)](/\d+/g) + "]"
          );
          for (const _0x311e2a of _0x23c867) {
            if (!_0x403cf6[_0x79e1c3(0x232)](_0x311e2a)) return !![];
          }
          return ![];
        }
      }
    )),
      (_0x32d660 = _0x32d660[_0x10cbf5(0x15c)](
        /<(?:AUTOWIDTH|AUTO WIDTH)>/gi,
        () => {
          const _0x376c5e = _0x10cbf5;
          return (
            this[_0x376c5e(0xe8)](_0x32d660, !![], ![]),
            this[_0x376c5e(0x17d)](_0x376c5e(0x209)),
            ""
          );
        }
      )),
      (_0x32d660 = _0x32d660[_0x10cbf5(0x15c)](
        /<(?:AUTOHEIGHT|AUTO HEIGHT)>/gi,
        () => {
          const _0x543343 = _0x10cbf5;
          return (
            this["processAutoSize"](_0x32d660, ![], !![]),
            this[_0x543343(0x17d)](_0x543343(0x209)),
            ""
          );
        }
      ));
    if (SceneManager[_0x10cbf5(0x29f)]())
      (_0x32d660 = _0x32d660[_0x10cbf5(0x15c)](
        /<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,
        (_0x466f62, _0x5e46cb) => {
          const _0x8aee1e = _0x10cbf5;
          if (_0x8aee1e(0x291) !== _0x8aee1e(0x2f6))
            return (
              this[_0x8aee1e(0xe8)](_0x32d660, !![], !![]),
              this["processAutoPosition"](
                "battle\x20actor",
                Number(_0x5e46cb) || 0x1
              ),
              ""
            );
          else
            _0x535799(
              _0x8aee1e(0x2a7)["format"](_0x569b89, _0x3fb888, _0x9495f4)
            ),
              _0x2f382a[_0x8aee1e(0x1e2)]();
        }
      )),
        (_0x32d660 = _0x32d660["replace"](
          /<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,
          (_0x439245, _0x4bec43) => {
            const _0x2a4c78 = _0x10cbf5;
            return (
              this[_0x2a4c78(0xe8)](_0x32d660, !![], !![]),
              this["processAutoPosition"](
                _0x2a4c78(0x251),
                Number(_0x4bec43) || 0x0
              ),
              ""
            );
          }
        )),
        (_0x32d660 = _0x32d660["replace"](
          /<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi,
          (_0x3a6fa2, _0x49b594) => {
            const _0x1cd542 = _0x10cbf5;
            return (
              this["processAutoSize"](_0x32d660, !![], !![]),
              this[_0x1cd542(0x17d)](
                _0x1cd542(0x1e0),
                Number(_0x49b594) || 0x0
              ),
              ""
            );
          }
        ));
    else
      SceneManager["isSceneMap"]() &&
        (_0x10cbf5(0x255) !== "GjmLo"
          ? this[_0x10cbf5(0x348)]["isRunning"]()
            ? this[_0x10cbf5(0x348)][_0x10cbf5(0x2a4)]()
            : this[_0x10cbf5(0x1f1)]()
          : ((_0x32d660 = _0x32d660[_0x10cbf5(0x15c)](
              /<(?:AUTOPLAYER|AUTO PLAYER)>/gi,
              (_0x34e0eb, _0x10bb8d) => {
                const _0x44587e = _0x10cbf5;
                return (
                  this[_0x44587e(0xe8)](_0x32d660, !![], !![]),
                  this[_0x44587e(0x17d)](_0x44587e(0x1d6), 0x0),
                  ""
                );
              }
            )),
            (_0x32d660 = _0x32d660[_0x10cbf5(0x15c)](
              /<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,
              (_0x1075e0, _0x1a31dc) => {
                const _0x5359d5 = _0x10cbf5;
                return (
                  this[_0x5359d5(0xe8)](_0x32d660, !![], !![]),
                  this[_0x5359d5(0x17d)](
                    _0x5359d5(0x157),
                    Number(_0x1a31dc) || 0x1
                  ),
                  ""
                );
              }
            )),
            (_0x32d660 = _0x32d660[_0x10cbf5(0x15c)](
              /<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,
              (_0xd754ea, _0x52db25) => {
                const _0xb32b80 = _0x10cbf5;
                if (_0xb32b80(0x1a9) !== _0xb32b80(0x260))
                  return (
                    this[_0xb32b80(0xe8)](_0x32d660, !![], !![]),
                    this["processAutoPosition"](
                      _0xb32b80(0x184),
                      Number(_0x52db25) || 0x0
                    ),
                    ""
                  );
                else {
                  const _0x26d24f =
                    (this[_0xb32b80(0x2e9)]() + this[_0xb32b80(0x37b)]()) *
                      this[_0xb32b80(0x167)]() +
                    this[_0xb32b80(0x352)] * 0x2;
                  return _0x3ecc46[_0xb32b80(0x21a)](
                    _0x26d24f,
                    _0x18f47f[_0xb32b80(0x222)]
                  );
                }
              }
            )),
            (_0x32d660 = _0x32d660[_0x10cbf5(0x15c)](
              /<(?:AUTOEVENT|AUTO EVENT):[ ](.*?)>/gi,
              (_0x16b25f, _0x3908a2) => {
                const _0x2e2ba9 = _0x10cbf5;
                return (
                  this[_0x2e2ba9(0xe8)](_0x32d660, !![], !![]),
                  this[_0x2e2ba9(0x17d)](
                    "map\x20event",
                    Number(_0x3908a2) || 0x0
                  ),
                  ""
                );
              }
            ))));
    _0x9e72ca[_0x10cbf5(0x1e4)] = _0x32d660;
  }),
  (Window_Message[_0x276037(0x301)] =
    /<(?:AUTO|AUTOSIZE|AUTO SIZE|AUTOWIDTH|AUTO WIDTH|AUTOHEIGHT|AUTO HEIGHT|AUTOPLAYER|AUTO PLAYER)>/gi),
  (Window_Message[_0x276037(0x22a)] =
    /<(?:AUTOPARTY|AUTO PARTY|AUTOPLAYER|AUTO PLAYER|AUTOEVENT|AUTO EVENT|AUTOENEMY|AUTO ENEMY|AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi),
  (Window_Message[_0x276037(0x21e)]["processAutoSize"] = function (
    _0x2c4e1d,
    _0x1baa88,
    _0x1cb27b
  ) {
    const _0x1f33c5 = _0x276037;
    (_0x2c4e1d = _0x2c4e1d[_0x1f33c5(0x15c)](
      Window_Message[_0x1f33c5(0x301)],
      ""
    )),
      (_0x2c4e1d = _0x2c4e1d[_0x1f33c5(0x15c)](
        Window_Message[_0x1f33c5(0x22a)],
        ""
      )),
      (this[_0x1f33c5(0x196)] = !![]);
    const _0x4efe18 = this["textSizeEx"](_0x2c4e1d);
    if (_0x1baa88) {
      let _0x347efb =
        _0x4efe18["width"] + $gameSystem[_0x1f33c5(0x34d)]() * 0x2 + 0x6;
      const _0x170296 = $gameMessage["faceName"]() !== "",
        _0x22462b = ImageManager[_0x1f33c5(0x28d)],
        _0xf14cca = 0x14;
      _0x347efb += _0x170296 ? _0x22462b + _0xf14cca : 0x4;
      if (_0x347efb % 0x2 !== 0x0) _0x347efb += 0x1;
      $gameSystem[_0x1f33c5(0x20e)](_0x347efb);
    }
    if (_0x1cb27b) {
      let _0x1ff16f = Math["ceil"](
        _0x4efe18[_0x1f33c5(0x333)] / this["lineHeight"]()
      );
      $gameSystem["setMessageWindowRows"](_0x1ff16f);
    }
    this[_0x1f33c5(0x1de)](),
      (this["_autoSizeCheck"] = ![]),
      (this[_0x1f33c5(0x13b)] = !![]);
  }),
  (Window_Message["prototype"][_0x276037(0x1de)] = function () {
    const _0x226de0 = _0x276037;
    this["updateDimensions"](),
      this["updatePlacement"](),
      this[_0x226de0(0x2d7)](),
      this[_0x226de0(0x11f)](),
      this[_0x226de0(0x2b9)]["clear"](),
      this[_0x226de0(0xf8)]();
  }),
  (Window_Message[_0x276037(0x21e)][_0x276037(0x17d)] = function (
    _0x5047e6,
    _0x1306be
  ) {
    const _0x58b583 = _0x276037;
    switch (_0x5047e6[_0x58b583(0x27c)]()[_0x58b583(0x1fb)]()) {
      case _0x58b583(0x27f):
        this[_0x58b583(0x273)] = $gameActors[_0x58b583(0x321)](_0x1306be);
        break;
      case _0x58b583(0x251):
        this[_0x58b583(0x273)] =
          $gameParty[_0x58b583(0x376)]()[_0x1306be - 0x1];
        break;
      case _0x58b583(0x1e0):
        this[_0x58b583(0x273)] =
          $gameTroop[_0x58b583(0x376)]()[_0x1306be - 0x1];
        break;
      case _0x58b583(0x1d6):
        this[_0x58b583(0x273)] = $gamePlayer;
        break;
      case _0x58b583(0x157):
        const _0x5ec673 = $gameActors[_0x58b583(0x321)](_0x1306be)["index"]();
        _0x5ec673 === 0x0
          ? (this[_0x58b583(0x273)] = $gamePlayer)
          : (this[_0x58b583(0x273)] = $gamePlayer[_0x58b583(0x27e)]()[
              "follower"
            ](_0x5ec673 - 0x1));
        break;
      case _0x58b583(0x184):
        if (_0x1306be === 0x1) this[_0x58b583(0x273)] = $gamePlayer;
        else {
          if (_0x58b583(0x198) === _0x58b583(0x198))
            this["_autoPositionTarget"] = $gamePlayer[_0x58b583(0x27e)]()[
              _0x58b583(0x264)
            ](_0x1306be - 0x2);
          else {
            const _0x4b304a =
              _0x1b7cb2[_0x58b583(0x206)]["Settings"][_0x58b583(0x1c0)];
            let _0x53180f = 0x0;
            if (_0x5ec804 === _0x48613b) _0x53180f = _0x4b304a["Actors"];
            if (_0x129de1 === _0x10276f)
              _0x53180f = _0x4b304a[_0x58b583(0x1ec)];
            if (_0x5b42db === _0x197787) _0x53180f = _0x4b304a["Skills"];
            if (_0xfe6aa8 === _0x3e102f)
              _0x53180f = _0x4b304a[_0x58b583(0x315)];
            if (_0x4a6e7e === _0x3c2090) _0x53180f = _0x4b304a["Weapons"];
            if (_0x5a9546 === _0x32fcff)
              _0x53180f = _0x4b304a[_0x58b583(0x275)];
            if (_0x1b8b28 === _0xf1df34) _0x53180f = _0x4b304a["Enemies"];
            if (_0xa48735 === _0x260703)
              _0x53180f = _0x4b304a[_0x58b583(0x1a1)];
            return (
              _0x53180f > 0x0 &&
                (_0x426ee6 = _0x58b583(0x182)[_0x58b583(0x384)](
                  _0x53180f,
                  _0x18a552
                )),
              _0x3b871d
            );
          }
        }
        break;
      case "map\x20event":
        this[_0x58b583(0x273)] = $gameMap[_0x58b583(0x368)](_0x1306be);
        break;
    }
    this[_0x58b583(0x273)] && this[_0x58b583(0x178)]();
  }),
  (VisuMZ[_0x276037(0x206)][_0x276037(0x161)] =
    Window_Message[_0x276037(0x21e)][_0x276037(0x124)]),
  (Window_Message[_0x276037(0x21e)]["synchronizeNameBox"] = function () {
    const _0x57ace1 = _0x276037;
    this["updateAutoPosition"](),
      VisuMZ["MessageCore"][_0x57ace1(0x161)]["call"](this);
  }),
  (Window_Message[_0x276037(0x21e)]["updateAutoPosition"] = function () {
    const _0x3f460f = _0x276037;
    if (!this[_0x3f460f(0x273)]) return;
    const _0x4bc0e3 = SceneManager["_scene"];
    if (!_0x4bc0e3) return;
    if (!_0x4bc0e3[_0x3f460f(0x1d7)]) return;
    const _0x4137c7 = _0x4bc0e3[_0x3f460f(0x1d7)][_0x3f460f(0x1a5)](
      this[_0x3f460f(0x273)]
    );
    if (!_0x4137c7) return;
    let _0x3f8194 = _0x4137c7["x"];
    (_0x3f8194 -= this[_0x3f460f(0x222)] / 0x2),
      (_0x3f8194 -=
        (Graphics[_0x3f460f(0x222)] - Graphics[_0x3f460f(0x1e8)]) / 0x2);
    let _0x109e58 = _0x4137c7["y"];
    (_0x109e58 -= this["height"]),
      (_0x109e58 -= (Graphics["height"] - Graphics["boxHeight"]) / 0x2),
      (_0x109e58 -= _0x4137c7["height"] + 0x8),
      (this["x"] = Math[_0x3f460f(0xfd)](_0x3f8194)),
      (this["y"] = Math[_0x3f460f(0xfd)](_0x109e58)),
      this[_0x3f460f(0x176)](!![], ![]),
      this[_0x3f460f(0x1e6)]["updatePlacement"]();
  }),
  (Window_Message[_0x276037(0x21e)][_0x276037(0x374)] = function () {
    const _0x597a67 = _0x276037;
    (this["_messagePositionReset"] = ![]),
      (this[_0x597a67(0x273)] = undefined),
      $gameSystem[_0x597a67(0x22d)](),
      this["updateAutoSizePosition"](),
      (this[_0x597a67(0x25c)] = 0x0);
  }),
  (Window_Message[_0x276037(0x21e)][_0x276037(0x2c2)] = function (_0x3c9708) {
    const _0x550a02 = _0x276037;
    return Window_Base["prototype"][_0x550a02(0x2c2)][_0x550a02(0x266)](
      this,
      _0x3c9708
    );
  }),
  (Window_Message[_0x276037(0x21e)][_0x276037(0x16b)] = function (_0x3e073e) {
    const _0x25b46b = _0x276037;
    return Window_Base[_0x25b46b(0x21e)]["postConvertEscapeCharacters"][
      _0x25b46b(0x266)
    ](this, _0x3e073e);
  }),
  (Window_Message[_0x276037(0x21e)][_0x276037(0x116)] = function (_0x2cf14c) {
    const _0x1b146d = _0x276037;
    this[_0x1b146d(0x309)](_0x2cf14c),
      Window_Base[_0x1b146d(0x21e)]["flushTextState"][_0x1b146d(0x266)](
        this,
        _0x2cf14c
      ),
      this["postFlushTextState"](_0x2cf14c);
  }),
  (Window_Message[_0x276037(0x21e)][_0x276037(0x309)] = function (
    _0x3d41e5
  ) {}),
  (Window_Message[_0x276037(0x21e)][_0x276037(0x1c9)] = function (
    _0x3bbf20
  ) {}),
  (Window_NameBox[_0x276037(0x21e)][_0x276037(0x2b7)] = function () {
    return ![];
  }),
  (Window_NameBox["prototype"]["resetTextColor"] = function () {
    const _0x10015d = _0x276037;
    Window_Base["prototype"]["resetTextColor"][_0x10015d(0x266)](this),
      this[_0x10015d(0x1b6)](this[_0x10015d(0x14a)]());
  }),
  (Window_NameBox["prototype"][_0x276037(0x14a)] = function () {
    const _0xe1b0d0 = _0x276037,
      _0xb7958b =
        VisuMZ["MessageCore"]["Settings"][_0xe1b0d0(0x24e)][_0xe1b0d0(0x34b)];
    return ColorManager[_0xe1b0d0(0x388)](_0xb7958b);
  }),
  (VisuMZ[_0x276037(0x206)][_0x276037(0xfa)] =
    Window_NameBox[_0x276037(0x21e)]["updatePlacement"]),
  (Window_NameBox[_0x276037(0x21e)][_0x276037(0x22f)] = function () {
    const _0x30b81a = _0x276037;
    VisuMZ[_0x30b81a(0x206)][_0x30b81a(0xfa)][_0x30b81a(0x266)](this),
      this[_0x30b81a(0x2e2)](),
      this[_0x30b81a(0xee)](),
      this[_0x30b81a(0x176)](),
      this[_0x30b81a(0x35c)]();
  }),
  (Window_NameBox[_0x276037(0x21e)][_0x276037(0x2c2)] = function (_0x276115) {
    const _0x3c95cd = _0x276037;
    return (
      (_0x276115 = _0x276115["replace"](
        /<LEFT>/gi,
        this[_0x3c95cd(0x12c)][_0x3c95cd(0xf3)](this, 0x0)
      )),
      (_0x276115 = _0x276115[_0x3c95cd(0x15c)](
        /<CENTER>/gi,
        this[_0x3c95cd(0x12c)][_0x3c95cd(0xf3)](this, 0x5)
      )),
      (_0x276115 = _0x276115[_0x3c95cd(0x15c)](
        /<RIGHT>/gi,
        this[_0x3c95cd(0x12c)][_0x3c95cd(0xf3)](this, 0xa)
      )),
      (_0x276115 = _0x276115[_0x3c95cd(0x15c)](
        /<POSITION:[ ](\d+)>/gi,
        (_0xbc8b3, _0x21e6ca) => this[_0x3c95cd(0x12c)](parseInt(_0x21e6ca))
      )),
      (_0x276115 = _0x276115["replace"](/<\/LEFT>/gi, "")),
      (_0x276115 = _0x276115[_0x3c95cd(0x15c)](/<\/CENTER>/gi, "")),
      (_0x276115 = _0x276115["replace"](/<\/RIGHT>/gi, "")),
      Window_Base[_0x3c95cd(0x21e)][_0x3c95cd(0x2c2)][_0x3c95cd(0x266)](
        this,
        _0x276115
      )
    );
  }),
  (Window_NameBox[_0x276037(0x21e)][_0x276037(0x12c)] = function (_0x4ae6f5) {
    const _0x8be78b = _0x276037;
    return (this[_0x8be78b(0x162)] = _0x4ae6f5), "";
  }),
  (Window_NameBox["prototype"][_0x276037(0x2e2)] = function () {
    const _0xdc3af5 = _0x276037;
    if ($gameMessage[_0xdc3af5(0xf4)]()) return;
    this[_0xdc3af5(0x162)] = this[_0xdc3af5(0x162)] || 0x0;
    const _0x357fa1 = this[_0xdc3af5(0x370)],
      _0x44affe = Math[_0xdc3af5(0x226)](
        (_0x357fa1["width"] * this[_0xdc3af5(0x162)]) / 0xa
      );
    (this["x"] =
      _0x357fa1["x"] +
      _0x44affe -
      Math[_0xdc3af5(0x226)](this[_0xdc3af5(0x222)] / 0x2)),
      (this["x"] = this["x"]["clamp"](
        _0x357fa1["x"],
        _0x357fa1["x"] + _0x357fa1["width"] - this[_0xdc3af5(0x222)]
      ));
  }),
  (Window_NameBox["prototype"]["updateOffsetPosition"] = function () {
    const _0xe78f64 = _0x276037;
    if ($gameMessage["isRTL"]()) return;
    this[_0xe78f64(0x162)] = this[_0xe78f64(0x162)] || 0x0;
    const _0x517644 =
        VisuMZ[_0xe78f64(0x206)][_0xe78f64(0x317)][_0xe78f64(0x24e)][
          _0xe78f64(0x383)
        ],
      _0x3ce932 =
        VisuMZ[_0xe78f64(0x206)][_0xe78f64(0x317)][_0xe78f64(0x24e)][
          _0xe78f64(0x11a)
        ],
      _0xcb80b1 = (0x5 - this[_0xe78f64(0x162)]) / 0x5;
    (this["x"] += Math[_0xe78f64(0x226)](_0x517644 * _0xcb80b1)),
      (this["y"] += _0x3ce932);
  }),
  (Window_NameBox[_0x276037(0x21e)][_0x276037(0x35c)] = function () {
    const _0x2fc23c = _0x276037,
      _0x411f75 = this[_0x2fc23c(0x370)],
      _0x1ddf9b = _0x411f75["y"],
      _0x1d378e =
        VisuMZ[_0x2fc23c(0x206)][_0x2fc23c(0x317)][_0x2fc23c(0x24e)][
          _0x2fc23c(0x11a)
        ];
    if (
      _0x1ddf9b > this["y"] &&
      _0x1ddf9b < this["y"] + this["height"] - _0x1d378e
    ) {
      if (_0x2fc23c(0x28a) === _0x2fc23c(0x33e)) {
        const _0x229542 = _0x5bc1bd["getLastGainedItemData"]();
        if (_0x229542["id"] <= 0x0) return "";
        return _0x229542[_0x2fc23c(0x2e3)];
      } else this["y"] = _0x411f75["y"] + _0x411f75["height"];
    }
  }),
  (VisuMZ[_0x276037(0x206)][_0x276037(0x339)] =
    Window_NameBox[_0x276037(0x21e)][_0x276037(0x188)]),
  (Window_NameBox[_0x276037(0x21e)][_0x276037(0x188)] = function () {
    const _0x1639b9 = _0x276037;
    (this[_0x1639b9(0x162)] = 0x0),
      VisuMZ[_0x1639b9(0x206)][_0x1639b9(0x339)]["call"](this);
  }),
  (Window_ChoiceList["prototype"][_0x276037(0x20a)] = function () {
    return ![];
  }),
  (Window_ChoiceList[_0x276037(0x21e)]["isAutoColorAffected"] = function () {
    return !![];
  }),
  (Window_ChoiceList[_0x276037(0x21e)][_0x276037(0x272)] = function () {
    return $gameSystem["getChoiceListLineHeight"]() + 0x8;
  }),
  (Window_ChoiceList[_0x276037(0x21e)][_0x276037(0x167)] = function () {
    const _0x73569c = _0x276037;
    return $gameSystem[_0x73569c(0x2fb)]();
  }),
  (Window_ChoiceList["prototype"][_0x276037(0xf9)] = function () {
    const _0x39d7fe = _0x276037;
    this[_0x39d7fe(0x188)](),
      this[_0x39d7fe(0x25e)](),
      this[_0x39d7fe(0x29d)](),
      this["activate"]();
  }),
  (Window_ChoiceList[_0x276037(0x21e)][_0x276037(0x188)] = function () {
    const _0x4a769a = _0x276037;
    this[_0x4a769a(0x35f)](),
      this["makeCommandList"](),
      this[_0x4a769a(0x370)] &&
        (this[_0x4a769a(0x22f)](), this[_0x4a769a(0x12f)]()),
      this[_0x4a769a(0xf8)](),
      this[_0x4a769a(0x356)](),
      this["refreshDimmerBitmap"](),
      Window_Selectable["prototype"][_0x4a769a(0x188)][_0x4a769a(0x266)](this);
  }),
  (Window_ChoiceList[_0x276037(0x21e)][_0x276037(0x18a)] = function () {
    const _0x39d2b8 = _0x276037,
      _0x92788d = $gameMessage["choices"]();
    let _0x5299f5 = 0x0;
    for (let _0x363059 of _0x92788d) {
      _0x363059 = this[_0x39d2b8(0x28e)](_0x363059);
      if (this[_0x39d2b8(0x292)](_0x363059)) {
        const _0x2bff2a = this["parseChoiceText"](_0x363059),
          _0x45412a = this[_0x39d2b8(0x114)](_0x363059);
        this["addCommand"](_0x2bff2a, _0x39d2b8(0x173), _0x45412a, _0x5299f5);
      }
      _0x5299f5++;
    }
  }),
  (Window_ChoiceList[_0x276037(0x21e)][_0x276037(0x28e)] = function (
    _0x22d5b7
  ) {
    const _0x426ed5 = _0x276037;
    return Window_Base[_0x426ed5(0x21e)][_0x426ed5(0x1af)][_0x426ed5(0x266)](
      this,
      _0x22d5b7
    );
  }),
  (Window_ChoiceList[_0x276037(0x21e)][_0x276037(0x292)] = function (
    _0x4cc362
  ) {
    const _0x1e877c = _0x276037;
    if (_0x4cc362[_0x1e877c(0x137)](/<HIDE>/i)) return ![];
    if (_0x4cc362[_0x1e877c(0x137)](/<SHOW>/i)) return !![];
    if (
      _0x4cc362[_0x1e877c(0x137)](
        /<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i
      )
    ) {
      if ("jrsCk" === _0x1e877c(0x2a9)) {
        const _0x205fcb = JSON[_0x1e877c(0x332)](
          "[" + RegExp["$1"][_0x1e877c(0x137)](/\d+/g) + "]"
        );
        for (const _0x3d816b of _0x205fcb) {
          if (!$gameSwitches[_0x1e877c(0x232)](_0x3d816b)) return ![];
        }
        return !![];
      } else return this[_0x1e877c(0x170)];
    }
    if (
      _0x4cc362[_0x1e877c(0x137)](
        /<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i
      )
    ) {
      if ("ZfHDB" !== _0x1e877c(0xfe)) {
        this[_0x1e877c(0x378)] = ![];
        for (const _0x4253c1 of _0x677da0[_0x1e877c(0x206)]["Settings"][
          _0x1e877c(0x200)
        ]) {
          _0x31f990[_0x1e877c(0x137)](_0x4253c1["textCodeCheck"]) &&
            ((this["_textMacroFound"] = !![]),
            (_0x3273f9 = _0x273641[_0x1e877c(0x15c)](
              _0x4253c1["textCodeCheck"],
              _0x4253c1[_0x1e877c(0x2b8)][_0x1e877c(0xf3)](this)
            )));
        }
        return _0x26ffde;
      } else {
        const _0x3a1566 = JSON[_0x1e877c(0x332)](
          "[" + RegExp["$1"][_0x1e877c(0x137)](/\d+/g) + "]"
        );
        for (const _0x1f4cb4 of _0x3a1566) {
          if (!$gameSwitches[_0x1e877c(0x232)](_0x1f4cb4)) return ![];
        }
        return !![];
      }
    }
    if (
      _0x4cc362[_0x1e877c(0x137)](
        /<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i
      )
    ) {
      if (_0x1e877c(0x224) === "jQhYN") {
        const _0x426496 = JSON[_0x1e877c(0x332)](
          "[" + RegExp["$1"][_0x1e877c(0x137)](/\d+/g) + "]"
        );
        for (const _0x597b01 of _0x426496) {
          if ($gameSwitches[_0x1e877c(0x232)](_0x597b01)) return !![];
        }
        return ![];
      } else
        return (
          _0x2a039f["status"] &&
          _0x2ba3fa[_0x1e877c(0x1ee)][_0x1e877c(0x2c1)]("[" + _0x3f2100 + "]")
        );
    }
    if (
      _0x4cc362[_0x1e877c(0x137)](
        /<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i
      )
    ) {
      const _0x47cb7e = JSON[_0x1e877c(0x332)](
        "[" + RegExp["$1"][_0x1e877c(0x137)](/\d+/g) + "]"
      );
      for (const _0x3f17a8 of _0x47cb7e) {
        if (_0x1e877c(0x338) === "TxHOc") {
          if (!$gameSwitches[_0x1e877c(0x232)](_0x3f17a8)) return !![];
        } else
          this[_0x1e877c(0x234)][_0x4c9418] !== _0x263ada &&
            (this[_0x68437b] = _0xbe5a9b(this[_0x1e877c(0x234)][_0x49a1eb]));
      }
      return ![];
    }
    if (
      _0x4cc362[_0x1e877c(0x137)](
        /<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i
      )
    ) {
      if ("aXmDd" !== _0x1e877c(0x223)) {
        const _0xae48ca = JSON[_0x1e877c(0x332)](
          "[" + RegExp["$1"]["match"](/\d+/g) + "]"
        );
        for (const _0x1e1d13 of _0xae48ca) {
          if (_0x1e877c(0x2ad) !== _0x1e877c(0xe4)) {
            if (!$gameSwitches[_0x1e877c(0x232)](_0x1e1d13)) return !![];
          } else return (this[_0x1e877c(0x162)] = _0x52f0ab), "";
        }
        return ![];
      } else
        this["prepareForcedPositionEscapeCharacters"](_0x1f192f),
          this[_0x1e877c(0x1b2)](_0x4005fc),
          this[_0x1e877c(0x15d)]();
    }
    if (
      _0x4cc362[_0x1e877c(0x137)](
        /<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i
      )
    ) {
      if (_0x1e877c(0x335) !== "fEhSF") {
        const _0x286566 = this["commandSymbol"](_0x23e1e3);
        if (_0x286566 === "textSpeed") return this[_0x1e877c(0x17f)]();
        return _0x2786be[_0x1e877c(0x206)]["Window_Options_statusText"][
          _0x1e877c(0x266)
        ](this, _0x589f70);
      } else {
        const _0x2e250a = JSON[_0x1e877c(0x332)](
          "[" + RegExp["$1"]["match"](/\d+/g) + "]"
        );
        for (const _0x563a99 of _0x2e250a) {
          if (_0x1e877c(0x2e8) !== "HAxXi")
            for (const _0x87b0f1 in _0x32ce4d) {
              this[_0x1e877c(0x2b9)][_0x87b0f1] = _0x3346bb[_0x87b0f1];
            }
          else {
            if ($gameSwitches["value"](_0x563a99)) return ![];
          }
        }
        return !![];
      }
    }
    return !![];
  }),
  (Window_ChoiceList[_0x276037(0x21e)][_0x276037(0x1f6)] = function (
    _0x233118
  ) {
    const _0x5e3a95 = _0x276037;
    let _0x2bfc82 = _0x233118;
    return (
      (_0x2bfc82 = _0x2bfc82["replace"](/<(?:BR|LINEBREAK)>/gi, "\x0a")),
      (_0x2bfc82 = _0x2bfc82[_0x5e3a95(0x15c)](
        /<LINE\x1bWrapBreak[0]BREAK>/gi,
        "\x0a"
      )),
      _0x2bfc82
    );
  }),
  (Window_ChoiceList[_0x276037(0x21e)][_0x276037(0x114)] = function (
    _0x29d62d
  ) {
    const _0x464f3e = _0x276037;
    if (_0x29d62d[_0x464f3e(0x137)](/<DISABLE>/i)) return ![];
    if (_0x29d62d[_0x464f3e(0x137)](/<ENABLE>/i)) return !![];
    if (
      _0x29d62d[_0x464f3e(0x137)](
        /<ENABLE[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i
      )
    ) {
      const _0x58bd9b = JSON[_0x464f3e(0x332)](
        "[" + RegExp["$1"][_0x464f3e(0x137)](/\d+/g) + "]"
      );
      for (const _0x144bf3 of _0x58bd9b) {
        if (!$gameSwitches["value"](_0x144bf3)) return ![];
      }
      return !![];
    }
    if (
      _0x29d62d[_0x464f3e(0x137)](
        /<ENABLE ALL[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i
      )
    ) {
      if (_0x464f3e(0x1ff) === "XCQrq") {
        const _0x5bb1c6 = JSON[_0x464f3e(0x332)](
          "[" + RegExp["$1"]["match"](/\d+/g) + "]"
        );
        for (const _0xe49365 of _0x5bb1c6) {
          if (!$gameSwitches["value"](_0xe49365)) return ![];
        }
        return !![];
      } else
        _0x4f6cf6["MessageCore"][_0x464f3e(0x16e)](
          _0x195d7d,
          _0x416b6c[_0x464f3e(0x1ec)]
        ),
          _0x262900[_0x464f3e(0x206)]["AddAutoColor"](
            _0x585048,
            _0x29e947[_0x464f3e(0x1b8)]
          ),
          _0x3450ba[_0x464f3e(0x206)]["AddAutoColor"](
            _0x45f4db,
            _0x335ce4["Items"]
          ),
          _0x1f86bb["MessageCore"][_0x464f3e(0x16e)](
            _0x27cc8d,
            _0x276199[_0x464f3e(0x1a4)]
          ),
          _0x49bfcb["MessageCore"][_0x464f3e(0x16e)](
            _0x3c13a1,
            _0x537629["Armors"]
          ),
          _0x4bbfdf[_0x464f3e(0x206)][_0x464f3e(0x16e)](
            _0x41b004,
            _0x44183d[_0x464f3e(0x1c5)]
          ),
          _0x3d6134["MessageCore"][_0x464f3e(0x16e)](
            _0x4fd0db,
            _0x190dd3[_0x464f3e(0x1a1)]
          );
    }
    if (
      _0x29d62d[_0x464f3e(0x137)](
        /<ENABLE ANY[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i
      )
    ) {
      if (_0x464f3e(0x2be) !== _0x464f3e(0x2be))
        _0x14f852[_0x464f3e(0x206)][_0x464f3e(0x155)]["call"](this),
          this["clampPlacementPosition"]();
      else {
        const _0x5f43be = JSON[_0x464f3e(0x332)](
          "[" + RegExp["$1"][_0x464f3e(0x137)](/\d+/g) + "]"
        );
        for (const _0x55acef of _0x5f43be) {
          if ($gameSwitches["value"](_0x55acef)) return !![];
        }
        return ![];
      }
    }
    if (
      _0x29d62d[_0x464f3e(0x137)](
        /<DISABLE[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i
      )
    ) {
      if (_0x464f3e(0x27d) === "EpxkK") {
        const _0x371cc5 = JSON["parse"](
          "[" + RegExp["$1"]["match"](/\d+/g) + "]"
        );
        for (const _0x504053 of _0x371cc5) {
          if (!$gameSwitches["value"](_0x504053)) return !![];
        }
        return ![];
      } else this["contents"][_0x464f3e(0x37c)] = !!_0x47fab9;
    }
    if (
      _0x29d62d["match"](
        /<DISABLE ALL[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i
      )
    ) {
      if (_0x464f3e(0x218) !== _0x464f3e(0x218)) {
        if (_0x2edb4f["isRTL"]()) return;
        this[_0x464f3e(0x162)] = this[_0x464f3e(0x162)] || 0x0;
        const _0x37c453 =
            _0x2dbf81[_0x464f3e(0x206)]["Settings"][_0x464f3e(0x24e)][
              _0x464f3e(0x383)
            ],
          _0x5be0b6 =
            _0x25fa5e[_0x464f3e(0x206)]["Settings"][_0x464f3e(0x24e)][
              _0x464f3e(0x11a)
            ],
          _0x226c0e = (0x5 - this[_0x464f3e(0x162)]) / 0x5;
        (this["x"] += _0x2957ea[_0x464f3e(0x226)](_0x37c453 * _0x226c0e)),
          (this["y"] += _0x5be0b6);
      } else {
        const _0x1f9820 = JSON["parse"](
          "[" + RegExp["$1"]["match"](/\d+/g) + "]"
        );
        for (const _0x2a0f46 of _0x1f9820) {
          if (!$gameSwitches[_0x464f3e(0x232)](_0x2a0f46)) return !![];
        }
        return ![];
      }
    }
    if (
      _0x29d62d[_0x464f3e(0x137)](
        /<DISABLE ANY[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i
      )
    ) {
      const _0xcb960 = JSON[_0x464f3e(0x332)](
        "[" + RegExp["$1"][_0x464f3e(0x137)](/\d+/g) + "]"
      );
      for (const _0x44cc92 of _0xcb960) {
        if (_0x464f3e(0x2ed) === _0x464f3e(0xeb)) {
          const _0x44d9cd = _0x43bdc6["parse"](
            "[" + _0x5b13cb["$1"]["match"](/\d+/g) + "]"
          );
          for (const _0x391344 of _0x44d9cd) {
            if (!_0x53a712[_0x464f3e(0x232)](_0x391344)) return ![];
          }
          return !![];
        } else {
          if ($gameSwitches[_0x464f3e(0x232)](_0x44cc92)) return ![];
        }
      }
      return !![];
    }
    return !![];
  }),
  (VisuMZ["MessageCore"]["Window_ChoiceList_updatePlacement"] =
    Window_ChoiceList[_0x276037(0x21e)][_0x276037(0x22f)]),
  (Window_ChoiceList["prototype"][_0x276037(0x22f)] = function () {
    const _0x31b416 = _0x276037;
    VisuMZ["MessageCore"]["Window_ChoiceList_updatePlacement"][
      _0x31b416(0x266)
    ](this),
      this[_0x31b416(0x176)]();
  }),
  (Window_ChoiceList[_0x276037(0x21e)][_0x276037(0x12f)] = function () {
    const _0xf92378 = _0x276037;
    if (!this[_0xf92378(0x17b)]) return;
    const _0x523724 = 0x8,
      _0x5c5ffe = this["_cancelButton"],
      _0x476a0a = this["x"] + this[_0xf92378(0x222)],
      _0x27ee00 = Math["floor"](
        (Graphics[_0xf92378(0x222)] - Graphics[_0xf92378(0x1e8)]) / 0x2
      );
    if (
      _0x476a0a >=
      Graphics[_0xf92378(0x1e8)] + _0x27ee00 - _0x5c5ffe["width"] + _0x523724
    )
      _0x5c5ffe["x"] = -_0x5c5ffe[_0xf92378(0x222)] - _0x523724;
    else {
      if (_0xf92378(0xf1) !== _0xf92378(0xf1)) {
        this[_0xf92378(0x234)] = this[_0xf92378(0x234)] || {};
        const _0x22ece1 = ["x", "y", _0xf92378(0x222), _0xf92378(0x333)];
        for (const _0x80766a of _0x22ece1) {
          this["_forcedPosition"][_0x80766a] !== _0x23ba19 &&
            (this[_0x80766a] = _0x4d58ef(this[_0xf92378(0x234)][_0x80766a]));
        }
      } else _0x5c5ffe["x"] = this[_0xf92378(0x222)] + _0x523724;
    }
    _0x5c5ffe["y"] =
      this[_0xf92378(0x333)] / 0x2 - _0x5c5ffe[_0xf92378(0x333)] / 0x2;
  }),
  (VisuMZ[_0x276037(0x206)][_0x276037(0x2fe)] =
    Window_ChoiceList[_0x276037(0x21e)][_0x276037(0x103)]),
  (Window_ChoiceList["prototype"][_0x276037(0x103)] = function () {
    const _0x5acedd = _0x276037;
    if (this[_0x5acedd(0x370)]) {
      if (_0x5acedd(0x2eb) === _0x5acedd(0x262)) this[_0x5acedd(0x1ed)]();
      else return this["messageCoreWindowX"]();
    } else
      return VisuMZ[_0x5acedd(0x206)]["Window_ChoiceList_windowX"][
        _0x5acedd(0x266)
      ](this);
  }),
  (Window_ChoiceList[_0x276037(0x21e)][_0x276037(0x199)] = function () {
    const _0x2871d2 = _0x276037,
      _0x4f60cf = $gameMessage[_0x2871d2(0x1fd)]();
    if (_0x4f60cf === 0x1)
      return (Graphics["boxWidth"] - this[_0x2871d2(0x252)]()) / 0x2;
    else {
      if (_0x4f60cf === 0x2) {
        if (_0x2871d2(0x147) === "JGWSr")
          return (
            this[_0x2871d2(0x370)]["x"] +
            this["_messageWindow"][_0x2871d2(0x222)] -
            this["windowWidth"]()
          );
        else this[_0x2871d2(0x345)]();
      } else return this["_messageWindow"]["x"];
    }
  }),
  (Window_ChoiceList["prototype"][_0x276037(0x252)] = function () {
    const _0x537daa = _0x276037,
      _0x4bdf32 =
        (this[_0x537daa(0x2e9)]() + this["colSpacing"]()) *
          this[_0x537daa(0x167)]() +
        this[_0x537daa(0x352)] * 0x2;
    return Math[_0x537daa(0x21a)](_0x4bdf32, Graphics[_0x537daa(0x222)]);
  }),
  (Window_ChoiceList[_0x276037(0x21e)][_0x276037(0x30b)] = function () {
    const _0x419f93 = _0x276037,
      _0x5ea52c = $gameMessage[_0x419f93(0x150)]()
        [_0x419f93(0x299)]((_0xd5584d) => this[_0x419f93(0x28e)](_0xd5584d))
        ["filter"]((_0xb0ed34) => this[_0x419f93(0x292)](_0xb0ed34)),
      _0x3db8af = Math[_0x419f93(0x357)](
        _0x5ea52c[_0x419f93(0x313)] / this[_0x419f93(0x167)]()
      );
    return Math["max"](0x1, Math["min"](_0x3db8af, this[_0x419f93(0x211)]()));
  }),
  (Window_ChoiceList["prototype"][_0x276037(0x211)] = function () {
    const _0x2a53c7 = _0x276037,
      _0x10ba5d = this[_0x2a53c7(0x370)],
      _0x4bef82 = _0x10ba5d ? _0x10ba5d["y"] : 0x0,
      _0x49bf56 = _0x10ba5d ? _0x10ba5d[_0x2a53c7(0x333)] : 0x0,
      _0xb5036f = Graphics[_0x2a53c7(0x1f0)] / 0x2;
    if (_0x4bef82 < _0xb5036f && _0x4bef82 + _0x49bf56 > _0xb5036f) return 0x4;
    else {
      if (_0x2a53c7(0x22b) !== _0x2a53c7(0x22b))
        _0x647e54[_0x2a53c7(0x206)]["Window_Base_processEscapeCharacter"][
          _0x2a53c7(0x266)
        ](this, _0x408ffc, _0x5e8a3e);
      else return $gameSystem[_0x2a53c7(0x346)]();
    }
  }),
  (Window_ChoiceList["prototype"][_0x276037(0x2e9)] = function () {
    const _0x53f52c = _0x276037;
    let _0x30c726 = 0x60;
    for (const _0x6a67da of this[_0x53f52c(0x293)]) {
      if (_0x53f52c(0x102) === _0x53f52c(0x34f))
        return (
          this[_0x53f52c(0xe8)](_0xbafd70, !![], !![]),
          this["processAutoPosition"](
            _0x53f52c(0x1e0),
            _0x28ecdd(_0x1977b5) || 0x0
          ),
          ""
        );
      else {
        const _0x598139 = _0x6a67da[_0x53f52c(0x31d)],
          _0x437e40 = this["textSizeEx"](_0x598139)[_0x53f52c(0x222)],
          _0x42f53a = Math["ceil"](_0x437e40) + this[_0x53f52c(0x18b)]() * 0x2;
        if (_0x30c726 < _0x42f53a) {
          if (_0x53f52c(0x1fa) === "Ehqct") _0x30c726 = _0x42f53a;
          else
            return (
              this[_0x53f52c(0xe8)](_0x3f50c5, !![], !![]),
              this[_0x53f52c(0x17d)]("map\x20player", 0x0),
              ""
            );
        }
      }
    }
    return _0x30c726;
  }),
  (Window_ChoiceList[_0x276037(0x21e)][_0x276037(0x344)] = function (
    _0x19abce
  ) {
    const _0x262c4d = _0x276037,
      _0x491c89 = this[_0x262c4d(0x2d3)](_0x19abce),
      _0x30f8fb =
        $gameSystem["getChoiceListTextAlign"]() !== "default"
          ? _0x262c4d(0x136)[_0x262c4d(0x384)]($gameSystem[_0x262c4d(0x21c)]())
          : "",
      _0x25321e = _0x30f8fb + this[_0x262c4d(0x1c6)](_0x19abce);
    this[_0x262c4d(0x1ea)](this[_0x262c4d(0x110)](_0x19abce));
    const _0x41c6e7 = this["textSizeEx"](_0x25321e)[_0x262c4d(0x333)],
      _0x287e90 = Math[_0x262c4d(0x25d)](
        _0x491c89["y"],
        _0x491c89["y"] + Math["round"]((_0x491c89["height"] - _0x41c6e7) / 0x2)
      );
    this[_0x262c4d(0x125)](
      _0x25321e,
      _0x491c89["x"],
      _0x287e90,
      _0x491c89["width"]
    );
  }),
  (Window_ChoiceList[_0x276037(0x21e)][_0x276037(0x16d)] = function () {
    const _0xa4ac1a = _0x276037;
    $gameMessage["onChoice"](this[_0xa4ac1a(0x2dc)]()),
      this[_0xa4ac1a(0x370)][_0xa4ac1a(0x2f9)](),
      this["close"]();
  });
