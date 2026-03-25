// PlayZest11 Wallet Utils - Shared across pages

/**
 * Get current wallet balance from localStorage
 * @returns {number} Wallet balance
 */
function getWallet() {
    return parseInt(localStorage.getItem("wallet") || "100");
}

/**
 * Update wallet balance (add/subtract amount)
 * @param {number} amount - Positive to add, negative to subtract
 * @returns {number} New balance
 */
function updateWallet(amount) {
    let wallet = getWallet() + amount;
    if (wallet < 0) wallet = 0;
    localStorage.setItem("wallet", wallet);
    
    // Update all wallet displays on page
    document.querySelectorAll('#wallet, #wallet-balance, #current-balance').forEach(el => {
        if (el.tagName === 'SPAN') el.textContent = wallet;
    });
    
    return wallet;
}

/**
 * Check if sufficient balance for amount
 * @param {number} amount - Amount to check
 * @returns {boolean}
 */
function hasBalance(amount) {
    return getWallet() >= amount;
}

// Logout helper
function logout() {
    localStorage.removeItem("user");
    window.location.href = "index.html";
}

// Export for use in HTML inline scripts if needed
window.PlayZestWallet = {
    getWallet,
    updateWallet,
    hasBalance,
    logout
};

