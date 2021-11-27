const projectName = 'random-quote';
let quotesData;

var colors = [
    'hsla(91,18%,71%,0.59)',
    'hsla(140,70%,46%,0.40)',
    'hsla(328,58%,38%,0.62)',
    'hsla(19,25%,47%,0.83)',
    'hsla(262,63%,77%,0.83)',
    'hsla(227,37%,24%,0.64)',
    'hsla(10,33%,38%,0.42)',
    'hsla(21,62%,65%,0.66)',
    'hsla(190,35%,40%,0.89)',
    'hsla(280,39%,26%,0.66)',
    'hsla(332,80%,50%,0.45)',
    'hsla(299,25%,60%,0.87)'
]

// console.log(colors[Math.floor(Math.random()*colors.length)]);

var currentQuote = '';
var currentAuthor = '';

// fetch API transactions:

function getQuotes(){
    return $.ajax({
        headers:{
            Accept:'application/json'
        },
        url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
        success: function(jsonQuotes){
            if(typeof jsonQuotes === 'string'){
                quotesData = JSON.parse(jsonQuotes);
                /* console.log('quotesData'); */
                /* console.log(quotesData); */
            }
        }
    });
}

function getRandomQuote(){
    return quotesData.quotes[
        Math.floor(Math.random()* quotesData.quotes.length)
    ];
}

function getQuote(){
    let randomQuote = getRandomQuote();

    currentQuote = randomQuote.quote;
    currentAuthor = randomQuote.author;

    $('#tweet-quote').attr(
        'href',
        'https://twitter.com/intent/tweet?hashtags=quotes&related=tugrankenger&text=' +
            encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
    );

    $('#facebook-quote').attr(
        'href',
        'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&src=sdkpreparse' +
            encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
    );

    $('#tumblr-quote').attr(
        'href',
        'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,tugrankenger&caption=' +
        encodeURIComponent(currentAuthor) +
        '&content=' +
        encodeURIComponent(currentQuote) +
        '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'
    );

    $('.quote-text').animate({opacity:0},500, function(){
        $(this).animate({opacity:1},500);
        $('#text').text(randomQuote.quote);
    });

    $('.quote-author').animate({opacity:0},500, function(){
        $(this).animate({opacity:1},500);
        $('#author').html(randomQuote.author);
    });

    var randomColor = Math.floor(Math.random()*colors.length);
    $('html body').animate({
        backgroundColor: colors[randomColor],
        color:colors[randomColor]
    },1000);

    $('.button').animate({
        backgroundColor: colors[randomColor]
    },1000);
}

$(document).ready(function(){
    getQuotes().then(() =>{
        getQuote();
    });

    $('#new-quote').on('click',getQuote);
});