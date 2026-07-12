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
    nama: "Halaman Parkir Pengadilan Agama Pati",
    lokasi: "Pati Kota",
    url: "https://papati.cctvbadilag2.my.id/400967PAPATI/play.html?name=983828681419099467046478",
  },
  {
    nama: "Ruang Tunggu Sidang Pengadilan Agama Pati",
    lokasi: "Pati Kota",
    url: "https://papati.cctvbadilag2.my.id/400967PAPATI/play.html?name=666174141875669052394405",
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

let currentFilter = "all";

// Inisialisasi Aplikasi
document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
    renderSidebarMenu();
    renderCCTVGrid(cctvData);
    initSearch();
});

// 1. Generate Menu Sidebar Berdasarkan Lokasi Unik Secara Otomatis
function renderSidebarMenu() {
    const areaListContainer = document.getElementById('areaList');
    // Ambil lokasi unik dari data
    const unikLokasi = [...new Set(cctvData.map(item => item.lokasi))];
    
    let menuHTML = `<li class="active" data-area="all">Semua Area</li>`;
    unikLokasi.forEach(lokasi => {
        menuHTML += `<li data-area="${lokasi}">${lokasi}</li>`;
    });
    
    areaListContainer.innerHTML = menuHTML;

    // Tambah Event Listener Klik untuk Filter
    areaListContainer.querySelectorAll('li').forEach(li => {
        li.addEventListener('click', (e) => {
            areaListContainer.querySelectorAll('li').forEach(item => item.classList.remove('active'));
            e.target.classList.add('active');
            
            currentFilter = e.target.getAttribute('data-area');
            filterAndSearch();
        });
    });
}

// 2. Render Kartu CCTV Menggunakan IFRAME
function renderCCTVGrid(data) {
    const grid = document.getElementById('cctvGrid');
    
    if (data.length === 0) {
        grid.innerHTML = `<div class="no-data">Kamera tidak ditemukan atau offline.</div>`;
        return;
    }

    grid.innerHTML = data.map(cctv => `
        <div class="cctv-card">
            <div class="video-placeholder">
                <div class="live-tag">
                    <span class="pulse-dot"></span> LIVE
                </div>
                <iframe src="${cctv.url}" scrolling="no" allowfullscreen></iframe>
            </div>
            <div class="cctv-info">
                <h4>${cctv.nama}</h4>
                <p><i data-lucide="map-pin"></i> ${cctv.lokasi}</p>
            </div>
        </div>
    `).join('');

    // Re-render icon lucide yang baru dibuat di dalam grid
    lucide.createIcons();
}

// 3. Gabungan Fungsi Filter Kategori dan Kolom Pencarian
function initSearch() {
    const searchInput = document.getElementById('searchLocation');
    searchInput.addEventListener('input', filterAndSearch);
}

function filterAndSearch() {
    const keyword = document.getElementById('searchLocation').value.toLowerCase();
    
    const filteredData = cctvData.filter(cctv => {
        const matchArea = (currentFilter === 'all' || cctv.lokasi === currentFilter);
        const matchKeyword = cctv.nama.toLowerCase().includes(keyword) || cctv.lokasi.toLowerCase().includes(keyword);
        return matchArea && matchKeyword;
    });

    renderCCTVGrid(filteredData);
}