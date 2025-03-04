document.addEventListener("DOMContentLoaded", function () {
    const API_KEY = "6c469271-5b34-40cb-9992-82012cc117f0"; // Replace with your own key if needed
    const PLAYER_ID = "mk_cio";
    const API_URL = `https://api.tracker.gg/api/v2/rocket-league/standard/profile/epic/${PLAYER_ID}`;

    async function fetchMMR() {
        try {
            const response = await fetch(API_URL, {
                headers: { "TRN-Api-Key": API_KEY },
            });
            const data = await response.json();
            displayRanks(data);
        } catch (error) {
            document.getElementById("ranks").innerHTML = "<p>Failed to load MMR.</p>";
        }
    }

    function displayRanks(data) {
        if (!data || !data.data || !data.data.segments) {
            document.getElementById("ranks").innerHTML = "<p>No data found.</p>";
            return;
        }

        const ranks = data.data.segments.filter(segment => segment.type === "playlist");
        const rankInfo = ranks.map(rank => `<p>${rank.metadata.name}: ${rank.stats.rating.value} MMR</p>`).join("");
        
        document.getElementById("ranks").innerHTML = rankInfo;
    }

    fetchMMR();
});
