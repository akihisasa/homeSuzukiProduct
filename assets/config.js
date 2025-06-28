// サイト設定
const config = {
    // 環境設定
    // デバッグモードの設定
    debugMode: false,

    // 環境設定
    environments: {
        production: {
            domain: 'www.uumaizing.com',  // ここに取得したドメインを設定
            basePath: '',  // ルートパスを使用
            isDebug: false
        },
        production2: {
            domain: 'akihisasa.github.io',
            basePath: '/homeSuzukiProduct',
            isDebug: false
        },
        customDomain: {
            domain: 'www.uumaizing.com',  // ここに取得したドメインを設定
            basePath: '',  // ルートパスを使用
            isDebug: false
        },
        staging: {
            domain: 'aki908.github.io',
            basePath: '/homeSuzuki',
            isDebug: true
        },
        development: {
            domain: 'localhost',
            basePath: '',
            isDebug: true
        }
    },

    // 現在の環境を判定
    getCurrentEnv() {
        // URLパラメータでの環境指定をチェック
        const urlParams = new URLSearchParams(window.location.search);
        const envParam = urlParams.get('env');
        if (envParam && this.environments[envParam]) {
            return envParam;
        }
        
        // ローカルストレージでの環境指定をチェック
        const storedEnv = localStorage.getItem('uumaizing_env');
        if (storedEnv && this.environments[storedEnv]) {
            return storedEnv;
        }
        
        // ホスト名ベースでの判定
        const hostname = window.location.hostname;
        
        // 各環境を明確に判定
        if (hostname.includes('www.uumaizing.com')) {
            return 'production';
        }
        if (hostname.includes('akihisasa.github.io')) {
            return 'production2';
        }
        if (hostname.includes('aki908.github.io')) {
            return 'staging';
        }
        if (hostname.includes('localhost')) {
            return 'development';
        }
        
        return 'development'; // デフォルト
    },

    // 環境を手動設定する関数（デバッグ用）
    setEnvironment(env) {
        if (this.environments[env]) {
            localStorage.setItem('uumaizing_env', env);
            console.log(`Environment set to: ${env}`);
            location.reload();
        } else {
            console.error(`Invalid environment: ${env}`);
        }
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
        const urlParams = new URLSearchParams(window.location.search);
        const storedEnv = localStorage.getItem('uumaizing_env');
        
        console.log('=== Environment Debug Info ===');
        console.log('Current Environment:', this.getCurrentEnv());
        console.log('Base Path:', this.getBasePath());
        console.log('Hostname:', window.location.hostname);
        console.log('URL Param "env":', urlParams.get('env'));
        console.log('Stored Environment:', storedEnv);
        console.log('Current URL:', window.location.href);
        console.log('==============================');
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
        console.log('\n環境切り替え方法:');
        console.log('window.siteConfig.setEnvironment("staging") - staging環境に切り替え');
        console.log('window.siteConfig.setEnvironment("production") - production環境に切り替え');
        console.log('window.siteConfig.setEnvironment("development") - development環境に切り替え');
    }
});
