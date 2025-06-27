const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
const REPO_OWNER = process.env.NEXT_PUBLIC_GITHUB_OWNER;
const REPO_NAME = process.env.NEXT_PUBLIC_GITHUB_REPO;
const FILE_PATH = 'data/books.json';

export class GitHubStorage {
    constructor() {
        this.headers = {
            Authorization: `token ${GITHUB_TOKEN}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
        };
        this.apiUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;
    }

    async getBooks() {
        try {
            const response = await fetch(this.apiUrl, {
                headers: this.headers,
            });
            const data = await response.json();
            const content = JSON.parse(atob(data.content));
            return content.books || [];
        } catch (error) {
            console.error('Error fetching books:', error);
            return [];
        }
    }

    async saveBooks(books) {
        try {
            // First get the current file to get its SHA
            const currentFile = await fetch(this.apiUrl, {
                headers: this.headers,
            });
            const currentData = await currentFile.json();

            const content = btoa(
                JSON.stringify(
                    {
                        books,
                        lastUpdated: new Date().toISOString(),
                    },
                    null,
                    2,
                ),
            );

            const response = await fetch(this.apiUrl, {
                method: 'PUT',
                headers: this.headers,
                body: JSON.stringify({
                    message: `Update books data - ${new Date().toISOString()}`,
                    content: content,
                    sha: currentData.sha,
                }),
            });

            return response.ok;
        } catch (error) {
            console.error('Error saving books:', error);
            return false;
        }
    }
}
