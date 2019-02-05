let colors = []
const $ = document.querySelector.bind(document)

const listEl = $("#legoList")
const addLegosToDOM = html => listEl.innerHTML += html

const createLegoHTML = legoObject => `
    <section>
        <h1>A ${legoObject.color} ${legoObject.creation}</h1>
    </section>
`



fetch("http://127.0.0.1:8088/colors")
    .then(res => res.json())
    .then(
        (theParsedColors) => {
            console.log("Data is back", theParsedColors)
            return theParsedColors
        }
    )
    .then(
        (theParsedColors) => {
            for (const color of theParsedColors) {
                console.log(color)
            }
            return theParsedColors
        }
    )
    .then(
        (theParsedColors) => {
            console.log("Yay! That was awesome! 😃")
            return theParsedColors
        }
    )
    .then(
        (theParsedColors) => {
            colors = theParsedColors
            return fetch("http://127.0.0.1:8088/legos")
                .then(res => res.json())
        }
    )
    .then(
        (theParsedLegoArray) => {
            const newLegoArray = theParsedLegoArray
                .map(currentLego => {
                    currentLego.color = colors.find( currentColor => currentLego.color === parseInt(currentColor.id) ).color
                    return currentLego
                }
            )

            // Everything is as it should be
            return newLegoArray
        }
    )
    .then(
        (legoArray) => {
            legoArray.forEach(
                (currentLego) => {
                    const html = createLegoHTML(currentLego)
                    addLegosToDOM(html)
                }
            )
        }
    )