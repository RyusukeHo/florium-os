import { WindowManager } from './windowManager.js';
import { AppManager } from './appManager.js';

export class OS {
    constructor() {
        this.currentScreen = 'setup';
        this.windowManager = new WindowManager();
        this.appManager = new AppManager(this);
        this.userData = {
            username: '',
            password: ''
        };
        const img = new Image();
        img.src = '/florium-os/assets/setup-background.jpg';
        img.onload = () => {

            setTimeout(() => {
                document.getElementById('screen-container').classList.remove('booting');
                this.loadScreen('setup');
            }, 2000);
        };
    }

    async loadScreen(screenName) {
        try {
            const response = await fetch(`screens/${screenName}.html`);
            const html = await response.text();
            document.getElementById('screen-container').innerHTML = html;
            this.currentScreen = screenName;

            // ユーザー名の更新（デスクトップとロック画面）
            if (screenName === 'desktop') {
                const startUserName = document.getElementById('start-user-name');
                if (startUserName) {
                    startUserName.textContent = this.userData.username || 'ユーザー';
                }
            }
        } catch (error) {
            console.error(`画面 ${screenName} の読み込みに失敗しました:`, error);
        }
    }

    switchScreen(screenName) {
        this.loadScreen(screenName);
    }

    createWindow(config) {
        return this.windowManager.createWindow(config);
    }

    closeWindow(windowId) {
        this.windowManager.closeWindow(windowId);
        this.appManager.removeApp(windowId);
    }

    launchApp(appName) {
        return this.appManager.launchApp(appName);
    }

    setUserData(username, password) {
        this.userData.username = username;
        this.userData.password = password;

        // ロック画面のユーザー名を更新
        setTimeout(() => {
            const welcomeMessage = document.getElementById('welcome-message');
            if (welcomeMessage) {
                welcomeMessage.textContent = username;
            }
        }, 100);
    }

    checkPassword(password) {
        return password === this.userData.password;
    }

    getUserName() {
        return this.userData.username;
    }
}