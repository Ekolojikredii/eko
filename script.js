function toggleMenu() {
    var menuContent = document.getElementById('menuContent');
    menuContent.style.display = (menuContent.style.display === 'block') ? 'none' : 'block';
}

function showSection(sectionId) {
    var sections = document.querySelectorAll('.section');
    sections.forEach(function (section) {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// Kayıt Ol formunu işleme
document.getElementById('kayitForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    localStorage.setItem('userData', JSON.stringify(data));
    alert('Kayıt başarılı!');
    event.target.reset();
});

// Veri Görme formunu işleme
document.getElementById('veriGoruntulemeButon').addEventListener('click', function() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    document.getElementById('veriGoruntulemeIsim').innerText = userData.isim;
    document.getElementById('veriGoruntulemePuan').innerText = userData.puan || '0';
    const teslimlerList = document.getElementById('gecmisTeslimler');
    teslimlerList.innerHTML = '';
    const teslimler = JSON.parse(localStorage.getItem('teslimler')) || [];
    teslimler.forEach(function(teslim) {
        const li = document.createElement('li');
        li.innerText = `Okul: ${teslim.okulIsmi}, Atık Türü: ${teslim.atikTuru}, Atık Kütlesi: ${teslim.atikKutlesi} kg`;
        teslimlerList.appendChild(li);
    });
});

// Veri Girişi formunu işleme
document.getElementById('veriGirisiForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));

    const teslimler = JSON.parse(localStorage.getItem('teslimler')) || [];
    teslimler.push(data);
    localStorage.setItem('teslimler', JSON.stringify(teslimler));

    alert('Veri girişi başarılı!');
    event.target.reset();
});
