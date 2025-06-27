# BookGroup Setup Guide

## 🎉 Zero Configuration Required!

Your BookGroup app is ready to use with shared data storage. No setup needed for book club members!

## How It Works

- **Shared Data**: All book club members see the same book list
- **Real-time Updates**: Changes are visible to everyone immediately
- **Offline Support**: Works offline, syncs when back online
- **Zero Setup**: No accounts, API keys, or configuration needed

## For Book Club Members

1. Visit the website URL
2. Start adding and editing books immediately
3. All changes are automatically shared with the group

## Connection Status

The app will show:

- 🟢 **Online**: Connected to shared data
- 🔴 **Offline**: Using local storage only
- 🔄 **Sync button**: Force refresh shared data

## Features

- ✅ Add new books
- ✅ Edit existing books
- ✅ Delete books
- ✅ Filter by reading status
- ✅ Export/import book data
- ✅ Automatic backup to local storage

## Troubleshooting

If you see "Using local storage only":

- Check your internet connection
- Try refreshing the page
- Your changes are still saved locally

## Technical Details

- Uses JSONBin.io public bin for shared storage
- Falls back to localStorage when offline
- No user accounts or authentication required
- Data is publicly readable/writable (perfect for trusted book clubs)
