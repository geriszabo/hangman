export function checkWin(correct, wrong, word) {
    let status = "win"

    word.split("").map(e => {
        if(!correct.includes(e)) {
            status=""
        }
    })

    if(wrong.length === 6) {
        status = "lose"
    }

    return status
}