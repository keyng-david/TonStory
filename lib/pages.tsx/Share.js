import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "styled-components";
import { Card, Fullscreen, Label, Title } from "../utils/styled";
import { Button, message } from "antd";
import { useContext } from "react";
import { store } from "../utils/store";
//disabled color grey
const StyledButton = styled(Button) `
  width: 100%;
  background-color: orange;
  color: white;

  &:disabled {
    background-color: grey;
  }
`;
export default function Share() {
    const { state } = useContext(store);
    console.log(state);
    const items = [
        {
            title: "Refill Stamina",
            description: "Fully replenishes stamina",
            price: "100 points",
            active: true
        },
        {
            title: "Level Up",
            description: "Increase level by 1",
            price: "50 points",
            active: true
        },
        {
            title: "Sacred Sword",
            description: "Increase attack by 10%",
            price: "6969 points",
            active: false
        },
    ];
    return (_jsxs(Fullscreen, { children: [_jsx(Title, { children: "Share" }), _jsxs(Card, { children: [_jsx(Label, { children: "Total Invited Users" }), _jsx(Label, { children: state.referrals })] }), _jsx(Card, { onClick: () => { navigator.clipboard.writeText(state.referralURL); message.success('copied to clipboard'); }, children: _jsxs("div", { children: [_jsx(Label, { children: "Personal Ref Link" }), _jsx("p", { children: state.referralURL })] }) }), _jsx("p", { style: { margin: '10px' }, children: "Referrals gives your referred friend 300 starting points and earns you 10% of points earned by them" })] }));
}
//# sourceMappingURL=Share.js.map