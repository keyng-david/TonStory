import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PlayCircleOutlined, ShareAltOutlined, ShopOutlined, TrophyOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
const Bar = styled.div `
  display: flex;
  justify-content: space-around;
  width: 100vw;
  position: fixed;
  bottom: 0;
  z-index: 10;
  background-color: black;
  border-top: 1px solid white;
  padding: 20px 0;
`;
export default function Navbar() {
    const navigate = useNavigate();
    return (_jsxs(Bar, { children: [_jsx(PlayCircleOutlined, { style: { fontSize: 20 }, onClick: () => navigate('/') }), _jsx(TrophyOutlined, { style: { fontSize: 20 }, onClick: () => navigate('/scoreboard') }), _jsx(ShopOutlined, { style: { fontSize: 20 }, onClick: () => navigate('/shop') }), _jsx(ShareAltOutlined, { style: { fontSize: 20 }, onClick: () => navigate('/share') })] }));
}
//# sourceMappingURL=Navbar.js.map