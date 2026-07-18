# BTS-Music-Hub
Spotify Clone Web Player  A responsive front-end Spotify clone built with vanilla JS and modern CSS. It features a custom dynamic audio engine with active seek/volume range inputs, client-side search filtering, prompt-driven playlist creation with track counting, and a flex layout that anchors hover play buttons directly over album art.

Core Stack: Vanilla JavaScript (ES6+), Modern CSS3, HTML5

This project is a lightweight, responsive audio streaming web application that recreates the core functionality and dark-mode aesthetic of the Spotify desktop client. Built completely from scratch without bulky external frameworks, the application runs entirely on the client side, using standard browser APIs to manage local audio state, playback queues, and interactive UI component tracking.

Core Structural Features
Dynamic Audio Engine: The application utilizes the native JavaScript Audio constructor to handle music states. It features real-time progress bar synchronization using timeupdate listeners, responsive scrub controls via native range inputs, and dynamic volume scaling complete with a progressive visual mute toggle.

Algorithmic State Management: Track navigation uses a conditional state architecture to handle randomized playback orders. When the shuffle state is triggered, a custom implementation of the Fisher-Yates shuffle algorithm shuffles the copy of the track array while preserving index positioning for the currently playing track to ensure a seamless listening flow.

Instant Search Filtering: A real-time input event listener provides client-side query filtering. As the user types, the application scans both the song title and description strings, immediately adjusting the CSS display properties of the music card layout without causing page updates or layout shifts.

Prompt-Driven Playlist Builder: The application features an interactive, dynamic playlist creation module. Users can generate custom mixing lists, track song counts in the sidebar menu, append specific music cards via custom element overlays, and prune independent tracks through event-isolated DOM manipulation.

UI/UX & Layout Implementation
The layout uses a modern Flexbox and Grid structure designed to lock user interface elements in place. By wrapping the cover art and absolute control buttons into a parent .card-img-container, the Spotify-style green hover play button remains anchored to the image corner across varying screen sizes. This containment eliminates layout shifts, ensuring that text elements like song titles and artist details render consistently underneath the music artwork. Additionally, hidden custom scrollbars maintain clean layout boundaries while keeping desktop navigation scrollable.
