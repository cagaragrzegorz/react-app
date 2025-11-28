import "./styles/App.css";
import React, {FC} from "react";
import {MainContainer} from "./components/MainContainer";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {menuData} from "./components/menu/NavMenu.data";

export const App: FC = () => (
    <BrowserRouter>
        <Routes>
            <Route path="react-app/" element={<MainContainer/>}>
                <Route index element={<Navigate to="/react-app/home"/>}/>
                <Route path="*" element={<p>There's nothing here: 404!</p>}/>
                {menuData.map((item, i) => (
                    <Route path={item.link} element={item.element} key={i}/>
                ))}
            </Route>
        </Routes>
    </BrowserRouter>
);
