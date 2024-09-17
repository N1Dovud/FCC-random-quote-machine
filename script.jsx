const { useState, useEffect } = React;
const { render } = ReactDOM;

const randomColorGenerator = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    document.documentElement.style.setProperty("--main-color", color);
}
function  Quote() {
    const [text, setText] = useState("");
    const [author, setAuthor] = useState("");
    const [href, setHref ] = useState("https://twitter.com/");
    const getRandomQuote =  async () => {
        try
        {
            randomColorGenerator();
            const response = await fetch("https://quotes-api-self.vercel.app/quote");
            if (response.ok) {
            const quote = await response.json();
            setText(quote.quote);
            setAuthor(quote.author);
            setHref(`https://twitter.com/intent/tweet?text=${encodeURIComponent(quote.quote)}`);
            } else{
                console.log("Failed to get a quote", response);
                setText("I could not get the quote");
                setAuthor("Sorry!");
            }
        } catch (err) {
            console.log(`Error: ${err.message}`);
            setText("Something quite did not work!");
            setAuthor("Maybe trying again will help?");
        }
    }
    useEffect(() => {
        getRandomQuote();
    }, []);
    return (
    <div id="quote-box">
        <p id="text"><i className="fa fa-quote-left"></i>{text}</p>
        <h2 id="author"><span>-</span>{author}</h2>
        <section>
            <a id="tweet-quote" href={href}><i className="bgcolor fab fa-twitter"></i></a>
            <button onClick={getRandomQuote} id="new-quote">New quote</button>
        </section>
    </div>
    )
}

ReactDOM.render(<Quote />, document.querySelector("#root"));