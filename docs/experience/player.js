const state = {
  scenes: [],
  index: Number.parseInt(localStorage.getItem("end-scene-index") || "0", 10),
};

const el = {
  enter: document.querySelector("#enter-button"),
  stage: document.querySelector("#stage"),
  video: document.querySelector("#scene-video"),
  caption: document.querySelector("#caption-track"),
  poster: document.querySelector("#scene-poster"),
  pending: document.querySelector("#pending-card"),
  kicker: document.querySelector("#scene-kicker"),
  title: document.querySelector("#scene-title"),
  question: document.querySelector("#scene-question"),
  count: document.querySelector("#scene-count"),
  duration: document.querySelector("#scene-duration"),
  previous: document.querySelector("#previous-button"),
  next: document.querySelector("#next-button"),
  auto: document.querySelector("#auto-continue"),
  transcriptButton: document.querySelector("#transcript-button"),
  transcript: document.querySelector("#transcript"),
  transcriptText: document.querySelector("#transcript-text"),
  theoryLink: document.querySelector("#theory-link"),
  discussionLink: document.querySelector("#discussion-link"),
  list: document.querySelector("#scene-list"),
};

function renderSceneList() {
  el.list.replaceChildren(...state.scenes.map((scene, index) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.index = index;
    button.innerHTML = `
      <span class="scene-number">${String(index + 1).padStart(2, "0")}</span>
      <span class="scene-name"><strong>${scene.title}</strong><small>${scene.act}</small></span>
      <span class="scene-state">${scene.state}</span>`;
    button.addEventListener("click", () => selectScene(index, true));
    item.append(button);
    return item;
  }));
}

function selectScene(index, scroll = false) {
  state.index = Math.max(0, Math.min(index, state.scenes.length - 1));
  localStorage.setItem("end-scene-index", String(state.index));
  const scene = state.scenes[state.index];

  el.video.pause();
  el.video.removeAttribute("src");
  el.video.load();

  const hasVideo = Boolean(scene.video);
  el.video.hidden = !hasVideo;
  el.poster.hidden = hasVideo || !scene.poster;
  el.pending.hidden = hasVideo || Boolean(scene.poster);

  if (hasVideo) {
    el.video.src = scene.video;
    el.video.poster = scene.poster || "";
    el.caption.src = scene.captions || "";
    el.video.load();
  }

  if (scene.poster) {
    el.poster.src = scene.poster;
    el.poster.alt = scene.posterAlt;
  } else {
    el.poster.removeAttribute("src");
    el.poster.alt = "";
  }

  el.kicker.textContent = scene.act;
  el.title.textContent = scene.title;
  el.question.textContent = scene.question;
  el.count.textContent = `${state.index + 1} / ${state.scenes.length}`;
  el.duration.textContent = scene.duration;
  el.transcriptText.textContent = scene.transcript;
  el.theoryLink.href = scene.theory;
  el.discussionLink.href = scene.discussion;
  el.previous.disabled = state.index === 0;
  el.next.disabled = state.index === state.scenes.length - 1;

  el.list.querySelectorAll("button").forEach((button, i) => {
    button.setAttribute("aria-current", String(i === state.index));
  });

  if (scroll) el.stage.scrollIntoView({ behavior: "smooth", block: "center" });
}

function advance() {
  if (state.index < state.scenes.length - 1) selectScene(state.index + 1);
}

async function initialise() {
  try {
    const response = await fetch("scenes.json");
    if (!response.ok) throw new Error(`Scene manifest returned ${response.status}`);
    state.scenes = await response.json();
    renderSceneList();
    selectScene(Number.isFinite(state.index) ? state.index : 0);
  } catch (error) {
    el.pending.hidden = false;
    el.pending.querySelector("p").textContent = "The scene manifest could not be loaded.";
    console.error(error);
  }
}

el.enter.addEventListener("click", () => el.stage.scrollIntoView({ behavior: "smooth", block: "center" }));
el.previous.addEventListener("click", () => selectScene(state.index - 1));
el.next.addEventListener("click", advance);
el.video.addEventListener("ended", () => { if (el.auto.checked) advance(); });
el.transcriptButton.addEventListener("click", () => {
  const expanded = el.transcriptButton.getAttribute("aria-expanded") === "true";
  el.transcriptButton.setAttribute("aria-expanded", String(!expanded));
  el.transcriptButton.textContent = expanded ? "Show transcript" : "Hide transcript";
  el.transcript.hidden = expanded;
});

initialise();
