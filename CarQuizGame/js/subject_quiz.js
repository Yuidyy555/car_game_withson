// 教科別クイズ表示用のJavaScript
document.addEventListener('DOMContentLoaded', function() {
    // クイズのデータ（教科別）
    const subjectQuizData = {
        "1": { // 1年生
            "math": [ // 算数
                {
                    question: "3 + 5 = ?",
                    choices: ["7", "8", "9"],
                    answer: "8",
                    explanation: "3つと5つを合わせると8つになります。"
                },
                {
                    question: "10 - 4 = ?",
                    choices: ["4", "6", "8"],
                    answer: "6",
                    explanation: "10から4を引くと6が残ります。"
                },
                {
                    question: "2 + 7 = ?",
                    choices: ["8", "9", "10"],
                    answer: "9",
                    explanation: "2と7を足すと9になります。"
                }
            ],
            "japanese": [ // 国語
                {
                    question: "「やま」を漢字で書くと？",
                    choices: ["川", "山", "森"],
                    answer: "山",
                    explanation: "「やま」は「山」と書きます。"
                },
                {
                    question: "「あめ」はどれ？",
                    choices: ["雨", "雲", "風"],
                    answer: "雨",
                    explanation: "「あめ」は「雨」と書きます。"
                },
                {
                    question: "「ほん」を漢字で書くと？",
                    choices: ["本", "木", "休"],
                    answer: "本",
                    explanation: "「ほん」は「本」と書きます。"
                }
            ],
            "science": [ // 理科
                {
                    question: "植物が育つのに必要なものは？",
                    choices: ["水と光", "砂と石", "氷と雪"],
                    answer: "水と光",
                    explanation: "植物は水と光があれば育ちます。"
                },
                {
                    question: "昼に空が明るいのはなぜ？",
                    choices: ["太陽があるから", "月があるから", "星があるから"],
                    answer: "太陽があるから",
                    explanation: "昼間は太陽の光で空が明るくなります。"
                },
                {
                    question: "虫の体は何個に分かれている？",
                    choices: ["1つ", "2つ", "3つ"],
                    answer: "3つ",
                    explanation: "虫の体は頭・胸・腹の3つに分かれています。"
                }
            ]
        },
        "2": { // 2年生
            "math": [
                {
                    question: "6 × 2 = ?",
                    choices: ["10", "12", "14"],
                    answer: "12",
                    explanation: "6を2回足すと12になります。6×2=12"
                },
                {
                    question: "15 ÷ 3 = ?",
                    choices: ["3", "5", "6"],
                    answer: "5",
                    explanation: "15を3つに分けると、それぞれ5ずつになります。"
                },
                {
                    question: "9 × 3 = ?",
                    choices: ["18", "24", "27"],
                    answer: "27",
                    explanation: "9を3回足すと27になります。9×3=27"
                }
            ],
            "japanese": [
                {
                    question: "「はな」の漢字はどれ？",
                    choices: ["葉", "花", "草"],
                    answer: "花",
                    explanation: "「はな」は「花」と書きます。"
                },
                {
                    question: "「大きい」の反対は？",
                    choices: ["小さい", "高い", "長い"],
                    answer: "小さい",
                    explanation: "「大きい」の反対は「小さい」です。"
                },
                {
                    question: "「学校」の「校」の読み方は？",
                    choices: ["がっ", "こう", "がく"],
                    answer: "こう",
                    explanation: "「学校」の「校」は「こう」と読みます。"
                }
            ],
            "english": [
                {
                    question: "「りんご」は英語で？",
                    choices: ["Orange", "Banana", "Apple"],
                    answer: "Apple",
                    explanation: "「りんご」は英語で「Apple」です。"
                },
                {
                    question: "「こんにちは」は英語で？",
                    choices: ["Hello", "Goodbye", "Thank you"],
                    answer: "Hello",
                    explanation: "「こんにちは」は英語で「Hello」です。"
                },
                {
                    question: "「いぬ」は英語で？",
                    choices: ["Cat", "Dog", "Bird"],
                    answer: "Dog",
                    explanation: "「いぬ」は英語で「Dog」です。"
                }
            ]
        },
        "3": { // 3年生
            "math": [
                {
                    question: "7 × 8 = ?",
                    choices: ["54", "56", "58"],
                    answer: "56",
                    explanation: "7×8=56です。九九の7の段の8番目です。"
                },
                {
                    question: "1/2 + 1/4 = ?",
                    choices: ["2/6", "3/4", "3/6"],
                    answer: "3/4",
                    explanation: "1/2は2/4なので、2/4+1/4=3/4になります。"
                },
                {
                    question: "300 + 50 + 9 = ?",
                    choices: ["359", "459", "539"],
                    answer: "359",
                    explanation: "300と50と9を足すと359になります。"
                }
            ],
            "japanese": [
                {
                    question: "「海」の音読みは？",
                    choices: ["うみ", "かい", "み"],
                    answer: "かい",
                    explanation: "「海」の音読みは「かい」です。例：海水（かいすい）"
                },
                {
                    question: "次の中で主語はどれ？「私は学校へ行きます」",
                    choices: ["私", "学校", "行きます"],
                    answer: "私",
                    explanation: "「私は学校へ行きます」の中で、主語は「私」です。"
                },
                {
                    question: "「春」「夏」「秋」「冬」を漢字で書いたとき、画数が一番多いのは？",
                    choices: ["春", "夏", "秋", "冬"],
                    answer: "春",
                    explanation: "「春」は9画、「夏」は10画、「秋」は9画、「冬」は5画です。「夏」が一番多いです。"
                }
            ],
            "science": [
                {
                    question: "植物の種が発芽するために必要なものは？",
                    choices: ["水と適切な温度", "光と風", "雪と氷"],
                    answer: "水と適切な温度",
                    explanation: "種が発芽するには水と適切な温度が必要です。光は必ずしも必要ではありません。"
                },
                {
                    question: "昆虫の体は何個に分かれている？",
                    choices: ["2つ", "3つ", "4つ"],
                    answer: "3つ",
                    explanation: "昆虫の体は頭部・胸部・腹部の3つに分かれています。"
                },
                {
                    question: "太陽系で一番大きな惑星は？",
                    choices: ["地球", "火星", "木星"],
                    answer: "木星",
                    explanation: "太陽系で一番大きな惑星は木星です。"
                }
            ],
            "social": [ // 社会
                {
                    question: "日本の首都はどこ？",
                    choices: ["大阪", "東京", "京都"],
                    answer: "東京",
                    explanation: "日本の首都は東京です。"
                },
                {
                    question: "地図で北を示す方位記号は？",
                    choices: ["N", "S", "E"],
                    answer: "N",
                    explanation: "地図で北はNorth（ノース）の頭文字「N」で示します。"
                },
                {
                    question: "お米を作る農家の人が田んぼで行う作業は？",
                    choices: ["稲刈り", "種まき", "両方とも"],
                    answer: "両方とも",
                    explanation: "お米を作る農家の人は、田んぼで種まきも稲刈りも行います。"
                }
            ]
        }
    };

    // 車のクイズデータ（番外編）
    const carQuizData = [
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
        }
    ];

    // DOM要素の取得
    const gradeSelector = document.getElementById('grade-selector');
    const subjectSelector = document.getElementById('subject-selector');
    const quizContainer = document.getElementById('quiz-container');
    const questionElement = document.getElementById('quiz-question');
    const choicesContainer = document.getElementById('quiz-choices');
    const resultElement = document.getElementById('quiz-result');
    const explanationElement = document.getElementById('quiz-explanation');
    const nextButton = document.getElementById('next-quiz');
    const carQuizButton = document.getElementById('car-quiz-btn');
    
    let currentGrade = "1";
    let currentSubject = "math";
    let currentQuizData = [];
    let currentQuiz = 0;
    let score = 0;
    let answered = false;
    let isCarQuiz = false;
    
    // 学年選択の変更イベント
    gradeSelector.addEventListener('change', function() {
        currentGrade = this.value;
        updateSubjectOptions();
        resetQuiz();
    });
    
    // 教科選択の変更イベント
    subjectSelector.addEventListener('change', function() {
        currentSubject = this.value;
        resetQuiz();
    });
    
    // 車クイズボタンのイベント
    carQuizButton.addEventListener('click', function() {
        isCarQuiz = true;
        currentQuizData = carQuizData;
        resetQuiz();
        document.getElementById('selectors').style.display = 'none';
        document.getElementById('quiz-title').textContent = '車の豆知識クイズ（番外編）';
    });
    
    // 豆アイコンのクリックイベントも設定
    const beanIcon = document.getElementById('bean-icon');
    if (beanIcon) {
        beanIcon.addEventListener('click', function() {
            isCarQuiz = true;
            currentQuizData = carQuizData;
            resetQuiz();
            document.getElementById('selectors').style.display = 'none';
            document.getElementById('quiz-title').textContent = '車の豆知識クイズ（番外編）';
        });
    }
    
    // 教科の選択肢を更新する関数
    function updateSubjectOptions() {
        const subjects = Object.keys(subjectQuizData[currentGrade]);
        subjectSelector.innerHTML = '';
        
        subjects.forEach(subject => {
            const option = document.createElement('option');
            option.value = subject;
            
            switch(subject) {
                case 'math':
                    option.textContent = '算数';
                    break;
                case 'japanese':
                    option.textContent = '国語';
                    break;
                case 'science':
                    option.textContent = '理科';
                    break;
                case 'social':
                    option.textContent = '社会';
                    break;
                case 'english':
                    option.textContent = '英語';
                    break;
                default:
                    option.textContent = subject;
            }
            
            subjectSelector.appendChild(option);
        });
        
        currentSubject = subjects[0];
    }
    
    // クイズをリセットする関数
    function resetQuiz() {
        currentQuiz = 0;
        score = 0;
        
        if (!isCarQuiz) {
            currentQuizData = subjectQuizData[currentGrade][currentSubject];
        }
        
        showQuiz();
    }
    
    // クイズを表示する関数
    function showQuiz() {
        // 前回の結果をリセット
        resultElement.textContent = "";
        explanationElement.textContent = "";
        answered = false;
        
        // 現在のクイズを取得
        const currentQuizItem = currentQuizData[currentQuiz];
        
        // 問題文を表示
        questionElement.textContent = currentQuizItem.question;
        
        // 選択肢を表示
        choicesContainer.innerHTML = "";
        currentQuizItem.choices.forEach(choice => {
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
        
        const currentQuizItem = currentQuizData[currentQuiz];
        answered = true;
        
        // 正解かどうかをチェック
        if (choice === currentQuizItem.answer) {
            resultElement.textContent = "正解！";
            resultElement.style.color = "#4CAF50";
            score++;
        } else {
            resultElement.textContent = "不正解...正解は「" + currentQuizItem.answer + "」です。";
            resultElement.style.color = "#FF6B6B";
        }
        
        // 解説を表示
        explanationElement.textContent = currentQuizItem.explanation;
        
        // 次へボタンを表示
        nextButton.style.display = 'block';
        
        // 選択肢のボタンを無効化
        const buttons = document.querySelectorAll('.quiz-choice');
        buttons.forEach(button => {
            button.disabled = true;
            if (button.textContent === currentQuizItem.answer) {
                button.style.backgroundColor = "#4CAF50";
                button.style.color = "white";
            } else if (button.textContent === choice && choice !== currentQuizItem.answer) {
                button.style.backgroundColor = "#FF6B6B";
                button.style.color = "white";
            }
        });
    }
    
    // 次のクイズへ進む
    nextButton.addEventListener('click', () => {
        currentQuiz++;
        
        if (currentQuiz < currentQuizData.length) {
            showQuiz();
        } else {
            // クイズ終了
            quizContainer.innerHTML = `
                <h2>クイズ終了！</h2>
                <p>あなたのスコア: ${score}/${currentQuizData.length}</p>
                <button id="restart-quiz">もう一度挑戦する</button>
                <button id="back-to-select">別の問題を選ぶ</button>
            `;
            
            document.getElementById('restart-quiz').addEventListener('click', () => {
                if (isCarQuiz) {
                    isCarQuiz = true;
                    currentQuizData = carQuizData;
                }
                resetQuiz();
                
                // DOM要素を再構築
                quizContainer.innerHTML = `
                    <h2 id="quiz-question"></h2>
                    <div id="quiz-choices"></div>
                    <p id="quiz-result"></p>
                    <p id="quiz-explanation"></p>
                    <button id="next-quiz">次の問題</button>
                `;
                
                // DOM要素を再取得
                questionElement = document.getElementById('quiz-question');
                choicesContainer = document.getElementById('quiz-choices');
                resultElement = document.getElementById('quiz-result');
                explanationElement = document.getElementById('quiz-explanation');
                nextButton = document.getElementById('next-quiz');
                
                // イベントリスナーを再設定
                nextButton.addEventListener('click', () => {
                    currentQuiz++;
                    if (currentQuiz < currentQuizData.length) {
                        showQuiz();
                    } else {
                        // クイズ終了時の処理（再帰的に呼ばれる）
                    }
                });
            });
            
            document.getElementById('back-to-select').addEventListener('click', () => {
                location.reload(); // ページをリロード
            });
        }
    });
    
    // 初期化
    updateSubjectOptions();
    resetQuiz();
});
