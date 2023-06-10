import { app, BrowserWindow } from 'electron'
import path from 'node:path'
function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    })

    win.loadFile(path.resolve(__dirname, 'index.html'))
}
function main(): void {
    app.whenReady().then((): void => {
        createWindow()
    })
}

main()