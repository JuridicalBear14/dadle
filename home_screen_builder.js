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

buildTitle()