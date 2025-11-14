const inputValue = document.getElementById("user-input");
const number = document.querySelectorAll(".numbers");
const calculate = document.querySelectorAll(".operations");

const historyList = document.getElementById("history-list");
const clearHistoryBtn = document.getElementById("clear-history");

number.forEach((item) => {
    item.addEventListener("click", (e) => {
        if (inputValue.innerText === "NaN" || inputValue.innerText === "0") {
            inputValue.innerText = "";
        }
        inputValue.innerText += e.target.innerHTML.trim();
    });
});

// Add entry to history
function addToHistory(expression, result) {
    const li = document.createElement("li");
    li.textContent = `${expression} = ${result}`;
    historyList.prepend(li); // newest at the top
}

calculate.forEach((item) => {
    item.addEventListener("click", (e) => {
        const value = e.target.innerText.trim();
        const text = inputValue.innerText;

        if (value === "AC") {
            inputValue.innerText = "0";

        } else if (value === "DEL") {
            inputValue.innerText = text.slice(0, -1) || "0";

        } else if (value === "=") {
            try {
                const result = eval(text);     // FIXED
                inputValue.innerText = result;

                // Add to history only if expression is valid
                if (text !== "") {
                    addToHistory(text, result);  // FIXED
                }

            } catch {
                inputValue.innerText = "NaN";
            }

        } else {
            inputValue.innerText += value;
        }
    });
});

// Clear history
clearHistoryBtn.addEventListener("click", () => {
    historyList.innerHTML = "";
});

// ------------------ KEYBOARD SUPPORT ------------------

document.addEventListener("keydown", (e) => {
    let key = e.key;
    if (!isNaN(key)) {
        if (inputValue.innerText === "0" || inputValue.innerText === "NaN") {
            inputValue.innerText = "";
        }
        inputValue.innerText += key;
    }
    if (["+","-","*","/","%"].includes(key)) {
        inputValue.innerText += key;
    }
    // Decimal point
    if (key === ".") {
        inputValue.innerText += ".";
    }
    // Backspace → DEL
    if (key === "Backspace") {
        inputValue.innerText = inputValue.innerText.slice(0, -1) || "0";
    }
    // Escape → AC
    if (key === "Escape") {
        inputValue.innerText = "0";
    }
    // Enter → Equal
    if (key === "Enter" || key === "=") {
        try {
            const expression = inputValue.innerText;
            const result = eval(expression);
            inputValue.innerText = result;
            if (expression !== "") {
                addToHistory(expression, result);
            }

        } catch {
            inputValue.innerText = "NaN";
        }
    }
});
