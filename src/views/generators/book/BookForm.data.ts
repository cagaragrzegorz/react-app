import {BookInfo, LibUser} from "../../../models/generators.model";

const todayString = new Date().toISOString();

export const bookBlueprint: BookInfo = {
    library: {
        id: "placeholder",
        name: "placeholder"
    },
    bookId: Date.now().toString(),
    title: "Sample Book Title",
    authors: "Jane Doe,John Smith",
    language: "English",
    isbn10: "1234567890",
    publisher: "Sample Publisher",
    publishedDate: todayString,
    createdAt: todayString,
    updatedAt: todayString,
    description: "This is a sample description of the book.",
    pageCount: 350,
    categories: ["Fiction", "Mystery"],
    averageRating: 4.5,
}
