const container = document.querySelector("#container");
const songSection = document.createElement("section");
const artistSection = document.createElement("section");
const songH1 = document.createElement("h1");
const artistH1 = document.createElement("h1");
const songsUl = document.createElement("ul");
const artistUl = document.createElement("ul");
const getSongsBtn = document.querySelector("#get_songsBtn");

// Count how many times songs were played
const songCounts = songs.reduce((acc, value) => ({
   ...acc,
   [value.title]: (acc[value.title] || 0) + 1,
}), {});

// Count how many times artists names are listed
const artistCounts = songs.reduce((acc, value) => ({
  ...acc,
  [value.subtitles[0].name] : (acc[value.subtitles[0].name] || 0) + 1
}), {});

const sortedSongs = [];
const sortedArtists = [];

// Create an array to be sorted for songs
for (const value in songCounts) {
    sortedSongs.push([value, songCounts[value]]);
};

// Create an array to be sorted for artists 
for (const value in artistCounts) {
  sortedArtists.push([value, artistCounts[value]]);
};

sortedSongs.sort((a, b) =>  b[1] - a[1] );
sortedArtists.sort((a, b) =>  b[1] - a[1] );

//Leaving this here incase someone would like to check the console to see that top songs & artists were sorted correctly
console.log(sortedArtists)
console.log(sortedSongs)

// Generate HTML to display top 10 songs and artists
function generateHTML() {
  songH1.innerHTML = "Top songs";
  artistH1.innerHTML = "Top artists";

  for(let i=0; i<10; i++) {
    const songLi = document.createElement('li');
    const artistLi = document.createElement('li');
    songLi.innerHTML = `#${i+1}. ${sortedSongs[i][0].replace('Watched', '')} <br> This song was lisented to ${sortedSongs[i][1]} times!`;
    artistLi.innerHTML = `#${i+1}. ${sortedArtists[i][0].replace('- Topic', '')} <br> This artist was listed ${sortedArtists[i][1]} times!`;
    songsUl.appendChild(songLi);
    artistUl.appendChild(artistLi)
  }
  
  songSection.append(songH1, songsUl)
  artistSection.append(artistH1, artistUl)
  container.append(songSection, artistSection);
};

getSongsBtn.addEventListener("click", (e) => {
  document.querySelector("#header").style.display = 'flex'
  getSongsBtn.style.display = "none";
  generateHTML();
});
