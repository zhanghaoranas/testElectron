const { app, BrowserWindow, Menu, globalShortcut } = require('electron');
const path = require('path');

function createWindow() {
	// 创建浏览器窗口
	let win = new BrowserWindow({
		width: 800,
		height: 600,
		icon: path.join(__dirname, 'static/icon/favicon.ico'),
		show: false,
		title: '',
	});
	// 设置窗口最大化。
	win.maximize();
	win.show();
	// 加载index.html文件
	// win.loadFile('index.html');

	let contents = win.webContents;
	contents
		.loadURL('http://newerp.my012.com')
		.then(res => {})
		.catch(err => {
			contents.loadURL('http://newerp.sosozhaofang.com');
		});

	// 不需要title
	win.on('page-title-updated', function (event) {
		event.preventDefault();
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
}

app.whenReady().then(() => {
	// 设置菜单部分
	const menu = Menu.buildFromTemplate([]);
	Menu.setApplicationMenu(menu);
	createWindow();
});
