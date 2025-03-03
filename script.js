let previousMMR = {};

async function fetchMMR() {
    let playerId = document.getElementById("playerId").value;
    if (!playerId) {
        alert("الرجاء إدخال اسم المستخدم");
        return;
    }

    try {
        let response = await fetch(`https://api.tracker.gg/api/v2/rocket-league/standard/profile/epic/${playerId}`);
        let data = await response.json();

        if (!data || !data.data || data.errors) {
            alert("خطأ في جلب البيانات، تأكد من صحة المعرف");
            return;
        }

        let mmrData = data.data.segments.filter(segment => segment.type === "peak-rating");
        let mmrDisplay = document.getElementById("mmrDisplay");
        mmrDisplay.innerHTML = "<h2>MMR الحالي:</h2>";

        mmrData.forEach(segment => {
            let mode = segment.metadata.name;
            let mmr = segment.stats.peakRating.value;
            previousMMR[mode] = mmr;
            mmrDisplay.innerHTML += `<p>${mode}: ${mmr}</p>`;
        });
    } catch (error) {
        alert("حدث خطأ أثناء جلب البيانات.");
        console.error(error);
    }
}

function updateMMR() {
    let mmrChangeDisplay = document.getElementById("mmrChange");
    mmrChangeDisplay.innerHTML = "<h2>التحديث بعد الفوز:</h2>";

    for (let mode in previousMMR) {
        let newMMR = previousMMR[mode] + 20; // يفترض الفوز يعطي 20 نقطة
        let change = newMMR - previousMMR[mode];
        mmrChangeDisplay.innerHTML += `<p>${mode}: ${previousMMR[mode]} ➝ ${newMMR} (+${change})</p>`;
        previousMMR[mode] = newMMR;
    }
}
