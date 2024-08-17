import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import loadGameScene from "../components/GameScene";
import { useContext, useEffect } from "react";
import { loadEnvironmentAssets, loadGameSounds, loadPlayerSprites } from "../utils/assetloader";
import { store } from "../utils/store";
import styled from "styled-components";
import { Progress, Statistic } from "antd";
import k from '../utils/kaboom';
import { FireOutlined } from "@ant-design/icons";
const Stats = styled.div `
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  text-align: center;
`;
const Container = styled.div `
  position: fixed;
  padding: 20px;
`;
export default function Game() {
    const { state, dispatch } = useContext(store);
    useEffect(() => {
        loadPlayerSprites(k);
        loadEnvironmentAssets(k);
        loadGameSounds(k);
        loadGameScene(k, dispatch);
    }, []);
    return (_jsxs(Container, { children: [_jsxs(Stats, { children: [_jsx(Statistic, { valueStyle: { color: 'white', fontSize: 16 }, title: "Points", value: state.points }), _jsx(Statistic, { valueStyle: { color: 'white', fontSize: 16 }, title: "Level", value: state.level }), _jsx(Statistic, { valueStyle: { color: 'white', fontSize: 16 }, title: "Username", value: state.username })] }), _jsxs(Stats, { style: { bottom: 0 }, children: [_jsx(FireOutlined, {}), _jsx(Progress, { style: { padding: 10, marginRight: 25, color: 'blue' }, size: "small", percent: state.stamina ? (state.stamina / (state.level * 1000)) * 100 : 0, format: (percent) => {
                            const validPercent = percent ?? 0; // Ensure percent is not undefined
                            return (_jsx("p", { style: { color: 'white' }, children: Math.round((validPercent / 100) * (state.level * 1000)) }));
                        } })] })] }));
}
//# sourceMappingURL=Game.js.map