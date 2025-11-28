import '../../../styles/Generators.css';

import React, {useContext, useEffect, useState} from 'react';
import {StandardFormProps} from "../types";
import {GeneratorsContext} from "../../../contexts/generatorsContext/GeneratorsContext";
import {CopyToClipboardButton} from "../../../components/common/CopyToClipboardButton";
import {RequiredSpan, ShareableLinkPreview, StyledH4} from "../DataGenerators.styled";


export const ShareableLinkForm: React.FC<StandardFormProps> = (props) => {
    const {addConsoleMessage} = props;
    const {genData} = useContext(GeneratorsContext);
    const [shareableLinkState, setShareableLinkState] = useState(
        {
            bookId: '',
            libId: genData.libId,
            isPreviewVisible: false,
            shareableLink: 'Generate order link first.',
        },
    );

    useEffect(() => {
        setShareableLinkState((setShareableLinkState) => ({
            ...setShareableLinkState,
            libId: genData.libId,
        }));
    }, [genData]);


    const handleBookIdStateChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const {value} = event.target;

        setShareableLinkState((prevState) => ({
            ...prevState,
            bookId: value,
        }));

    };

    const createBookShareableLink = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();
        if (shareableLinkState.bookId === '' ){
            addConsoleMessage('Book ID is required to generate shareable link.', 'failure');
            return;
        }
        const generatedLink = `https://sharable.lib.com/${shareableLinkState.libId}/book/${shareableLinkState.bookId}?auth=jhg32423mh4vh324vm`;
        setShareableLinkState((prevState) => ({
            ...prevState,
            isPreviewVisible: true,
            shareableLink: generatedLink,
        }));
        addConsoleMessage('Book shareable link generated successfully', 'success');
    };

    return (
        <div className="gen-user-container">
            <div className="form-container">
                <StyledH4>Book shareable link</StyledH4>
                <form onSubmit={createBookShareableLink}>
                    <label>
                        Book ID<RequiredSpan/>
                        {shareableLinkState.bookId === '' && <><br/><span className="failure">Book ID is required.</span></>}<input
                        type="text"
                        className="long"
                        id="bookId"
                        name="bookId"
                        value={shareableLinkState.bookId}
                        onChange={handleBookIdStateChange}
                    />
                    </label>
                    <button type="submit" name="submit" className="submitButton">
                        Create Book Shareable Link
                    </button>
                </form>
                {shareableLinkState.isPreviewVisible
                    ? (
                        <ShareableLinkPreview>
                            <CopyToClipboardButton
                                color="#000"
                                backgroundColor="#f6f6f6"
                                textToCopy={shareableLinkState.shareableLink}
                            />
                            {shareableLinkState.shareableLink}
                        </ShareableLinkPreview>
                    )
                    : <div/>}
            </div>
        </div>
    );
};
