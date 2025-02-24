document.addEventListener('DOMContentLoaded', function() {
    const resultDiv = document.getElementById('result');
    const copyButton = document.getElementById('copyButton');
    const copyMessage = document.getElementById('copyMessage');
    const tobiLineError = document.getElementById('tobiLineError');
    const tobareLineError = document.getElementById('tobareLineError');
    const generalError = document.getElementById('generalError');
    const tobiLine = document.getElementById('tobiLine');
    const tobareLine = document.getElementById('tobareLine');

    // エラーメッセージをリセット
    function resetErrors() {
        tobiLineError.classList.add('hidden');
        tobareLineError.classList.add('hidden');
        generalError.classList.add('hidden');
        tobiLine.classList.remove('border-red-500');
        tobareLine.classList.remove('border-red-500');
    }

    // 入力フィールドの変更時にエラーをクリア
    tobiLine.addEventListener('input', function() {
        tobiLineError.classList.add('hidden');
        this.classList.remove('border-red-500');
        generalError.classList.add('hidden');
    });

    tobareLine.addEventListener('input', function() {
        tobareLineError.classList.add('hidden');
        this.classList.remove('border-red-500');
        generalError.classList.add('hidden');
    });

    document.getElementById('generateButton').addEventListener('click', function() {
        resetErrors();
        
        const num1 = tobiLine.value;
        const num2 = tobareLine.value;
        const num3 = document.getElementById('tanki').value || '';
        let hasError = false;

        if (!num1) {
            error1.classList.remove('hidden');
            input1.classList.add('border-red-500');
            hasError = true;
        }

        if (!num2) {
            error2.classList.remove('hidden');
            input2.classList.add('border-red-500');
            hasError = true;
        }

        if (hasError) {
            generalError.classList.remove('hidden');
            return;
        }

        // 買い目の生成処理
        const kaime_line = [num1.toString(), num2.toString() + num3.toString()];
        let m;

        if (kaime_line[0].length > 2) {
            m = kaime_line[0].substring(0, 2) + kaime_line[1] + kaime_line[0].substring(2);
        } else {
            m = kaime_line[0] + kaime_line[1];
        }

        const kaime = [
            `${m[0]}${m[2]}-${m[0]}${m[2]}-${m[1]}${m.substring(4)}`,
            `${m[0]}-${m[1]}-${m[2]}${m.substring(4)}`,
            `${m[2]}-${m.substring(4)}-${m[0]}${m[1]}`
        ];

        // 買い目のラベルを定義
        const labels = ['本線', '抑え', 'ユダ'];

        // 結果を複数行で表示
        resultDiv.innerHTML = kaime
            .map((line, index) => `<div>${labels[index]}: ${line}</div>`)
            .join('');

        // コピーボタンを表示
        copyButton.classList.remove('hidden');
    });

    // コピーボタンの処理を更新
    copyButton.addEventListener('click', async function() {
        // 結果のテキストを改行付きで取得
        const textToCopy = Array.from(resultDiv.children)
            .map(div => div.textContent)
            .join('\n');

        try {
            await navigator.clipboard.writeText(textToCopy);
            copyMessage.classList.remove('hidden');
            setTimeout(() => {
                copyMessage.classList.add('hidden');
            }, 2000);
        } catch (err) {
            console.error('コピーに失敗しました:', err);
        }
    });
});
