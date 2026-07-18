(function () {
  "use strict";

  const screenTitles = {
    followup: "Good morning, Alex",
    memory: "Your saved context",
    timeline: "Eighteen days together",
    model: "Protect your continuity",
  };

  let activeMemoryId = null;
  let pendingDeleteId = null;
  let toastTimer = null;

  const title = document.querySelector("#screen-title");
  const toast = document.querySelector("#toast");
  const memoryDialog = document.querySelector("#memory-dialog");
  const memoryInput = document.querySelector("#memory-input");
  const memoryDialogTitle = document.querySelector("#memory-dialog-title");
  const confirmDialog = document.querySelector("#confirm-dialog");
  const detailDialog = document.querySelector("#detail-dialog");

  function navigate(screenName) {
    const target = document.querySelector(`[data-screen="${screenName}"]`);
    if (!target) return;

    document.querySelectorAll("[data-screen]").forEach((screen) => {
      const isTarget = screen === target;
      screen.hidden = !isTarget;
      screen.classList.toggle("is-active", isTarget);
    });

    document.querySelectorAll(".nav-button").forEach((button) => {
      const isTarget = button.dataset.go === screenName;
      button.classList.toggle("is-active", isTarget);
      button.setAttribute("aria-current", isTarget ? "page" : "false");
    });

    title.textContent = screenTitles[screenName];
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showToast(message) {
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.hidden = false;
    toastTimer = window.setTimeout(() => {
      toast.hidden = true;
    }, 2600);
  }

  function memoryCard(id) {
    return document.querySelector(`[data-memory-id="${id}"]`);
  }

  function updateMemoryCount() {
    const count = document.querySelectorAll(".memory-card:not([hidden])").length;
    document.querySelector("#memory-count").textContent = `${count} saved`;
  }

  function openMemoryEditor(id) {
    const card = memoryCard(id);
    if (!card) return;
    activeMemoryId = id;
    memoryDialogTitle.textContent = `Correct ${card.querySelector("h3").textContent.toLowerCase()}`;
    memoryInput.value = card.querySelector(".memory-value").textContent.trim();
    memoryDialog.showModal();
    memoryInput.focus();
    memoryInput.select();
  }

  document.querySelectorAll("[data-go]").forEach((button) => {
    button.addEventListener("click", () => navigate(button.dataset.go));
  });

  document.querySelector("#continue-button").addEventListener("click", () => {
    document.querySelector("#conversation-preview").hidden = false;
    showToast("Yesterday’s topic is ready to continue.");
  });

  document.querySelector("#skip-button").addEventListener("click", () => {
    document.querySelector(".hero-card").hidden = true;
    showToast("Skipped. Atlas will not repeat this reminder.");
  });

  document.querySelector("#followup-toggle").addEventListener("change", (event) => {
    showToast(event.target.checked ? "Proactive follow-ups are on." : "Proactive follow-ups are off.");
  });

  document.querySelectorAll(".edit-memory").forEach((button) => {
    button.addEventListener("click", () => openMemoryEditor(button.dataset.memory));
  });

  document.querySelectorAll(".delete-memory").forEach((button) => {
    button.addEventListener("click", () => {
      pendingDeleteId = button.dataset.memory;
      const card = memoryCard(pendingDeleteId);
      document.querySelector("#delete-description").textContent = `Atlas will stop using “${card.querySelector(".memory-value").textContent.trim()}” in future conversations. The fictional data can be restored with Reset.`;
      confirmDialog.showModal();
    });
  });

  document.querySelector("#memory-form").addEventListener("submit", (event) => {
    if (event.submitter && event.submitter.value === "cancel") return;
    event.preventDefault();
    const newValue = memoryInput.value.trim();
    if (!newValue || !activeMemoryId) return;
    const card = memoryCard(activeMemoryId);
    card.querySelector(".memory-value").textContent = newValue;
    card.querySelector(".memory-source").textContent = "Corrected by you just now · earlier value marked outdated";
    memoryDialog.close();
    showToast("Correction saved. Atlas will use the new value next time.");
  });

  document.querySelector("#confirm-delete-button").addEventListener("click", (event) => {
    event.preventDefault();
    const card = memoryCard(pendingDeleteId);
    if (card) card.hidden = true;
    confirmDialog.close();
    updateMemoryCount();
    showToast("Memory deleted. Atlas will no longer use it.");
    pendingDeleteId = null;
  });

  document.querySelectorAll(".filter-button").forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      document.querySelectorAll(".filter-button").forEach((item) => item.classList.toggle("is-selected", item === button));
      document.querySelectorAll(".timeline-event").forEach((event) => {
        event.hidden = filter !== "all" && event.dataset.kind !== filter;
      });
    });
  });

  document.querySelectorAll(".event-detail").forEach((button) => {
    button.addEventListener("click", () => {
      const isBoundary = button.dataset.event === "boundary";
      document.querySelector("#detail-title").textContent = isBoundary ? "Communication boundary" : "Presentation goal began";
      document.querySelector("#detail-copy").textContent = isBoundary
        ? "This event explains why today’s follow-up is concise and will not repeat after you skip it."
        : "This event explains why today’s conversation refers back to the presentation opening.";
      detailDialog.showModal();
    });
  });

  document.querySelector("#keep-update-button").addEventListener("click", () => {
    document.querySelector("#model-actions").innerHTML = `
      <div class="response-option new-response">
        <span>UPDATE SELECTED</span>
        <p>Version 1.5 will be used next time. Your prior version remains restorable for 30 days.</p>
      </div>
      <button class="secondary-button" id="undo-update-button" type="button">Undo and keep 1.4</button>
    `;
    document.querySelector("#undo-update-button").addEventListener("click", resetModelChoice);
    showToast("Update selected. Prior behavior remains restorable.");
  });

  function resetModelChoice() {
    window.location.reload();
  }

  document.querySelector("#restore-button").addEventListener("click", () => {
    showToast("Version 1.4 kept. No memories were changed.");
  });

  document.querySelector("#reset-button").addEventListener("click", () => {
    window.location.reload();
  });

  navigate("followup");
})();
