// This would be deployed as a Vercel serverless function
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const books = (await kv.get('books')) || [];
                res.status(200).json({ books });
            } catch (error) {
                res.status(500).json({ error: 'Failed to fetch books' });
            }
            break;

        case 'POST':
            try {
                const books = (await kv.get('books')) || [];
                const newBook = { ...req.body, id: Date.now() };
                books.push(newBook);
                await kv.set('books', books);
                res.status(201).json({ book: newBook });
            } catch (error) {
                res.status(500).json({ error: 'Failed to add book' });
            }
            break;

        case 'PUT':
            try {
                const books = (await kv.get('books')) || [];
                const { id, ...bookData } = req.body;
                const index = books.findIndex((book) => book.id === id);
                if (index !== -1) {
                    books[index] = { ...books[index], ...bookData };
                    await kv.set('books', books);
                    res.status(200).json({ book: books[index] });
                } else {
                    res.status(404).json({ error: 'Book not found' });
                }
            } catch (error) {
                res.status(500).json({ error: 'Failed to update book' });
            }
            break;

        case 'DELETE':
            try {
                const books = (await kv.get('books')) || [];
                const { id } = req.query;
                const filteredBooks = books.filter((book) => book.id !== parseInt(id));
                await kv.set('books', filteredBooks);
                res.status(200).json({ success: true });
            } catch (error) {
                res.status(500).json({ error: 'Failed to delete book' });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
