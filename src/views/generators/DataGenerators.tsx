import React, { useState } from 'react';

import {Container, Spinner, Tab, Tabs} from "react-bootstrap";
import {ConsoleMessageClass} from "./types";
import {GeneratorsWrapper, StyledH3, StyledH4} from "./DataGenerators.styled";
import {GenDataComponent} from "./components/GenDataComponent";
import {UserForm} from "./user/UserForm";
import {BookForm} from "./book/BookForm";
import {ShareableLinkForm} from "./sharableLink/ShareableLinkForm";
import {toast, ToastContainer} from "react-toastify";
import {PageTitle} from "../../components/common/Common.styled";

interface GeneratorsState {
    consoleMessage: string;
    messageClass: ConsoleMessageClass;
}

export const DataGenerators: React.FC = () => {
  const [generatorsState, setGeneratorsState] = useState<GeneratorsState>({
    consoleMessage: 'ℹ️ Click \'Add / Create\' button to generate data',
    messageClass: 'info',
  });
  const [apiCallLoading, setApiCallLoading] = useState<boolean>(false);
  const [tab, setTab] = useState<string>('users');

  const clearConsoleMessage = () => {
    setGeneratorsState({ consoleMessage: 'ℹ️ Click \'Add / Create\' button to generate data', messageClass: 'info' });
  };

  const amendConsoleMessage = (consoleMessage: string, messageClass: ConsoleMessageClass = 'info') => {
    let trailingIcon = 'ℹ️';
    if (messageClass === 'success') trailingIcon = '✅';
    if (messageClass === 'failure') trailingIcon = '❌';
    setGeneratorsState((prevGeneratorsState) => ({
      consoleMessage: `${prevGeneratorsState.consoleMessage}\n${trailingIcon} ${consoleMessage}`,
      messageClass,
    }));
    if (messageClass === 'success') {
      toast.success(consoleMessage);
    } else if (messageClass === 'failure') {
        toast.error(consoleMessage);
    }
  };

  return (
    <Container fluid>
      <PageTitle>Data generators</PageTitle>
      <GeneratorsWrapper>
        {apiCallLoading && (
            <div className="spinner-overlay">
              <Spinner animation="border" variant="light" />
            </div>
        )}
        <pre id="previewContainerSubmit" className={generatorsState.messageClass}>
          <button className={`${generatorsState.messageClass} clearButton`} type="button"><a onClick={() => clearConsoleMessage()}>Clear</a></button>
          {generatorsState.consoleMessage}
        </pre>

        <div className="gen-container">
          <StyledH3>Which library would you like to generate data for?</StyledH3>
          <GenDataComponent addConsoleMessage={amendConsoleMessage} setLoading={setApiCallLoading} />
          <StyledH4>What would you like to do?</StyledH4>
          <Tabs                     defaultActiveKey={tab}
                                    activeKey={tab}
                                    className="mb-3"
                                    fill
                                    onSelect={(key) => { if(key) setTab(key)}}>
            <Tab eventKey="users" title="ADD USER">
              <UserForm addConsoleMessage={amendConsoleMessage} setLoading={setApiCallLoading} />
            </Tab>
            <Tab eventKey="books" title="ADD BOOK">
              <BookForm addConsoleMessage={amendConsoleMessage} setLoading={setApiCallLoading} />
            </Tab>
            <Tab eventKey="link" title="CREATE LINK">
              <ShareableLinkForm addConsoleMessage={amendConsoleMessage} setLoading={setApiCallLoading} />
            </Tab>
          </Tabs>
        </div>
      </GeneratorsWrapper>
      <ToastContainer
          position="bottom-center"
          autoClose={2000}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
      />
    </Container>
  );
};
