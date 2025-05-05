// サイト設定
const config = {
    // 環境設定
    // デバッグモードの設定
    debugMode: false,

    // 環境設定
    environments: {
        production: {
            domain: 'aki908.github.io',
            basePath: '/homeSuzuki',
            isDebug: false
        },
        production2: {
            domain: 'akihisasa.github.io',
            basePath: '/homeSuzukiProduct',
            isDebug: false
        },
        customDomain: {
            domain: 'www.foodfamily.jp',  // ここに取得したドメインを設定
            basePath: '',  // ルートパスを使用
            isDebug: false
        },
        staging: {
            domain: 'aki908.github.io',
            basePath: '/homeSuzuki',
            isDebug: false
        },
        development: {
            domain: 'localhost',
            basePath: '',
            isDebug: true
        }
    },

    // 現在の環境を判定
    getCurrentEnv() {
        const hostname = window.location.hostname;
        for (const [env, settings] of Object.entries(this.environments)) {
            if (hostname.includes(settings.domain)) {
                return env;
            }
        }
        return 'development'; // デフォルト
    },

    // 環境に応じたベースパスを取得
    getBasePath() {
        const env = this.getCurrentEnv();
        return this.environments[env].basePath;
    },

    // アセットのパスを取得（相対パス用）
    getAssetPath(path) {
        const basePath = this.getBasePath();
        const cleanPath = path.replace(/^\//, '');
        return basePath ? `${basePath}/${cleanPath}` : cleanPath;
    },

    // Web Worker用のフルパスを取得（絶対パス必須）
    getWorkerPath(path) {
        const fullPath = this.getAssetPath(path);
        return `${window.location.origin}${fullPath.startsWith('/') ? '' : '/'}${fullPath}`;
    },

    // デバッグ情報
    debug() {
        console.log('Current Environment:', this.getCurrentEnv());
        console.log('Base Path:', this.getBasePath());
        console.log('Hostname:', window.location.hostname);
    }
};

// HTML内で使用するためにグローバルに公開
window.siteConfig = config;

// 現在のページのベースパスを設定
document.addEventListener('DOMContentLoaded', () => {
    // 現在のパスを取得
    const basePath = config.getBasePath();
    
    // すべてのリンクを修正
    document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        // 外部リンクは除外
        if (!href.startsWith('http') && !href.startsWith('#')) {
            link.href = `${basePath}/${href.replace(/^\//, '')}`;
        }
    });

    // すべてのアセットパスを修正
    document.querySelectorAll('img[src], script[src], link[href]').forEach(element => {
        const attr = element.hasAttribute('src') ? 'src' : 'href';
        const path = element.getAttribute(attr);
        if (!path.startsWith('http')) {
            element.setAttribute(attr, `${basePath}/${path.replace(/^\//, '')}`);
        }
    });

    // 環境情報をコンソールに表示（開発時の確認用）
    if (config.getCurrentEnv() !== 'production') {
        config.debug();
        console.log('Assets path example:', config.getAssetPath('assets/example.js'));
        console.log('Worker path example:', config.getWorkerPath('assets/search-worker.js'));
    }
});
