import '../../../styles/Generators.css';

import React, {useContext, useEffect, useState} from 'react';

import {CopyToClipboardButton} from '../../../components/common/CopyToClipboardButton';

import {postBook, postUser} from '../../../httpClient/librariesAPI';
import {BlueInfoSpan, CategoryButton, RequiredSpan, StyledH4} from '../DataGenerators.styled';

import {StandardFormProps} from '../types';

import {
    addMillis,
    executeFunWithAxiosRequests,
    trimMillis,
} from '../utils';
import {bookBlueprint} from './BookForm.data';
import {GeneratorsContext} from "../../../contexts/generatorsContext/GeneratorsContext";
import {BookCategory, BookInfo, LibUser} from "../../../models/generators.model";

export const BookForm: React.FC<StandardFormProps> = (props) => {
    const {addConsoleMessage, setLoading} = props;
    const {genData} = useContext(GeneratorsContext);
    const [bookInfo, setBookInfo] = useState<BookInfo>(bookBlueprint);
    const [errors, setErrors] = useState<Partial<BookInfo>>({});

    const setNewBookId = () => {
        const todayString = new Date().toISOString();
        const [date, time] = todayString.replaceAll('-', '').replaceAll(':', '').split('T');
        const newUserId = `Book-${date}-${time.substring(0, 6)}`;
        setBookInfo((prevUser) => ({
            ...prevUser,
            bookId: newUserId,
        }));
    }

    useEffect(() => {
        setNewBookId()
    }, []);

    useEffect(() => {
        setBookInfo((prevUser) => ({
            ...prevUser,
            library: {
                id: genData.libId,
                name: genData.libName,
            },
        }));
    }, [genData]);

    const validateField = (name: string, value: string): string | null => {
        switch (name) {
            case 'bookId':
                if (!value) return 'Book ID is required.';
                if (value.length < 6) return 'Book ID must be at least 6 characters.';
                break;
            case 'title':
                if (!value) return 'Title is required.';
                break;
            case 'authors':
                if (!value) return 'At least one author is required.';
                break;
            case 'language':
                if (!value) return 'Language name is required.';
                break;
            case 'isbn10':
                if (!value) return 'ISBN name is required.';
                if (value.length < 10 || value.length > 10) return 'ISBN must be 10 characters long.';
                break;
            case 'pageCount':
                if (!value) return 'Page count number is required.';
                if (+value < 2 ) return 'Page count has to be at least 2.';
                break;
            default:
                return null;
        }
        return null;
    };
    const handleOrderDataChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>): void => {
        const {name, value} = event.target;

        if (name.includes('createdAt')) {
            setBookInfo((prevUser) => ({
                ...prevUser,
                createdAt: addMillis(value),
            }));
        } else if (name.includes('updatedAt')) {
            setBookInfo((prevUser) => ({
                ...prevUser,
                updatedAt: addMillis(value),
            }));
        } else if (name.includes('publishedDate')) {
            setBookInfo((prevUser) => ({
                ...prevUser,
                publishedDate: addMillis(value),
            }));
        } else {
            setBookInfo((prevBook) => {
                if (value === '') {
                    delete prevBook[name as keyof BookInfo];
                    return {
                        ...prevBook
                    }
                } else {
                    return {
                        ...prevBook,
                        [name]: value,
                    };
                }
            });
        }

        const error: string | null = validateField(name, value);
        if (error) {
            setErrors({...errors, [name]: error})
        } else {
            setErrors((prevErrors) => {
                delete prevErrors[name as keyof BookInfo];
                return prevErrors
            });
        };
    };

    const formSubmitHandler = async (event: React.FormEvent) => {
        event.preventDefault();

        if (Object.keys(errors).length > 0) {
            addConsoleMessage(`Cannot add book. Form errors: ${JSON.stringify(errors, null, 2)}`, 'failure');
            return;
        }

        await executeFunWithAxiosRequests(addConsoleMessage, setLoading, async () => {
            addConsoleMessage(`Sending book: ${bookInfo.bookId}`);
            const userResponse = await postBook(bookInfo, genData.libId);
            addConsoleMessage(`Book added! (status: ${userResponse.status})`, 'success');
        });

        setNewBookId()
    };


    return (
        <div className="gen-user-container">
            <div className="form-container">
                <form onSubmit={formSubmitHandler}>
                    <StyledH4>Book details</StyledH4>
                    <label>
                        BookId<RequiredSpan/>
                        {errors.bookId && <><br/><span className="failure">{errors.bookId}</span></>}<input
                        type="text"
                        className="long"
                        id="bookId"
                        name="bookId"
                        value={bookInfo.bookId}
                        onChange={handleOrderDataChange}
                    />
                    </label>
                    <label>
                        ISBN<RequiredSpan/>
                        {errors.isbn10 && <><br/><span className="failure">{errors.isbn10}</span></>}<input
                        type="text"
                        className="long"
                        id="isbn10"
                        name="isbn10"
                        value={bookInfo.isbn10}
                        onChange={handleOrderDataChange}
                    />
                    </label>
                    <label>
                        Created At<RequiredSpan/><input
                        type="datetime-local"
                        id="createdAt"
                        name="createdAt"
                        value={trimMillis(bookInfo.createdAt)}
                        onChange={handleOrderDataChange}
                    />
                    </label>
                    <label>
                        Updated At<RequiredSpan/><input
                        type="datetime-local"
                        id="updatedAt"
                        name="updatedAt"
                        value={trimMillis(bookInfo.updatedAt!)}
                        onChange={handleOrderDataChange}
                    />
                    </label>
                    <br/>
                    <label style={{width: "100px"}}>
                        Categories<RequiredSpan/></label><BlueInfoSpan>You can select multiple
                    categories.</BlueInfoSpan>
                    <br/>
                    {[
                        "Fiction", "Non-Fiction", "Science", "History", "Biography", "Children", "Fantasy", "Mystery", "Romance", "Horror",
                        "Self-Help", "Health", "Travel", "Religion", "Science Fiction", "Kids", "Adults", "Comics", "Art",
                        "Cooking", "Business", "Education", "Technology", "Other"
                    ].map((category) => (
                        <CategoryButton
                            type="button"
                            id={category}
                            name="categories"
                            value={category}
                            $backgroundColor={bookInfo.categories.includes(category as BookCategory) ? "#daeaee" : "#fff"}
                            onClick={() => {
                                const isCatIncluded = bookInfo.categories.includes(category as BookCategory)
                                setBookInfo((prevBook) => ({
                                    ...prevBook,
                                    categories: isCatIncluded
                                        ? prevBook.categories.filter((cat) => cat !== category)
                                        : [...prevBook.categories, category as BookCategory]
                                }));
                            }}
                        > {category}</CategoryButton>
                    ))}
                    <StyledH4>Book data</StyledH4>
                    <label>
                        Title<RequiredSpan/>
                        {errors.title && <><br/><span className="failure">{errors.title}</span></>}<input
                        type="text"
                        className="long"
                        id="title"
                        name="title"
                        value={bookInfo.title}
                        onChange={handleOrderDataChange}
                    />
                    </label>
                    <label>
                        Authors<RequiredSpan/>
                        {errors.authors && <><br/><span className="failure">{errors.authors}</span></>}<input
                        type="text"
                        className="long"
                        id="authors"
                        name="authors"
                        value={bookInfo.authors}
                        onChange={handleOrderDataChange}
                    />
                    </label>
                    <label>
                        Language<RequiredSpan/>
                        {errors.language && <><br/><span className="failure">{errors.language}</span></>}<input
                        type="text"
                        className="long"
                        id="language"
                        name="language"
                        value={bookInfo.language}
                        onChange={handleOrderDataChange}
                    />
                    </label>
                    <label>
                        Description<input
                        type="text"
                        className="long"
                        id="description"
                        name="description"
                        value={bookInfo.description}
                        onChange={handleOrderDataChange}
                    />
                    </label>
                    <label>
                        Page count<RequiredSpan/>
                        {errors.pageCount && <><br/><span className="failure">{errors.pageCount}</span></>}<input
                        type="number"
                        className="long"
                        id="pageCount"
                        name="pageCount"
                        value={bookInfo.pageCount}
                        onChange={handleOrderDataChange}
                    />
                    </label>
                    <label>
                        Average Rating<input
                        type="text"
                        className="long"
                        id="averageRating"
                        name="averageRating"
                        value={bookInfo.averageRating}
                        onChange={handleOrderDataChange}
                    />
                    </label>
                    <label>
                        Publisher<input
                        type="text"
                        className="long"
                        id="publisher"
                        name="publisher"
                        value={bookInfo.publisher}
                        onChange={handleOrderDataChange}
                    />
                    </label>
                    <label>
                        Publication date<input
                        type="datetime-local"
                        className="long"
                        id="publishedDate"
                        name="publishedDate"
                        value={trimMillis(bookInfo.publishedDate!)}
                        onChange={handleOrderDataChange}
                    />
                    </label>
                    <br/>
                    <button type="submit" name="submit" className="submitButton">
                        Add Book
                    </button>
                </form>
            </div>
            <div className="preview">
                <pre>
                  <CopyToClipboardButton
                      color="#DDAB36"
                      backgroundColor="#272625"
                      textToCopy={JSON.stringify(bookInfo, null, 2)}
                  />
                    {JSON.stringify(bookInfo, null, 2)}
                </pre>
            </div>
        </div>
    );
};
