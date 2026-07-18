// DOM Element Selections
const play = document.getElementById('play');
const progressBar = document.getElementById('progressBar');
const shuffle = document.getElementById('shuffle');
const repeat = document.getElementById('repeat');
const nowBar = document.querySelector('.now-bar');
const forward = document.getElementById('forward');
const backward = document.getElementById('backward');
const searchInput = document.querySelector('.input-box'); // Matched to HTML class

// Volume Element
const volumeBar = document.getElementById('volumeBar');
const volumeIcon = document.getElementById('volumeIcon');

// Playlist Elements
const addPlaylistBtn = document.getElementById('addPlaylistBtn');
const createPlaylistAction = document.getElementById('createPlaylistAction');
const playlistList = document.getElementById('playlistList');

// Auth Modal UI DOM Elements
const authModal = document.getElementById('authOverlay'); // Matched to HTML id="authOverlay"
const closeModalBtn = document.getElementById('closeModalBtn');
const authProfileArea = document.getElementById('authProfileArea');

// Unified Tab Controls
const tabLogin = document.getElementById('tabLogin');
const tabSignup = document.getElementById('tabSignup');
const viewLogin = document.getElementById('loginFormBox'); // Matched to HTML id="loginFormBox"
const viewSignup = document.getElementById('signupFormBox'); // Matched to HTML id="signupFormBox"

// Auth Form Elements
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

// Audio and State Initialization
const audio = new Audio();
let currentSong = 1; 
let songOnRepeat = false;
let songOnShuffle = false;
let activePlaylistIndex = null;

// Track history array
let recentlyPlayed = [];

// Local Storage simulation for user accounts
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let users = JSON.parse(localStorage.getItem('users')) || [];

let playlists = currentUser ? (currentUser.playlists || [{ name: "Favorites", songs: [] }]) : [{ name: "Favorites", songs: [] }];

const songs = [
    { id: 1, songName: 'Body to Body', songDes: 'Energetic track with upbeat rhythms and dynamic vocals', songImage: 'Images/Arirang.jpg', songPath: 'Audios/01 - BTS - Body to Body.mp3' },
    { id: 2, songName: 'Hooligan', songDes: 'Raw energy featuring powerful beats and distinct rap flow', songImage: 'Images/Arirang.jpg', songPath: 'Audios/02 - BTS - Hooligan.mp3' },
    { id: 3, songName: 'Aliens', songDes: 'Atmospheric synth soundscapes with modern hip-hop elements', songImage: 'Images/Arirang.jpg', songPath: 'Audios/03 - BTS - Aliens.mp3' },
    { id: 4, songName: 'FYA', songDes: 'High-energy anthem with intense basslines and explosive hooks', songImage: 'Images/Arirang.jpg', songPath: 'Audios/04 - BTS - FYA.mp3' },
    { id: 5, songName: '2.0', songDes: 'Futuristic production blending signature vocal harmonies', songImage: 'Images/Arirang.jpg', songPath: 'Audios/05 - BTS - 2.0.mp3' },
    { id: 6, songName: 'No. 29', songDes: 'Melodious rhythm track exploring personal reflection', songImage: 'Images/Arirang.jpg', songPath: 'Audios/06 - BTS - No. 29.mp3' },
    { id: 7, songName: 'SWIM', songDes: 'Smooth, wavy production with relaxing pop-R&B vibes', songImage: 'Images/Arirang.jpg', songPath: 'Audios/07 - BTS - SWIM.mp3' },
    { id: 8, songName: 'Merry Go Round', songDes: 'Playful melody with rhythmic beats and upbeat vocals', songImage: 'Images/Arirang.jpg', songPath: 'Audios/08 - BTS - Merry Go Round.mp3' },
    { id: 9, songName: 'NORMAL', songDes: 'Laid-back groove featuring mid-tempo rhythms and smooth vocals', songImage: 'Images/Arirang.jpg', songPath: 'Audios/09 - BTS - NORMAL.mp3' },
    { id: 10, songName: 'Like Animals', songDes: 'Intense rhythm driven by heavy percussion and sharp verses', songImage: 'Images/Arirang.jpg', songPath: 'Audios/10 - BTS - Like Animals.mp3' },
    { id: 11, songName: 'They Don\'t Know About Us', songDes: 'Heartfelt track driven by warm acoustic instrumentation', songImage: 'Images/Arirang.jpg', songPath: 'Audios/11 - BTS - they dont know about us.mp3' },
    { id: 12, songName: 'One More Night', songDes: 'Emotional R&B tune with expressive vocal range', songImage: 'Images/Arirang.jpg', songPath: 'Audios/12 - BTS - One More Night.mp3' },
    { id: 13, songName: 'Please', songDes: 'Sultry melody pairing smooth synths with acoustic accents', songImage: 'Images/Arirang.jpg', songPath: 'Audios/13 - BTS - Please.mp3' },
    { id: 14, songName: 'Into the Sun', songDes: 'Uplifting track filled with soaring melodies and bright synths', songImage: 'Images/Arirang.jpg', songPath: 'Audios/14 - BTS - Into the Sun.mp3' },
    { id: 15, songName: 'The Truth Untold', songDes: 'Emotional ballad featuring vocal line and Steve Aoki', songImage: 'Images/Love Yourself.jpg', songPath: 'Audios/the truth untold.mp3' },
    { id: 16, songName: 'We Are Bulletproof Pt.2', songDes: 'Classic hip-hop track showcasing raw energy and confidence', songImage: 'Images/we are bulletproof pt2.jpg', songPath: 'Audios/we are bullet proof pt2.mp3' },
    { id: 17, songName: 'Your Eyes Tell', songDes: 'Touching Japanese ballad with powerful climax vocals', songImage: 'Images/BTS - MAP OF THE SOUL _ 7 ~THE JOURNEY_.jpg', songPath: 'Audios/your eyes tell.mp3' },
    { id: 18, songName: '00:00 (Zero O\'Clock)', songDes: 'Comforting vocal unit track about hope and fresh starts', songImage: 'Images/BTS - MAP OF THE SOUL _ 7 ~THE JOURNEY_.jpg', songPath: 'Audios/zero oclock.mp3' },
    { id: 19, songName: 'Mic Drop', songDes: 'Hard-hitting trap anthem with explosive rap and swagger', songImage: 'Images/Love Yourself.jpg', songPath: 'Audios/mic drop.mp3' },
    { id: 20, songName: 'Make It Right', songDes: 'Smooth contemporary pop track co-written by Ed Sheeran', songImage: 'Images/Map of the Soul Persona.jpg', songPath: 'Audios/make it right.mp3' },
    { id: 21, songName: 'Love Myself', songDes: 'Uplifting pop track exploring self-love and inner acceptance', songImage: 'Images/Love Yourself.jpg', songPath: 'Audios/love myself.mp3' },
    { id: 22, songName: 'Let Go', songDes: 'Emotional Japanese pop ballad about bittersweet goodbyes', songImage: 'Images/Face Yourself.jpg', songPath: 'Audios/let go.mp3' },
    { id: 23, songName: 'Just One Day', songDes: 'Sweet R&B track expressing a wish for one day with a lover', songImage: 'Images/Skool Luv Affair.jpg', songPath: 'Audios/just one day.mp3' },
    { id: 24, songName: 'Jump', songDes: 'High-energy old-school hip-hop track full of youthful spirit', songImage: 'Images/Skool Luv Affair.jpg', songPath: 'Audios/jump.mp3' },
    { id: 25, songName: 'IDOL', songDes: 'Explosive, festive dance track blending traditional beats with EDM', songImage: 'Images/Love Yourself.jpg', songPath: 'Audios/idol.mp3' },
    { id: 26, songName: 'I Need U', songDes: 'Breakthrough emotional dance-pop track with tragic melodies', songImage: 'Images/The Most Beautiful Moment in Life.jpg', songPath: 'Audios/i need u.mp3' },
    { id: 27, songName: 'Home', songDes: 'R&B pop track dedicated to fans as a place of comfort', songImage: 'Images/Map of the Soul Persona.jpg', songPath: 'Audios/home.mp3' },
    { id: 28, songName: 'Go Go', songDes: 'Trendy reggae-pop track with a playful critique of consumerism', songImage: 'Images/Love Yourself.jpg', songPath: 'Audios/go go.mp3' },
    { id: 29, songName: 'Fire', songDes: 'Intense, explosive EDM stadium anthem with powerful choreography', songImage: 'Images/The Most Beautiful Moment in Life.jpg', songPath: 'Audios/fire.mp3' },
    { id: 30, songName: 'Fake Love', songDes: 'Dark, emotional grunge-rock pop track about unfulfilled love', songImage: 'Images/Love Yourself.jpg', songPath: 'Audios/fake love.mp3' },
    { id: 31, songName: 'Dope', songDes: 'Fast-paced, brass-heavy hip-hop track praising hard work', songImage: 'Images/The Most Beautiful Moment in Life.jpg', songPath: 'Audios/dope.mp3' },
    { id: 32, songName: 'DNA', songDes: 'Bright, vibrant electronic pop track with whistle-driven hooks', songImage: 'Images/Love Yourself.jpg', songPath: 'Audios/dna.mp3' },
    { id: 33, songName: 'Butterfly', songDes: 'Delicate acoustic pop track with ethereal vocal performances', songImage: 'Images/The Most Beautiful Moment in Life.jpg', songPath: 'Audios/butterfly.mp3' },
    { id: 34, songName: 'House of Cards', songDes: 'Dark, dramatic vocal unit track with orchestral elements', songImage: 'Images/The Most Beautiful Moment in Life.jpg', songPath: 'Audios/house of cards.mp3' },
    { id: 35, songName: 'Miss Right', songDes: 'Smooth, breezy R&B track describing an ideal type', songImage: 'Images/Skool Luv Affair.jpg', songPath: 'Audios/miss right.mp3' },
    { id: 36, songName: 'Boy With Luv', songDes: 'Vibrant, infectious funk-pop track featuring Halsey', songImage: 'Images/Map of the Soul Persona.jpg', songPath: 'Audios/boy with luv.mp3' },
    { id: 37, songName: 'Boy In Luv', songDes: 'Aggressive hip-hop rock track detailing schoolboy romance', songImage: 'Images/Skool Luv Affair.jpg', songPath: 'Audios/boy in luv.mp3' },
    { id: 38, songName: 'Blood Sweat & Tears', songDes: 'Moombahton trap track detailing dangerous temptation', songImage: 'Images/Wings.jpg', songPath: 'Audios/blood sweat tears.mp3' },
    { id: 39, songName: 'Black Swan', songDes: 'Artistic emo-hip hop track exploring a dancer\'s fear of losing passion', songImage: 'Images/BTS - MAP OF THE SOUL _ 7 ~THE JOURNEY_.jpg', songPath: 'Audios/black swan.mp3' },
    { id: 40, songName: 'Airplane Pt.2', songDes: 'Latin-pop inspired track following global touring life', songImage: 'Images/Love Yourself.jpg', songPath: 'Audios/airplane pt2.mp3' },
    { id: 41, songName: 'Whalien 52', songDes: 'Comforting alternative hip-hop track using the loneliest whale metaphor', songImage: 'Images/The Most Beautiful Moment in Life.jpg', songPath: 'Audios/whalien 52.mp3' },
    { id: 42, songName: 'Still With You', songDes: 'Sultry, jazz-infused lo-fi solo ballad by Jungkook', songImage: 'Images/Still With You.jpg', songPath: 'Audios/still with you.mp3' },
    { id: 43, songName: 'Stay Gold', songDes: 'Warm, uplifting Japanese pop track providing hope', songImage: 'Images/BTS - MAP OF THE SOUL _ 7 ~THE JOURNEY_.jpg', songPath: 'Audios/stay gold.mp3' },
    { id: 44, songName: 'Spring Day', songDes: 'Legendary, nostalgic alternative rock ballad about longing and grief', songImage: 'Images/You Never Walk Alone.jpg', songPath: 'Audios/spring day.mp3' },
    { id: 45, songName: 'Heartbeat', songDes: 'Cinematic soundtrack with driving percussion from BTS World', songImage: 'Images/BTS World.jpg', songPath: 'Audios/heartbeat.mp3' },
    { id: 46, songName: 'So What', songDes: 'High-octane EDM track celebrating youth and leaving worries behind', songImage: 'Images/Love Yourself.jpg', songPath: 'Audios/so what.mp3' },
    { id: 47, songName: 'Silver Spoon (Baepsae)', songDes: 'Legendary hip-hop track targeting generational inequalities', songImage: 'Images/The Most Beautiful Moment in Life.jpg', songPath: 'Audios/baepsae.mp3' },
    { id: 48, songName: 'Save ME', songDes: 'Tropical house and electro-pop track pleading for salvation', songImage: 'Images/The Most Beautiful Moment in Life.jpg', songPath: 'Audios/save me.mp3' },
    { id: 49, songName: 'Run', songDes: 'Rock-pop dance track chasing love despite the pain', songImage: 'Images/The Most Beautiful Moment in Life.jpg', songPath: 'Audios/run.mp3' },
    { id: 50, songName: 'Pied Piper', songDes: 'Disco-pop track teasing fans about their dedication', songImage: 'Images/Love Yourself.jpg', songPath: 'Audios/pied piper.mp3' },
    { id: 51, songName: 'Not Today', songDes: 'Powerful, military-style synth-pop underdog anthem', songImage: 'Images/You Never Walk Alone.jpg', songPath: 'Audios/not today.mp3' },
    { id: 52, songName: 'N.O', songDes: 'Early hip-hop track critiquing the rigid educational system', songImage: 'Images/O!RUL8,2.jpg', songPath: 'Audios/no.mp3' },
    { id: 53, songName: 'No More Dream', songDes: 'The definitive 90s-style hip-hop debut track questioning dreams', songImage: 'Images/2 Cool 4 Skool.jpg', songPath: 'Audios/no more dream.mp3' },
    { id: 54, songName: 'Mikrokosmos', songDes: 'A glittering, stadium-scale pop track dedicated to human light', songImage: 'Images/Map of the Soul Persona.jpg', songPath: 'Audios/mikrokosmos.mp3' }
];

let order = [...songs];
if (order.length > 0) {
    audio.src = order[0].songPath;
}

// Dynamic Music Card Generation Logic
const renderMusicCards = (songsToRender = songs) => {
    const popularContainer = document.getElementById('popularSongsContainer');
    const recommendedContainer = document.getElementById('recommendedSongsContainer');

    if (popularContainer) popularContainer.innerHTML = '';
    if (recommendedContainer) recommendedContainer.innerHTML = '';

    if (songsToRender.length === 0) {
        if (popularContainer) popularContainer.innerHTML = `<p style="color: #b3b3b3; padding: 1rem;">No matching tracks found</p>`;
        return;
    }

    songsToRender.forEach((song) => {
        const card = document.createElement('div');
        card.className = 'music-card';

        card.innerHTML = `
            <div class="card-img-container">
                <img src="${song.songImage}" alt="${song.songName}">
                <div class="playMusic music-play-btn" id="${song.id}">
                    <i class="fa-solid fa-play"></i>
                </div>
                <div class="add-to-playlist-btn">
                    <i class="fa-solid fa-plus"></i>
                </div>
            </div>
            <div class="img-title">${song.songName}</div>
            <div class="img-description">${song.songDes}</div>
        `;

        const playBtn = card.querySelector('.playMusic');
        if (playBtn) {
            playBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                makeAllPlay();
                
                const songId = parseInt(playBtn.id);
                const foundIndex = order.findIndex((s) => s.id === songId);
                currentSong = foundIndex !== -1 ? foundIndex + 1 : 1;

                const playedSong = order[currentSong - 1];
                audio.src = playedSong.songPath;
                audio.currentTime = 0;
                audio.play();
                setMasterPlayIcon(true);
                updateNowBar();
                addToRecentlyPlayed(playedSong);

                const icon = playBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-play');
                    icon.classList.add('fa-pause');
                }
            });
        }

        const addBtn = card.querySelector('.add-to-playlist-btn');
        if (addBtn) {
            addBtn.onclick = (e) => {
                e.stopPropagation();
                addSongToPlaylist(song);
            };
        }

        if (song.id % 2 !== 0) {
            if (popularContainer) popularContainer.appendChild(card);
        } else {
            if (recommendedContainer) recommendedContainer.appendChild(card);
        }
    });
};

// History State Management Engine
const addToRecentlyPlayed = (songObj) => {
    if (!songObj) return;
    recentlyPlayed = recentlyPlayed.filter(item => item.id !== songObj.id);
    recentlyPlayed.unshift(songObj);
    if (recentlyPlayed.length > 6) recentlyPlayed.pop();
    renderRecentlyPlayed();
};

const renderRecentlyPlayed = () => {
    const container = document.getElementById('recentlyPlayedContainer');
    if (!container) return;
    container.innerHTML = '';
    
    if (recentlyPlayed.length === 0) {
        container.innerHTML = `<p style="color: #b3b3b3; padding: 1rem; font-size: 0.9rem;">Songs you play will appear here.</p>`;
        return;
    }
    
    recentlyPlayed.forEach((song) => {
        const card = document.createElement('div');
        card.className = 'music-card';
        
        card.innerHTML = `
            <div class="card-img-container">
                <img src="${song.songImage}" alt="${song.songName}">
                <div class="playMusic music-play-btn" id="recent-${song.id}">
                    <i class="fa-solid fa-play"></i>
                </div>
            </div>
            <div class="img-title">${song.songName}</div>
            <div class="img-description">${song.songDes}</div>
        `;
        
        card.querySelector('.playMusic').addEventListener('click', (e) => {
            e.stopPropagation();
            makeAllPlay();
            const foundIndex = order.findIndex((s) => s.id === song.id);
            currentSong = foundIndex !== -1 ? foundIndex + 1 : 1;
            audio.src = song.songPath;
            audio.currentTime = 0;
            audio.play();
            setMasterPlayIcon(true);
            updateNowBar();
            addToRecentlyPlayed(song);
        });
        
        container.appendChild(card);
    });
};

// Authentication System Logic
const openModal = (showSignup = false) => {
    if (!authModal) return;
    authModal.classList.add('show-modal');
    switchTab(showSignup);
};

const closeModal = () => {
    if (!authModal) return;
    authModal.classList.remove('show-modal');
    if (loginForm) loginForm.reset();
    if (signupForm) signupForm.reset();
};

const switchTab = (toSignup = false) => {
    if (toSignup) {
        if (tabLogin) tabLogin.classList.remove('active-tab');
        if (tabSignup) tabSignup.classList.add('active-tab');
        if (viewLogin) viewLogin.classList.add('hidden-view');
        if (viewSignup) viewSignup.classList.remove('hidden-view');
    } else {
        if (tabSignup) tabSignup.classList.remove('active-tab');
        if (tabLogin) tabLogin.classList.add('active-tab');
        if (viewSignup) viewSignup.classList.add('hidden-view');
        if (viewLogin) viewLogin.classList.remove('hidden-view');
    }
};

const updateAuthUI = () => {
    if (!authProfileArea) return;
    if (currentUser) {
        authProfileArea.innerHTML = `
            <div class="user-logged-info" style="display: flex; align-items: center; gap: 0.5rem; color: #fff;">
                <img src="Images/Arirang.jpg" alt="Profile" style="width: 32px; height: 32px; border-radius: 50%;">
                <span>${currentUser.username}</span>
                <button id="logoutBtn" class="logout-btn" title="Log Out" style="background: none; border: none; color: #b3b3b3; cursor: pointer; font-size: 1.1rem;"><i class="fa-solid fa-right-from-bracket"></i></button>
            </div>
        `;
        document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    } else {
        authProfileArea.innerHTML = `
            <span id="signupNavBtn" class="signup-toggle" style="cursor: pointer; margin-right: 1rem; color: #b3b3b3;">Sign Up</span>
            <button id="loginNavBtn" class="login-btn">Log In</button>
        `;
        document.getElementById('loginNavBtn').addEventListener('click', () => openModal(false));
        document.getElementById('signupNavBtn').addEventListener('click', () => openModal(true));
    }
};

if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('signupName').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const password = document.getElementById('signupPassword').value;

        if (users.some(user => user.email === email)) {
            alert('An account with this email already exists.');
            return;
        }

        const newUser = { username, email, password, playlists: [{ name: "Favorites", songs: [] }] };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        currentUser = newUser;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        playlists = currentUser.playlists;

        alert(`Account created successfully! Welcome ${username}.`);
        closeModal();
        updateAuthUI();
        renderPlaylists();
    });
}

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;

        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            playlists = currentUser.playlists || [{ name: "Favorites", songs: [] }];
            closeModal();
            updateAuthUI();
            renderPlaylists();
        } else {
            alert('Invalid email or password.');
        }
    });
}

const handleLogout = () => {
    if (currentUser) {
        const userIndex = users.findIndex(u => u.email === currentUser.email);
        if (userIndex !== -1) {
            users[userIndex].playlists = playlists;
            localStorage.setItem('users', JSON.stringify(users));
        }
    }
    currentUser = null;
    localStorage.removeItem('currentUser');
    playlists = [{ name: "Favorites", songs: [] }];
    updateAuthUI();
    renderPlaylists();
};

const savePlaylistsToUser = () => {
    if (currentUser) {
        currentUser.playlists = playlists;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        const userIndex = users.findIndex(u => u.email === currentUser.email);
        if (userIndex !== -1) {
            users[userIndex].playlists = playlists;
            localStorage.setItem('users', JSON.stringify(users));
        }
    }
};

// Helper Functions
const makeAllPlay = () => {
    Array.from(document.getElementsByClassName('playMusic')).forEach((element) => {
        const icon = element.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
        }
    });
};

const updateNowBar = () => {
    const activeSong = order[currentSong - 1];
    if (activeSong && nowBar) {
        const img = nowBar.querySelector('img');
        const title = nowBar.querySelector('.img-title-info');
        const desc = nowBar.querySelector('.img-des-info');
        if (img) img.src = activeSong.songImage;
        if (title) title.innerText = activeSong.songName;
        if (desc) desc.innerText = activeSong.songDes;
    }
};

const setMasterPlayIcon = (isPlaying) => {
    if (!play) return;
    if (isPlaying) {
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');
    } else {
        play.classList.remove('fa-circle-pause');
        play.classList.add('fa-circle-play');
    }
};

const shuffleSongs = (originalOrder) => {
    const shuffled = [...originalOrder];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

const playNextSong = () => {
    if (!songOnRepeat) currentSong = currentSong >= order.length ? 1 : currentSong + 1;
    const nextSong = order[currentSong - 1];
    if (nextSong) {
        audio.src = nextSong.songPath;
        audio.currentTime = 0;
        audio.play();
        setMasterPlayIcon(true);
        updateNowBar();
        addToRecentlyPlayed(nextSong);
    }
};

const playPrevSong = () => {
    currentSong = currentSong <= 1 ? order.length : currentSong - 1;
    const prevSong = order[currentSong - 1];
    if (prevSong) {
        audio.src = prevSong.songPath;
        audio.currentTime = 0;
        audio.play();
        setMasterPlayIcon(true);
        updateNowBar();
        addToRecentlyPlayed(prevSong);
    }
};

// Play/Pause Toggle
if (play) {
    play.addEventListener('click', () => {
        if (audio.paused || audio.currentTime <= 0) {
            audio.play();
            setMasterPlayIcon(true);
            if (order[currentSong - 1]) addToRecentlyPlayed(order[currentSong - 1]);
        } else {
            audio.pause();
            setMasterPlayIcon(false);
        }
    });
}

// Progress Bar Tracking
audio.addEventListener('timeupdate', () => {
    if (audio.duration && progressBar) {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progress;
        progressBar.style.background = `linear-gradient(to right, #1ed760 ${progress}%, #333 ${progress}%)`;
    }
});

if (progressBar) {
    progressBar.addEventListener('input', function () {
        if (audio.duration) audio.currentTime = (this.value * audio.duration) / 100;
    });
}

// Shuffle & Repeat Handlers
if (shuffle) {
    shuffle.addEventListener('click', () => {
        const currentlyPlayingTrack = order[currentSong - 1];
        if (!songOnShuffle) {
            songOnShuffle = true;
            songOnRepeat = false;
            shuffle.classList.add('active');
            if (repeat) repeat.classList.remove('active');
            order = shuffleSongs(songs);
        } else {
            songOnShuffle = false;
            shuffle.classList.remove('active');
            order = [...songs];
        }
        if (currentlyPlayingTrack) currentSong = order.findIndex((s) => s.id === currentlyPlayingTrack.id) + 1;
    });
}

if (repeat) {
    repeat.addEventListener('click', () => {
        if (!songOnRepeat) {
            songOnRepeat = true;
            songOnShuffle = false;
            repeat.classList.add('active');
            if (shuffle) shuffle.classList.remove('active');
        } else {
            songOnRepeat = false;
            repeat.classList.remove('active');
        }
    });
}

if (forward) forward.addEventListener('click', playNextSong);
if (backward) backward.addEventListener('click', playPrevSong);
audio.addEventListener('ended', playNextSong);

// Volume Controls
if (volumeBar) {
    volumeBar.addEventListener('input', (e) => {
        const val = e.target.value;
        audio.volume = val / 100;
        updateVolumeIcon(val);
    });
}

function updateVolumeIcon(value) {
    if (!volumeIcon) return;
    if (value == 0) volumeIcon.className = 'fa-solid fa-volume-xmark';
    else if (value < 50) volumeIcon.className = 'fa-solid fa-volume-low';
    else volumeIcon.className = 'fa-solid fa-volume-high';
}

let lastVolume = 100;
if (volumeIcon) {
    volumeIcon.addEventListener('click', () => {
        if (audio.volume > 0) {
            lastVolume = volumeBar ? volumeBar.value : 100;
            audio.volume = 0;
            if (volumeBar) volumeBar.value = 0;
            updateVolumeIcon(0);
        } else {
            audio.volume = lastVolume / 100;
            if (volumeBar) volumeBar.value = lastVolume;
            updateVolumeIcon(lastVolume);
        }
    });
}

// Search Filter Event Listener
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const filteredSongs = songs.filter((song) => {
            return song.songName.toLowerCase().includes(query) || song.songDes.toLowerCase().includes(query);
        });
        renderMusicCards(filteredSongs);
    });
}

// Playlist Management Logic
function createPlaylist() {
    if (!currentUser) {
        alert('Please log in to create personal playlists!');
        openModal(false);
        return;
    }
    const name = prompt('Enter Playlist Name:', `My Playlist #${playlists.length + 1}`);
    if (name && name.trim() !== '') {
        playlists.push({ name: name.trim(), songs: [] });
        savePlaylistsToUser();
        renderPlaylists();
    }
}

function addSongToPlaylist(songObj) {
    if (!currentUser) {
        alert('Please log in to add tracks to playlists!');
        openModal(false);
        return;
    }
    if (playlists.length === 0) {
        createPlaylist();
        return;
    }

    const playlistNames = playlists.map((p, idx) => `${idx + 1}. ${p.name}`).join('\n');
    const choice = prompt(`Add "${songObj.songName}" to which playlist?\n\n${playlistNames}\n\nEnter number:`);
    const selectedIndex = parseInt(choice) - 1;

    if (!isNaN(selectedIndex) && playlists[selectedIndex]) {
        const targetPlaylist = playlists[selectedIndex];
        if (!targetPlaylist.songs.some((s) => s.id === songObj.id)) {
            targetPlaylist.songs.push(songObj);
            savePlaylistsToUser();
            alert(`Added "${songObj.songName}" to "${targetPlaylist.name}"!`);
            renderPlaylists();
        } else {
            alert(`"${songObj.songName}" is already in "${targetPlaylist.name}".`);
        }
    }
}

// Exposed to global scope for dynamic element inline attributes
window.removeSongFromPlaylist = function(playlistIndex, songId) {
    const targetPlaylist = playlists[playlistIndex];
    if (!targetPlaylist) return;

    targetPlaylist.songs = targetPlaylist.songs.filter((song) => song.id !== songId);
    savePlaylistsToUser();
    renderPlaylists();

    if (activePlaylistIndex === playlistIndex) order = [...targetPlaylist.songs];
};

window.playPlaylist = function(playlistIndex) {
    const playlist = playlists[playlistIndex];
    if (!playlist || playlist.songs.length === 0) {
        alert(`"${playlist ? playlist.name : 'Playlist'}" is empty.`);
        return;
    }
    activePlaylistIndex = playlistIndex;
    order = [...playlist.songs];
    currentSong = 1;
    
    const firstSong = order[0];
    audio.src = firstSong.songPath;
    audio.currentTime = 0;
    audio.play();
    setMasterPlayIcon(true);
    updateNowBar();
    addToRecentlyPlayed(firstSong);
};

window.playSinglePlaylistSong = function(playlistIndex, songId) {
    activePlaylistIndex = playlistIndex;
    order = [...playlists[playlistIndex].songs];
    currentSong = order.findIndex((s) => s.id === songId) + 1;
    
    const targetSong = order[currentSong - 1];
    audio.src = targetSong.songPath;
    audio.currentTime = 0;
    audio.play();
    setMasterPlayIcon(true);
    updateNowBar();
    addToRecentlyPlayed(targetSong);
};

function renderPlaylists() {
    if (!playlistList) return;
    playlistList.innerHTML = '';
    
    playlists.forEach((playlist, pIndex) => {
        const li = document.createElement('li');
        li.className = 'playlist-item-container';
        
        let playlistHTML = `
            <div class="playlist-header" onclick="playPlaylist(${pIndex})">
                <div class="playlist-info">
                    <i class="fa-solid fa-music"></i> 
                    <span class="playlist-title">${playlist.name}</span>
                </div>
                <span class="playlist-count">${playlist.songs.length} songs</span>
            </div>
        `;

        if (playlist.songs.length > 0) {
            playlistHTML += `<ul class="playlist-tracks">`;
            playlist.songs.forEach((song) => {
                playlistHTML += `
                    <li class="playlist-track-item">
                        <span class="track-name" onclick="playSinglePlaylistSong(${pIndex}, ${song.id})">${song.songName}</span>
                        <button class="remove-btn" title="Remove song" onclick="event.stopPropagation(); removeSongFromPlaylist(${pIndex}, ${song.id})">
                            <i class="fa-solid fa-minus"></i>
                        </button>
                    </li>
                `;
            });
            playlistHTML += `</ul>`;
        }
        li.innerHTML = playlistHTML;
        playlistList.appendChild(li);
    });
}

// Header Tab Navigation Setup
if (tabLogin) tabLogin.addEventListener('click', () => switchTab(false));
if (tabSignup) tabSignup.addEventListener('click', () => switchTab(true));

// Modal Window Control Event Triggers
if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
window.addEventListener('click', (e) => { if (e.target === authModal) closeModal(); });

// Initializations
updateAuthUI();
renderMusicCards();
renderPlaylists();
renderRecentlyPlayed();

if (addPlaylistBtn) addPlaylistBtn.addEventListener('click', createPlaylist);
if (createPlaylistAction) createPlaylistAction.addEventListener('click', createPlaylist);