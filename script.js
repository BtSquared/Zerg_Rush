const zerglingDeath = new Audio('zzedth00.wav')
const clickSound = new Audio('tghfir00.wav')
const tileCon = document.querySelector('.tileCon')
let gameGrid = []
let clickDmg = 20
let base = {
  hp: 1000
}

// generates the game grid on load
for (let i = 0; i < 18; i++) {
  gameGrid.push({ currentRow: i, row: [] })
  for (let j = 0; j < 32; j++) {
    gameGrid[i].row.push({ column: j, currentUnit: [] })
    let tile = document.createElement('div')
    //temp vals for testing
    tile.innerHTML = `${i}-${j}`

    tile.id = `${i} ${j}`
    tile.style.width = `40px`
    tile.style.height = `40px`
    tile.style.gridArea = `${i + 1} / ${j + 1} / ${i + 2} / ${j + 2}`
    tile.style.backgroundSize = 'cover'
    tileCon.append(tile)
  }
}

// populates the base tiles with data
for (let i = 9; i <= 15; i++) {
  for (let j = 11; j <= 20; j++) {
    gameGrid[i].row[j].currentUnit.push(base)
  }
}
console.log(gameGrid)

//functions
const takeDmg = (event) => {
  const gridId = event.target.id.split(' ')
  const row = parseInt(gridId[0])
  const column = parseInt(gridId[1])
  const selectedUnit = gameGrid[row].row[column].currentUnit
  clickSound.play()
  selectedUnit[0].hp -= clickDmg
  console.log(selectedUnit[0].hp)
  if (selectedUnit[0].hp <= 0) {
    event.target.style.backgroundImage = ``
    selectedUnit.pop()
    zerglingDeath.play()
    console.log(event.target)
    event.target.removeEventListener('click', takeDmg)
  }
}

//Classes and Objects

class Unit {
  constructor(unitName, hp, attDmg, attSpeed, points, gridSize, direction) {
    this.unitName = unitName
    this.hp = hp
    this.attDmg = attDmg
    this.attSpeed = attSpeed
    this.points = points
    this.gridSize = gridSize
  }
}

class Zergling extends Unit {
  constructor(
    unitName,
    hp,
    attDmg,
    attSpeed,
    points,
    gridSize,
    unitPic,
    direction
  ) {
    super(unitName, hp, attDmg, attSpeed, points, gridSize, unitPic, direction)
  }
}

//test function maybe not? probably gonna be main lane spawn function
const lingSpawn = function (row, column) {
  let spawnTile = document.getElementById(`${row} ${column}`)
  let freshSpawn = function () {
    return new Zergling(`Zergling`, 100, 5, 500, 10, 1, './Zergling.png')
  }
  console.log(freshSpawn())
  console.log(gameGrid[row].row[column].currentUnit)
  if (gameGrid[row].row[column].currentUnit.length === 0) {
    gameGrid[row].row[column].currentUnit.push(freshSpawn())
  }
  spawnTile.style.backgroundImage = `url('./Zergling.png')`
  spawnTile.addEventListener('click', takeDmg)

  //movement
  setInterval((row, column) => {}, 1000)
}

// setInterval(function () {
//   lingSpawn(0, Math.floor(Math.random() * (20 - 12) + 12))
// }, 1000)
