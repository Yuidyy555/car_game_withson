// カードレースゲームの機能
document.addEventListener('DOMContentLoaded', function() {
    // ゲームの状態
    const raceState = {
        playerPosition: 0,
        computerPosition: 0,
        maxPosition: 100,
        playerTurn: true,
        gameOver: false
    };

    // DOM要素の取得
    const cardRaceScreen = document.getElementById('card-race-screen');
    const playerCar = document.getElementById('race-player-car');
    const computerCar = document.getElementById('race-computer-car');
    const cardDeck = document.getElementById('card-deck');
    const cardDisplay = document.getElementById('card-display');
    const turnInfo = document.getElementById('turn-info');
    const gameResult = document.getElementById('game-result');
    const backToMenuBtn = document.getElementById('race-back-to-menu');
    const restartRaceBtn = document.getElementById('restart-race');

    // カードデッキをクリックしたときの処理
    cardDeck.addEventListener('click', function() {
        if (raceState.gameOver) return;

        // カードの数字（1〜6）をランダムに生成
        const cardValue = Math.floor(Math.random() * 6) + 1;
        
        // カードの表示を更新
        cardDisplay.textContent = cardValue;
        cardDisplay.style.display = 'block';
        
        // プレイヤーのターンの場合
        if (raceState.playerTurn) {
            // プレイヤーの車を進める
            raceState.playerPosition += cardValue * 10;
            updateCarPosition(playerCar, raceState.playerPosition);
            
            // ターン情報を更新
            turnInfo.textContent = 'コンピューターの番です。カードをクリックしてください。';
            
            // ゴール判定
            if (raceState.playerPosition >= raceState.maxPosition) {
                endRace('player');
                return;
            }
            
            // ターンを切り替え
            raceState.playerTurn = false;
        } else {
            // コンピューターの車を進める
            raceState.computerPosition += cardValue * 10;
            updateCarPosition(computerCar, raceState.computerPosition);
            
            // ターン情報を更新
            turnInfo.textContent = 'あなたの番です。カードをクリックしてください。';
            
            // ゴール判定
            if (raceState.computerPosition >= raceState.maxPosition) {
                endRace('computer');
                return;
            }
            
            // ターンを切り替え
            raceState.playerTurn = true;
        }
    });

    // 車の位置を更新する関数
    function updateCarPosition(carElement, position) {
        // 位置をパーセンテージに変換（0%〜90%）
        const percentage = Math.min(90, position);
        carElement.style.left = percentage + '%';
    }

    // レースを終了する関数
    function endRace(winner) {
        raceState.gameOver = true;
        
        if (winner === 'player') {
            gameResult.textContent = 'あなたの勝ち！おめでとう！';
            gameResult.style.color = '#FF6B6B';
        } else {
            gameResult.textContent = 'コンピューターの勝ち！次は頑張ろう！';
            gameResult.style.color = '#4A90E2';
        }
        
        gameResult.style.display = 'block';
        restartRaceBtn.style.display = 'inline-block';
    }

    // メニューに戻るボタンのイベントリスナー
    backToMenuBtn.addEventListener('click', function() {
        cardRaceScreen.classList.add('hidden');
        document.getElementById('start-screen').classList.remove('hidden');
    });

    // 再スタートボタンのイベントリスナー
    restartRaceBtn.addEventListener('click', function() {
        // ゲーム状態をリセット
        raceState.playerPosition = 0;
        raceState.computerPosition = 0;
        raceState.playerTurn = true;
        raceState.gameOver = false;
        
        // 車の位置をリセット
        updateCarPosition(playerCar, 0);
        updateCarPosition(computerCar, 0);
        
        // 表示をリセット
        cardDisplay.style.display = 'none';
        gameResult.style.display = 'none';
        restartRaceBtn.style.display = 'none';
        turnInfo.textContent = 'あなたの番です。カードをクリックしてください。';
    });

    // カードレースゲームを初期化する関数
    function initCardRace() {
        // ゲーム状態をリセット
        raceState.playerPosition = 0;
        raceState.computerPosition = 0;
        raceState.playerTurn = true;
        raceState.gameOver = false;
        
        // 車の位置をリセット
        updateCarPosition(playerCar, 0);
        updateCarPosition(computerCar, 0);
        
        // 表示をリセット
        cardDisplay.style.display = 'none';
        gameResult.style.display = 'none';
        restartRaceBtn.style.display = 'none';
        turnInfo.textContent = 'あなたの番です。カードをクリックしてください。';
    }

    // カードレースモードのボタンにイベントリスナーを追加
    document.getElementById('card-race-btn').addEventListener('click', function() {
        document.getElementById('start-screen').classList.add('hidden');
        cardRaceScreen.classList.remove('hidden');
        initCardRace();
    });
});
