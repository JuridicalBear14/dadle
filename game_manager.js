// The actual game backend code, called by UI stuff
let target_word = ""   // Solution word the user is looking for
let current_row = 0   // Row we're currently on (aka how many guesses left)
let current_word = ""  // The word the user is currently typing
let all_words = []
let answer_words = []

// Gameplay stuff

// Handle keyboard click
function keyPress(key) {
    // Calculate row and col of next empty space
    let row = current_row
    let col = current_word.length

    // Normal key
    if (key != "enter" && key != "\u2190") {
        // If word already full, do nothing
        if (col == 5) {
            return
        }

        // Otherwise, add to space
        current_word += key

        let box = document.getElementById(`${row}${col}`)
        box.innerHTML = key
        box.style.border = "2px solid #565758"

    } else if (key == "enter") {   // Enter
        // If not full, ignore
        if (col < 5) {
            return
        }

        // Check if word is valid
        if (!all_words.includes(current_word)) {
            return
        }

        // Game logic goes here
        // Game states: 0 wrong, 1 present, 2 right
        let states = [0, 0, 0, 0, 0]

        // Box background colors
        let colors = ["#3a3a3c", "#b59f3b", "#538d4e"]

        for (let i = 0; i < 5; i++) {
            if (target_word[i] == current_word[i]) {   // Correct
                states[i] = 2
            } else if (target_word.includes(current_word[i])) {   // Present
                states[i] = 1
            }
        }

        // Save the current word before clearing to set keyboard colors
        let save = current_word

        // Now update boxes accordingly
        for (let i = 0; i < 5; i++) {
            let color = colors[states[i]]

            setTimeout(() => {
                let box = document.getElementById(`${row}${i}`)
                box.style.backgroundColor = color
                box.style.border = `2px solid ${color}`

                let key = document.getElementById(`${save[i]}`)
                key.style.backgroundColor = color
            }, i * 500)
        }


        // Clear everything
        current_word = ""
        current_row += 1

        // Check for win/loss
        if (states.toString() == "2,2,2,2,2") {  // Elegant? no. Easy? yes
            setTimeout(() => {
                buildWL(true, target_word)
            }, 2800)
        } else if (current_row > 5) {
            setTimeout(() => {
                buildWL(false, target_word)
            }, 2800)
        }

    } else {   // Backspace
        // If nothing, ignore
        if (col == 0) {
            return
        }

        current_word = current_word.slice(0, col - 1)
        col -= 1

        let box = document.getElementById(`${row}${col}`)
        box.innerHTML = ""
        box.style.border = "2px solid #3a3a3c"
    }
}



// Setup stuff

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

// Choose the target word (given a list of options)
function chooseWord(answerlist) {
    let randomIndex = Math.floor(Math.random() * answerlist.length)
    target_word = answerlist[randomIndex]
    console.log(target_word)
}

// Clear everything and start a new game
function newGame() {
    // Delete keyboard (faster than resetting)
    let k = document.getElementById("keyboard-container")
    k.innerHTML = ""
    
    // Delete letter boxes
    let l = document.getElementById("letter-container")
    l.innerHTML = ""

    // Delete popups
    let p = document.getElementById("popup")
    if (p != null) {
        p.remove()
    }
    
    // Reset game vars
    target_word = ""
    current_word = ""
    current_row = 0

    // Choose new word
    chooseWord(answer_words)

    // Rebuild UI
    buildKeyboard()
    buildLetterGrid()
}

loadData().then(lists => {
    const [wordlist, answerlist] = lists
    all_words = wordlist
    answer_words = answerlist

    chooseWord(answerlist)
})