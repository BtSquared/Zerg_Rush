const tileCon = document.querySelector('.tileCon')
let gameGrid = []
let clickDmg = 20

// generates the game grid on load
for (let i = 0; i < 18; i++) {
  gameGrid.push({ currentColumn: i, row: [] })
  for (let j = 0; j < 32; j++) {
    gameGrid[i].row.push({ row: j, currentUnit: `` })
    let tile = document.createElement('div')

    //temp vals for testing
    tile.innerHTML = `${i + 1}-${j + 1}`
    tile.style.backgroundColor = `rgb(${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`

    tile.className = `${i}-${j}`
    tile.style.width = `40px`
    tile.style.height = `40px`
    tile.style.gridArea = `${i + 1} / ${j + 1} / ${i + 2} / ${j + 2}`
    tileCon.append(tile)
  }
}
// console.log(gameGrid)

//Classes and Objects
let base = {
  hp: 1000
}
class Unit {
  constructor(hp, attDmg, attSpeed, points, gridSize, startPoint) {
    this.hp = hp
    this.attDmg = attDmg
    this.attSpeed = attSpeed
    this.points = points
    this.gridSize = gridSize
  }
  takeDmg() {
    this.hp -= clickDmg
    if (this.hp <= 0) {
      unitDeath(this.Unit)
    }
  }
  attack() {}
  movement() {}
  setUp(spawnRow, spawnColumn) {
    gameGrid[spawnRow].row[spawnColumn].currentUnit = this.name
  }
}

class Zergling extends Unit {
  constructor(hp, attDmg, attSpeed, gridSize, unitPic) {
    super(hp, attDmg, attSpeed, gridSize, unitPic)
  }
}

//test function
const spawn = () => {
  let spawntile = document.querySelector('.0-15')
  new Zergling(100, 5, 500, 1, './Zergling.png')
  setUp(spawntile)
}
