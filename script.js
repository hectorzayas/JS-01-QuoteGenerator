const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

let quotesOrigin;

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show new Quote
function newQuote(jsonOrigin) {
    loading();
    // Pick a random quote from apiQuotes array
    const quote = jsonOrigin[Math.floor(Math.random() * jsonOrigin.length)];
    // Check if Author field is empty and replace it with 'Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // Check Quote Length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes From API
async function getQuotes() {
    loading();
    const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'

    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        quotesOrigin = apiQuotes;
        newQuote(quotesOrigin);

        // const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        // const targetUrl = 'https://zenquotes.io/api/random';
        // const response = await fetch(proxyUrl + targetUrl);
        // const altQuote = await response.json();
    } catch (error) {
        quotesOrigin = localQuotes;
        newQuote(quotesOrigin);
    }

}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', () => newQuote(quotesOrigin));
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();
