const
  addCardNote = document.querySelector('.icon'),
  cardNote = document.querySelector('.card-note'),
  xmark = document.querySelector('.fa-xmark'),
  notification = new Audio('Audio/mixkit-message-pop-alert-2354.mp3'),
  subTitle = document.querySelector('.subtitle'),
  discription = document.querySelector('.disc'),
  notes = document.querySelector('.notes'),
  btnInsertNote = document.querySelector('.btn-add');



//  Showcase dropDown menu of delete & modification note
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('fa-ellipsis')) {
    const modDel = e.target.nextElementSibling;
    modDel.classList.toggle('show');
    cardNote.classList.remove('show');
    addCardNote.addEventListener('click', () => {
      modDel.classList.remove('show');
    });
  }
});

//  Showcase cardNote after click btn add
addCardNote.addEventListener('click', () => {
  cardNote.classList.toggle('show');
});
//  disappeared cardNote after click btn xmark
xmark.addEventListener('click', () => {
  cardNote.classList.remove('show');
});
let editingCard = null;
// Function Add note when the fill form of cord note 
function insertCard() {
  let subtitleContent = subTitle.value.trim();
  let discriptionContent = discription.value.trim();

  if (!subtitleContent || !discriptionContent) return;

  if (editingCard) {
    // modification current card
    editingCard.querySelector('h3').innerText = subtitleContent;
    editingCard.querySelector('p').innerText = discriptionContent;
    editingCard.querySelector('span').innerText = new Date().toLocaleDateString('ar-DZ');
    notification.play();

    editingCard = null;
  } else {
    // Create a new card note
    const card = document.createElement('article');
    card.className = 'note w-[300px] h-[150px] bg-light-black rounded-xl flex flex-col justify-center gap-2';
    card.innerHTML = `
      <h3 class="text-2xl font-bold text-emerald-400 truncate w-[100%] overflow-hidden text-[1.5rem]">${subtitleContent}</h3>
      <p class="text-sky-500 font-bold truncate w-[100%] overflow-hidden text-[0.9rem]">${discriptionContent}</p>
      <hr>
      <div class="date flex justify-between items-center">
        <span class="text-gray-400 text-xs font-bold">${new Date().toLocaleDateString('ar-DZ')}</span>
        <div class="relative">
          <i class="fa-solid fa-ellipsis cursor-pointer"></i>
          <div class="mod-del absolute flex flex-col justify-center items-center gap-3 left-0  bg-gray-700 w-[100px] h-[70px] rounded-xl">
            <div class="mod flex justify-center items-center gap-1 hover:text-cyan-300">
              <a href="#">تعديل</a>
              <i class="fa-solid fa-pen text-xs "></i>
            </div>
            <div class="del mod flex justify-center items-center gap-1 hover:text-cyan-300">
              <a href="#">حذف</a>
              <i class="fa-solid fa-trash text-xs"></i>
            </div>
          </div>
        </div>
      </div>
    `;
    notification.play();
    notes.appendChild(card);
  }

  cardNote.classList.remove('show');
  subTitle.value = '';
  discription.value = '';
}

// insert card Note
btnInsertNote.addEventListener('click', insertCard);

// delete and modification card note 
document.addEventListener('click', (e) => {
  const deleteButton = e.target.closest('.del');
  const modifButton = e.target.closest('.mod');

  if (deleteButton) {
    const isConfirm = confirm('هل أنت متأكد ؟');
    if (isConfirm) {
      const card = deleteButton.closest('.note');
      if (card) {
        card.style.opacity = '0';
        card.style.transition = 'opacity 0.3s ease';

        setTimeout(() => {
          card.remove();
        }, 300);
      }
      notification.play();
    }
    deleteButton.closest('.mod-del').classList.remove('show');
    return;
  }
  if (modifButton) {
    const card = modifButton.closest('.note');
    const title = card.querySelector('h3').textContent.trim();
    const desc = card.querySelector('p').textContent.trim();

    subTitle.value = title;
    discription.value = desc;
    modifButton.closest('.mod-del').classList.remove('show');
    cardNote.classList.add('show');
    editingCard = card;
  }
});













