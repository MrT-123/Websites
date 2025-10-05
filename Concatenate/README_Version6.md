# Simple Text Concatenator

A completely local, private text concatenation tool that works like a simplified Microsoft Form.

## Features

- **100% Local**: No data sent to any servers or external services
- **Private**: All data stays on your computer
- **Simple Interface**: Easy-to-use input and selection system
- **Text Wrapping**: Proper text wrapping to prevent horizontal scrolling
- **Grid Layout**: 4 columns layout that adapts to screen size
- **Copy Function**: Easy copying of concatenated text
- **Data Management**: Clear all data when finished

## How to Use

1. **Setup**: Save all files (index.html, style.css, script.js) in the same folder
2. **Open**: Double-click `index.html` to open in your web browser
3. **Add Text**: Type text in the input box and click "Add Text"
4. **Select**: Check the boxes next to text you want to concatenate
5. **Copy**: Use "Copy to Clipboard" to copy the result
6. **Clear**: Click "Clear All Data" when finished

## Data Privacy & Storage

### Where Data is Stored
- Uses browser's `localStorage` (stays on your computer)
- No files created outside the project folder
- No network requests or external connections

### How to Ensure Complete Data Removal

1. **Use the Clear Button**: Click "Clear All Data" in the application
2. **Browser Storage**: Clear browser data for the site:
   - Chrome: Settings > Privacy > Clear browsing data > Cookies and site data
   - Firefox: Settings > Privacy > Clear Data > Cookies and Site Data
   - Safari: Develop > Empty Caches, then Safari > Clear History
3. **Delete Files**: Delete the entire project folder when no longer needed

### Verification Steps
- Check that "Clear All Data" shows confirmation message
- Refresh the page - no data should appear
- Open browser developer tools (F12) > Application/Storage > Local Storage - should be empty

## Technical Notes

- **Responsive**: Automatically adjusts to screen size
- **No Dependencies**: Pure HTML, CSS, JavaScript
- **Offline**: Works without internet connection
- **Cross-Browser**: Compatible with modern browsers

## Troubleshooting

**Text not wrapping?**
- The CSS includes `word-wrap: break-word` and `overflow-wrap: break-word`

**Layout issues?**
- The grid uses CSS Grid with responsive breakpoints
- Mobile devices automatically switch to fewer columns

**Data not clearing?**
- Use browser's privacy settings to clear site data manually
- Delete the project folder completely