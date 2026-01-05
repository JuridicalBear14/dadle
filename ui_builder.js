// The code to place all of the boxes and stuff on screen

// Box background colors
let colors = ["#3a3a3c", "#b59f3b", "#538d4e"]

// Initialize grid of letters
function buildLetterGrid() {
    // Build a 5x6 grid of letter-box divs, each one should have an id matching its position (ex: 1:1)
    let main = document.getElementById("letter-container")

    // Extract data for prefill
    let current_word = game_state["current_word"]
    let history = game_state["word_history"]
    let current_row = game_state["current_row"]

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

            // If in history, prefill
            if (i < current_row) {
                // In history, so add and figure out colors
                b.innerHTML = history[(i * 10) + j]
                
                b.style.backgroundColor = colors[history[(i * 10) + j + 5]]   // I don't even want to talk about it
                b.style.border = `2px solid ${colors[history[(i * 10) + j + 5]]}`

                // Also set keyboard keys
                let key = document.getElementById(`${history[(i * 10) + j]}`)

                // Don't overwrite green keys with yellows
                if (!(window.getComputedStyle(key).backgroundColor == "rgb(83, 141, 78)")) {
                    key.style.backgroundColor = colors[history[(i * 10) + j + 5]]
                }
            } else if (i == current_row && current_word != "") {
                // Is there a letter in our ix
                if (j < current_word.length) {
                    b.innerHTML = current_word[j]
                }
            }

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
    // Disable the keyboard
    DISABLE_KEYBOARD = true

    let overlay = document.createElement("div")
    overlay.setAttribute("id", "popup")
    overlay.setAttribute("class", "overlay")

    let wl = document.createElement("div")
    wl.setAttribute("id", "winloss")

    let title = document.createElement("h1")
    title.innerHTML = win ? "You Won!" : "You Lost!"

    let subtext = document.createElement("p")
    subtext.innerHTML = `The Word Was: ${word.toUpperCase()}`

    let view = document.createElement("button")
    view.setAttribute("onclick", "deletePopups()")
    view.innerHTML = "view game"

    let button = document.createElement("button")
    button.setAttribute("onclick", "newGame()")
    button.innerHTML = "play again"

    // Now add them all together
    wl.appendChild(title)
    wl.appendChild(subtext)
    wl.appendChild(view)
    wl.appendChild(button)
    overlay.appendChild(wl)

    document.body.appendChild(overlay)
}

// Delete all popups (to remove wl mostly)
function deletePopups() {
    let p = document.getElementById("popup")
    if (p != null) {
        p.remove()
    }
}

// On startup build the ui
buildKeyboard()
buildLetterGrid()
