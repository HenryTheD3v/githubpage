const list = document.getElementById("videoList");
const search = document.getElementById("search");
const count = document.getElementById("count");
const playerView = document.getElementById("playerView");
const empty = document.getElementById("empty");
const player = document.getElementById("player");
const title = document.getElementById("title");
const description = document.getElementById("description");
const copyLink = document.getElementById("copyLink");

let videos = [];
let current = null;

async function loadVideos() {
  try {
    const response = await fetch("videos.json", { cache: "no-store" });
    if (!response.ok) throw new Error("Could not load videos.json");
    videos = await response.json();
    renderList();
    selectVideoFromURL();
  } catch (error) {
    count.textContent = "Could not load videos.json";
    console.error(error);
  }
}

function renderList() {
  const query = search.value.trim().toLowerCase();
  const filtered = videos.filter(v =>
    v.title.toLowerCase().includes(query) ||
    (v.description || "").toLowerCase().includes(query)
  );

  list.innerHTML = "";

  filtered.forEach(video => {
    const button = document.createElement("button");
    button.className = "video-item" + (current?.id === video.id ? " active" : "");
    button.innerHTML = `
      <span class="video-name">${escapeHTML(video.title)}</span>
      <span class="video-desc">${escapeHTML(video.description || "MP4 video")}</span>
    `;
    button.addEventListener("click", () => openVideo(video));
    list.appendChild(button);
  });

  count.textContent = `${filtered.length} video${filtered.length === 1 ? "" : "s"}`;
}

function openVideo(video, updateURL = true) {
  current = video;

  player.src = video.file;
  title.textContent = video.title;
  description.textContent = video.description || "";
  empty.classList.add("hidden");
  playerView.classList.remove("hidden");

  if (updateURL) {
    history.replaceState(null, "", `?video=${encodeURIComponent(video.id)}`);
  }

  renderList();
  player.play().catch(() => {});
}

function selectVideoFromURL() {
  const id = new URLSearchParams(location.search).get("video");
  if (!id) return;

  const video = videos.find(v => v.id === id);
  if (video) openVideo(video, false);
}

search.addEventListener("input", renderList);

copyLink.addEventListener("click", async () => {
  await navigator.clipboard.writeText(location.href);
  const old = copyLink.textContent;
  copyLink.textContent = "✓ Copied!";
  setTimeout(() => copyLink.textContent = old, 1400);
});

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;",
    '"': "&quot;", "'": "&#039;"
  }[c]));
}

loadVideos();
