const appConfigs = {
    calculator: {
        title: '電卓',
        width: 300,
        height: 400,
        htmlFile: 'apps/calculator/index.html'
    },

    notepad: {
        title: 'メモ帳',
        width: 500,
        height: 400,
        htmlFile: 'apps/notepad/index.html'
    },

    filemanager: {
        title: 'ファイルマネージャー',
        width: 600,
        height: 400,
        htmlFile: 'apps/filemanager/index.html'
    },

    systeminfo: {
        title: 'システム情報',
        width: 450,
        height: 350,
        htmlFile: 'apps/systeminfo/index.html'
    },

    taskmanager: {
        title: 'タスクマネージャー',
        width: 500,
        height: 400,
        htmlFile: 'apps/taskmanager/index.html'
    },

    settings: {
        title: '設定',
        width: 600,
        height: 500,
        htmlFile: 'apps/settings/index.html'
    }
};

export function getAppConfig(appName) {
    return appConfigs[appName] || null;
}

export function getAllAppNames() {
    return Object.keys(appConfigs);
}