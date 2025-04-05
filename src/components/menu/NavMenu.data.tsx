import React, {ReactElement} from "react";
import {ChartLineIcon, CircleSmall, HomeIcon, ListTodo} from "lucide-react";
import {Other} from "../../views/other/Other";
import {Home} from "../../views/home/Home";
import {TestStatus} from "../../views/testStatus/TestStatus";
import {Todo} from "../../views/todo/Todo";

interface NavMenuData {
    name: string;
    link: string;
    icon: ReactElement<any, any>;
    element: ReactElement<any, any>;
}

export const menuData: NavMenuData[] = [
    {name: 'Home', link: '/home', icon: <HomeIcon color='black'/>, element: <Home/>},
    {name: 'Todo', link: '/todo', icon: <ListTodo color='black'/>, element: <Todo/>},
    // {name: 'Form', link: '/form', icon: <ClipboardType color='black'/>, element: <AppForm/>},
    {name: 'Test Status', link: '/test-status', icon: <ChartLineIcon color='black'/>, element: <TestStatus/>},
    {name: 'Other', link: '/other', icon: <CircleSmall color='black'/>, element: <Other/>},
]


