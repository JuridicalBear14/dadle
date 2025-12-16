// Code for building the home screen (basically just the title)

function buildTitle() {
    // Build a 3 row title in the box style
    let main = document.getElementById("title")

    // The three rows of text to write
    rows = [
        "happy",
        "birthday",
        "dad"
    ]

    // Box background colors
    let colors = ["#3a3a3c", "#b59f3b", "#538d4e"]

    // Silly Wordle rule follow
    let firstp = ""
    let firstd = ""

    // Loop for rows
    for (let i = 0; i < 3; i++) {
        // Build row div
        let r = document.createElement("div")
        r.setAttribute("id", `${i}`)
        r.setAttribute("class", "lb-row")

        // Now create and add letter boxes
        for (let j = 0; j < rows[i].length; j++) {
            let b = document.createElement("div")
            b.setAttribute("class", "letter-box")
            b.setAttribute("id", rows[i][j])
            b.innerHTML = rows[i][j]

            let color = colors[Math.floor(Math.random() * 3)]

            // Make sure random colors follow wordle rules

            // Make P's match
            if (i == 0 && j == 2) {
                firstp = color
            } else if (i == 0 && j == 3) {
                if (firstp == "#3a3a3c") {   // If first gray, second must be
                    color = firstp
                } else if (color == "#3a3a3c" && firstp != "#3a3a3c") {   // If first not gray, second can't be
                    color = colors[Math.floor(Math.random() * 2) + 1]
                }
            }

            // Make D's match
            if (i == 2 && j == 0) {
                firstd = color
            } else if (i == 2 && j == 2) {
                if (firstd == "#3a3a3c") {   // If first gray, second must be
                    color = firstd
                } else if (color == "#3a3a3c" && firstd != "#3a3a3c") {   // If first not gray, second can't be
                    color = colors[Math.floor(Math.random() * 2) + 1]
                }
            }
            
            b.style.backgroundColor = color
            b.style.border = `2px solid ${color}`

            r.appendChild(b)
        }

        main.appendChild(r)
    }
}

// Build the stats popup
function buildStats(win, word) {
    let stats = load_stats()

    let overlay = document.createElement("div")
    overlay.setAttribute("id", "popup")
    overlay.setAttribute("class", "overlay")

    let wl = document.createElement("div")
    wl.setAttribute("id", "winloss")

    let title = document.createElement("h1")
    title.innerHTML = "Stats"

    let wins = document.createElement("p")
    wins.innerHTML = `Wins: ${stats["wins"]}`

    let losses = document.createElement("p")
    losses.innerHTML = `Losses: ${stats["losses"]}`

    wl.appendChild(title)
    wl.appendChild(wins)
    wl.appendChild(losses)

    // Wins by len
    for (let i = 0; i < 6; i++) {
        let p = document.createElement("p")
        p.innerHTML = `${i + 1} Letter: ${stats["wins_by_len"][i]}`

        wl.append(p)
    }

    let button = document.createElement("button")
    button.setAttribute("onclick", "closePopup()")
    button.innerHTML = "Done"

    // Now add them all together
    wl.appendChild(button)
    overlay.appendChild(wl)

    document.body.appendChild(overlay)
}

// Build the info popup
function buildInfo(win, word) {
    let overlay = document.createElement("div")
    overlay.setAttribute("id", "popup")
    overlay.setAttribute("class", "overlay")

    let wl = document.createElement("div")
    wl.setAttribute("id", "winloss")

    let title = document.createElement("h1")
    title.innerHTML = "Happy Birthday!"

    let subtext = document.createElement("p")
    subtext.innerHTML = "For your birthday this year, I built you your very own Wordle! It plays just like regular Wordle and even pulls from the same solution database. The best part? This site is a Progressive Web App, and you can download it on your phone. Just click the box with an arrow in it below the address bar, then look for add to home screen. Love, Parker"

    let button = document.createElement("button")
    button.setAttribute("onclick", "closePopup()")
    button.innerHTML = "Done"

    // Now add them all together
    wl.appendChild(title)
    wl.appendChild(subtext)
    wl.appendChild(button)
    overlay.appendChild(wl)

    document.body.appendChild(overlay)
}

// Close the popups
function closePopup() {
    let o = document.getElementById("popup")
    o.remove()
}

buildTitle()