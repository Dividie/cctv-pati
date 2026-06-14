const cctvData = [
  {
    nama: "ALUN ALUN PATI 1",
    lokasi: "Pati Kota",
    url: "https://streaming.patikab.go.id/8eff05af-b414-41ef-b9fb-45102439095d.html",
  },
  {
    nama: "ALUN ALUN PATI 2",
    lokasi: "Pati Kota",
    url: "https://streaming.patikab.go.id/b7b5a673-ec48-4dff-b842-918f639d0b4a.html",
  },
  {
    nama: "SIMPANG SOKOKULON",
    lokasi: "Lingkar Selatan",
    url: "https://streaming.patikab.go.id/6f10803d-871d-4da2-91d8-90c92c498a1e.html",
  },
  {
    nama: "SIMPANG WIDOROKANDANG",
    lokasi: "Lingkar Selatan",
    url: "https://streaming.patikab.go.id/9d17fb99-d964-445f-8861-09ed7c56626a.html",
  },
  {
    nama: "TERMINAL BUS SLEKO 1",
    lokasi: "Terminal Pati",
    url: "https://streaming.patikab.go.id/dfd316df-7293-40d8-b523-0b2b7ddb79df.html",
  },
  {
    nama: "TERMINAL BUS SLEKO 2",
    lokasi: "Terminal Pati",
    url: "https://streaming.patikab.go.id/22ab6501-63f2-43d6-af1b-ce6c1ed7cef0.html",
  },
  {
    nama: "TERMINAL BUS SLEKO 3",
    lokasi: "Terminal Pati",
    url: "https://streaming.patikab.go.id/e74e945a-e872-4f35-9ebd-b25d78db0a8c.html",
  },
];

const container = document.getElementById("cctv-container");
const search = document.getElementById("search");
const filterContainer = document.getElementById("filter-container");


function tampilkanCCTV(data) {
  container.innerHTML = "";

  data.forEach((cctv) => {
    container.innerHTML += `
<div class="card"
onclick="bukaCCTV('${cctv.nama}','${cctv.url}')">
<div class="status online">
    ● ONLINE
</div>

    <h3><i class="fa-solid fa-video"></i>  ${cctv.nama}</h3>

    <span class="badge">
        ${cctv.lokasi}
    </span>

</div>
`;
  });
  
}

tampilkanCCTV(cctvData);

search.addEventListener("keyup", () => {
  const keyword = search.value.toLowerCase();

  const hasil = cctvData.filter(
    (cctv) =>
      cctv.nama.toLowerCase().includes(keyword) ||
      cctv.lokasi.toLowerCase().includes(keyword),
  );

  tampilkanCCTV(hasil);
});

function filterLokasi(lokasi) {
  if (lokasi === "Semua") {
    tampilkanCCTV(cctvData);
    return;
  }

  const hasil = cctvData.filter((cctv) => cctv.lokasi === lokasi);

  tampilkanCCTV(hasil);
}

function buatFilterLokasi() {
  const lokasiUnik = ["Semua", ...new Set(cctvData.map((cctv) => cctv.lokasi))];

  lokasiUnik.forEach((lokasi) => {
    const button = document.createElement("button");

    button.textContent = lokasi;
    button.className = "filter-btn";

    button.addEventListener("click", () => {
      filterLokasi(lokasi);
    });

    filterContainer.appendChild(button);
  });
  
}

function bukaCCTV(nama, url) {
  document.getElementById("judul-cctv").innerText = nama;

  document.getElementById("cctv-frame").src = url;

  document.getElementById("modal").style.display = "block";
}

function tutupCCTV() {
  document.getElementById("modal").style.display = "none";

  document.getElementById("cctv-frame").src = "";
}

tampilkanCCTV(cctvData);
