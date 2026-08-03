const STORAGE_KEY = "dish-development-crm-v2";

const STATUSES = [
  "Идея",
  "Черновик",
  "Нужны продукты",
  "Проработка",
  "Дегустация",
  "Себестоимость",
  "ТТК",
  "Готово в меню",
  "Отложено",
];

const BOARD_GROUPS = [
  {
    id: "active",
    title: "В работе",
    statuses: ["Идея", "Черновик", "Нужны продукты", "Проработка", "Дегустация"],
  },
  {
    id: "finalize",
    title: "Довести до меню",
    statuses: ["Себестоимость", "ТТК"],
  },
  {
    id: "done",
    title: "Готово / стоп",
    statuses: ["Готово в меню", "Отложено"],
  },
];

const initialDishes = [
  {
    name: "Блюдо 01",
    status: "Идея",
    owner: "Станислав",
    dueDate: "",
    nextStep: "Сформулировать идею блюда и формат подачи.",
    blocker: "Нет описания вкуса и целевой роли в меню.",
    notes: "Нейтральный пример. Замени название и текст на реальные данные.",
    comments: [],
  },
  {
    name: "Блюдо 02",
    status: "Черновик",
    owner: "Станислав",
    dueDate: "",
    nextStep: "Собрать черновик рецептуры и примерный выход порции.",
    blocker: "Не проверены граммовки.",
    notes: "Нужно понять, будет ли блюдо основным, гарниром или частью набора.",
    comments: [],
  },
  {
    name: "Блюдо 03",
    status: "Нужны продукты",
    owner: "Эльдар",
    dueDate: "",
    nextStep: "Составить список продуктов для первой проработки.",
    blocker: "Не хватает списка сырья.",
    notes: "После закупки перевести в проработку.",
    comments: [],
  },
  {
    name: "Блюдо 04",
    status: "Проработка",
    owner: "Эльдар",
    dueDate: "",
    nextStep: "Провести первую пробу и записать фактический выход.",
    blocker: "Не зафиксирован результат теста.",
    notes: "Сравнить вкус, вид и стабильность после хранения.",
    comments: [],
  },
  {
    name: "Блюдо 05",
    status: "Дегустация",
    owner: "Станислав",
    dueDate: "",
    nextStep: "Собрать обратную связь по вкусу и внешнему виду.",
    blocker: "Нет решения: дорабатывать или считать.",
    notes: "После дегустации записать конкретные правки.",
    comments: [],
  },
  {
    name: "Блюдо 06",
    status: "Себестоимость",
    owner: "Станислав",
    dueDate: "",
    nextStep: "Посчитать себестоимость порции по фактическим граммовкам.",
    blocker: "Нет цен на часть ингредиентов.",
    notes: "Не считать блюдо готовым без цены и выхода.",
    comments: [],
  },
  {
    name: "Блюдо 07",
    status: "ТТК",
    owner: "Станислав",
    dueDate: "",
    nextStep: "Оформить технологическую карту.",
    blocker: "Нужно финальное описание технологии.",
    notes: "Проверить, что карта совпадает с фактической проработкой.",
    comments: [],
  },
  {
    name: "Блюдо 08",
    status: "Готово в меню",
    owner: "Эльдар",
    dueDate: "",
    nextStep: "Поставить в финальный список меню.",
    blocker: "",
    notes: "Пример блюда без блокера.",
    comments: [],
  },
  {
    name: "Блюдо 09",
    status: "Отложено",
    owner: "Станислав",
    dueDate: "",
    nextStep: "Вернуться после проверки спроса или сырья.",
    blocker: "Неясна экономика и регулярность продукта.",
    notes: "Отложенное блюдо не должно висеть как активная задача.",
    comments: [],
  },
  {
    name: "Блюдо 10",
    status: "Проработка",
    owner: "Эльдар",
    dueDate: "",
    nextStep: "Повторить тест с другой технологией.",
    blocker: "Первая проба нестабильна по текстуре.",
    notes: "Нужна короткая запись: что именно меняем во второй пробе.",
    comments: [],
  },
];

const elements = {
  exportButton: document.querySelector("#exportButton"),
  importFile: document.querySelector("#importFile"),
  resetButton: document.querySelector("#resetButton"),
  totalMetric: document.querySelector("#totalMetric"),
  readyMetric: document.querySelector("#readyMetric"),
  blockedMetric: document.querySelector("#blockedMetric"),
  nextStepMetric: document.querySelector("#nextStepMetric"),
  searchInput: document.querySelector("#searchInput"),
  statusFilter: document.querySelector("#statusFilter"),
  ownerFilter: document.querySelector("#ownerFilter"),
  dishForm: document.querySelector("#dishForm"),
  dishNameInput: document.querySelector("#dishNameInput"),
  viewTabs: document.querySelector("#viewTabs"),
  focusBlockedButton: document.querySelector("#focusBlockedButton"),
  focusReadyButton: document.querySelector("#focusReadyButton"),
  clearFiltersButton: document.querySelector("#clearFiltersButton"),
  boardPanel: document.querySelector("#boardPanel"),
  boardColumns: document.querySelector("#boardColumns"),
  boardVisibleCount: document.querySelector("#boardVisibleCount"),
  boardEmptyState: document.querySelector("#boardEmptyState"),
  listPanel: document.querySelector("#listPanel"),
  dishList: document.querySelector("#dishList"),
  visibleCount: document.querySelector("#visibleCount"),
  emptyState: document.querySelector("#emptyState"),
  todayFocusLabel: document.querySelector("#todayFocusLabel"),
  focusCard: document.querySelector("#focusCard"),
  detailSummaryStatus: document.querySelector("#detailSummaryStatus"),
  detailSummaryNextStep: document.querySelector("#detailSummaryNextStep"),
  detailSummaryBlocker: document.querySelector("#detailSummaryBlocker"),
  markReadyButton: document.querySelector("#markReadyButton"),
  markTestingButton: document.querySelector("#markTestingButton"),
  detailForm: document.querySelector("#detailForm"),
  detailName: document.querySelector("#detailName"),
  detailStatus: document.querySelector("#detailStatus"),
  detailOwner: document.querySelector("#detailOwner"),
  detailDueDate: document.querySelector("#detailDueDate"),
  detailNextStep: document.querySelector("#detailNextStep"),
  detailBlocker: document.querySelector("#detailBlocker"),
  detailNotes: document.querySelector("#detailNotes"),
  deleteDishButton: document.querySelector("#deleteDishButton"),
  saveStatus: document.querySelector("#saveStatus"),
  commentForm: document.querySelector("#commentForm"),
  commentAuthor: document.querySelector("#commentAuthor"),
  commentText: document.querySelector("#commentText"),
  commentCount: document.querySelector("#commentCount"),
  commentList: document.querySelector("#commentList"),
};

let state = loadState();

function createDish(dish) {
  return {
    id: dish.id || crypto.randomUUID(),
    name: cleanText(dish.name) || "Новое блюдо",
    status: STATUSES.includes(dish.status) ? dish.status : "Идея",
    owner: dish.owner === "Эльдар" ? "Эльдар" : "Станислав",
    dueDate: cleanDate(dish.dueDate),
    nextStep: cleanText(dish.nextStep),
    blocker: cleanText(dish.blocker),
    notes: cleanText(dish.notes),
    comments: Array.isArray(dish.comments) ? dish.comments.map(createComment).filter(Boolean) : [],
    updatedAt: dish.updatedAt || new Date().toISOString(),
  };
}

function createComment(comment) {
  const text = cleanText(comment.text);
  if (!text) return null;

  return {
    id: comment.id || crypto.randomUUID(),
    author: comment.author === "Эльдар" ? "Эльдар" : "Станислав",
    text,
    createdAt: comment.createdAt || new Date().toISOString(),
  };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || !Array.isArray(saved.dishes)) throw new Error("No saved CRM");

    const dishes = saved.dishes.map(createDish);
    return {
      dishes: dishes.length ? dishes : initialDishes.map(createDish),
      selectedId: saved.selectedId || dishes[0]?.id || "",
      view: saved.view === "list" ? "list" : "board",
      filters: {
        search: cleanText(saved.filters?.search),
        status: cleanText(saved.filters?.status) || "all",
        owner: cleanText(saved.filters?.owner) || "all",
        focus: cleanText(saved.filters?.focus) || "all",
      },
    };
  } catch {
    const dishes = initialDishes.map(createDish);
    return {
      dishes,
      selectedId: dishes[0].id,
      view: "board",
      filters: { search: "", status: "all", owner: "all", focus: "all" },
    };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function cleanText(value) {
  return String(value || "").trim();
}

function cleanDate(value) {
  const text = cleanText(value);
  return /^\d{4}-\d{2}-\d{2}$/.test(text) ? text : "";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDate(value) {
  if (!value) return "без срока";

  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "без срока";

  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
  }).format(date);
}

function formatDateTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function getSelectedDish() {
  return state.dishes.find((dish) => dish.id === state.selectedId) || state.dishes[0] || null;
}

function getFilteredDishes() {
  const search = state.filters.search.toLowerCase();

  return state.dishes.filter((dish) => {
    const matchesSearch = [
      dish.name,
      dish.status,
      dish.owner,
      dish.nextStep,
      dish.blocker,
      dish.notes,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search);
    const matchesStatus = state.filters.status === "all" || dish.status === state.filters.status;
    const matchesOwner = state.filters.owner === "all" || dish.owner === state.filters.owner;
    const matchesFocus =
      state.filters.focus === "all" ||
      (state.filters.focus === "blocked" &&
        Boolean(dish.blocker) &&
        dish.status !== "Готово в меню" &&
        dish.status !== "Отложено") ||
      (state.filters.focus === "ready" && dish.status === "Готово в меню");

    return matchesSearch && matchesStatus && matchesOwner && matchesFocus;
  });
}

function getPriorityDish(dishes = state.dishes) {
  return (
    dishes.find((dish) => dish.blocker && dish.status !== "Готово в меню" && dish.status !== "Отложено") ||
    dishes.find((dish) => dish.status !== "Готово в меню" && dish.status !== "Отложено") ||
    dishes[0] ||
    null
  );
}

function getStatusClass(status) {
  if (status === "Готово в меню") return "status-ready";
  if (status === "Отложено") return "status-deferred";
  if (status === "Себестоимость" || status === "ТТК") return "status-cost";
  if (status === "Нужны продукты" || status === "Проработка") return "status-blocked";
  return "";
}

function syncSelectOptions() {
  const statusOptions = [
    '<option value="all">Все</option>',
    ...STATUSES.map((status) => `<option value="${escapeHtml(status)}">${escapeHtml(status)}</option>`),
  ].join("");
  const detailStatusOptions = STATUSES.map(
    (status) => `<option value="${escapeHtml(status)}">${escapeHtml(status)}</option>`,
  ).join("");

  elements.statusFilter.innerHTML = statusOptions;
  elements.detailStatus.innerHTML = detailStatusOptions;
}

function renderMetrics() {
  const total = state.dishes.length;
  const ready = state.dishes.filter((dish) => dish.status === "Готово в меню").length;
  const blocked = state.dishes.filter(
    (dish) => dish.blocker && dish.status !== "Готово в меню" && dish.status !== "Отложено",
  ).length;
  const focusDish = getPriorityDish();

  elements.totalMetric.textContent = total;
  elements.readyMetric.textContent = ready;
  elements.blockedMetric.textContent = blocked;
  elements.nextStepMetric.textContent = focusDish ? focusDish.owner : "-";
}

function renderBoard() {
  const dishes = getFilteredDishes();
  elements.boardColumns.innerHTML = "";
  elements.boardVisibleCount.textContent = `${dishes.length} карточек`;
  elements.boardEmptyState.classList.toggle("is-hidden", dishes.length > 0);

  BOARD_GROUPS.forEach((group) => {
    const groupDishes = dishes.filter((dish) => group.statuses.includes(dish.status));
    const column = document.createElement("section");
    column.className = "board-column";
    column.innerHTML = `
      <div class="board-column-head">
        <span class="board-column-title">${escapeHtml(group.title)}</span>
        <span class="board-column-count">${groupDishes.length}</span>
      </div>
      <div class="board-stack"></div>
    `;

    const stack = column.querySelector(".board-stack");
    if (!groupDishes.length) {
      const empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent = "Здесь пока ничего нет.";
      stack.append(empty);
    } else {
      groupDishes.forEach((dish) => {
        const button = document.createElement("button");
        button.className = `board-card ${dish.id === state.selectedId ? "is-active" : ""}`;
        button.type = "button";
        button.dataset.dishId = dish.id;
        button.innerHTML = `
          <div class="board-card-top">
            <span class="board-card-title">${escapeHtml(dish.name)}</span>
            <span class="status-pill ${getStatusClass(dish.status)}">${escapeHtml(dish.status)}</span>
          </div>
          <div class="board-card-meta">
            <span>${escapeHtml(dish.owner)}</span>
            <span>${escapeHtml(formatDate(dish.dueDate))}</span>
            <span>${dish.comments.length} комм.</span>
          </div>
          <div class="board-card-next">${escapeHtml(dish.nextStep || "Следующий шаг не указан.")}</div>
          ${
            dish.blocker
              ? `<div class="board-card-blocker">${escapeHtml(dish.blocker)}</div>`
              : ""
          }
        `;
        stack.append(button);
      });
    }

    elements.boardColumns.append(column);
  });
}

function renderList() {
  const dishes = getFilteredDishes();
  elements.dishList.innerHTML = "";
  elements.visibleCount.textContent = `${dishes.length} показано`;
  elements.emptyState.classList.toggle("is-hidden", dishes.length > 0);

  dishes.forEach((dish) => {
    const button = document.createElement("button");
    button.className = `dish-row ${dish.id === state.selectedId ? "is-active" : ""}`;
    button.type = "button";
    button.dataset.dishId = dish.id;
    button.innerHTML = `
      <span>
        <span class="dish-row-title">${escapeHtml(dish.name)}</span>
        <span class="dish-row-meta">
          <span>${escapeHtml(dish.owner)}</span>
          <span>${escapeHtml(formatDate(dish.dueDate))}</span>
          <span>${dish.comments.length} комм.</span>
        </span>
        <span class="dish-row-detail">${escapeHtml(dish.nextStep || "Следующий шаг не указан.")}</span>
        ${
          dish.blocker
            ? `<span class="dish-row-blocker">${escapeHtml(dish.blocker)}</span>`
            : ""
        }
      </span>
      <span class="status-pill ${getStatusClass(dish.status)}">${escapeHtml(dish.status)}</span>
    `;
    elements.dishList.append(button);
  });
}

function renderFocus() {
  const filtered = getFilteredDishes();
  const dish = getPriorityDish(filtered);

  if (!dish) {
    elements.todayFocusLabel.textContent = "-";
    elements.focusCard.innerHTML = '<p class="empty-state">Нет блюда под текущие фильтры.</p>';
    return;
  }

  elements.todayFocusLabel.textContent = dish.name;
  elements.focusCard.innerHTML = `
    <div class="focus-line">
      <span>Что сейчас важнее всего</span>
      <strong>${escapeHtml(dish.name)} · ${escapeHtml(dish.status)}</strong>
    </div>
    <div class="focus-line">
      <span>Следующий шаг</span>
      <p>${escapeHtml(dish.nextStep || "Следующий шаг не указан.")}</p>
    </div>
    <div class="focus-line">
      <span>Ответственный</span>
      <p>${escapeHtml(dish.owner)}</p>
    </div>
    <div class="focus-line">
      <span>Что мешает</span>
      <p>${escapeHtml(dish.blocker || "Явной проблемы нет.")}</p>
    </div>
  `;
}

function renderDetails() {
  const dish = getSelectedDish();
  if (!dish) return;

  state.selectedId = dish.id;
  elements.detailName.value = dish.name;
  elements.detailStatus.value = dish.status;
  elements.detailOwner.value = dish.owner;
  elements.detailDueDate.value = dish.dueDate;
  elements.detailNextStep.value = dish.nextStep;
  elements.detailBlocker.value = dish.blocker;
  elements.detailNotes.value = dish.notes;
  elements.commentCount.textContent = dish.comments.length;
  elements.detailSummaryStatus.textContent = dish.status;
  elements.detailSummaryNextStep.textContent = dish.nextStep || "Следующий шаг не указан.";
  elements.detailSummaryBlocker.textContent = dish.blocker || "Явной проблемы нет.";
  renderComments(dish);
}

function renderComments(dish) {
  elements.commentList.innerHTML = "";

  if (!dish.comments.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Комментариев пока нет.";
    elements.commentList.append(empty);
    return;
  }

  [...dish.comments]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .forEach((comment) => {
      const item = document.createElement("article");
      item.className = "comment";
      item.innerHTML = `
        <div class="comment-meta">
          <span>${escapeHtml(comment.author)}</span>
          <span>${escapeHtml(formatDateTime(comment.createdAt))}</span>
        </div>
        <p>${escapeHtml(comment.text)}</p>
      `;
      elements.commentList.append(item);
    });
}

function syncFilters() {
  elements.searchInput.value = state.filters.search;
  elements.statusFilter.value = state.filters.status;
  elements.ownerFilter.value = state.filters.owner;
}

function syncView() {
  const isBoard = state.view === "board";
  elements.boardPanel.classList.toggle("is-hidden", !isBoard);
  elements.listPanel.classList.toggle("is-hidden", isBoard);

  elements.viewTabs.querySelectorAll("[data-view]").forEach((button) => {
    const active = button.dataset.view === state.view;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", active ? "true" : "false");
  });
}

function render() {
  ensureValidSelection();
  renderMetrics();
  syncFilters();
  syncView();
  renderBoard();
  renderList();
  renderFocus();
  renderDetails();
  saveState();
}

function ensureValidSelection() {
  if (!state.dishes.length) {
    state.dishes = initialDishes.map(createDish);
  }

  const selectedExists = state.dishes.some((dish) => dish.id === state.selectedId);
  if (!selectedExists) {
    state.selectedId = state.dishes[0]?.id || "";
  }
}

function updateSelectedDish(updates) {
  state.dishes = state.dishes.map((dish) =>
    dish.id === state.selectedId ? { ...dish, ...updates, updatedAt: new Date().toISOString() } : dish,
  );
}

function showSaved(message) {
  elements.saveStatus.textContent = message;
  window.setTimeout(() => {
    if (elements.saveStatus.textContent === message) elements.saveStatus.textContent = "";
  }, 1800);
}

function resetFilters() {
  state.filters = { search: "", status: "all", owner: "all", focus: "all" };
}

function exportData() {
  const data = JSON.stringify(
    {
      exportedAt: new Date().toISOString(),
      app: "dish-development-crm",
      dishes: state.dishes,
    },
    null,
    2,
  );
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `dish-crm-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

async function importData(file) {
  if (!file) return;

  try {
    const data = JSON.parse(await file.text());
    if (!Array.isArray(data.dishes)) throw new Error("Wrong file");

    const dishes = data.dishes.map(createDish);
    if (!dishes.length) throw new Error("Empty file");

    state.dishes = dishes;
    state.selectedId = dishes[0].id;
    state.view = "board";
    resetFilters();
    render();
    showSaved("Импортировано.");
  } catch {
    showSaved("Не удалось импортировать файл.");
  } finally {
    elements.importFile.value = "";
  }
}

function addDish() {
  const name = cleanText(elements.dishNameInput.value);
  if (!name) return;

  const dish = createDish({
    name,
    status: "Идея",
    owner: "Станислав",
    nextStep: "Записать первый конкретный шаг.",
    blocker: "",
    notes: "",
    comments: [],
  });

  state.dishes.unshift(dish);
  state.selectedId = dish.id;
  state.view = "board";
  elements.dishNameInput.value = "";
  render();
  showSaved("Новое блюдо добавлено.");
}

function selectDishById(id) {
  if (!id) return;
  state.selectedId = id;
  render();
}

function saveDishCard() {
  const nextStep = cleanText(elements.detailNextStep.value) || "Записать следующий конкретный шаг.";

  updateSelectedDish({
    name: cleanText(elements.detailName.value) || "Без названия",
    status: elements.detailStatus.value,
    owner: elements.detailOwner.value,
    dueDate: cleanDate(elements.detailDueDate.value),
    nextStep,
    blocker: cleanText(elements.detailBlocker.value),
    notes: cleanText(elements.detailNotes.value),
  });
  render();
  showSaved("Карточка сохранена.");
}

function addComment() {
  const text = cleanText(elements.commentText.value);
  if (!text) return;

  const dish = getSelectedDish();
  if (!dish) return;

  dish.comments.push(
    createComment({
      author: elements.commentAuthor.value,
      text,
      createdAt: new Date().toISOString(),
    }),
  );
  dish.updatedAt = new Date().toISOString();
  elements.commentText.value = "";
  render();
  showSaved("Комментарий сохранен.");
}

function applyQuickStatus(status, nextStep, blocker) {
  updateSelectedDish({ status, nextStep, blocker });
  render();
  showSaved("Статус обновлен.");
}

elements.dishForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addDish();
});

elements.viewTabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-view]");
  if (!button) return;
  state.view = button.dataset.view === "list" ? "list" : "board";
  render();
});

elements.focusBlockedButton.addEventListener("click", () => {
  state.view = "board";
  state.filters.status = "all";
  state.filters.search = "";
  state.filters.owner = "all";
  state.filters.focus = "blocked";
  render();
  showSaved("Показаны зависшие блюда.");
});

elements.focusReadyButton.addEventListener("click", () => {
  state.view = "board";
  state.filters.status = "Готово в меню";
  state.filters.search = "";
  state.filters.owner = "all";
  state.filters.focus = "ready";
  render();
});

elements.clearFiltersButton.addEventListener("click", () => {
  resetFilters();
  render();
});

[elements.boardColumns, elements.dishList].forEach((container) => {
  container.addEventListener("click", (event) => {
    const row = event.target.closest("[data-dish-id]");
    if (!row) return;
    selectDishById(row.dataset.dishId);
  });
});

elements.detailForm.addEventListener("submit", (event) => {
  event.preventDefault();
  saveDishCard();
});

elements.commentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addComment();
});

[elements.searchInput, elements.statusFilter, elements.ownerFilter].forEach((input) => {
  input.addEventListener("input", () => {
    state.filters.search = cleanText(elements.searchInput.value);
    state.filters.status = elements.statusFilter.value;
    state.filters.owner = elements.ownerFilter.value;
    state.filters.focus = "all";
    render();
  });
});

elements.markReadyButton.addEventListener("click", () => {
  applyQuickStatus("Готово в меню", "Поставить блюдо в финальный список меню.", "");
});

elements.markTestingButton.addEventListener("click", () => {
  applyQuickStatus(
    "Проработка",
    "Провести повторную пробу и записать изменения.",
    "Нужен новый тест перед выводом в меню.",
  );
});

elements.deleteDishButton.addEventListener("click", () => {
  const dish = getSelectedDish();
  if (!dish) return;
  if (!confirm(`Удалить "${dish.name}"?`)) return;

  state.dishes = state.dishes.filter((item) => item.id !== dish.id);
  if (!state.dishes.length) {
    state.dishes = initialDishes.map(createDish);
  }
  state.selectedId = state.dishes[0].id;
  render();
});

elements.exportButton.addEventListener("click", exportData);
elements.importFile.addEventListener("change", (event) => importData(event.target.files[0]));

elements.resetButton.addEventListener("click", () => {
  if (!confirm("Сбросить CRM к 10 нейтральным демо-блюдам?")) return;

  state.dishes = initialDishes.map(createDish);
  state.selectedId = state.dishes[0].id;
  state.view = "board";
  resetFilters();
  render();
  showSaved("Демоданные восстановлены.");
});

syncSelectOptions();
render();
