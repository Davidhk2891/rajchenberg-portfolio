document.addEventListener("DOMContentLoaded", () => {
    fetch("data/articles.json")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("articles-container");

            data.forEach(article => {
                const articleEl = document.createElement("article");
                articleEl.classList.add("article");

                articleEl.innerHTML = `
                    <h3 class="article-title">${article.title}</h3>
                    <div class="article-metadata">
                        <div class="article-metadata-tags">
                            ${article.tags.map(tag => `<p>${tag}</p>`).join("")}
                        </div>
                        <p class="article-metadata-date">${article.date}</p>
                        <p class="article-metadata-readtime">${article.readTime}</p>                        
                    </div>
                    <p class="article-excerpt">${article.excerpt}</p>
                    <a class="article-link" href="article-template.html?slug=${article.slug}">
                    Read full article <span class="article-arrow">></span>
                    </a>
                `;

                container.appendChild(articleEl);
            });
        })
        .catch(err => {
            console.error("Error loading articles", err);
        });
});