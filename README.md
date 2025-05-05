# FOOD FAMILYホームページ

シンプルな食品スーパーの紹介サイトです。GitHub Pagesでホストされる静的ウェブサイトです。

## ディレクトリ構造

```
│── index.html               // トップページ
│── kitchen.html            // キッチン用品一覧
│── foods.html           // 食品・調味料
│── daily-necessities.html  // 日用品一覧
│── notImplemented.html     // 準備中ページ
│── assets/
│   │── styles.css         // 共通スタイル
│   │── kitchen-styles.css // キッチンページ用スタイル
│   │── search.js         // 検索機能
│   │── search-worker.js  // 検索用Web Worker
│   │── constants.js      // 共通定数
│   │── config.js        // サイト設定
│   │── menu.js         // メニュー機能
│   │── image-loader.js // 画像最適化
│   │── images/
│       │── logo.webp   // サイトロゴ
│── README.md
```

## 技術スタック

- HTML5
- CSS3
- GitHub Pages（ホスティング）

## ローカル開発環境

### 必要条件
- Python（ローカルサーバー用）

### 起動方法

1. ローカルサーバーを起動：
```bash
python -m http.server 8000
```

2. ブラウザで以下のURLにアクセス：
```
http://localhost:8000
```

※注意: 直接HTMLファイルをブラウザで開くと一部機能が動作しません。必ずローカルサーバーを使用してください。

### サーバーの停止方法
コマンドプロンプトで `Ctrl+C` を押してサーバーを停止できます。
