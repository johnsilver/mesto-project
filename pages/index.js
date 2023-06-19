const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_type-edit-profile');
const popupAddCard = document.querySelector('.popup_type-add-card');
const popupOpenedPhoto = document.querySelector('.popup_type-open-card');
const cardElements = document.querySelector('.elements');
const cardLike = document.querySelectorAll('.card__like');
const cardDelete = document.querySelectorAll('.card__delete');
// const cardPhoto = document.querySelectorAll('.card__photo');
const cardPhoto = [];

function closePopup(evt) {
    const popup = evt.currentTarget.closest('.popup');
    popup.classList.remove('popup_opened');
}

// popup Edit profile
function openPopupEditProfile() {
    const popupCloseButton = popupEditProfile.querySelector('.popup__close-button');

    let profileTitle = document.querySelector('.profile__title');
    let profileDescription = document.querySelector('.profile__description');
    let userNameInput = popupEditProfile.querySelector('#user-name-input');
    let userCareerInput = popupEditProfile.querySelector('#user-career-input');

    popupEditProfile.classList.add('popup_opened');

    userNameInput.value = profileTitle.textContent;
    userCareerInput.value = profileDescription.textContent;
    
    popupCloseButton.addEventListener('click', closePopup);
}

function saveProfile(evt) {
    evt.preventDefault();

    document.querySelector('.profile__title').textContent = popupEditProfile.querySelector('#user-name-input').value;
    document.querySelector('.profile__description').textContent = popupEditProfile.querySelector('#user-career-input').value;

    closePopup(evt);
}

// popup Add card
function openPopupAddCard() {
    const popupCloseButton = popupAddCard.querySelector('.popup__close-button');
    popupAddCard.classList.add('popup_opened');
    popupCloseButton.addEventListener('click', closePopup);
}

function addCard(evt) {
    evt.preventDefault();
    let cardNameInput = popupAddCard.querySelector('#card-name-input');
    let cardLinkInput = popupAddCard.querySelector('#card-link-input');
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = cardNameInput.value;
    cardElement.querySelector('.card__photo').src = cardLinkInput.value;

    console.dir(cardElement.children[0]);
    cardElements.prepend(cardElement);

    cardNameInput.value = '';
    cardLinkInput.value = '';

    closePopup(evt);

    const cardLike = document.querySelector('.card__like');
    cardLike.addEventListener('click', likeCard);
    const cardDelete = document.querySelector('.card__delete');
    cardDelete.addEventListener('click', deleteCard);
    cardPhotoListener();
    // const cardPhoto = document.querySelectorAll('.card__photo');
    // // вот внизу я в качестве параметра открытия попапа с фоткой должна передать тег img
    // cardPhoto.addEventListener('click', openPopupPhoto(cardElement.children[0]));
}

// like card
function likeCard(evt) {
    evt.currentTarget.classList.toggle('card__like_active');
}

// delete card
function deleteCard(evt) {
    const card = evt.currentTarget.closest('.card');
    card.remove();
}

// open popup photo
function openPopupPhoto(evt) {
    const popupCloseButton = popupOpenedPhoto.querySelector('.popup__close-button');
    popupOpenedPhoto.classList.add('popup_opened');
    
    let photo = popupOpenedPhoto.querySelector('.popup__photo');
    let title = popupOpenedPhoto.querySelector('.popup__opened-card-title');
    const cardPhoto = evt.currentTarget;
    const card = evt.currentTarget.closest('.card');
    const cardTitle = card.querySelector('.card__title');

    photo.src = cardPhoto.src;
    title.textContent = cardTitle.textContent;
    
    popupCloseButton.addEventListener('click', closePopup);
}

profileEditButton.addEventListener('click', openPopupEditProfile);
popupEditProfile.addEventListener('submit', saveProfile);
addCardButton.addEventListener('click', openPopupAddCard);
popupAddCard.addEventListener('submit', addCard);

cardLike.forEach(function(element){
    element.addEventListener('click', likeCard);
});

cardDelete.forEach(function(element){
    element.addEventListener('click', deleteCard);
});



function cardPhotoListener() {
    const cardPhoto = document.querySelectorAll('.card__photo');
    cardPhoto.forEach(function(element){
        element.addEventListener('click', openPopupPhoto);
    });
}

cardPhotoListener();