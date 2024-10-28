# Tic-Tac-Toe

## Summary

![Tic Tac Toe Screenshot](/img/demo.png)

I have created a game of tic-tac-toe for two players. Players can enter their names and choose a marker by entering letters into the inputs. Once the game has begun, players can select their positions on the grid, and the turn marker will update accordingly to show which player’s turn it is.

## Features

- Dynamic player name and marker selection.
- Real-time UI updates for player turns, scores, and game results.
- Input validation to ensure player names are unique before starting.
- Full keyboard accessibility for selecting grid positions.
- Vanilla CSS, HTML, and JavaScript for a lightweight, responsive experience.

## Setup

To get started with this project, follow the steps below:

### 1. Fork the Repository

First, you need to fork this repository to your GitHub account by clicking the "Fork" button near the top right of this page. If you are unfamiliar with this process, please follow this GitHub [guide](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo).

### 2. Clone the Repository

Next, clone the repository to your local machine using the following command. Make sure to replace `your-username` with your GitHub username:

```
git clone https://github.com/your-username/tic-tac-toe
```

### 3. Running the File

Once cloned, navigate to your project folder, locate the HTML file, and double-click it. This should open the file in your default browser.

Alternatively, if you're using Visual Studio Code, you can install the "Live Server" extension and use it to launch the project by right-clicking on the HTML file and selecting **Open with Live Server**.

### 4. Have Fun

You can now play the game or experiment with the code — just make sure to have fun! :)

## Challenges and Skills Demonstrated

This project was built to further my knowledge of utilizing an Immediately Invoked Function Expression (IIFE) modular file system, showing encapsulation for better organization and maintainability. Using only vanilla CSS, HTML, and JavaScript, the game interacts with the DOM to respond to user input and manage the game state.

### Skills Demonstrated:

- **JavaScript Knowledge**: The game logic and UI are managed with modern JavaScript, utilizing ES6+. Functions are modular, reusable, and encapsulated, following best practices in structuring code.
- **Modular Design**: The code is split into small, manageable modules for handling different aspects like the gameboard, players, and UI interface.
- **DOM Manipulation**: The game dynamically updates the UI, responding to player actions like marking squares and updating the score or result display, showing an understanding of event-driven programming.
- **Game Logic**: Core game development concepts such as checking for wins, managing turns, and handling ties are implemented with careful attention to detail, ensuring smooth gameplay.
- **User Interaction Handling**: User inputs are validated in real-time, and the UI provides feedback on errors (e.g. matching player names), enhancing the overall experience.
- **State Management**: Managing the game's state (whose turn it is, tracking the gameboard's status, and detecting game results) was a key challenge, requiring thoughtful synchronization between the UI and game logic.

### Challenges Faced:

- **State Management**: Maintaining the game’s internal state, ensuring that the board, turns, and game results are correctly synchronized with the UI, especially with asynchronous events like button clicks.
- **Validation & User Experience**: Implementing real-time validation for player names, along with providing clear error feedback via the UI, was essential for ensuring a smooth user experience.
- **Keyboard Accessibility**: Ensuring that the game can be played fully using the keyboard required careful thought, especially for interacting with the grid and managing focus states.

This project showcases a blend of technical skills and user-focused design, providing an engaging, accessible game that’s fully functional using only a browser.
