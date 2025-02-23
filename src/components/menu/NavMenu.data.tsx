import React, {ReactElement} from "react";
import {ChartLineIcon, CircleIcon, HomeIcon} from "lucide-react";
import {Other} from "../../views/other/Other";
import {Home} from "../../views/home/Home";
import {TestStatus} from "../../views/testStatus/TestStatus";

interface NavMenuData {
    name: string;
    link: string;
    icon: ReactElement<any, any>;
    element: ReactElement<any, any>;
}

export const menuData: NavMenuData[] = [
    {name: 'Home', link: '/home', icon: <HomeIcon color='black'/>, element: <Home/>},
    {name: 'Test Status', link: '/test-status', icon: <ChartLineIcon color='black'/>, element: <TestStatus/>},
    {name: 'Other', link: '/other', icon: <CircleIcon color='black'/>, element: <Other/>},
]


