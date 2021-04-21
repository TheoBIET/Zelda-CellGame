let App = {
    BOARD: document.getElementById('board'),
    isGameOver: false,
    isLoose: false,
    currentLevel: 1,
    nbOfLevels: 5,
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
        },
        turnRight() {
            if (!App.isGameOver) {
                this.whatDirection(this.direction, 'right');
            }
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
        }else {
            this.isGameOver = false;
            console.log('Niveau Terminé! Création d\'une nouvelle map');
            this.updateBoardConfiguration();
        }
    },
    
    addCharacterToCell(cell, character) {
        const DIV = document.createElement('div');
        DIV.className = character;
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
    init() {
        this.drawBoard();

        document.addEventListener('keydown', (event) => {
            const PRESSED_KEY = event.key;
            switch (PRESSED_KEY) {
            case 'ArrowUp' :
                try {
                    this.player.moveForward(this.player.direction);
                } catch (e) {
                    console.log('AAAAA');
                }
                break;
            case 'ArrowDown':
                try {
                    this.player.moveBackward(this.player.direction);
                } catch (e) {
                    console.log('AAAAA');
                }
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
        });
    }
};

window.onload = () => {
    App.init();
};