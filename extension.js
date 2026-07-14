const vscode = require('vscode');
const axios = require('axios');

// Get the appropriate comment symbol based on the language
function getCommentSymbol(languageId) {
    const commentSymbols = {
        javascript: '//',
        typescript: '//',
        python: '#',
        java: '//',
        c: '//',
        cpp: '//',
        csharp: '//',
        ruby: '#',
        go: '//',
        php: '//',
        rust: '//',
        kotlin: '//',
        swift: '//',
        r: '#',
        shellscript: '#',
        perl: '#',
        lua: '--'
    };
    return commentSymbols[languageId] || '//';
}

function activate(context) {
    vscode.window.showInformationMessage('✅ Time Complexity Analyzer Activated');

    let disposable = vscode.commands.registerCommand('time-complexity-analyzer.analyzeCode', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('No active editor');
            return;
        }

        const selection = editor.selection;
        const hasSelection = !selection.isEmpty;
        const code = hasSelection ? editor.document.getText(selection) : editor.document.getText();

        if (!code || code.trim().length === 0) {
            vscode.window.showWarningMessage('No code selected or found in the editor.');
            return;
        }

        const language = editor.document.languageId;
        const commentSymbol = getCommentSymbol(language);

        // Fetch custom API URL from configurations
        const config = vscode.workspace.getConfiguration('timeComplexityAnalyzer');
        const apiUrl = config.get('apiUrl') || 'https://time-complexity-analyzer-production.up.railway.app/api/analyze';

        vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: hasSelection ? 'Analyzing Selected Code...' : 'Analyzing Code...',
            cancellable: false
        }, async () => {
            try {
                const res = await axios.post(apiUrl, {
                    code,
                    language
                });

                const complexity = res.data.complexity;
                if (complexity && complexity !== 'Unknown' && complexity !== 'Error') {
                    const comment = `${commentSymbol} ⏱ Time Complexity: ${complexity}`;
                    
                    // Insert comment at start of selection or top of the file
                    const insertLine = hasSelection ? selection.start.line : 0;
                    editor.edit(editBuilder => {
                        editBuilder.insert(new vscode.Position(insertLine, 0), comment + '\n');
                    });
                    vscode.window.showInformationMessage(`📊 Time Complexity: ${complexity}`);
                } else {
                    const errorMsg = res.data.explanation || "Couldn't extract time complexity.";
                    vscode.window.showWarningMessage(`Could not analyze code complexity: ${errorMsg}`);
                }

            } catch (err) {
                vscode.window.showErrorMessage("❌ Error analyzing code: " + err.message);
            }
        });
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
