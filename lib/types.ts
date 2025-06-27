export interface Book {
    id: number | string;
    title: string;
    author: string;
    genre: string;
    status: 'Want to Read' | 'Currently Reading' | 'Read';
    comment: string;
}

export interface BookFormData {
    title: string;
    author: string;
    genre: string;
    status: 'Want to Read' | 'Currently Reading' | 'Read';
    comment: string;
}

export interface ConnectionTestResult {
    success: boolean;
    message: string;
    details?: any;
    summary?: any;
    report?: string;
}

export interface StorageInterface {
    getBooks(): Promise<Book[] | null>;
    saveBooks(books: Book[]): Promise<boolean>;
    getBinInfo?(): Promise<any>;
}
