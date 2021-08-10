const zerglingDeath = new Audio('zerglingDeath.wav')
const clickSound = new Audio('ghostSniper.wav')
const zergVictory = new Audio('ZergVictory.mp3')
const baseUnderAtt = new Audio('baseUnderAtt.wav')
const tileCon = document.querySelector('.tileCon')
const scoreHTML = document.querySelector('.score')
let gameGrid = []
let clickDmg = 25
let score = 0
let base = {
  unitName: 'base',
  hp: 1000,
  canAtt: false
}
let lingSpawnSpeed = 1500

// generates the game grid on load
for (let i = 0; i < 18; i++) {
  gameGrid.push({ currentRow: i, row: [] })
  for (let j = 0; j < 32; j++) {
    gameGrid[i].row.push({ column: j, currentUnit: [] })
    let tile = document.createElement('div')
    //temp vals for testing
    // tile.innerHTML = `${i}-${j}`

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
    zerglingDeath.play()
    score += selectedUnit[0].points
    scoreHTML.innerText = score
    event.target.style.backgroundImage = ``
    event.target.removeEventListener('click', takeDmg)
    selectedUnit.pop()
  }
}

//Classes and Objects

class Unit {
  constructor(unitName, hp, canAtt, attDmg, points, gridSize, direction) {
    this.unitName = unitName
    this.hp = hp
    this.canAtt = canAtt
    this.attDmg = attDmg
    this.points = points
    this.gridSize = gridSize
    this.direction = direction
  }
}

class Zergling extends Unit {
  constructor(
    unitName,
    hp,
    canAtt,
    attDmg,
    points,
    gridSize,
    unitPic,
    direction
  ) {
    super(unitName, hp, canAtt, attDmg, points, gridSize, unitPic, direction)
  }
}

//zerg spawn function
const lingSpawn = (row, column) => {
  let spawnTile = document.getElementById(`${row} ${column}`)
  let freshSpawn = new Zergling(
    `Zergling`,
    100,
    true,
    5,
    10,
    1,
    './Zergling.png',
    'down'
  )

  // console.log(freshSpawn())
  // console.log(gameGrid[row].row[column].currentUnit)
  if (gameGrid[row].row[column].currentUnit.length === 0) {
    gameGrid[row].row[column].currentUnit.push(freshSpawn)
    // console.log(`if statement`, row, column)
  }

  spawnTile.style.backgroundImage = `url('./Zergling.png')`
  spawnTile.addEventListener('click', takeDmg)
  // console.log(row, column)
}
//top lane spawn
setInterval(function () {
  lingSpawn(0, Math.floor(Math.random() * (20 - 12) + 12))
}, lingSpawnSpeed)
//left lane spawn
setInterval(function () {
  lingSpawn(Math.floor(Math.random() * (15 - 10) + 10), 0)
}, lingSpawnSpeed)
//right lane spawn
setInterval(function () {
  lingSpawn(Math.floor(Math.random() * (15 - 10) + 10), 31)
}, lingSpawnSpeed)

//movement top lane
setInterval(() => {
  for (let i = 7; i >= 0; i--) {
    for (let j = 19; j >= 12; j--) {
      const currentTile = document.getElementById(`${i} ${j}`)
      const nextTile = document.getElementById(`${i + 1} ${j}`)
      const selectedUnit = gameGrid[i].row[j].currentUnit
      const nextArray = gameGrid[i + 1].row[j].currentUnit
      if (nextArray.length === 0 && selectedUnit.length > 0) {
        nextArray.push(selectedUnit[0])
        currentTile.style.backgroundImage = ``
        nextTile.style.backgroundImage = `url('./Zergling.png')`
        selectedUnit.pop()
        nextTile.addEventListener('click', takeDmg)
        currentTile.removeEventListener('click', takeDmg)
      }
    }
  }
}, 1000)
//left lane movement
setInterval(() => {
  for (let i = 15; i >= 10; i--) {
    for (let j = 9; j >= 0; j--) {
      const currentTile = document.getElementById(`${i} ${j}`)
      const nextTile = document.getElementById(`${i} ${j + 1}`)
      const selectedUnit = gameGrid[i].row[j].currentUnit
      const nextArray = gameGrid[i].row[j + 1].currentUnit
      if (nextArray.length === 0 && selectedUnit.length > 0) {
        nextArray.push(selectedUnit[0])
        currentTile.style.backgroundImage = ``
        nextTile.style.backgroundImage = `url('./Zergling.png')`
        selectedUnit.pop()
        nextTile.addEventListener('click', takeDmg)
        currentTile.removeEventListener('click', takeDmg)
      }
    }
  }
}, 1000)
//right lane movement
setInterval(() => {
  for (let i = 15; i >= 10; i--) {
    for (let j = 22; j <= 31; j++) {
      const currentTile = document.getElementById(`${i} ${j}`)
      const nextTile = document.getElementById(`${i} ${j - 1}`)
      const selectedUnit = gameGrid[i].row[j].currentUnit
      const nextArray = gameGrid[i].row[j - 1].currentUnit
      if (nextArray.length === 0 && selectedUnit.length > 0) {
        nextArray.push(selectedUnit[0])
        currentTile.style.backgroundImage = ``
        nextTile.style.backgroundImage = `url('./Zergling.png')`
        selectedUnit.pop()
        nextTile.addEventListener('click', takeDmg)
        currentTile.removeEventListener('click', takeDmg)
      }
    }
  }
}, 1000)
//attack function
setInterval(() => {
  for (let i = 8; i <= 16; i++) {
    for (let j = 10; j <= 21; j++) {
      const selectedUnit = gameGrid[i].row[j].currentUnit
      // console.log(selectedUnit)

      if (selectedUnit.length > 0 && selectedUnit[0].canAtt === true) {
        base.hp -= selectedUnit[0].attDmg
        if (base.hp === 995) {
          baseUnderAtt.play()
        }
        if (base.hp <= 0) {
          zergVictory.play()
        }
        console.log(base.hp, selectedUnit[0].attDmg)
      }
    }
  }
}, 1000)
