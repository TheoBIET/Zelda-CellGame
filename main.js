let App = {
    BOARD: document.getElementById('board'),
    isGameOver: false,
    isLoose: false,
    currentLevel: 1,
    nbOfLevels: 4,
    maxTries: 10,
    TriesNumber: 0,
    boardConfiguration: {
        numberOfRows: 4,
        numberOfCellsPerRow: 6,
        defaultConfiguration : {
            numberOfRows: 4,
            numberOfCellsPerRow: 6,
        }
    },
    player: {
        x: 0,
        y: 0,
        direction: 'right',
        spritePositionByDirection : {
            right: '66%',
            left: '33%',
            up: '100%',
            down: '0%'
        },
        turnLeft() {
            if (!App.isGameOver) {
                this.whatDirection(this.direction, 'left');
            }
            App.redrawBoard();
        },
        turnRight() {
            if (!App.isGameOver) {
                this.whatDirection(this.direction, 'right');
            }
            App.redrawBoard();
        },
        moveForward(currentDirection) {
            if (!App.isGameOver) {
                switch(currentDirection) {
                case 'right':
                    if ((this.x - 1) !== App.boardConfiguration.numberOfRows) {
                        this.x++;
                    }
                    break;
                case 'left':
                    if ((this.x - 1) >= 0) {
                        this.x--;
                    }
                    break;
                case 'up':
                    if ((this.y - 1) >= 0) {
                        this.y--;
                    }
                    break;
                case 'down':
                    if (this.y !== (App.boardConfiguration.numberOfRows - 1)) {
                        this.y++;
                    }
                    break;
                default:
                    break;
                }
                App.redrawBoard();
            }
        },
        moveBackward(currentDirection) {
            if (!App.isGameOver) {
                switch(currentDirection) {
                case 'right':
                    if ((this.x - 1) >= 0) {
                        this.x--;
                    }
                    break;
                case 'left':
                    if ((this.x) <= App.boardConfiguration.numberOfRows) {
                        this.x++;
                    }
                    break;
                case 'up':
                    if (this.y !== (App.boardConfiguration.numberOfRows - 1)) {
                        this.y++;
                    }
                    break;
                case 'down':
                    if ((this.y - 1) >= 0) {
                        this.y--;
                    }
                    break;
                default:
                    break;
                }
                App.redrawBoard();
            }
        },
        whatDirection(currentDirection, directionToGo) {
            if (directionToGo === 'left') {
                switch(currentDirection) {
                case 'right':
                    this.direction = 'up';
                    break;
                case 'left':
                    this.direction = 'down';
                    break;
                case 'up':
                    this.direction = 'left';
                    break;
                case 'down':
                    this.direction = 'right';
                    break;
                default:
                    break;
                }
            }else {
                switch(currentDirection) {
                case 'right':
                    this.direction = 'down';
                    break;
                case 'left':
                    this.direction = 'up';
                    break;
                case 'up':
                    this.direction = 'right';
                    break;
                case 'down':
                    this.direction = 'left';
                    break;
                default:
                    break;
                }
            }
            this.updatePlayerDirection(this.direction);
        },
        updatePlayerDirection(currentDirection) {
            const PLAYER = document.querySelector('.player');
            switch(currentDirection) {
            case 'right':
                PLAYER.style.backgroundPosition = `center ${this.spritePositionByDirection.right}`;
                break;
            case 'left':
                PLAYER.style.backgroundPosition = `center ${this.spritePositionByDirection.left}`;
                break;
            case 'up':
                PLAYER.style.backgroundPosition = `center ${this.spritePositionByDirection.up}`;
                break;
            case 'down':
                PLAYER.style.backgroundPosition = `center ${this.spritePositionByDirection.down}`;
                break;
            default:
                break;
            }
        }
    },
    targetCell: {
        x: 5,
        y : 3,
    },
    drawBoard() {
        if (!this.isGameOver) {
            const TITLE = document.createElement('h1');
            const CURRENT_LEVEL_INFORMATIONS = document.createElement('h2');
            const TRIES_LEFT = document.createElement('h2');
            TITLE.textContent = 'Tu dois sauver Zelda!';
            CURRENT_LEVEL_INFORMATIONS.textContent = `Level : ${this.currentLevel}`;
            TRIES_LEFT.textContent = `Il te reste ${this.maxTries} coups!`;
            this.BOARD.appendChild(TITLE);
            this.BOARD.appendChild(CURRENT_LEVEL_INFORMATIONS);


            const NUMBER_OF_ROW = this.boardConfiguration.numberOfRows;
            const NUMBER_OF_CELLS = this.boardConfiguration.numberOfCellsPerRow;
        
            let currentY = 0;

            for (let i=0;i<NUMBER_OF_ROW;i++) {
                const BOARD_ROW = document.createElement('div');
                BOARD_ROW.className = 'row';
                this.BOARD.appendChild(BOARD_ROW);
                for (let i=0;i<NUMBER_OF_CELLS;i++) {
                    const ROW_CELLS = document.createElement('div');
                    const PLAYER_X = this.player.x;
                    const PLAYER_Y = this.player.y;
                    const TARGET_X = this.targetCell.x;
                    const TARGET_Y = this.targetCell.y;
                    let currentX = i;
                    ROW_CELLS.className = 'cell';
                    BOARD_ROW.appendChild(ROW_CELLS);
                    if (currentX === PLAYER_X && currentY === PLAYER_Y) {
                        this.addCharacterToCell(ROW_CELLS, 'player');
                    } else if (currentX === TARGET_X && currentY === TARGET_Y) {
                        this.addCharacterToCell(ROW_CELLS, 'targetCell');
                    }
                }
                currentY++;
            }
            this.player.updatePlayerDirection(this.player.direction); 
            this.BOARD.appendChild(TRIES_LEFT);
        }else {
            this.clearBoard();
            if (this.currentLevel < this.nbOfLevels) {
                this.showPreLevelMessage();
            } else {
                this.showFinalMessage();
            }
        }
    },   
    addCharacterToCell(cell, character) {
        const DIV = document.createElement('div');
        DIV.className = character;
        if (character === 'targetCell' && this.currentLevel === this.nbOfLevels) {
            DIV.classList.add('targetCell--zelda');
        }
        cell.appendChild(DIV);
    },
    clearBoard() {
        this.BOARD.innerHTML = '';
    },
    redrawBoard() {
        if ((this.player.x === this.targetCell.x) && (this.player.y === this.targetCell.y)) this.isGameOver = true;
        this.clearBoard();
        this.drawBoard();
    },
    updateBoardConfiguration() {
        if(this.currentLevel < this.nbOfLevels) {
            this.currentLevel++;
            console.log('Informations en cours de changement, passage au niveau', this.currentLevel);
            this.updateTries(true);
            this.generateNewBoardConfiguration();
        } else {
            console.log(`Niveau MAX atteint ${this.currentLevel}`);
        }
        
    },
    generateNewBoardConfiguration() {
        this.boardConfiguration.numberOfRows += 2;
        this.boardConfiguration.numberOfCellsPerRow += 2;
        this.generateNewPositionForCharacters();
    },
    generateNewPositionForCharacters() {
        this.player.x = this.getRandomNumber(this.boardConfiguration.numberOfCellsPerRow);
        this.player.y = this.getRandomNumber(this.boardConfiguration.numberOfRows);
        this.targetCell.x = this.getRandomNumber(this.boardConfiguration.numberOfCellsPerRow);
        this.targetCell.y = this.getRandomNumber(this.boardConfiguration.numberOfRows);
        console.log('Nouvelle Position pour le joueur générées', this.player.x, this.player.y);
        console.log('Nouvelle Position pour la cible générées', this.targetCell.x, this.targetCell.y);
        this.drawBoard();
    },
    getRandomNumber(max) {
        return Math.floor(Math.random() * max);
    },
    updateTries(reset = false) {
        if (!reset) {
            if (this.maxTries !== 0) {
                this.maxTries--;
                this.TriesNumber++;
            } else {
                this.isGameOver = true;
                this.clearBoard();
                this.showLooseMessage();
            }
        } else {
            this.maxTries = Math.round((this.currentLevel / 1.5)) * 10;
            this.TriesNumber = 0;
            console.log('Nombres d\'essais remis à 0!');  
        }
    },
    showPreLevelMessage() {
        const NEXT_LEVEL = document.createElement('h1');
        NEXT_LEVEL.innerHTML = `Félicitation!<br>tu as réussi le niveau ${this.currentLevel} en ${this.TriesNumber} coups!`;
        this.BOARD.appendChild(NEXT_LEVEL);
        const BUTTON = document.createElement('button');
        BUTTON.innerHTML = `Passer au niveau ${this.currentLevel+1}`;
        this.BOARD.appendChild(BUTTON);
        BUTTON.addEventListener('click', () => {
            console.log('Niveau Terminé! Création d\'une nouvelle map');
            this.isGameOver = false;
            this.clearBoard();
            this.updateBoardConfiguration();
        });
    },
    showFinalMessage() {
        const FINAL_TEXT = document.createElement('h1');
        FINAL_TEXT.innerHTML = 'Félicitation!<br>tu as sauvé Zelda!<br>Pense à la petite ⭐ sur Github';
        this.BOARD.appendChild(FINAL_TEXT);
    },
    showLooseMessage() {
        const LOOSE_TEXT = document.createElement('h1');
        LOOSE_TEXT.innerHTML = 'Dommage!<br>tu n\'as pas réussi à sauver Zelda!<br>Pense à la petite ⭐ sur Github';
        this.BOARD.appendChild(LOOSE_TEXT);
    },
    init() {
        this.drawBoard();

        if (!this.isGameOver) {
            document.addEventListener('keydown', (event) => {
                const PRESSED_KEY = event.key;
                switch (PRESSED_KEY) {
                case 'ArrowUp' :
                    this.player.moveForward(this.player.direction);
                    break;
                case 'ArrowDown':
                    this.player.moveBackward(this.player.direction);
                    break;
                case 'ArrowLeft':
                    this.player.turnLeft();
                    break;
                case 'ArrowRight':
                    this.player.turnRight();
                    break;
                default:
                    break;
                }
                this.updateTries();
            });
        }
    },
};

window.onload = () => {
    App.init();
};