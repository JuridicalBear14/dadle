// The code to place all of the boxes and stuff on screen

// Initialize grid of letters
function buildLetterGrid() {
    // Build a 5x6 grid of letter-box divs, each one should have an id matching its position (ex: 1:1)
    let main = document.getElementById("letter-container")

    // Loop for rows
    for (let i = 0; i < 6; i++) {
        // Build row div
        let r = document.createElement("div")
        r.setAttribute("id", `${i}`)
        r.setAttribute("class", "lb-row")

        // Now create and add letter boxes
        for (let j = 0; j < 5; j++) {
            let b = document.createElement("div")
            b.setAttribute("class", "letter-box")
            b.setAttribute("id", `${i}${j}`)

            r.appendChild(b)
        }

        main.appendChild(r)
    }
}

// Initialize keyboard
function buildKeyboard() {
    // Define rows (easier to just do manually)
    const rows = [
        "qwertyuiop",
        "asdfghjkl",
        "1zxcvbnm2"   // 1 and 2 represent enter and delete respectively
    ]

    let main = document.getElementById("keyboard-container")

    // Loop through rows
    for (let i = 0; i < 3; i++) {
        let r = document.createElement("div")
        r.setAttribute("class", "kb-row")
        r.setAttribute("id", `${i}`)

        // Now create letters
        for (let j = 0; j < rows[i].length; j++) {
            let name = rows[i][j]

            if (name == "1") {
                name = "enter"
            } else if (name == "2") {
                name = "\u2190"
            }

            let b = document.createElement("div")
            b.setAttribute("class", "keyboard-key")
            b.setAttribute("id", `${name}`)
            b.setAttribute("onclick", `keyPress('${name}')`)
            b.innerHTML = name

            // Make the back arrow a little bigger
            if (name == "\u2190") {
                b.style.fontSize = 30
                b.style.width = 40
            }

            // Make enter bigger
            if (name == "enter") {
                b.style.width = 50
                b.style.fontSize = 14
            }

            // TODO: give each one some js code to call corresponding function when clicked

            r.appendChild(b)
        }

        main.appendChild(r)
    }
}

// Build the win/loss popup
function buildWL(win, word) {
    let overlay = document.createElement("div")
    overlay.setAttribute("id", "popup")
    overlay.setAttribute("class", "overlay")

    let wl = document.createElement("div")
    wl.setAttribute("id", "winloss")

    let title = document.createElement("h1")
    title.innerHTML = win ? "You Won!" : "You Lost!"

    let subtext = document.createElement("p")
    subtext.innerHTML = `The Word Was: ${word.toUpperCase()}`

    let button = document.createElement("button")
    button.setAttribute("onclick", "newGame()")
    button.innerHTML = "play again"

    // Now add them all together
    wl.appendChild(title)
    wl.appendChild(subtext)
    wl.appendChild(button)
    overlay.appendChild(wl)

    document.body.appendChild(overlay)
}

// On startup build the ui
buildLetterGrid()
buildKeyboard()