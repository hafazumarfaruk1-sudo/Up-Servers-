const services = [
  {
    name: "জন্ম নিবন্ধন",
    category: "নাগরিক",
    icon: "♧",
    color: "#edf2df",
    iconColor: "#738a4f",
    description: "জন্ম নিবন্ধন আবেদন, সংশোধন ও সনদ সংগ্রহের তথ্য।",
    documents: ["শিশুর টিকাকার্ড বা হাসপাতালের ছাড়পত্র", "পিতা-মাতার জাতীয় পরিচয়পত্র", "ঠিকানার প্রমাণ"],
    office: "ইউনিয়ন পরিষদ বা পৌরসভার জন্ম ও মৃত্যু নিবন্ধক।",
  },
  {
    name: "নাগরিক সনদ",
    category: "নাগরিক",
    icon: "▤",
    color: "#e8f0e8",
    iconColor: "#5e8062",
    description: "স্থানীয় নাগরিকত্ব ও স্থায়ী ঠিকানার প্রত্যয়নপত্র।",
    documents: ["জাতীয় পরিচয়পত্র বা জন্ম নিবন্ধন", "পাসপোর্ট সাইজের ছবি", "ওয়ার্ড সদস্যের প্রত্যয়ন (প্রযোজ্য ক্ষেত্রে)"],
    office: "নিজ এলাকার ইউনিয়ন পরিষদ বা পৌরসভা কার্যালয়।",
  },
  {
    name: "নামজারি ও ভূমি সেবা",
    category: "ভূমি",
    icon: "⌂",
    color: "#f4eedc",
    iconColor: "#9b8051",
    description: "জমির নামজারি, খতিয়ান ও ভূমি উন্নয়ন কর বিষয়ে তথ্য।",
    documents: ["দলিলের কপি", "সর্বশেষ খতিয়ান", "জাতীয় পরিচয়পত্র ও মোবাইল নম্বর"],
    office: "উপজেলা ভূমি অফিস; অনলাইন আবেদনের জন্য land.gov.bd।",
  },
  {
    name: "ট্রেড লাইসেন্স",
    category: "ব্যবসা",
    icon: "▣",
    color: "#f5e9e3",
    iconColor: "#a16d56",
    description: "নতুন ব্যবসার লাইসেন্স ও নবায়নের প্রয়োজনীয় নির্দেশনা।",
    documents: ["জাতীয় পরিচয়পত্র", "ব্যবসা প্রতিষ্ঠানের ঠিকানার প্রমাণ", "ছবি ও হালনাগাদ করের রসিদ"],
    office: "ব্যবসা প্রতিষ্ঠানের ঠিকানার স্থানীয় সরকার কার্যালয়।",
  },
  {
    name: "বয়স্ক ভাতা",
    category: "সামাজিক",
    icon: "♡",
    color: "#f2eaf0",
    iconColor: "#96718c",
    description: "বয়স্ক ভাতার যোগ্যতা, আবেদন ও প্রয়োজনীয় তথ্য।",
    documents: ["জাতীয় পরিচয়পত্র বা জন্ম নিবন্ধন", "সক্রিয় মোবাইল নম্বর", "ব্যাংক বা মোবাইল আর্থিক সেবার হিসাব"],
    office: "উপজেলা সমাজসেবা কার্যালয় বা ইউনিয়ন ডিজিটাল সেন্টার।",
  },
  {
    name: "ওয়ারিশ সনদ",
    category: "নাগরিক",
    icon: "▧",
    color: "#e8edf3",
    iconColor: "#66809a",
    description: "উত্তরাধিকারী সনদের আবেদন ও যাচাই সংক্রান্ত তথ্য।",
    documents: ["মৃত্যু নিবন্ধন সনদ", "ওয়ারিশদের জাতীয় পরিচয়পত্র বা জন্ম নিবন্ধন", "সম্পর্কের প্রমাণপত্র (প্রযোজ্য ক্ষেত্রে)"],
    office: "ইউনিয়ন পরিষদ বা পৌরসভার সংশ্লিষ্ট ওয়ার্ড কার্যালয়।",
  },
];

const grid = document.querySelector("#service-grid");
const searchInput = document.querySelector("#service-search");
const filterButtons = document.querySelectorAll(".filter-chip");
const emptyState = document.querySelector("#empty-state");
const serviceCount = document.querySelector("#service-count");
const dialog = document.querySelector("#service-dialog");
let activeCategory = "all";

const banglaDigits = (number) =>
  String(number).replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);

function renderServices() {
  const query = searchInput.value.trim().toLocaleLowerCase("bn");
  const visibleServices = services.filter((service) => {
    const matchesCategory = activeCategory === "all" || service.category === activeCategory;
    const searchableText = `${service.name} ${service.category} ${service.description}`.toLocaleLowerCase("bn");
    return matchesCategory && searchableText.includes(query);
  });

  serviceCount.textContent = banglaDigits(visibleServices.length).padStart(2, "০");
  emptyState.hidden = visibleServices.length > 0;
  grid.innerHTML = visibleServices
    .map(
      (service) => `
        <article class="service-card">
          <div class="service-card-top">
            <span class="service-icon" style="background:${service.color};color:${service.iconColor}" aria-hidden="true">${service.icon}</span>
            <span class="service-category">${service.category}</span>
          </div>
          <h3>${service.name}</h3>
          <p>${service.description}</p>
          <button class="card-link" type="button" data-service="${service.name}">
            বিস্তারিত জানুন <span aria-hidden="true">→</span>
          </button>
        </article>`,
    )
    .join("");
}

function openServiceDetails(name) {
  const service = services.find((item) => item.name === name);
  if (!service) return;

  document.querySelector("#dialog-icon").textContent = service.icon;
  document.querySelector("#dialog-icon").style.background = service.color;
  document.querySelector("#dialog-icon").style.color = service.iconColor;
  document.querySelector("#dialog-category").textContent = `${service.category} সেবা`;
  document.querySelector("#dialog-title").textContent = service.name;
  document.querySelector("#dialog-description").textContent = service.description;
  document.querySelector("#dialog-office").textContent = service.office;

  const documents = document.querySelector("#dialog-documents");
  documents.replaceChildren(
    ...service.documents.map((documentName) => {
      const item = document.createElement("li");
      item.textContent = documentName;
      return item;
    }),
  );
  dialog.showModal();
}

searchInput.addEventListener("input", renderServices);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;
    filterButtons.forEach((filter) => {
      const isSelected = filter === button;
      filter.classList.toggle("selected", isSelected);
      filter.setAttribute("aria-pressed", String(isSelected));
    });
    renderServices();
  });
});

grid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-service]");
  if (button) openServiceDetails(button.dataset.service);
});

dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    searchInput.focus();
    searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
  }
});

renderServices();
