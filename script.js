document.addEventListener("DOMContentLoaded", () => {
    const rollValues = [31, 32, 41, 42, 43, 51, 52, 53, 54, 61, 62, 63, 64, 65, 11, 22, 33, 44, 55, 66, 21];
    
    let playerRoll = 0;
    let computerRoll = 0;
    let playerClaim = "";
    let computerClaim = "";
    let playerBelieves = false;
    
    const messageDiv = document.getElementById("message");
    const playerResultDiv = document.getElementById("playerResult");
    const computerDecisionDiv = document.getElementById("computerDecision");

    const rollDice = () => {
        return rollValues[Math.floor(Math.random() * rollValues.length)];
    };

    const computerBelieve = (claimValue) => {
        if (claimValue === 31) return true; // Az első állítást mindig elhiszi
        const trustChance = 90 - (claimValue - 31) * 5;
        return Math.random() * 100 < trustChance;
    };

    const computerMove = (playerClaimValue) => {
        if (computerRoll > playerClaimValue) {
            return computerRoll; // Nem blöfföl, ha nagyobbat dobott
        } else {
            // Blöfföl egy kicsivel nagyobb számot, mint a játékos
            const index = rollValues.indexOf(playerClaimValue);
            return rollValues[Math.min(index + 1, rollValues.length - 1)];
        }
    };

    // Játékos dob
    document.getElementById("playerRollBtn").addEventListener("click", () => {
        playerRoll = rollDice();
        playerResultDiv.innerText = `Játékos dobott: ${playerRoll}`;
        messageDiv.innerText = "Mondd meg, mit állítasz!";
    });

    // Számítógép elhiszi-e az állítást
    document.getElementById("playerClaimBtn").addEventListener("click", () => {
        playerClaim = document.getElementById("playerClaimInput").value;
        const playerClaimValue = parseInt(playerClaim);

        if (!isNaN(playerClaimValue) && rollValues.includes(playerClaimValue)) {
            const computerResponse = computerBelieve(playerClaimValue);

            if (computerResponse) {
                messageDiv.innerText = "A számítógép elhiszi! Most a gép dob...";
                computerRoll = rollDice();
                const computerBluff = computerMove(playerClaimValue);
                computerClaim = `${computerBluff}`;
                messageDiv.innerText = `A számítógép azt állítja, hogy dobásának az értéke: ${computerClaim}. Elhiszed?`;
            } else {
                messageDiv.innerText = "A számítógép nem hiszi el az állításodat!";
                if (playerClaimValue == playerRoll) {
                    messageDiv.innerText += " A játékos igazat mondott, a számítógép veszített!";
                } else {
                    messageDiv.innerText += " A játékos blöffölt, a játékos vesztett!";
                }
            }
        } else {
            messageDiv.innerText = "Érvénytelen állítás!";
        }
    });

    // Játékos elhiszi-e a gép dobását
    document.getElementById("believeComputerBtn").addEventListener("click", () => {
        if (computerClaim == `${computerRoll}`) {
            messageDiv.innerText = "A gép igazat mondott, a játékos veszített!";
        } else {
            messageDiv.innerText = "A gép blöffölt, a játékos nyert!";
        }
    });

    document.getElementById("dontBelieveComputerBtn").addEventListener("click", () => {
        if (computerClaim == `${computerRoll}`) {
            messageDiv.innerText = "A gép igazat mondott, a játékos veszített!";
        } else {
            messageDiv.innerText = "A gép blöffölt, a játékos nyert!";
        }
    });
});