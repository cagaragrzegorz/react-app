export interface LibUser {
    userId: string;
    username: string;
    email: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    age?: number;
    phoneNumber?: string;
    createdAt: string;
    updatedAt: string;
    address?: LibAddress;
    library: {
        id: string;
        name?: string;
    },
    status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
}

export interface LibAddress {
    addressLines: string[];
    city: string;
    postalCode: string;
    state: string;
    countryCode: string;
}

export interface BookInfo {
    library: {
        id: string;
        name?: string;
    },
    bookId: string;
    authors: string;
    title: string;
    pageCount: number;
    language: string;
    isbn10: string;
    publisher?: string;
    publishedDate?: string;
    createdAt: string;
    updatedAt: string;
    description?: string;
    categories: BookCategory[];
    averageRating?: number;
}

export type BookCategory = 'Fiction' | 'Non-Fiction' | 'Science' | 'History' | 'Biography' | 'Children' | 'Fantasy' | 'Mystery' | 'Romance' | 'Horror' | 'Self-Help' | 'Health' | 'Travel' | 'Religion' | 'Science Fiction'  | 'Kids' | 'Adults' |'Comics' | 'Art' | 'Cooking' | 'Business' | 'Education' | 'Technology' | 'Other';