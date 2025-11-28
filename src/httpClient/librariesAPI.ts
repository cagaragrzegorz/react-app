import {AxiosHeaders, AxiosResponse} from 'axios';

import {commonHttpClient} from './index';
import {BookInfo, LibUser} from "../models/generators.model";

export const getLibs = async (): Promise<AxiosResponse<any, any>> => {
    // return commonHttpClient.get(`fakeURL/libs`);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data:
                    {
                        libs: [
                            {id: 1234567890, name: 'Scranton Library', enabled: true},
                            {id: 2345678901, name: 'Stamford Library', enabled: true},
                            {id: 3456789012, name: 'Nashua Library', enabled: true},
                            {id: 4567890123, name: 'Utica Library', enabled: true},
                            {id: 5678901234, name: 'Buffalo Library', enabled: true},
                            {id: 6789012345, name: 'Camden Library', enabled: false},
                        ],
                    },
                status: 200,
                statusText: 'OK',
                headers: {},
                config: {
                    headers: new AxiosHeaders({'Content-Type': 'application/json'})
                },
            });
        }, 500);
    });
};

export const postUser = async (userData: LibUser, libId: string): Promise<AxiosResponse<any, any>> => {
    // return commonHttpClient.post(`fakeURL/users/${libId}`, userData);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: userData,
                status: 201,
                statusText: 'CREATED',
                headers: {},
                config: {
                    headers: new AxiosHeaders({'Content-Type': 'application/json'})
                },
            });
        }, 500);
    });
};

export const postBook = async (bookData: BookInfo, libId: string): Promise<AxiosResponse<any, any>> => {
    // return commonHttpClient.post(`fakeURL/books/${libId}`, userData);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: bookData,
                status: 201,
                statusText: 'CREATED',
                headers: {},
                config: {
                    headers: new AxiosHeaders({'Content-Type': 'application/json'})
                },
            });
        }, 500);
    });
};
