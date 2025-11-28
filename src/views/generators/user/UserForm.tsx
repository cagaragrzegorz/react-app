import '../../../styles/Generators.css';

import React, {useContext, useEffect, useState} from 'react';

import {CopyToClipboardButton} from '../../../components/common/CopyToClipboardButton';

import {postUser} from '../../../httpClient/librariesAPI';
import {BlueInfoSpan, RequiredSpan, StyledH4} from '../DataGenerators.styled';

import {StandardFormProps} from '../types';

import {
    addMillis,
    executeFunWithAxiosRequests,
    trimMillis,
} from '../utils';
import {userBlueprint} from './UserForm.data';
import {GeneratorsContext} from "../../../contexts/generatorsContext/GeneratorsContext";
import {LibUser} from "../../../models/generators.model";

export const UserForm: React.FC<StandardFormProps> = (props) => {
    const {addConsoleMessage, setLoading} = props;
    const {genData} = useContext(GeneratorsContext);
    const [libUserData, setLibUserData] = useState<LibUser>(userBlueprint);
    const [errors, setErrors] = useState<Partial<LibUser>>({});

    const setNewUserId = () => {
        const todayString = new Date().toISOString();
        const [date, time] = todayString.replaceAll('-', '').replaceAll(':', '').split('T');
        const newUserId = `User-${date}-${time.substring(0, 6)}`;
        setLibUserData((prevUser) => ({
            ...prevUser,
            userId: newUserId,
        }));
    }

    useEffect(() => {
        setNewUserId()
    }, []);

    useEffect(() => {
        setLibUserData((prevUser) => ({
            ...prevUser,
            library: {
                id: genData.libId,
                name: genData.libName,
            },
        }));
    }, [genData]);

    const validateField = (name: string, value: string): string | null => {
        switch (name) {
            case 'userId':
                if (!value) return 'User ID is required.';
                if (value.length < 6) return 'User ID must be at least 6 characters.';
                break
            case 'username':
                if (!value) return 'Username is required.';
                if (value.length < 5) return 'Username must be at least 5 characters.';
                break;
            case 'email':
                if (!value) return 'Email is required.';
                if (!/^[a-zA-Z0–9._%+-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,}$/.test(value)) return 'Invalid email format.';
                break;
            case 'firstName':
                if (!value) return 'First name is required.';
                if (value.length < 2) return 'First name must be at least 2 characters.';
                break;
            case 'lastName':
                if (!value) return 'Last name is required.';
                if (value.length < 2) return 'Last name must be at least 2 characters.';
                break;
            case 'age':
                if (+value < 0) return 'Age must be greater or equal to 0.';
                break;
            default:
                return null;
        }
        return null;
    };
    const handleOrderDataChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>): void => {
        const {name, value} = event.target;

        if (name.includes('createdAt')) {
            setLibUserData((prevUser) => ({
                ...prevUser,
                createdAt: addMillis(value),
            }));
        } else if (name.includes('updatedAt')) {
            setLibUserData((prevUser) => ({
                ...prevUser,
                updatedAt: addMillis(value),
            }));
        } else {
            setLibUserData((prevUser) => {
                if (value === '') {
                    delete prevUser[name as keyof LibUser];
                    return {
                        ...prevUser
                    }
                } else {
                    return {
                        ...prevUser,
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
                delete prevErrors[name as keyof LibUser];
                return prevErrors
            });
        }
        ;
    };

    const formSubmitHandler = async (event: React.FormEvent) => {
        event.preventDefault();

        if (Object.keys(errors).length > 0) {
            addConsoleMessage(`Cannot add user. Form errors: ${JSON.stringify(errors, null, 2)}`, 'failure');
            return;
        }

        await executeFunWithAxiosRequests(addConsoleMessage, setLoading, async () => {
            addConsoleMessage(`Sending user: ${libUserData.userId}`);
            const userResponse = await postUser(libUserData, genData.libId);
            addConsoleMessage(`User created! (status: ${userResponse.status})`, 'success');
        });

        setNewUserId()
    };


    return (
        <div className="gen-user-container">
            <div className="form-container">
                <form onSubmit={formSubmitHandler}>
                    <StyledH4>User details</StyledH4>
                    <label>
                        UserID<RequiredSpan/>
                        {errors.userId && <><br/><span className="failure">{errors.userId}</span></>}<input
                        type="text"
                        className="long"
                        id="userId"
                        name="userId"
                        value={libUserData.userId}
                        onChange={handleOrderDataChange}
                    />
                    </label>
                    <label>
                        Username<RequiredSpan/>
                        {errors.username && <><br/><span className="failure">{errors.username}</span></>}<input
                        type="text"
                        className="long"
                        id="username"
                        name="username"
                        value={libUserData.username}
                        onChange={handleOrderDataChange}
                    />
                    </label>
                    <label>
                        Created At<RequiredSpan/><input
                        type="datetime-local"
                        id="createdAt"
                        name="createdAt"
                        value={trimMillis(libUserData.createdAt)}
                        onChange={handleOrderDataChange}
                    />
                    </label>
                    <label>
                        Updated At<RequiredSpan/><input
                        type="datetime-local"
                        id="updatedAt"
                        name="updatedAt"
                        value={trimMillis(libUserData.updatedAt!)}
                        onChange={handleOrderDataChange}
                    />
                    </label>
                    <br/>
                    <label className="smallLabel">
                        User status<RequiredSpan/><br/>
                        <select
                            id="status"
                            name="status"
                            value={libUserData.status}
                            onChange={handleOrderDataChange}
                            style={{fontSize: "16px"}}
                        >
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="INACTIVE">INACTIVE</option>
                            <option value="SUSPENDED">SUSPENDED</option>
                        </select>
                    </label>
                    <BlueInfoSpan>For 'SUSPENDED' status, user can return books only.</BlueInfoSpan>
                    <StyledH4>User data</StyledH4>
                    <label>
                        First name<RequiredSpan/>
                        {errors.firstName && <><br/><span className="failure">{errors.firstName}</span></>}<input
                        type="text"
                        className="long"
                        id="firstName"
                        name="firstName"
                        value={libUserData.firstName}
                        onChange={handleOrderDataChange}
                    />
                    </label>
                    <label>
                        Middle name<input
                        type="text"
                        className="long"
                        id="middleName"
                        name="middleName"
                        value={libUserData.middleName}
                        onChange={handleOrderDataChange}
                    />
                    </label>
                    <label>
                        Last name<RequiredSpan/>
                        {errors.lastName && <><br/><span className="failure">{errors.lastName}</span></>}<input
                        type="text"
                        className="long"
                        id="lastName"
                        name="lastName"
                        value={libUserData.lastName}
                        onChange={handleOrderDataChange}
                    />
                    </label>
                    <label>
                        Email<RequiredSpan/>
                        {errors.email && <><br/><span className="failure">{errors.email}</span></>}<input
                        type="text"
                        className="long"
                        id="email"
                        name="email"
                        value={libUserData.email}
                        onChange={handleOrderDataChange}
                        required
                    />
                    </label>
                    <label>
                        Age (years)
                        {errors.age && <><br/><span className="failure">{errors.age}</span></>}<input
                        type="number"
                        className="long"
                        id="age"
                        name="age"
                        value={libUserData.age}
                        onChange={handleOrderDataChange}
                        required
                    />
                    </label>
                    <br/>
                    <button type="submit" name="submit" className="submitButton">
                        Add User
                    </button>
                </form>
            </div>
            <div className="preview">
                <pre>
                  <CopyToClipboardButton
                      color="#DDAB36"
                      backgroundColor="#272625"
                      textToCopy={JSON.stringify(libUserData, null, 2)}
                  />
                    {JSON.stringify(libUserData, null, 2)}
                </pre>
            </div>
        </div>
    );
};
