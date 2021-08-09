const tileCon = document.querySelector('.tileCon')
let gameGrid = []

for (let i = 0; i < 18; i++) {
  gameGrid.push({ column: i, row: [] })
  for (let j = 0; j < 32; j++) {
    gameGrid[i].row.push(j)
    let tile = document.createElement('div')
    tile.className = `${i}-${j}`
    tile.innerHTML = `${i + 1}-${j + 1}`
    tile.style.backgroundColor = `rgb(${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
    tile.style.width = `40px`
    tile.style.height = `40px`
    tile.style.gridArea = `${i + 1} / ${j + 1} / ${i + 2} / ${j + 2}`
    tileCon.append(tile)
    tile.addEventListener('click', () => {
      tile.style.backgroundColor = 'red'
    })
  }
}
console.log(gameGrid)
