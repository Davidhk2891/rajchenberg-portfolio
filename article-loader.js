document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get("slug");

    function escapeHTML(str) {
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    fetch("data/articles.json")
        .then(response => response.json())
        .then(data => {
            const article = data.find(jsonItem => jsonItem.slug === slug);
            if (!article){
                document.getElementById("article-title").textContent = "Article not found";
                return;
            }

            document.getElementById("article-title").textContent = article.title;
            document.getElementById("article-meta").innerHTML = `
                <p>${article.date} • ${article.readTime}</p>
                <div class="article-tags">
                    ${article.tags.map(tag => `<span>${tag}</span>`).join(' ')}
                </div>
            `;
            // Render content as paragraphs, escaping HTML
            const paragraphs = article.content
                .split(/\n\n/)
                .map(p => `<p>${escapeHTML(p.trim())}</p>`)
                .join("");
            document.getElementById("article-content").innerHTML = paragraphs;
        })
        .catch(err => {
            console.error("Error loading article", err);
        });
});