// クイズ表示用のJavaScript
document.addEventListener('DOMContentLoaded', function() {
    // クイズのデータ
    const quizData = [
        {
            question: "車のハンドルは何のためにある？",
            choices: ["車を止めるため", "方向を変えるため", "スピードを上げるため"],
            answer: "方向を変えるため",
            explanation: "ハンドルは車の進む方向を変えるために使います。右に回すと右に、左に回すと左に車が曲がります。"
        },
        {
            question: "車のタイヤは何個ついている？",
            choices: ["2個", "4個", "6個"],
            answer: "4個",
            explanation: "普通の車には4つのタイヤがついています。前に2つ、後ろに2つあります。"
        },
        {
            question: "車を止めるときに踏むのは？",
            choices: ["アクセル", "ブレーキ", "クラッチ"],
            answer: "ブレーキ",
            explanation: "車を止めるときはブレーキを踏みます。アクセルはスピードを上げるためのペダルです。"
        },
        {
            question: "日本の有名な車のメーカーは？",
            choices: ["トヨタ", "フェラーリ", "ベンツ"],
            answer: "トヨタ",
            explanation: "トヨタは日本の有名な車メーカーです。フェラーリはイタリア、ベンツ（メルセデス・ベンツ）はドイツの車メーカーです。"
        },
        {
            question: "車の前の明かりを何という？",
            choices: ["テールランプ", "ウインカー", "ヘッドライト"],
            answer: "ヘッドライト",
            explanation: "車の前の明かりはヘッドライトといいます。夜道を照らすために使います。"
        },
        {
            question: "車の色で一番人気があるのは？",
            choices: ["赤", "白", "黒"],
            answer: "白",
            explanation: "世界中で白い車が一番人気があります。目立ちやすく、暑くなりにくいという特徴があります。"
        },
        {
            question: "車の燃料として一般的なのは？",
            choices: ["ガソリン", "牛乳", "ジュース"],
            answer: "ガソリン",
            explanation: "車はガソリンや軽油などの燃料を使って走ります。電気で走る車もあります。"
        },
        {
            question: "車に乗るとき、必ずしなければいけないことは？",
            choices: ["シートベルトをする", "歌を歌う", "お菓子を食べる"],
            answer: "シートベルトをする",
            explanation: "車に乗るときは安全のためにシートベルトをしなければいけません。事故のときに体を守ってくれます。"
        },
        {
            question: "車の速さを表す単位は？",
            choices: ["km/h", "kg", "cm"],
            answer: "km/h",
            explanation: "車の速さは「キロメートル毎時（km/h）」という単位で表します。1時間に何キロメートル進むかを示しています。"
        },
        {
            question: "車の窓を開け閉めするボタンは何ボタン？",
            choices: ["パワーウインドウ", "エアコン", "ワイパー"],
            answer: "パワーウインドウ",
            explanation: "車の窓を電動で開け閉めする装置をパワーウインドウといいます。ボタンを押すだけで窓が動きます。"
        }
    ];

    // DOM要素の取得
    const quizContainer = document.getElementById('quiz-container');
    const questionElement = document.getElementById('quiz-question');
    const choicesContainer = document.getElementById('quiz-choices');
    const resultElement = document.getElementById('quiz-result');
    const explanationElement = document.getElementById('quiz-explanation');
    const nextButton = document.getElementById('next-quiz');
    
    let currentQuiz = 0;
    let score = 0;
    let answered = false;
    
    // クイズを表示する関数
    function showQuiz() {
        // 前回の結果をリセット
        resultElement.textContent = "";
        explanationElement.textContent = "";
        answered = false;
        
        // 現在のクイズを取得
        const currentQuizData = quizData[currentQuiz];
        
        // 問題文を表示
        questionElement.textContent = currentQuizData.question;
        
        // 選択肢を表示
        choicesContainer.innerHTML = "";
        currentQuizData.choices.forEach(choice => {
            const button = document.createElement('button');
            button.textContent = choice;
            button.classList.add('quiz-choice');
            button.addEventListener('click', () => selectAnswer(choice));
            choicesContainer.appendChild(button);
        });
        
        // 次へボタンを非表示
        nextButton.style.display = 'none';
    }
    
    // 回答を選択したときの処理
    function selectAnswer(choice) {
        if (answered) return; // 既に回答済みの場合は何もしない
        
        const currentQuizData = quizData[currentQuiz];
        answered = true;
        
        // 正解かどうかをチェック
        if (choice === currentQuizData.answer) {
            resultElement.textContent = "正解！";
            resultElement.style.color = "#4CAF50";
            score++;
        } else {
            resultElement.textContent = "不正解...正解は「" + currentQuizData.answer + "」です。";
            resultElement.style.color = "#FF6B6B";
        }
        
        // 解説を表示
        explanationElement.textContent = currentQuizData.explanation;
        
        // 次へボタンを表示
        nextButton.style.display = 'block';
        
        // 選択肢のボタンを無効化
        const buttons = document.querySelectorAll('.quiz-choice');
        buttons.forEach(button => {
            button.disabled = true;
            if (button.textContent === currentQuizData.answer) {
                button.style.backgroundColor = "#4CAF50";
                button.style.color = "white";
            } else if (button.textContent === choice && choice !== currentQuizData.answer) {
                button.style.backgroundColor = "#FF6B6B";
                button.style.color = "white";
            }
        });
    }
    
    // 次のクイズへ進む
    nextButton.addEventListener('click', () => {
        currentQuiz++;
        
        if (currentQuiz < quizData.length) {
            showQuiz();
        } else {
            // クイズ終了
            quizContainer.innerHTML = `
                <h2>クイズ終了！</h2>
                <p>あなたのスコア: ${score}/${quizData.length}</p>
                <button id="restart-quiz">もう一度挑戦する</button>
            `;
            
            document.getElementById('restart-quiz').addEventListener('click', () => {
                currentQuiz = 0;
                score = 0;
                location.reload(); // ページをリロードして最初から始める
            });
            
            // リスタートボタンを表示
            document.getElementById('restart-quiz').style.display = 'block';
        }
    });
    
    // 初回のクイズを表示
    showQuiz();
});
