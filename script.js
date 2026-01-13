// ---- DATA (edit this to match your objects) ----
const items = [
  {
    id: 1,
    label: "01",
    thumb: "D:\\WebCode\\room-archive\\assets\\DDY_riso.png",
    hoverThumb: "D:\\WebCode\\room-archive\\assets\\DDY_tp.png",
    name: "Name of object",
    category: "Category",
    year: 2026,
    desc:
      "Description: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    gallery: ["D:\\WebCode\\room-archive\\assets\\DDY_riso.png", "D:\\WebCode\\room-archive\\assets\\miaomiao_riso.png", "D:\\WebCode\\room-archive\\assets\\K_riso.png"]
  },
  {
    id: 2,
    label: "02",
    thumb: "./assets/obj02.png",
    hoverThumb: "./assets/obj02_hover.png",
    name: "Name of object",
    category: "Category",
    year: 2026,
    desc:
      "Description: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    gallery: ["./assets/obj02.png", "./assets/obj02_hover.png"]
  },
  {
    id: 3,
    label: "03",
    thumb: "./assets/obj03.png",
    hoverThumb: "./assets/obj03_hover.png",
    name: "Name of object",
    category: "Category",
    year: 2026,
    desc:
      "Description: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    gallery: ["./assets/obj03.png", "./assets/obj03_hover.png"]
  },
  {
    id: 4,
    label: "04",
    thumb: "./assets/obj04.png",
    hoverThumb: "./assets/obj04_hover.png",
    name: "Name of object",
    category: "Category",
    year: 2026,
    desc:
      "Description: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    gallery: ["./assets/obj04.png", "./assets/obj04_hover.png"]
  },
  {
    id: 5,
    label: "05",
    thumb: "./assets/obj05.png",
    hoverThumb: "./assets/obj05_hover.png",
    name: "Name of object",
    category: "Category",
    year: 2026,
    desc:
      "Description: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    gallery: ["./assets/obj05.png", "./assets/obj05_hover.png"]
  },
  {
    id: 6,
    label: "06",
    thumb: "./assets/obj06.png",
    hoverThumb: "./assets/obj06_hover.png",
    name: "Name of object",
    category: "Category",
    year: 2026,
    desc:
      "Description: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    gallery: ["./assets/obj06.png", "./assets/obj06_hover.png"]
  }
];

// ---- HOME GRID RENDER ----
const grid = document.getElementById("grid");

function makeCard(item) {
  const card = document.createElement("div");
  card.className = "card";
  card.setAttribute("role", "button");
  card.setAttribute("tabindex", "0");
  card.dataset.id = item.id;

  const label = document.createElement("div");
  label.className = "label";
  label.textContent = item.label;

  const img = document.createElement("img");
  img.src = item.thumb;
  img.alt = item.name || `Object ${item.label}`;
  img.dataset.normal = item.thumb;
  img.dataset.hover = item.hoverThumb || item.thumb;

  // Hover swap (image inside box changes)
  card.addEventListener("mouseenter", () => {
    img.src = img.dataset.hover;
  });
  card.addEventListener("mouseleave", () => {
    img.src = img.dataset.normal;
  });

  // Click -> open detail overlay
  card.addEventListener("click", () => openDetail(item.id));
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") openDetail(item.id);
  });

  card.appendChild(label);
  card.appendChild(img);
  return card;
}

items.forEach((it) => grid.appendChild(makeCard(it)));

// ---- DETAIL OVERLAY ----
const detail = document.getElementById("detail");
const home = document.getElementById("home");

const detailNum = document.getElementById("detailNum");
const detailName = document.getElementById("detailName");
const detailCategory = document.getElementById("detailCategory");
const detailYear = document.getElementById("detailYear");
const detailDesc = document.getElementById("detailDesc");

const viewerImg = document.getElementById("viewerImg");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const closeDetail = document.getElementById("closeDetail");
const brandDetail = document.getElementById("brandDetail");
const brandHome = document.getElementById("brandHome");

let activeItem = null;
let activeIndex = 0;

function openDetail(id) {
  activeItem = items.find((x) => x.id === id);
  activeIndex = 0;

  // Fill left text
  detailNum.textContent = activeItem.label;
  detailName.textContent = activeItem.name || "Name of object";
  detailCategory.textContent = activeItem.category || "Category";
  detailYear.textContent = `Year of adoption: ${activeItem.year ?? ""}`;
  detailDesc.textContent = activeItem.desc || "";

  // Set first image
  const first = activeItem.gallery?.[0] || activeItem.thumb;
  viewerImg.src = first;
  viewerImg.alt = activeItem.name || `Object ${activeItem.label}`;

  // Show overlay
  detail.classList.add("is-open");
  detail.setAttribute("aria-hidden", "false");

  // Optional: prevent background scroll
  document.body.style.overflow = "hidden";
}

function closeDetailView() {
  detail.classList.remove("is-open");
  detail.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function showIndex(next) {
  if (!activeItem) return;
  const gallery = activeItem.gallery?.length ? activeItem.gallery : [activeItem.thumb];

  activeIndex = (activeIndex + next + gallery.length) % gallery.length;
  viewerImg.src = gallery[activeIndex];
}

prevBtn.addEventListener("click", () => showIndex(-1));
nextBtn.addEventListener("click", () => showIndex(1));

// Clicking Room Archive (in detail) or X returns home
closeDetail.addEventListener("click", closeDetailView);
brandDetail.addEventListener("click", (e) => {
  e.preventDefault();
  closeDetailView();
});

// Home title just stays on home (also closes if you want)
brandHome.addEventListener("click", (e) => {
  e.preventDefault();
  closeDetailView();
});

// ESC to close
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && detail.classList.contains("is-open")) {
    closeDetailView();
  }
});
