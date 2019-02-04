// Some starter code
const $ = document.querySelector.bind(document);

/*
    Factory function for generating color options
*/
const createColorOption = color => `
    <option value="${color.id}">${color.color}</option>
`

const createLegoElement = (lego, colors) => {
    const iFoundYou = colors.find(c => parseInt(c.id) === lego.color)
    return `

        <section class="lego">
            <h1>${lego.creation}</h1>

            <div>Shape: ${lego.shape}</div>
            <div>Color: ${iFoundYou.color}</div>
            <div>Creator: ${lego.creator}</div>
        </section>
    `
}

const getAllLegos = (colors) =>
    fetch("http://127.0.0.1:8088/legos")
        .then(r => r.json())
        .then(legoArray => {
            $("#legoList").innerHTML = ""
            legoArray.forEach(
                (lego) => {
                    const html = createLegoElement(lego, colors)
                    $("#legoList").innerHTML += html
                }
            )
        })

let allColors = []

const getAllColors = () => {
    return fetch("http://127.0.0.1:8088/colors")
        .then(r => r.json())
        .then(colorArray => {
            allColors = colorArray
            colorArray.forEach(
                (color) => {
                    const html = createColorOption(color)
                    $("#lego__color").innerHTML += html
                }
            )
            return colorArray
        })

}

$(".lego__save").addEventListener("click", event => {
  const creator = $("#lego__creator").value;
  const color = $("#lego__color").value;
  const shape = $("#lego__shape").value;
  const creation = $("#lego__creation").value;

  // Once you have collected all the values, build your data structure
  const legoToSave = {
    creator: creator,
    shape: shape,
    color: parseInt(color),
    creation: creation
  };

  fetch("http://127.0.0.1:8088/legos", {
    // Replace "url" with your API's URL
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(legoToSave)
  })
    .then(r => r.json())
    .then(
        () => {
            /*
                This is the only place in my code where
                I am 100% certain the POST operation
                was successful
            */
            getAllLegos(allColors)
        }
    )
})

getAllColors().then(
    (colorArray) => {
        getAllLegos(colorArray)
    }
)




