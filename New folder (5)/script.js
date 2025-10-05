class TextConcatenator {
    constructor() {
        this.textItems = [];
        this.init();
        this.loadData();
    }

    init() {
        // Get DOM elements
        this.textInput = document.getElementById('textInput');
        this.addButton = document.getElementById('addText');
        this.clearButton = document.getElementById('clearAll');
        this.textGrid = document.getElementById('textGrid');
        this.output = document.getElementById('output');
        this.copyButton = document.getElementById('copyOutput');

        // Add event listeners
        this.addButton.addEventListener('click', () => this.addText());
        this.clearButton.addEventListener('click', () => this.clearAllData());
        this.copyButton.addEventListener('click', () => this.copyToClipboard());
        
        // Allow Enter key to add text (Ctrl+Enter for new line)
        this.textInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.ctrlKey) {
                e.preventDefault();
                this.addText();
            }
        });
    }

    addText() {
        const text = this.textInput.value.trim();
        if (text === '') {
            alert('Please enter some text first.');
            return;
        }

        // Check if text already exists
        if (this.textItems.some(item => item.text === text)) {
            alert('This text already exists in your collection.');
            return;
        }

        // Add text to collection
        const newItem = {
            id: Date.now(),
            text: text,
            selected: false
        };

        this.textItems.push(newItem);
        this.textInput.value = '';
        this.saveData();
        this.renderGrid();
        this.updateOutput();
    }

    renderGrid() {
        this.textGrid.innerHTML = '';

        this.textItems.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = `text-item ${item.selected ? 'selected' : ''}`;
            
            const label = document.createElement('label');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = item.selected;
            checkbox.addEventListener('change', () => this.toggleSelection(item.id));
            
            const textContent = document.createElement('span');
            textContent.className = 'text-content';
            textContent.textContent = item.text;
            
            label.appendChild(checkbox);
            label.appendChild(textContent);
            itemDiv.appendChild(label);
            
            // Add delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '×';
            deleteBtn.style.cssText = 'background: #dc3545; color: white; border: none; border-radius: 50%; width: 20px; height: 20px; font-size: 12px; cursor: pointer; margin-left: 5px; flex-shrink: 0;';
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.deleteItem(item.id);
            });
            label.appendChild(deleteBtn);
            
            this.textGrid.appendChild(itemDiv);
        });
    }

    toggleSelection(id) {
        const item = this.textItems.find(item => item.id === id);
        if (item) {
            item.selected = !item.selected;
            this.saveData();
            this.renderGrid();
            this.updateOutput();
        }
    }

    deleteItem(id) {
        if (confirm('Are you sure you want to delete this text item?')) {
            this.textItems = this.textItems.filter(item => item.id !== id);
            this.saveData();
            this.renderGrid();
            this.updateOutput();
        }
    }

    updateOutput() {
        const selectedTexts = this.textItems
            .filter(item => item.selected)
            .map(item => item.text);
        
        this.output.value = selectedTexts.join('\n\n');
    }

    copyToClipboard() {
        this.output.select();
        this.output.setSelectionRange(0, 99999); // For mobile devices
        
        try {
            document.execCommand('copy');
            alert('Text copied to clipboard!');
        } catch (err) {
            alert('Failed to copy text. Please select and copy manually.');
        }
    }

    saveData() {
        try {
            localStorage.setItem('textConcatenatorData', JSON.stringify(this.textItems));
        } catch (e) {
            console.warn('Could not save to localStorage:', e);
        }
    }

    loadData() {
        try {
            const saved = localStorage.getItem('textConcatenatorData');
            if (saved) {
                this.textItems = JSON.parse(saved);
                this.renderGrid();
                this.updateOutput();
            }
        } catch (e) {
            console.warn('Could not load from localStorage:', e);
            this.textItems = [];
        }
    }

    clearAllData() {
        if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
            this.textItems = [];
            localStorage.removeItem('textConcatenatorData');
            this.renderGrid();
            this.updateOutput();
            this.textInput.value = '';
            alert('All data has been cleared successfully!');
        }
    }
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TextConcatenator();
});