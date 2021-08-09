const tileCon = document.querySelector('.tileCon')
let gameGrid = []

for (let i = 0; i < 18; i++) {
  gameGrid.push({ column: i, row: [] })
  for (let j = 0; j < 32; j++) {
    gameGrid[i].row.push(j)
    let tile = document.createElement('div')
    tile.className = `${i}-${j}`
    tile.innerText = `X`
    tile.style.backgroundColor = `rgb(${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
    tile.style.width = '40px'
    tile.style.height = '40px'
    tile.style.gridArea = `${i + 1} / ${j + 1} / ${i + 2} / ${j + 2}`
    tileCon.append(tile)
  }
}
console.log(gameGrid)
