// Here to manage all storage stuff

// Save the game state
function save_game() {
    localStorage.setItem("game_state", JSON.stringify(game_state))
}

// Read the game state
function load_game() {
    let game = JSON.parse(localStorage.getItem("game_state"))

    if (game == null) {
        game = {
            "target_word" : "",   // What we want
            "current_row" : 0,   // Row we're on
            "current_word" : "",   // Word we're currently typing
            "word_history" : ""   // Words we've guessed before
        }
    }

    return game
}

// Save stats
function save_stats() {
    localStorage.setItem("stats", JSON.stringify(stats))
}

// Read stats
function load_stats() {
    let stats = JSON.parse(localStorage.getItem("stats"))

    if (stats == null) {
        stats = {
            "wins" : 0,
            "losses" : 0,
            "wins_by_len" : [0, 0, 0, 0, 0, 1]
        }
    }

    return stats
}