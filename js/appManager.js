import { getAppConfig } from './apps/appConfigs.js';

export class AppManager {
    constructor(os) {
        this.os = os;
        this.runningApps = new Map();
    }

    async launchApp(appName) {
        const config = getAppConfig(appName);
        if (!config) {
            console.error(`アプリ "${appName}" が見つかりません`);
            return null;
        }

        // HTMLファイルからコンテンツを読み込み
        let content = '';
        if (config.htmlFile) {
            try {
                const response = await fetch(config.htmlFile);
                content = await response.text();
            } catch (error) {
                console.error(`アプリ "${appName}" のHTMLファイル読み込みに失敗:`, error);
                content = `<div style="text-align: center; padding: 50px;">
          <h3>❌ アプリの読み込みに失敗しました</h3>
          <p>${config.htmlFile} が見つかりません</p>
        </div>`;
            }
        } else {
            content = config.content || '<div>アプリコンテンツがありません</div>';
        }

        // ウィンドウを作成
        const window = this.os.createWindow({
            title: config.title,
            width: config.width,
            height: config.height,
            content: content
        });

        this.runningApps.set(window.id, {
            name: appName,
            window,
            config
        });

        // アプリ固有の初期化処理があれば実行
        if (config.onLaunch) {
            config.onLaunch(window);
        }

        return window;
    }

    removeApp(windowId) {
        const app = this.runningApps.get(windowId);
        if (app && app.config.onClose) {
            app.config.onClose(app.window);
        }
        this.runningApps.delete(windowId);
    }

    getRunningApps() {
        return Array.from(this.runningApps.values());
    }

    isAppRunning(appName) {
        return Array.from(this.runningApps.values()).some(app => app.name === appName);
    }
}