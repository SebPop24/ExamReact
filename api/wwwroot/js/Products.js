
let currentPage = 1;
const pageSize = 6;

async function toggleView(view) {
    const gridButton = document.getElementById('gridButton');
    const tableButton = document.getElementById('tableButton');
    const contentWrapper = document.getElementById('contentWrapper');
    const viewMoreContainer = document.getElementById('viewMoreContainer');

    // Reset itemsContainer on view change
    contentWrapper.innerHTML = view === 'grid' ? `<div id="itemsContainer"></div>` : '';
    currentPage = 1;

    // Toggle active button style and show "View More" button only for grid view
    if (view === 'grid') {
        gridButton.classList.add('active');
        tableButton.classList.remove('active');
        viewMoreContainer.style.display = 'block';
        await loadMoreItems(true); // Initial load for grid
    } else if (view === 'table') {
        tableButton.classList.add('active');
        gridButton.classList.remove('active');
        viewMoreContainer.style.display = 'none';
        const tableResponse = await fetch('/Item/Table', { headers: { "X-Requested-With": "XMLHttpRequest" } });
        contentWrapper.innerHTML = await tableResponse.text();
    }
    initializeModals();
}

async function loadMoreItems(isInitialLoad = false) {
    if (isInitialLoad) {
        currentPage = 1;
        document.getElementById("itemsContainer").innerHTML = '';
    } else {
        currentPage++;
    }

    const response = await fetch(`/Item/Grid?page=${currentPage}&pageSize=${pageSize}`, { headers: { "X-Requested-With": "XMLHttpRequest" } });
    
    if (response.ok) {
        const data = await response.text();
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(data, "text/html");
        const newItems = htmlDoc.querySelectorAll(".col");

        newItems.forEach(item => document.getElementById("itemsContainer").appendChild(item));

        if (newItems.length < pageSize) {
            document.getElementById("viewMoreContainer").style.display = 'none'; // Hide button if no more items
        }

        initializeModals();
    } else {
        console.error('Error loading more items:', response.statusText);
    }
}

function initializeModals() {
    const modal = document.getElementById("itemModal");
    const span = document.getElementsByClassName("close")[0];

    document.querySelectorAll('.open-modal').forEach(link => {
        link.onclick = function () {
            const itemId = this.getAttribute('data-item-id');
            fetch(`/Item/Details/${itemId}`)
                .then(response => response.text())
                .then(data => {
                    document.getElementById("modalBody").innerHTML = data;
                    modal.style.display = "block";
                })
                .catch(error => console.error('Error loading item details:', error));
        };
    });

    span.onclick = function () { modal.style.display = "none"; };
    window.onclick = function (event) {
        if (event.target === modal) { modal.style.display = "none"; }
    };
}

// Initial load of the grid view with modals set up
toggleView('grid');
