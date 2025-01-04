var height = 6; // number of guesses
var width = 5; // length of the word

var row = 0; // current guess
var column = 0; // current letter

var gameOver = false;
var word = "SQUID";

window.onload = function()
{
    initialize();
}

function addLetterAnimation()
{

}
function initialize()
{
    // create game board
    for(let r = 0; r < height; r++)
    {
        for(let c = 0; c < width; c++)
        {
            // <span id = "0-0" class = "tile"></span>
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText= "";
            document.getElementById("board").appendChild(tile);
        }
    }

    //Liste for Key Press
    document.addEventListener("keyup", (e) =>
    {
        if(gameOver)
            return;


        if("KeyA" <= e.code && e.code <= "KeyZ")
        {
            if(column < width) 
            {

                let currentTile = document.getElementById(row.toString() + "-" + column.toString());
                if(currentTile.innerText == "")
                {
                    currentTile.innerText = e.code[3]; // keyA, keyB..
                    column += 1;
                }
            }
        }
        else if(e.code == "Backspace")
        {
            if(0 < column && column <= width)
                column -= 1;

            let currentTile = document.getElementById(row.toString() + "-" + column.toString());
            currentTile.innerText = ""
        }
        else if(e.code == "Enter")
        {
            if(column < width)
                return;

            update();
            row += 1; // start new row
            column = 0; // reset col
        }

        if(!gameOver && row == height)
        {
            gameOver = true;
            document.getElementById("answer").innerText = word;
        }
    });

    function update()
    {
        let correct = 0;
        let letterCount = {}; 

        for(let i = 0; i < word.length; i++)
        {
            let letter = word[i];
            if(letterCount[letter])
            {
                letterCount[letter] += 1;
            }
            else
                letterCount[letter] = 1;
        }

        for(let c = 0; c < width; c++)
        {
            let currentTile = document.getElementById(row.toString() + "-" + c.toString());
            let letter = currentTile.innerText;

            // is it in the correct position?
            if(word[c] == letter)
            {
                currentTile.classList.add("correct");
                correct += 1;
            } // is it in the word?
            else if(word.includes(letter))
            {
                currentTile.classList.add("present");
            } // not in the word
            else
            {
                currentTile.classList.add("absent");
            }

        }

        if(correct == width)
            gameOver = true;
    }
}