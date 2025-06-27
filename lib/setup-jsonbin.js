import { JSONBinStorage } from './jsonbin-storage';
import { initialBooks } from './books-data';

// One-time setup script for book club admin
export async function setupBookClubBin() {
    const storage = new JSONBinStorage();

    console.log('Setting up JSONBin for your book club...');

    // Create a public bin with initial data
    const binId = await storage.createPublicBin(initialBooks);

    if (binId) {
        console.log('✅ Success! Your book club bin is ready!');
        console.log('📋 Bin ID:', binId);
        console.log('🔗 Share this URL with your book club members:');
        console.log(`   https://your-bookgroup-site.github.io`);
        console.log('');
        console.log('📝 Add this to your .env.local file:');
        console.log(`   NEXT_PUBLIC_JSONBIN_BIN_ID=${binId}`);
        console.log('');
        console.log('🎉 Members can now add/edit books without any setup!');

        return binId;
    } else {
        console.error('❌ Failed to create bin. Check your API key.');
        return null;
    }
}

// Helper function to test the setup
export async function testBookClubAccess(binId) {
    // Simulate a user without API key
    const publicStorage = new JSONBinStorage();

    try {
        const books = await publicStorage.getBooks();
        console.log('✅ Public access works! Found', books.length, 'books');

        // Test adding a book
        const testBook = {
            title: 'Test Book',
            author: 'Test Author',
            genre: 'Test',
            status: 'Want to Read',
            comment: 'Testing public access',
        };

        const allBooks = [...books, { ...testBook, id: Date.now() }];
        const success = await publicStorage.saveBooks(allBooks);

        if (success) {
            console.log('✅ Public write access works!');
            // Remove test book
            await publicStorage.saveBooks(books);
            console.log('✅ Cleanup successful');
        } else {
            console.log('❌ Public write access failed');
        }
    } catch (error) {
        console.error('❌ Public access test failed:', error);
    }
}
