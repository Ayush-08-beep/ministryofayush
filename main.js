// AUDIO EASTER EGG -- UNCHANGED
let playlist = [];
Papa.parse('playlist.csv', {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(results) {
        playlist = results.data;
        playlist = playlist.filter(
            row => row['Track URI'] && row['Track Name']
        );
    }
});
document.getElementById('audio-easter-egg').onclick = function() {
    if (playlist.length === 0) {
        document.getElementById('random-song').textContent = 'Playlist is loading or empty.';
        return;
    }
    const pick = playlist[Math.floor(Math.random() * playlist.length)];
    let url = '';
    if (pick['Track URI'].startsWith('spotify:track:')) {
        url = 'https://open.spotify.com/track/' + pick['Track URI'].split(':')[2];
    }
    document.getElementById('random-song').innerHTML =
        `Random Song: <a href="${url}" target="_blank">${pick['Track Name']}</a>`;
};

// DARK MODE TOGGLE -- THE KEY PART!
document.getElementById('dark-mode-toggle').onclick = function() {
    document.body.classList.toggle('dark');
};