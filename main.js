const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
        icon: path.join(__dirname, 'assets/DfKLinus.png') // Main window and taskbar icon
    });

    win.loadFile('index.html');
    win.setMenuBarVisibility(false);

    // Show a custom icon in the popup dialog after the window is loaded
    win.webContents.on('did-finish-load', () => {
        dialog.showMessageBox(win, {
            type: 'error',
            title: 'Error',
            message: 'DFK video app not accessible on this laptop. RTX recommendable for the professional application.',
            icon: path.join(__dirname, 'assets/DfKLinus.png'), // Custom icon for the dialog
        }).then(() => {
            app.quit(); // Exit the application after the dialog is closed
        });
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
