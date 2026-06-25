function openAlbum(){
    document.getElementById('addAlbum').style.display = 'flex'
    document.getElementById('overlay').style.display = 'block'
    document.getElementById('album-title').value = '';
    document.getElementById('album-author').value = '';
    document.getElementById('rating-atm').value = '';
    document.getElementById('rating-beat').value = '';
    document.getElementById('rating-act').value = '';
    document.getElementById('rating-kach').value = '';
    document.getElementById('rating-vpech').value = '';
    document.getElementById('album-image').value = '';
}
function closeAlbum(){
    document.getElementById('addAlbum').style.display = 'none'
    document.getElementById('editAlbum').style.display = 'none'
    document.getElementById('overlay').style.display = 'none'
}


const albums = [];
const savedAlbums = localStorage.getItem('albums');

if (savedAlbums) {
    albums.push(...JSON.parse(savedAlbums));
}
let currentId = null;

function saveAlbums() {
    localStorage.setItem(
        'albums',
        JSON.stringify(albums)
    );
}

function calculateRating(){
    

    let atm = Number(document.getElementById('rating-atm').value);
    let beat = Number(document.getElementById('rating-beat').value);
    let act = Number(document.getElementById('rating-act').value);
    let kach = Number(document.getElementById('rating-kach').value);
    let vpech = Number(document.getElementById('rating-vpech').value);

    return atm + beat + act + kach + (vpech * 5)
}

function addAlbum(){
    const album = {
        id: Date.now(),
        title: document.getElementById('album-title').value,
        author: document.getElementById('album-author').value,
        atm: Number(document.getElementById('rating-atm').value),
        beat: Number(document.getElementById('rating-beat').value),
        act: Number(document.getElementById('rating-act').value),
        kach: Number(document.getElementById('rating-kach').value),
        vpech: Number(document.getElementById('rating-vpech').value),

        rating: calculateRating(),
        img: document.getElementById('album-image').value

    };

    albums.push(album);
    renderAlbums();
    closeAlbum();
    saveAlbums();
}

function renderAlbums(){
    const top = document.querySelector('.top');
    top.innerHTML = '';
    albums.sort((a,b) => b.rating - a.rating);
    albums.forEach((album,index) => {
        const card = document.createElement('div')
        card.className = 'album';
        card.innerHTML = `
            <img class="album-image" src="${album.img}">
            <div class="info-album">
                <h2>${album.title}</h2>
                <div class="album-author">${album.author}</div>
            </div>
            <div class="album-rating">${album.rating}</div>
            <div class="album-sort">${'#' + (index + 1)}</div>
        `;
        const editBtn = document.createElement('button')
        editBtn.className = 'editalbBtn';
        editBtn.textContent = 'Редактировать';
        editBtn.addEventListener('click', () => {
            currentId = album.id;
            openEditAlbum();
        });
        card.appendChild(editBtn)
        top.appendChild(card)
    });
}

function openEditAlbum(){
    console.log('Открываю редактор');
    const album = albums.find(
        a => a.id === currentId
    );
    document.getElementById('editAlbum').style.display = 'flex'
    document.getElementById('overlay').style.display = 'block'

    document.getElementById('edit-title').value = album.title;
    document.getElementById('edit-author').value = album.author;
    document.getElementById('edit-image').value = album.img;
    document.getElementById('edit-rating-atm').value = album.atm;
    document.getElementById('edit-rating-beat').value = album.beat;
    document.getElementById('edit-rating-act').value = album.act;
    document.getElementById('edit-rating-kach').value = album.kach;
    document.getElementById('edit-rating-vpech').value = album.vpech;
}

function saveEditAlbum(){
    const album = albums.find(
        a => a.id === currentId
    );
    album.title = document.getElementById('edit-title').value;
    album.author = document.getElementById('edit-author').value;
    album.img = document.getElementById('edit-image').value;

    album.atm = Number(document.getElementById('edit-rating-atm').value);
    album.beat = Number(document.getElementById('edit-rating-beat').value);
    album.act = Number(document.getElementById('edit-rating-act').value);
    album.kach = Number(document.getElementById('edit-rating-kach').value);
    album.vpech = Number(document.getElementById('edit-rating-vpech').value);

    album.rating = album.atm + album.beat + album.act + album.kach + (album.vpech * 5)
    renderAlbums();
    closeAlbum();
    saveAlbums();
}

function clearTop() {
    albums.length = 0;

    renderAlbums();
    saveAlbums();
}
renderAlbums();



