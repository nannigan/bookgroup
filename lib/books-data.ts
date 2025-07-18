import { Book } from './types';

export const initialBooks: Book[] = [
    {
        id: 1,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        genre: 'Classic',
        status: 'Read',
        comment: 'A masterpiece of American literature with beautiful prose.',
    },
    {
        id: 2,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        genre: 'Fiction',
        status: 'Currently Reading',
        comment: 'Powerful story about justice and moral courage.',
    },
    {
        id: 3,
        title: '1984',
        author: 'George Orwell',
        genre: 'Dystopian',
        status: 'Want to Read',
        comment: 'Looking forward to this thought-provoking dystopian classic.',
    },
    {
        id: 4,
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        genre: 'Romance',
        status: 'Read',
        comment: 'Witty and charming romance with memorable characters.',
    },
];

export const getStatusColor = (status: Book['status']): string => {
    switch (status) {
        case 'Read':
            return 'bg-green-100 text-green-800';
        case 'Currently Reading':
            return 'bg-blue-100 text-blue-800';
        case 'Want to Read':
            return 'bg-yellow-100 text-yellow-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

// Status options for forms
export const statusOptions: Book['status'][] = ['Want to Read', 'Currently Reading', 'Read'];
