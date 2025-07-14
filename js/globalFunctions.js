// HTMLから呼び出されるグローバル関数を設定

export function setupGlobalFunctions(os) {
    // OSインスタンスをグローバルに保存
    window.os = os;

    // セットアップ完了
    window.completeSetup = function () {
        const username = document.getElementById('username').value;
        const password = document.getElementById('setup-password').value;

        if (username && password) {
            os.setUserData(username, password);
            os.switchScreen('lock');
        } else {
            alert('ユーザー名とパスワードを入力してください');
        }
    }

    // ロック解除
    window.unlock = function () {
        const password = document.getElementById('lock-password').value;

        if (os.checkPassword(password)) {
            os.switchScreen('desktop');
        } else {
            alert('パスワードが間違っています');
            document.getElementById('lock-password').value = '';
        }
    }

    // アプリ起動
    window.launchApp = function (appName) {
        os.launchApp(appName);

        // スタートメニューを閉じる
        const startMenu = document.getElementById('start-menu');
        if (startMenu) {
            startMenu.classList.add('hidden');
        }
    }

    // デスクトップ関数
    window.showSystemInfo = function () {
        os.launchApp('systeminfo');
    }

    window.showTaskManager = function () {
        os.launchApp('taskmanager');
    }

    window.showSettings = function () {
        os.launchApp('settings');
    }

    window.lockScreen = function () {
        os.switchScreen('lock');

        // スタートメニューを閉じる
        const startMenu = document.getElementById('start-menu');
        if (startMenu) {
            startMenu.classList.add('hidden');
        }
    }

    window.shutdownSystem = function () {
        if (confirm('システムをシャットダウンしますか？')) {
            window.location.reload();
        }

        // スタートメニューを閉じる
        const startMenu = document.getElementById('start-menu');
        if (startMenu) {
            startMenu.classList.add('hidden');
        }
    }

    window.toggleStartMenu = function () {
        const startMenu = document.getElementById('start-menu');
        if (startMenu) {
            startMenu.classList.toggle('hidden');
        }
    }
}