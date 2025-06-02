// ゲームの状態を管理するオブジェクト
const gameState = {
    grade: null,
    mode: null,
    score: 0,
    level: 1,
    lives: 3,
    correctAnswers: 0,
    wrongAnswers: 0,
    partsEarned: 0,
    questions: null,
    carFacts: null,
    currentQuestion: null,
    answerHistory: []
};

// DOM要素の取得
document.addEventListener('DOMContentLoaded', function() {
    // スタート画面の要素
    const gradeButtons = document.querySelectorAll('.grade-btn');
    const modeButtons = document.querySelectorAll('.mode-btn');
    const startButton = document.getElementById('start-btn');
    
    // ゲーム画面の要素
    const scoreElement = document.getElementById('score');
    const levelElement = document.getElementById('level');
    const livesElement = document.getElementById('lives');
    const questionElement = document.getElementById('question');
    const choicesContainer = document.getElementById('choices');
    const hintButton = document.getElementById('hint-btn');
    const hintContainer = document.getElementById('hint-container');
    const hintText = document.getElementById('hint-text');
    const backToMenuButton = document.getElementById('back-to-menu');
    const playerCar = document.getElementById('player-car');
    const monster = document.getElementById('monster');
    
    // 結果画面の要素
    const finalScoreElement = document.getElementById('final-score');
    const correctAnswersElement = document.getElementById('correct-answers');
    const wrongAnswersElement = document.getElementById('wrong-answers');
    const partsEarnedElement = document.getElementById('parts-earned');
    const playAgainButton = document.getElementById('play-again');
    const customizeCarButton = document.getElementById('customize-car');
    
    // 画面切り替え用の要素
    const startScreen = document.getElementById('start-screen');
    const gameScreen = document.getElementById('game-screen');
    const resultScreen = document.getElementById('result-screen');
    
    // 学年選択のイベントリスナー
    gradeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 選択された学年のスタイルを変更
            gradeButtons.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
            
            // 学年を設定
            gameState.grade = this.getAttribute('data-grade');
            
            // モードと学年が選択されていればスタートボタンを有効化
            if (gameState.grade && gameState.mode) {
                startButton.disabled = false;
            }
        });
    });
    
    // モード選択のイベントリスナー
    modeButtons.forEach(button => {
        if (button.id !== 'card-race-btn') {  // カードレースボタンは除外
            button.addEventListener('click', function() {
                // 選択されたモードのスタイルを変更
                modeButtons.forEach(btn => btn.classList.remove('selected'));
                this.classList.add('selected');
                
                // モードを設定
                gameState.mode = this.getAttribute('data-mode');
                
                // モードと学年が選択されていればスタートボタンを有効化
                if (gameState.grade && gameState.mode) {
                    startButton.disabled = false;
                }
            });
        }
    });
    
    // スタートボタンのイベントリスナー
    startButton.addEventListener('click', function() {
        // 問題データを読み込む
        Promise.all([loadQuestions(), loadCarFacts()]).then(() => {
            // ゲーム画面に切り替え
            startScreen.classList.add('hidden');
            gameScreen.classList.remove('hidden');
            
            // ゲームを初期化
            initGame();
        });
    });
    
    // ヒントボタンのイベントリスナー
    hintButton.addEventListener('click', function() {
        // ヒントを表示
        hintContainer.classList.remove('hidden');
        hintText.textContent = `ヒント: ${gameState.currentQuestion.hint}`;
    });
    
    // メニューに戻るボタンのイベントリスナー
    backToMenuButton.addEventListener('click', function() {
        // スタート画面に戻る
        gameScreen.classList.add('hidden');
        startScreen.classList.remove('hidden');
        
        // ゲーム状態をリセット
        resetGameState();
    });
    
    // もう一度遊ぶボタンのイベントリスナー
    playAgainButton.addEventListener('click', function() {
        // 結果画面を隠す
        resultScreen.classList.add('hidden');
        
        // スタート画面を表示
        startScreen.classList.remove('hidden');
        
        // ゲーム状態をリセット
        resetGameState();
    });
    
    // 車をカスタマイズするボタンのイベントリスナー
    customizeCarButton.addEventListener('click', function() {
        // カスタマイズ機能は将来的に実装予定
        alert('この機能は近日公開予定です！');
    });
    
    // 問題データを読み込む関数
    async function loadQuestions() {
        try {
            const response = await fetch('data/questions.json');
            const data = await response.json();
            gameState.questions = data;
            console.log('問題データを読み込みました:', gameState.questions);
        } catch (error) {
            console.error('問題データの読み込みに失敗しました:', error);
        }
    }
    
    // 車の豆知識を読み込む関数
    async function loadCarFacts() {
        try {
            const response = await fetch('data/car_facts.json');
            const data = await response.json();
            gameState.carFacts = data;
            console.log('車の豆知識を読み込みました:', gameState.carFacts);
        } catch (error) {
            console.error('車の豆知識の読み込みに失敗しました:', error);
        }
    }
    
    // ゲームを初期化する関数
    function initGame() {
        // ゲーム状態を初期化
        gameState.score = 0;
        gameState.level = 1;
        gameState.lives = 3;
        gameState.correctAnswers = 0;
        gameState.wrongAnswers = 0;
        gameState.partsEarned = 0;
        gameState.answerHistory = [];
        
        // UI要素を更新
        updateUI();
        
        // 最初の問題を表示
        showNextQuestion();
    }
    
    // UI要素を更新する関数
    function updateUI() {
        scoreElement.textContent = gameState.score;
        levelElement.textContent = gameState.level;
        livesElement.textContent = gameState.lives;
    }
    
    // 次の問題を表示する関数
    function showNextQuestion() {
        // ヒントを隠す
        hintContainer.classList.add('hidden');
        
        // 問題の種類（算数、国語、車の豆知識）をランダムに選択
        const subjects = ['math', 'japanese', 'car'];
        const subject = subjects[Math.floor(Math.random() * subjects.length)];
        
        // 選択された学年の問題を取得
        let questionPool;
        if (subject === 'car') {
            questionPool = gameState.carFacts[gameState.grade];
        } else {
            questionPool = gameState.questions[gameState.grade][subject];
        }
        
        // ランダムに問題を選択
        const randomIndex = Math.floor(Math.random() * questionPool.length);
        gameState.currentQuestion = questionPool[randomIndex];
        
        // 問題文を表示
        questionElement.textContent = gameState.currentQuestion.question;
        
        // 選択肢を表示
        choicesContainer.innerHTML = '';
        gameState.currentQuestion.choices.forEach(choice => {
            const button = document.createElement('button');
            button.classList.add('choice-btn');
            button.textContent = choice;
            button.addEventListener('click', () => checkAnswer(choice));
            choicesContainer.appendChild(button);
        });
    }
    
    // 回答をチェックする関数
    function checkAnswer(selectedAnswer) {
        const isCorrect = selectedAnswer === gameState.currentQuestion.answer;
        
        // 回答履歴を記録
        gameState.answerHistory.push({
            question: gameState.currentQuestion.question,
            userAnswer: selectedAnswer,
            correctAnswer: gameState.currentQuestion.answer,
            correct: isCorrect
        });
        
        if (isCorrect) {
            // 正解の場合
            gameState.score += 10;
            gameState.correctAnswers++;
            
            // 攻撃アニメーション
            playerCar.style.animation = 'attack 1s';
            setTimeout(() => {
                playerCar.style.animation = '';
                monster.style.animation = 'damage 0.5s';
            }, 1000);
            
            // 一定確率でパーツを獲得
            if (Math.random() < 0.3) {
                gameState.partsEarned++;
                alert('車のパーツを獲得しました！');
            }
            
            // レベルアップの判定
            if (gameState.correctAnswers % 5 === 0) {
                gameState.level++;
                alert(`レベルアップ！レベル${gameState.level}になりました！`);
            }
        } else {
            // 不正解の場合
            gameState.wrongAnswers++;
            gameState.lives--;
            
            // ダメージアニメーション
            playerCar.style.animation = 'damage 0.5s';
            
            // ライフがなくなったらゲームオーバー
            if (gameState.lives <= 0) {
                endGame();
                return;
            }
        }
        
        // UI要素を更新
        updateUI();
        
        // 次の問題を表示（少し遅延させる）
        setTimeout(showNextQuestion, 1500);
    }
    
    // ゲームを終了する関数
    function endGame() {
        // ゲーム画面を隠す
        gameScreen.classList.add('hidden');
        
        // 結果画面を表示
        resultScreen.classList.remove('hidden');
        
        // 結果を表示
        finalScoreElement.textContent = gameState.score;
        correctAnswersElement.textContent = gameState.correctAnswers;
        wrongAnswersElement.textContent = gameState.wrongAnswers;
        partsEarnedElement.textContent = gameState.partsEarned;
    }
    
    // ゲーム状態をリセットする関数
    function resetGameState() {
        gameState.grade = null;
        gameState.mode = null;
        gameState.score = 0;
        gameState.level = 1;
        gameState.lives = 3;
        gameState.correctAnswers = 0;
        gameState.wrongAnswers = 0;
        gameState.partsEarned = 0;
        gameState.currentQuestion = null;
        gameState.answerHistory = [];
        
        // ボタンの選択状態をリセット
        gradeButtons.forEach(btn => btn.classList.remove('selected'));
        modeButtons.forEach(btn => btn.classList.remove('selected'));
        
        // スタートボタンを無効化
        startButton.disabled = true;
    }
});

// プレイヤーのレベルに応じて問題の難易度を調整する関数
function adjustDifficulty(history) {
    if (history.length < 5) return gameState.grade; // 履歴が少ない場合は現在の学年を維持
    
    // 直近の回答履歴から正答率を計算
    const recentHistory = history.slice(-5);
    const correctCount = recentHistory.filter(item => item.correct).length;
    const correctRate = correctCount / recentHistory.length;
    
    // 現在の学年を数値に変換
    const currentGrade = parseInt(gameState.grade);
    
    // 正答率に応じて難易度を調整
    if (correctRate > 0.8 && currentGrade < 6) {
        // 正答率が高い場合、難易度を上げる
        return (currentGrade + 1).toString();
    } else if (correctRate < 0.4 && currentGrade > 1) {
        // 正答率が低い場合、難易度を下げる
        return (currentGrade - 1).toString();
    } else {
        // それ以外の場合は現在の難易度を維持
        return currentGrade.toString();
    }
}
