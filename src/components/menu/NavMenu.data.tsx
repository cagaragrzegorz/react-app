import React, {ReactElement} from "react";
import {ChartLineIcon, CircleIcon, DatabaseBackup, HomeIcon, ListTodo} from "lucide-react";
import {Other} from "../../views/other/Other";
import {Home} from "../../views/home/Home";
import {TestStatus} from "../../views/testStatus/TestStatus";
import {DataGenerators} from "../../views/generators";
import {Todo} from "../../views/todo/Todo";

interface NavMenuData {
    name: string;
    link: string;
    icon: ReactElement<any, any>;
    element: ReactElement<any, any>;
}

export const menuData: NavMenuData[] = [
    {name: 'Home', link: '/home', icon: <HomeIcon color='#777'/>, element: <Home/>},
    {name: 'Todo', link: '/todo', icon: <ListTodo color='black'/>, element: <Todo/>},
    {name: 'Generators', link: '/generators', icon: <DatabaseBackup color='#777'/>, element: <DataGenerators/>},
    {name: 'Test status', link: '/test-status', icon: <ChartLineIcon color='#777'/>, element: <TestStatus/>},
    {name: 'Other', link: '/other', icon: <CircleIcon color='#777'/>, element: <Other/>},
]


