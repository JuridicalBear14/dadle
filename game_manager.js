// The actual game backend code, called by UI stuff
let word = ""   // Solution word the user is looking for
let current_row = 0   // Row we're currently on (aka how many guesses left)

// Fetch total wordlist
async function fetchWordList() {
    const response = await fetch("./all-words.txt")
    const data = await response.text()

    // Now we have the data
    let final = data.split("\n")
    return final
}

// Fetch solution list
async function fetchAnswerWordList() {
    const response = await fetch("./answer-words.txt")
    const data = await response.text()

    // Now we have the data
    let final = data.split("\n")
    return final
}

// Get the game data ready
async function loadData() {
    let wordlist = await fetchWordList()
    let awordlist = await fetchAnswerWordList()

    return [wordlist, awordlist]
}

// Start and play the actual game
function chooseWord() {
    loadData().then(lists => {
        const [wordlist, answerlist] = lists

        let randomIndex = Math.floor(Math.random() * answerlist.length)
        word = answerlist[randomIndex]
    })
}

chooseWord()