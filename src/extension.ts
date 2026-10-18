import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const command = vscode.commands.registerCommand(
        'code-stats.showStats',
        () => {
            const editor = vscode.window.activeTextEditor;

            if (editor === undefined) {
                vscode.window.showWarningMessage('Откройте файл, чтобы посмотреть статистику.');
                return;
            }

            const text = editor.document.getText();
            const lines = text.split('\n');
            let emptyLines = 0;
            let words = 0;

            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();

                if (line === '') {
                    emptyLines++;
                } else {
                    words += line.split(/\s+/).length;
                }
            }

            const totalLines = lines.length;
            const nonEmptyLines = totalLines - emptyLines;
            const characters = text.length;
            const message = `Строк: ${totalLines} | Пустых строк: ${emptyLines} | Непустых строк: ${nonEmptyLines} | Слов: ${words} | Символов: ${characters}`;

            vscode.window.showInformationMessage(message, { modal: true });
        }
    );

    context.subscriptions.push(command);
}

export function deactivate() {}
