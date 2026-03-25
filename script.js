// Mock data for matches and payments
let matches = [
    {
        id: 1,
        team1: 'India',
        team2: 'Australia',
        team1Flag: '🇮🇳',
        team2Flag: '🇦🇺',
        date: '2024-10-15 14:00',
        type: 'international',
        format: 'ODI',
        status: 'upcoming'
    },
    {
        id: 2,
        team1: 'CSK',
        team2: 'MI',
        team1Flag: '🦁',
        team2Flag: '🔥',
        date: '2024-10-20 19:30',
        type: 'ipl',
        format: 'T20',
        status: 'upcoming'
    },
    {
        id: 3,
        team1: 'England',
        team2: 'Pakistan',
        team1Flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
        team2Flag: '🇵🇰',
        date: '2024-10-25 10:30',
        type: 'international',
        format: 'T20',
        status: 'upcoming'
    },
    // Add more mock matches
];

let paymentMethods = [
    {
        id: 1,
        type: 'card',
        last4: '4242',
        name: 'John Doe'
    },
    {
        id: 2,
        type: 'upi',
        id: 'john@paytm'
    }
];

let currentFilter = 'all';

// DOM elements
const matchesList = document.getElementById('matches-list');
const matchModal = document.getElementById('match-modal');
const paymentModal = document.getElementById('payment-modal');
const paymentList = document.getElementById('payment-list');
const paymentForm = document.getElementById('payment-form');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderMatches();
    renderPayments();
    setupFilters();
    setupModals();
    startAutoUpdate();
});

// Render matches
function renderMatches(filteredMatches = matches) {
    matchesList.innerHTML = '';
    filteredMatches.forEach(match => {
        const matchCard = createMatchCard(match);
        matchesList.appendChild(matchCard);
    });
}

// Create match card
function createMatchCard(match) {
    const card = document.createElement('div');
    card.className = 'match-card';
    card.onclick = () => openMatchModal(match);
    card.innerHTML = `
        <div class="match-teams">
            <div class="team">
                <div class="team-flag">${match.team1Flag}</div>
                <div class="team-name">${match.team1}</div>
            </div>
            <div class="team">
                <div class="team-flag">${match.team2Flag}</div>
                <div class="team-name">${match.team2}</div>
            </div>
        </div>
        <div class="match-details">
            <div class="match-time">${new Date(match.date).toLocaleString()}</div>
            <span class="match-type">${match.format.toUpperCase()}</span>
            <button class="join-contest">Join Contest</button>
        </div>
    `;
    return card;
}

// Filter matches
function setupFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.filter-btn.active').classList.remove('active');
            btn.classList.add('active');
            currentFilter = btn.dataset.type;
            const filtered = matches.filter(m => 
                currentFilter === 'all' || m.type === currentFilter
            );
            renderMatches(filtered);
        });
    });
}

// Modals
function setupModals() {
    // Match modal close
    document.querySelector('#match-modal .close').onclick = () => {
        matchModal.style.display = 'none';
    };

    // Payment modal close
    document.querySelector('#payment-modal .close').onclick = () => {
        paymentModal.style.display = 'none';
    };

    window.onclick = (e) => {
        if (e.target.classList.contains('modal')) {
            matchModal.style.display = 'none';
            paymentModal.style.display = 'none';
        }
    };

    // Payment form
    paymentForm.onsubmit = (e) => {
        e.preventDefault();
        addPaymentMethod();
    };
}

function openMatchModal(match) {
    document.getElementById('modal-body').innerHTML = `
        <h2>${match.team1} vs ${match.team2}</h2>
        <p>${match.format} Match - ${new Date(match.date).toLocaleString()}</p>
        <div style="margin: 2rem 0;">
            <h3>Create Your Dream Team</h3>
            <p>Player selection, captain, vice-captain, etc.</p>
            <button style="background: #28a745; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">Create Team</button>
        </div>
    `;
    matchModal.style.display = 'block';
}

function openPaymentModal() {
    paymentModal.style.display = 'block';
}

function addPaymentMethod() {
    const type = document.getElementById('method-type').value;
    const detail = document.getElementById('payment-detail').value;
    const name = document.getElementById('payment-name').value;

    const method = {
        id: Date.now(),
        type,
        detail: detail.substring(-4), // last 4
        name
    };

    paymentMethods.push(method);
    renderPayments();
    paymentModal.style.display = 'none';
    paymentForm.reset();
}

function renderPayments() {
    paymentList.innerHTML = '';
    paymentMethods.forEach(method => {
        const card = document.createElement('div');
        card.className = 'payment-card';
        card.innerHTML = `
            <div>
                <i class="fas ${method.type === 'card' ? 'fa-credit-card' : 'fa-mobile-alt'} payment-icon"></i>
                <span>${method.type.toUpperCase()}: **** ${method.detail || method.id}</span>
            </div>
            <button onclick="removePayment(${method.id})" style="background: none; border: none; color: #dc3545; cursor: pointer;">
                <i class="fas fa-trash"></i>
            </button>
        `;
        paymentList.appendChild(card);
    });
}

function removePayment(id) {
    paymentMethods = paymentMethods.filter(m => m.id !== id);
    renderPayments();
}

// Auto update matches (mock API)
function startAutoUpdate() {
    setInterval(() => {
        // Simulate new matches or updates
        console.log('Updating matches from API...');
        // In real: fetch('https://api.cricketschedule.com/matches')
        // For demo, add random match
        if (Math.random() > 0.7) {
            matches.unshift({
                id: Date.now(),
                team1: 'RCB',
                team2: 'RR',
                team1Flag: '🔴',
                team2Flag: '🟡',
                date: new Date(Date.now() + 86400000).toISOString(),
                type: 'ipl',
                format: 'T20',
                status: 'upcoming'
            });
            renderMatches(matches.filter(m => currentFilter === 'all' || m.type === currentFilter));
        }
    }, 30000); // Every 30 seconds
}

function scrollToMatches() {
    document.getElementById('matches').scrollIntoView({ behavior: 'smooth' });
}

// Smooth scroll for nav
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        document.querySelector('.nav-link.active').classList.remove('active');
        link.classList.add('active');
    });
});
