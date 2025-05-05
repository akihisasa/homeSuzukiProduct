// 検索処理を行うWeb Worker
self.addEventListener('message', function(e) {
    const { products, query } = e.data;
    
    // 検索処理の実行
    const results = products.map(product => {
        const productName = product.name.toLowerCase();
        const productCategory = product.category.toLowerCase();
        const productDescription = product.description.toLowerCase();
        const searchQuery = query.toLowerCase().trim();

        // 商品名、カテゴリー、説明文で検索
        const matchesSearch = productName.includes(searchQuery) ||
                            productCategory.includes(searchQuery) ||
                            productDescription.includes(searchQuery);

        return {
            ...product,
            visible: matchesSearch
        };
    });

    // 結果をメインスレッドに返送
    self.postMessage(results);
});
