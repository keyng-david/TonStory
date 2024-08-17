import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "styled-components";
import { Card, Fullscreen, Label, Title } from "../utils/styled";
import { Button } from "antd";
import { useContext } from "react";
import { store } from "../utils/store";
//disabled color grey
const StyledButton = styled(Button) `
  min-width: 100px;
  background-color: orange;
  color: white;

  &:disabled {
    background-color: grey;
  }
`;
export default function Shop() {
    const { state } = useContext(store);
    const items = [
        {
            title: "Refill Stamina",
            description: "Fully replenishes stamina",
            price: "100",
            active: true
        },
        {
            title: "Level Up",
            description: "Increase level by 1",
            price: "50",
            active: true
        },
        {
            title: "Sacred Sword",
            description: "Increase attack by 10%",
            price: "6969",
            active: false
        },
    ];
    return (_jsxs(Fullscreen, { children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between' }, children: [_jsx(Title, { children: "Shop" }), _jsxs(Label, { style: { margin: 15 }, children: ["Stamina: ", state.stamina] }), _jsxs(Label, { style: { margin: 15 }, children: ["Points: ", state.points] })] }), items.map((item) => (_jsxs(Card, { children: [_jsxs("div", { children: [_jsx(Label, { children: item.title }), _jsx("p", { children: item.description })] }), _jsx(StyledButton, { disabled: !item.active, children: item.active ? item.price : 'Soon' })] })))] }));
}
//# sourceMappingURL=Shop.js.map