const vscode = require('vscode');
const fs = require('fs');

function activate(context) {
    const BiFunctionPath = context.asAbsolutePath('./vscode/BiFunction.json');
    const boilarplatePath = context.asAbsolutePath('./vscode/boilarplate.json');
    const loopsPath = context.asAbsolutePath('./vscode/loops.json');
    const othersPath = context.asAbsolutePath('./vscode/others.json');
    const variablePath = context.asAbsolutePath('./vscode/variable.json');
    const inputOutputPath = context.asAbsolutePath('./vscode/inputOutput.json');


    const BiFunctionSnippets = JSON.parse(fs.readFileSync(BiFunctionPath, 'utf8'));
    const boilarplateSnippets = JSON.parse(fs.readFileSync(boilarplatePath, 'utf8'));
    const loopsSnippets = JSON.parse(fs.readFileSync(loopsPath, 'utf8'));
    const othersSnippets = JSON.parse(fs.readFileSync(othersPath, 'utf8'));
    const variableSnippets = JSON.parse(fs.readFileSync(variablePath, 'utf8'));
    const inputOutputSnippets = JSON.parse(fs.readFileSync(inputOutputPath, 'utf8'));


    const snippets = {
        ...BiFunctionSnippets,
        ...boilarplateSnippets,
        ...loopsSnippets,
        ...othersSnippets,
        ...variableSnippets,
        ...inputOutputSnippets
    };

    const disposable = vscode.languages.registerCompletionItemProvider('*', {
        provideCompletionItems() {
            const items = [];
            Object.keys(snippets).forEach(key => {
                const snippet = snippets[key];
                const item = new vscode.CompletionItem(snippet.prefix, vscode.CompletionItemKind.Snippet);
                item.insertText = new vscode.SnippetString(snippet.body.join('\n'));
                item.documentation = new vscode.MarkdownString(snippet.description);
                items.push(item);
            });
            return items;
        }
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;