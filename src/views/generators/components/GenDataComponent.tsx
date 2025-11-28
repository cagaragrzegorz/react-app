import '../../../styles/Generators.css';

import React, {useContext, useState} from 'react';

import {GeneratorsContext} from '../../../contexts/generatorsContext/GeneratorsContext';
import {getLibs} from '../../../httpClient/librariesAPI';
import {LibType} from '../types';
import {ContextInput, ContextLabel, ContextSelect, LinkSpan, RequiredSpan} from '../DataGenerators.styled';
import {StandardFormProps} from '../types';
import {executeFunWithAxiosRequests} from '../utils';
import {OverlayTrigger, Tooltip} from "react-bootstrap";

export const GenDataComponent: React.FC<StandardFormProps> = (props) => {

    const [libraryState, setLibraryState] = useState<{ isInputElement: boolean; libList: LibType[] }>({
        isInputElement: true,
        libList: [],
    });
    const {genData, setGenData} = useContext(GeneratorsContext);

    const handleGenDataChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = event.target;
        setGenData((prevGenData) => ({
            ...prevGenData,
            [name]: value,
        }));
    };

    const handleGenDataChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        const {value} = event.target;
        const selectedLib: LibType = libraryState.libList.filter((lib: LibType) => lib.name === value)[0];
        setGenData({
            libName: selectedLib.name,
            libId: selectedLib.id.toString()
        });
    };

    const getLibraries = async () => {
        if (libraryState.libList.length === 0) {
            const {addConsoleMessage, setLoading} = props;
            await executeFunWithAxiosRequests(addConsoleMessage, setLoading, async () => {
                addConsoleMessage('Fetching libraries');
                const libResponse: any = await getLibs();
                const libList = libResponse.data.libs.filter((lib: LibType) => lib.enabled);
                setGenData({
                    libName: libList[0].name,
                    libId: libList[0].id.toString(),
                });
                setLibraryState((prevState) =>
                    ({isInputElement: !prevState.isInputElement, libList: libList}));
                addConsoleMessage('Fetched libraries successfully', 'success');
            });
            return;
        }
        setLibraryState((prevState) =>
            ({...prevState, isInputElement: !prevState.isInputElement}));
    };

    const injectInput = (element: 'input' | 'list') => {
        if (element === 'list') {
            return (
                <ContextLabel>
                    Lib name
                    <RequiredSpan/>
                    <LinkSpan><a onClick={() => getLibraries()}>Fetch all libraries</a></LinkSpan>
                    <br/>
                    <ContextSelect
                        id="libName"
                        name="libName"
                        value={genData.libName}
                        onChange={handleGenDataChangeSelect}
                    >
                        {libraryState.libList.map((option, index) => (
                            <option key={index} value={option.name}>
                                {option.name}
                            </option>
                        ))}
                    </ContextSelect>
                </ContextLabel>
            );
        }
        return (
            <ContextLabel>
                Lib name
                <RequiredSpan/>
                <LinkSpan><a onClick={() => getLibraries()}>Fetch all libraries</a></LinkSpan>
                <ContextInput
                    type="text"
                    id="libName"
                    name="libName"
                    value={genData.libName}
                    onChange={handleGenDataChange}
                />
            </ContextLabel>
        );
    };

    return (
        <div className="context-data-container">
            {libraryState.isInputElement ? injectInput('input') : injectInput('list')}
            <ContextLabel>


                <OverlayTrigger
                    placement="right-end"
                    overlay={<Tooltip id="lib-id-tooltip">Find the Lib ID in 'Settings.' This is needed to uniquely
                        identify library.</Tooltip>}
                ><span>Lib ID<RequiredSpan/>&nbsp;
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 2 24 24"
                         fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                         strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="16" x2="12" y2="12"/>
                        <line x1="12" y1="8" x2="12.01" y2="8"/>
                    </svg>
                </span>
                </OverlayTrigger>
                <ContextInput
                    type="text"
                    id="libId"
                    name="libId"
                    value={genData.libId}
                    onChange={handleGenDataChange}
                    required
                />
            </ContextLabel>
        </div>

    );
};
