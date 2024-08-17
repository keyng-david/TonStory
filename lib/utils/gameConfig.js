// Constants for player movement and game mechanics
export const MOVE_SPEED = 300;
export const ATTACK_INTERVAL = 500;
export const PLAYER_HEALTH = 10;
// Key mappings for player controls
export var Keys;
(function (Keys) {
    Keys["LEFT"] = "left";
    Keys["RIGHT"] = "right";
    Keys["SPACE"] = "space";
    Keys["CONTROL"] = "control";
})(Keys || (Keys = {}));
// Game specific settings like gravity or background color can be added here as needed
export const GRAVITY = 2000;
export const BACKGROUND_COLOR = { r: 141, g: 183, b: 255 };
//# sourceMappingURL=gameConfig.js.map