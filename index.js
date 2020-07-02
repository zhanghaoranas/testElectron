const { app, BrowserWindow, Menu, globalShortcut } = require('electron');
const { autoUpdater } = require("electron-updater")
const path = require('path');

function createWindow() {
	// 创建浏览器窗口
	let win = new BrowserWindow({
		width: 800,
		height: 600,
		icon: path.join(__dirname, 'static/icon/favicon.ico'),
		show: false,
		title: 'e+系统',
	});
	// 设置窗口最大化。
	win.maximize();
	win.show();
	// 加载index.html文件
	// win.loadFile('index.html');

	let contents = win.webContents;
	contents
		.loadURL('http://newerp.my012.com')
		.then(res => { })
		.catch(err => {
			contents.loadURL('http://newerp.sosozhaofang.com');
		});
	// F11 全屏控制。
	globalShortcut.register('F11', () => {
		const flag = win.isFullScreen();
		win.setFullScreen(!flag);
	});
	//忽略缓存强制刷新页面 。
	globalShortcut.register('Ctrl+F5', () => {
		win.webContents.reloadIgnoringCache();
	});
	// 如果没有打包则可以调用debug；
	if (!app.isPackaged) {
		globalShortcut.register('CommandOrControl+Alt+i', function () {
			win.webContents.openDevTools()
		});
	}
}
const windMenu = []
app.whenReady().then(() => {
	// 设置菜单部分
	const menu = Menu.buildFromTemplate(windMenu);
	Menu.setApplicationMenu(menu);
	createWindow();
	autoUpdater.checkForUpdatesAndNotify();
});
