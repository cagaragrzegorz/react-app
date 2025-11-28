import ReactDOM from 'react-dom/client';
import { App } from './App';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {GeneratorsProvider} from "./contexts/generatorsContext/components/GeneratorsProvider";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <GeneratorsProvider>
        <App />
    </GeneratorsProvider>
);
