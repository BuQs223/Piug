// ========================================
// SEARCH.JS - Search Functionality
// ========================================

class SearchFilter {
    constructor(searchInputId, targetContainerId) {
        this.searchInput = document.getElementById(searchInputId);
        this.targetContainer = document.getElementById(targetContainerId);
        this.items = [];

        if (this.searchInput && this.targetContainer) {
            this.init();
        }
    }

    init() {
        // Get all searchable items (cards)
        this.items = Array.from(this.targetContainer.querySelectorAll('.card'));

        // Add event listener
        this.searchInput.addEventListener('input', (e) => {
            this.performSearch(e.target.value);
        });

        // Clear button (optional)
        const clearBtn = document.querySelector('.search-clear');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                this.searchInput.value = '';
                this.performSearch('');
            });
        }
    }

    performSearch(query) {
        const searchTerm = query.toLowerCase().trim();
        let visibleCount = 0;

        this.items.forEach(item => {
            const searchableText = this.getSearchableText(item);
            const matches = searchableText.includes(searchTerm);

            if (matches || searchTerm === '') {
                item.style.display = '';
                item.classList.add('fade-in-up');
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });

        // Show/hide no results message
        this.updateNoResultsMessage(visibleCount, searchTerm);
    }

    getSearchableText(item) {
        // Get text from title, description, and badges
        const title = item.querySelector('.card-title')?.textContent || '';
        const text = item.querySelector('.card-text')?.textContent || '';
        const badges = Array.from(item.querySelectorAll('.badge'))
            .map(badge => badge.textContent)
            .join(' ');

        return `${title} ${text} ${badges}`.toLowerCase();
    }

    updateNoResultsMessage(count, query) {
        let noResultsMsg = this.targetContainer.querySelector('.no-results');

        if (count === 0 && query !== '') {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.className = 'no-results';
                noResultsMsg.innerHTML = `
          <div style="text-align: center; padding: 3rem;">
            <i class="fas fa-search" style="font-size: 3rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
            <h3>No results found</h3>
            <p>Try adjusting your search terms or browse all restaurants.</p>
          </div>
        `;
                this.targetContainer.appendChild(noResultsMsg);
            }
            noResultsMsg.style.display = 'block';
        } else if (noResultsMsg) {
            noResultsMsg.style.display = 'none';
        }
    }
}

// Initialize search on specific pages
document.addEventListener('DOMContentLoaded', () => {
    // For restaurants page
    if (document.getElementById('restaurantSearch')) {
        new SearchFilter('restaurantSearch', 'restaurantGrid');
    }

    // For home page
    if (document.getElementById('homeSearch')) {
        new SearchFilter('homeSearch', 'featuredRestaurants');
    }
});
