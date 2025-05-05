document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const productsGrid = document.getElementById('productsGrid');
    const productCards = document.querySelectorAll('.product-card');

    // Web Workerの初期化（フルパスで解決）
    const workerPath = window.siteConfig.getWorkerPath('assets/search-worker.js');
    let searchWorker;
    
    try {
        searchWorker = new Worker(workerPath);
        console.log('Worker successfully initialized with path:', workerPath);
    } catch (error) {
        console.error('Failed to initialize Worker:', error);
        console.log('Attempted Worker path:', workerPath);
        return; // Worker初期化失敗時は処理を中断
    }

    // 商品データの初期化（シリアライズ可能なデータのみ）
    const products = Array.from(productCards).map(card => ({
        id: card.getAttribute('data-id') || Array.from(productCards).indexOf(card).toString(),
        name: card.getAttribute('data-name'),
        category: card.getAttribute('data-category'),
        description: card.querySelector('p').textContent
    }));

    // 検索結果の処理
    searchWorker.addEventListener('message', function(e) {
        const results = e.data;
        
        // UIの更新を一括で行う
        requestAnimationFrame(() => {
            // 全カードを非表示にリセット
            productCards.forEach(card => {
                card.style.display = 'none';
                card.style.animation = '';
            });

            // 検索結果に一致するカードのみ表示
            let hasVisibleCards = false;
            results.forEach(result => {
                if (result.visible) {
                    const card = document.querySelector(`[data-id="${result.id}"]`);
                    if (card) {
                        hasVisibleCards = true;
                        card.style.display = 'block';
                        card.style.animation = 'fadeIn 0.5s ease forwards';
                    }
                }
            });

            // 検索結果が0件の場合のメッセージ表示
            const noResultsMessage = document.querySelector('.no-results-message');
            if (!hasVisibleCards && searchInput.value.trim() !== '') {
                if (!noResultsMessage) {
                    const message = document.createElement('p');
                    message.className = 'no-results-message';
                    message.textContent = '一致する商品が見つかりませんでした。';
                    message.style.textAlign = 'center';
                    message.style.padding = '2rem';
                    message.style.color = '#666';
                    productsGrid.appendChild(message);
                }
            } else if (noResultsMessage) {
                noResultsMessage.remove();
            }
        });
    });

    // 検索の実行（デバウンス処理付き）
    let debounceTimer;
    searchInput.addEventListener('input', function(e) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const query = e.target.value;
            searchWorker.postMessage({
                products: products,
                query: query
            });
        }, 150); // 150ms後に検索を実行
    });

    // Enterキーでのフォーム送信を防止
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    });

    // 検索入力欄の状態管理
    searchInput.addEventListener('input', function() {
        if (this.value) {
            this.classList.add('has-text');
        } else {
            this.classList.remove('has-text');
        }
    });
});
