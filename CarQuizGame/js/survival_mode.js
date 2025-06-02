// サバイバルモードのJavaScript
document.addEventListener('DOMContentLoaded', function() {
    // サバイバルモードの状態を管理するオブジェクト
    const survivalState = {
        grade: null,
        score: 0,
        lives: 3,
        correctAnswers: 0,
        wrongAnswers: 0,
        currentQuestion: 0,
        totalQuestions: 0,
        equipment: [],
        questions: [],
        currentQuestionData: null,
        isGameOver: false
    };

    // DOM要素の取得
    const survivalScreen = document.getElementById('survival-screen');
    const gradeButtons = document.querySelectorAll('.survival-grade-btn');
    const startButton = document.getElementById('survival-start-btn');
    const continueButton = document.getElementById('survival-continue-btn');
    const questionElement = document.getElementById('survival-question');
    const choicesContainer = document.getElementById('survival-choices');
    const scoreElement = document.getElementById('survival-score');
    const livesElement = document.getElementById('survival-lives');
    const progressElement = document.getElementById('survival-progress');
    const resultElement = document.getElementById('survival-result');
    const explanationElement = document.getElementById('survival-explanation');
    const nextButton = document.getElementById('survival-next');
    const quitButton = document.getElementById('survival-quit');
    
    // 装備のリスト
    const equipmentList = [
        { id: 1, name: "ターボエンジン", description: "車のスピードが上がります", image: "images/equipment_engine.png" },
        { id: 2, name: "特殊タイヤ", description: "どんな道でも走れます", image: "images/equipment_tire.png" },
        { id: 3, name: "カスタムペイント", description: "かっこいい色に塗れます", image: "images/equipment_paint.png" },
        { id: 4, name: "スポーツシート", description: "座り心地が良くなります", image: "images/equipment_seat.png" },
        { id: 5, name: "LEDライト", description: "夜道も明るく照らします", image: "images/equipment_light.png" }
    ];
    
    // 学年選択のイベントリスナー
    gradeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 選択された学年のスタイルを変更
            gradeButtons.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
            
            // 学年を設定
            survivalState.grade = this.getAttribute('data-grade');
            
            // スタートボタンを有効化
            startButton.disabled = false;
        });
    });
    
    // スタートボタンのイベントリスナー
    startButton.addEventListener('click', function() {
        // 保存されたデータがあるか確認
        const savedData = localStorage.getItem('survivalGameData');
        
        if (savedData) {
            // 保存データがある場合は確認画面を表示
            document.getElementById('survival-start-screen').classList.add('hidden');
            document.getElementById('survival-continue-screen').classList.remove('hidden');
        } else {
            // 保存データがない場合は新しいゲームを開始
            startNewGame();
        }
    });
    
    // 続きからボタンのイベントリスナー
    continueButton.addEventListener('click', function() {
        const continueChoice = document.querySelector('input[name="continue-choice"]:checked').value;
        
        if (continueChoice === 'new') {
            // 新しいゲームを開始
            localStorage.removeItem('survivalGameData');
            startNewGame();
        } else {
            // 続きから開始
            loadGame();
        }
    });
    
    // 次へボタンのイベントリスナー
    nextButton.addEventListener('click', function() {
        // 次の問題へ進む
        survivalState.currentQuestion++;
        
        // 10問ごとに装備をゲット
        if (survivalState.currentQuestion % 10 === 0) {
            getEquipment();
            return;
        }
        
        // 次の問題を表示
        showQuestion();
    });
    
    // 辞めるボタンのイベントリスナー
    quitButton.addEventListener('click', function() {
        // ゲームの状態を保存
        saveGame();
        
        // メニュー画面に戻る
        survivalScreen.classList.add('hidden');
        document.getElementById('start-screen').classList.remove('hidden');
    });
    
    // 新しいゲームを開始する関数
    function startNewGame() {
        // ゲーム状態を初期化
        survivalState.score = 0;
        survivalState.lives = 3;
        survivalState.correctAnswers = 0;
        survivalState.wrongAnswers = 0;
        survivalState.currentQuestion = 0;
        survivalState.totalQuestions = 0;
        survivalState.equipment = [];
        survivalState.isGameOver = false;
        
        // 問題データを読み込む
        loadQuestions().then(() => {
            // ゲーム画面に切り替え
            document.getElementById('survival-start-screen').classList.add('hidden');
            document.getElementById('survival-continue-screen').classList.add('hidden');
            document.getElementById('survival-game-screen').classList.remove('hidden');
            
            // 最初の問題を表示
            showQuestion();
        });
    }
    
    // 保存したゲームを読み込む関数
    function loadGame() {
        const savedData = localStorage.getItem('survivalGameData');
        if (savedData) {
            const data = JSON.parse(savedData);
            survivalState.grade = data.grade;
            survivalState.score = data.score;
            survivalState.lives = data.lives;
            survivalState.correctAnswers = data.correctAnswers;
            survivalState.wrongAnswers = data.wrongAnswers;
            survivalState.currentQuestion = data.currentQuestion;
            survivalState.totalQuestions = data.totalQuestions;
            survivalState.equipment = data.equipment;
            
            // 問題データを読み込む
            loadQuestions().then(() => {
                // ゲーム画面に切り替え
                document.getElementById('survival-start-screen').classList.add('hidden');
                document.getElementById('survival-continue-screen').classList.add('hidden');
                document.getElementById('survival-game-screen').classList.remove('hidden');
                
                // 現在の問題を表示
                showQuestion();
            });
        }
    }
    
    // ゲームの状態を保存する関数
    function saveGame() {
        const gameData = {
            grade: survivalState.grade,
            score: survivalState.score,
            lives: survivalState.lives,
            correctAnswers: survivalState.correctAnswers,
            wrongAnswers: survivalState.wrongAnswers,
            currentQuestion: survivalState.currentQuestion,
            totalQuestions: survivalState.totalQuestions,
            equipment: survivalState.equipment
        };
        
        localStorage.setItem('survivalGameData', JSON.stringify(gameData));
    }
    
    // 問題データを読み込む関数
    async function loadQuestions() {
        try {
            // 算数と国語の問題を読み込む
            const mathJapaneseResponse = await fetch('data/questions.json');
            const mathJapaneseData = await mathJapaneseResponse.json();
            
            // 車の豆知識を読み込む
            const carFactsResponse = await fetch('data/car_facts.json');
            const carFactsData = await carFactsResponse.json();
            
            // 問題をまとめる
            const mathQuestions = mathJapaneseData[survivalState.grade].math;
            const japaneseQuestions = mathJapaneseData[survivalState.grade].japanese;
            const carQuestions = carFactsData[survivalState.grade];
            
            // すべての問題を配列にまとめる
            survivalState.questions = [...mathQuestions, ...japaneseQuestions, ...carQuestions];
            
            // 問題をシャッフル
            shuffleArray(survivalState.questions);
            
            survivalState.totalQuestions = survivalState.questions.length;
            
            console.log('問題データを読み込みました:', survivalState.questions);
        } catch (error) {
            console.error('問題データの読み込みに失敗しました:', error);
        }
    }
    
    // 配列をシャッフルする関数
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    // 問題を表示する関数
    function showQuestion() {
        // 結果とヒントをリセット
        resultElement.textContent = "";
        explanationElement.textContent = "";
        
        // UI要素を更新
        scoreElement.textContent = survivalState.score;
        livesElement.textContent = survivalState.lives;
        progressElement.textContent = `${survivalState.currentQuestion + 1}問目`;
        
        // 次へボタンを非表示
        nextButton.style.display = 'none';
        
        // 問題が尽きた場合は最初からシャッフルして再利用
        if (survivalState.currentQuestion >= survivalState.questions.length) {
            shuffleArray(survivalState.questions);
            survivalState.currentQuestion = 0;
        }
        
        // 現在の問題を取得
        survivalState.currentQuestionData = survivalState.questions[survivalState.currentQuestion];
        
        // 問題文を表示
        questionElement.textContent = survivalState.currentQuestionData.question;
        
        // 選択肢を表示
        choicesContainer.innerHTML = '';
        survivalState.currentQuestionData.choices.forEach(choice => {
            const button = document.createElement('button');
            button.classList.add('survival-choice');
            button.textContent = choice;
            button.addEventListener('click', () => checkAnswer(choice));
            choicesContainer.appendChild(button);
        });
    }
    
    // 回答をチェックする関数
    function checkAnswer(selectedAnswer) {
        const isCorrect = selectedAnswer === survivalState.currentQuestionData.answer;
        
        if (isCorrect) {
            // 正解の場合
            survivalState.score += 10;
            survivalState.correctAnswers++;
            
            resultElement.textContent = "正解！";
            resultElement.style.color = "#4CAF50";
        } else {
            // 不正解の場合
            survivalState.wrongAnswers++;
            survivalState.lives--;
            
            resultElement.textContent = "不正解...正解は「" + survivalState.currentQuestionData.answer + "」です。";
            resultElement.style.color = "#FF6B6B";
            
            // ライフがなくなったらゲームオーバー
            if (survivalState.lives <= 0) {
                gameOver();
                return;
            }
        }
        
        // 解説を表示
        explanationElement.textContent = survivalState.currentQuestionData.explanation;
        
        // 選択肢のボタンを無効化
        const buttons = document.querySelectorAll('.survival-choice');
        buttons.forEach(button => {
            button.disabled = true;
            if (button.textContent === survivalState.currentQuestionData.answer) {
                button.style.backgroundColor = "#4CAF50";
                button.style.color = "white";
            } else if (button.textContent === selectedAnswer && selectedAnswer !== survivalState.currentQuestionData.answer) {
                button.style.backgroundColor = "#FF6B6B";
                button.style.color = "white";
            }
        });
        
        // 次へボタンを表示
        nextButton.style.display = 'block';
    }
    
    // 装備を獲得する関数
    function getEquipment() {
        // まだ持っていない装備からランダムに選ぶ
        const availableEquipment = equipmentList.filter(item => 
            !survivalState.equipment.some(eq => eq.id === item.id)
        );
        
        if (availableEquipment.length > 0) {
            // ランダムに装備を選択
            const randomIndex = Math.floor(Math.random() * availableEquipment.length);
            const newEquipment = availableEquipment[randomIndex];
            
            // 装備を追加
            survivalState.equipment.push(newEquipment);
            
            // 装備獲得画面を表示
            document.getElementById('survival-game-screen').classList.add('hidden');
            document.getElementById('survival-equipment-screen').classList.remove('hidden');
            
            // 装備の情報を表示
            document.getElementById('equipment-name').textContent = newEquipment.name;
            document.getElementById('equipment-description').textContent = newEquipment.description;
            document.getElementById('equipment-image').src = newEquipment.image;
            
            // 続けるボタンのイベントリスナー
            document.getElementById('continue-playing').addEventListener('click', function() {
                document.getElementById('survival-equipment-screen').classList.add('hidden');
                document.getElementById('survival-game-screen').classList.remove('hidden');
                showQuestion();
            });
            
            // 終了するボタンのイベントリスナー
            document.getElementById('end-game').addEventListener('click', function() {
                saveGame();
                survivalScreen.classList.add('hidden');
                document.getElementById('start-screen').classList.remove('hidden');
            });
        } else {
            // すべての装備を獲得済みの場合
            alert("すべての装備を獲得しました！おめでとう！");
            showQuestion();
        }
    }
    
    // ゲームオーバー処理
    function gameOver() {
        survivalState.isGameOver = true;
        
        // ゲームオーバー画面を表示
        document.getElementById('survival-game-screen').classList.add('hidden');
        document.getElementById('survival-gameover-screen').classList.remove('hidden');
        
        // 結果を表示
        document.getElementById('final-survival-score').textContent = survivalState.score;
        document.getElementById('final-correct-answers').textContent = survivalState.correctAnswers;
        document.getElementById('final-wrong-answers').textContent = survivalState.wrongAnswers;
        document.getElementById('equipment-count').textContent = survivalState.equipment.length;
        
        // 装備リストを表示
        const equipmentListElement = document.getElementById('equipment-list');
        equipmentListElement.innerHTML = '';
        
        if (survivalState.equipment.length > 0) {
            survivalState.equipment.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item.name;
                equipmentListElement.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            li.textContent = "まだ装備を獲得していません";
            equipmentListElement.appendChild(li);
        }
        
        // 保存データを削除
        localStorage.removeItem('survivalGameData');
        
        // もう一度プレイボタンのイベントリスナー
        document.getElementById('play-again').addEventListener('click', function() {
            document.getElementById('survival-gameover-screen').classList.add('hidden');
            document.getElementById('survival-start-screen').classList.remove('hidden');
        });
        
        // メニューに戻るボタンのイベントリスナー
        document.getElementById('back-to-menu-btn').addEventListener('click', function() {
            survivalScreen.classList.add('hidden');
            document.getElementById('start-screen').classList.remove('hidden');
        });
    }
    
    // サバイバルモードボタンのイベントリスナー
    document.querySelector('.mode-btn[data-mode="survival"]').addEventListener('click', function() {
        document.getElementById('start-screen').classList.add('hidden');
        survivalScreen.classList.remove('hidden');
        document.getElementById('survival-start-screen').classList.remove('hidden');
        document.getElementById('survival-continue-screen').classList.add('hidden');
        document.getElementById('survival-game-screen').classList.add('hidden');
        document.getElementById('survival-equipment-screen').classList.add('hidden');
        document.getElementById('survival-gameover-screen').classList.add('hidden');
    });
});
