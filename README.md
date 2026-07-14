# ⏱️ Time Complexity Analyzer VS Code Extension

[![VS Code Extension Version](https://img.shields.io/visual-studio-marketplace/v/PraveenT.time-complexity-analyzer.svg?label=Marketplace&color=blue)](https://marketplace.visualstudio.com/items?itemName=PraveenT.time-complexity-analyzer)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/PraveenT.time-complexity-analyzer.svg)](https://marketplace.visualstudio.com/items?itemName=PraveenT.time-complexity-analyzer)
[![Rating](https://img.shields.io/visual-studio-marketplace/r/PraveenT.time-complexity-analyzer.svg)](https://marketplace.visualstudio.com/items?itemName=PraveenT.time-complexity-analyzer)

> Instantly analyze the Big-O time complexity of your code directly inside VS Code. Select a specific code snippet or analyze the entire file with a single keystroke.

---

## 📖 Table of Contents

- [Key Features](#-key-features)
- [Installation](#%EF%B8%8F-installation)
- [How to Use](#-how-to-use)
- [Settings & Customization](#-settings--customization)
- [Architecture & Mechanics](#-architecture--mechanics)
- [Tech Stack](#-tech-stack)
- [Folder Structure](#-folder-structure)
- [Engineering Highlights](#%EF%B8%8F-engineering-highlights)
- [License](#-license)
- [Author](#-author)

---

## 🚀 Key Features

*   **Selected Code Analysis**: Highlight a specific function or block of code to analyze its runtime complexity—no need to analyze the whole file.
*   **Automatic Comment Insertion**: Automatically inserts an inline comment (e.g., `// ⏱ Time Complexity: O(N)`) directly above the first line of your selection or at the top of the file.
*   **Multi-Language Comment Support**: Detects the active language (JavaScript, Python, Go, C++, Java, Rust, etc.) and uses the correct comment symbol (e.g., `#` for Python, `//` for JavaScript, `--` for Lua).
*   **Customizable API Endpoints**: Run your own local backend or specify a custom staging endpoint directly from your VS Code Settings.
*   **Integrated Keybindings**: Fire the analyzer instantly using the `Ctrl+Alt+C` (or equivalent) custom shortcut.

---

## ⚙️ Installation

### Option 1: VS Code Marketplace (Recommended)
1. Open Visual Studio Code.
2. Go to the Extensions view (`Ctrl+Shift+X` or `Cmd+Shift+X` on Mac).
3. Search for **Time Complexity Analyzer** (by PraveenT).
4. Click **Install**.

### Option 2: Manual VSIX Installation
If you are developing locally or running in an offline environment, you can install the compiled `.vsix` package:
1. Download the `.vsix` file from the [Releases](https://github.com/Praveen8760/Time-Complexity-Extension/releases) page.
2. In VS Code, open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`).
3. Search and select: `Extensions: Install from VSIX...`
4. Choose the `time-complexity-analyzer-0.0.1.vsix` file and click **Install**.

---

## 📖 How to Use

1. **Open any code file** in VS Code (e.g., Python, C++, JavaScript).
2. **(Optional)** Select/highlight the specific lines of code you want to analyze. If nothing is selected, the extension will analyze the entire document.
3. Trigger the analysis:
   - **Shortcut**: Press `Ctrl+Alt+C` (or `Cmd+Alt+C` on macOS).
   - **Command Palette**: Press `Ctrl+Shift+P` / `Cmd+Shift+P`, type `Analyze Time Complexity`, and press **Enter**.
4. The extension will show a progress notification while fetching the analysis.
5. Once completed, a VS Code notification will display the Big-O score, and the extension will insert the comment block above your selection:
   ```javascript
   // ⏱ Time Complexity: O(N log N)
   function mergeSort(arr) { ... }
   ```

---

## 🔧 Settings & Customization

You can configure settings for this extension inside the standard VS Code settings editor:

1. Open settings (`Ctrl+,` or `Cmd+,`).
2. Search for **Time Complexity Analyzer**.
3. Customize the properties:

| Setting Key | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `timeComplexityAnalyzer.apiUrl` | `string` | `"https://time-complexity-analyzer-production.up.railway.app/api/analyze"` | The API endpoint URL used to analyze code time complexity. Useful if running a local server. |

---

## 🔍 Architecture & Mechanics

```text
┌──────────────────────────┐         POST /api/analyze         ┌─────────────────────────┐
│   VS Code Workspace      │  ───────────────────────────────>  │  Express API Backend    │
│  (Extension Client)      │  <───────────────────────────────  │  (Railway Production)   │
└──────────────────────────┘        { complexity, explanation } └─────────────────────────┘
```

The extension operates as a lightweight client:
1. **Context Extraction**: Reads the cursor state to extract active selections and language parameters.
2. **REST Call**: Sends a JSON payload to the configured API server.
3. **Structured Response Handling**: Parses the structured JSON returned from the Express server.
4. **Editor Mutation**: Uses the VS Code `TextEditorEdit` APIs to insert the calculated complexity comments asynchronously.

---

## 💻 Tech Stack

- **VS Code Extension API**: Native VS Code environment interfaces.
- **Node.js**: The underlying JavaScript environment.
- **Axios**: Promised-based HTTP client for calling the remote microservice.

---

## 📂 Folder Structure

```text
Time-Complexity-Extension/
├── image/
│   └── logo.jpeg             # Extension icon shown in marketplace
├── test/                     # Extension test configurations
├── extension.js              # Core activation & command registration logic
├── eslint.config.mjs         # Linter configuration
├── jsconfig.json             # JS path configs
├── package.json              # Extension manifest & configuration settings
└── README.md                 # Project Documentation
```

---

## 🛠️ Engineering Highlights

### Selection-Aware Code Parsing
Rather than transmitting massive source files, the extension checks the editor state for a selection:
```javascript
const selection = editor.selection;
const hasSelection = !selection.isEmpty;
const code = hasSelection ? editor.document.getText(selection) : editor.document.getText();
```
This reduces token usage, saves billing cost, and lets developers pinpoint specific code sections (like a single helper function).

### Deterministic Comment Insertion
Comments are placed dynamically at the start line of the selected code or at line `0` if analyzing the entire file. The cursor position is maintained, and comments are prefix-matched to the corresponding language profile.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Praveen T**
*   GitHub: [@Praveen8760](https://github.com/Praveen8760)
