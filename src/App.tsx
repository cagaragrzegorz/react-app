import "./styles/App.css";
import React, {FC} from "react";
import {MainContainer} from "./components/MainContainer";
import {BrowserRouter, Navigate, Route, Router, Routes} from "react-router-dom";
import {menuData} from "./components/menu/NavMenu.data";

export const App: FC = () => (
    <BrowserRouter basename={'/react-app'}>
        <Routes>
            <Route path="/" element={<MainContainer/>}>
                <Route index element={<Navigate to="/home"/>}/>
                {menuData.map((item, i) => (
                    <Route path={item.link} element={item.element} key={i}/>
                ))}
                <Route path="*" element={<p>There's nothing here: 404!</p>}/>
            </Route>
        </Routes>
    </BrowserRouter>
);
