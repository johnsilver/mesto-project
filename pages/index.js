const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const popupEditProfile = document.querySelector('.popup_type-edit-profile');
const formUserInfo = document.querySelector('.form-user-info');
const userNameInput = popupEditProfile.querySelector('#user-name-input');
const userCareerInput = popupEditProfile.querySelector('#user-career-input');

const popupAddCard = document.querySelector('.popup_type-add-card');
const formAddCard = document.querySelector('.form-add-card');
const cardNameInput = popupAddCard.querySelector('#card-name-input');
const cardLinkInput = popupAddCard.querySelector('#card-link-input');

const popupOpenedPhoto = document.querySelector('.popup_type-open-card');
const popupCloseButton = document.querySelectorAll('.popup__close-button');
const popupPhoto = document.querySelector('.popup__photo');
const popupTitle = document.querySelector('.popup__opened-card-title');

const cardElements = document.querySelector('.elements');
const likeList = [];
const trashList = [];
const photoList = [];
const cardTemplate = document.querySelector('#card-template').content;

// open close popap
function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
}

function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
}

// popup Edit profile
function openPopupEditProfile() {  
    openPopup(popupEditProfile);

    userNameInput.value = profileTitle.textContent;
    userCareerInput.value = profileDescription.textContent;
}

function saveProfile(evt) {
    evt.preventDefault();

    const popup = evt.currentTarget.closest('.popup');

    profileTitle.textContent = userNameInput.value;
    profileDescription.textContent = userCareerInput.value;

    closePopup(popup);
}

// popup Add card
function openPopupAddCard() {
    openPopup(popupAddCard);
}

function createCardElement(cardName, cardLink) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = cardName;
    cardElement.querySelector('.card__photo').src = cardLink;
    cardElement.querySelector('.card__photo').alt = cardName;

    cardTrashListener(cardElement);
    cardLikeListener(cardElement);
    cardPhotoListener(cardElement);

    return cardElement;
}

function addCard(evt) {
    evt.preventDefault();

    const popup = evt.currentTarget.closest('.popup');

    cardElements.prepend(createCardElement(cardNameInput.value, cardLinkInput.value));

    cardNameInput.value = '';
    cardLinkInput.value = '';

    closePopup(popup);
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
    openPopup(popupOpenedPhoto);
    
    const cardPhoto = evt.currentTarget;
    const card = evt.currentTarget.closest('.card');
    const cardTitle = card.querySelector('.card__title');

    popupPhoto.src = cardPhoto.src;
    popupPhoto.alt = cardTitle.textContent;
    popupTitle.textContent = cardTitle.textContent;
}

// event listener
profileEditButton.addEventListener('click', openPopupEditProfile);
formUserInfo.addEventListener('submit', saveProfile);
addCardButton.addEventListener('click', openPopupAddCard);
formAddCard.addEventListener('submit', addCard);

popupCloseButton.forEach(function(element){
    element.addEventListener('click', function(evt){
        const popup = evt.currentTarget.closest('.popup');
        closePopup(popup);
    });
});

function cardTrashListener(trashList) {
    const cardTrashElements = trashList.querySelectorAll('.card__delete');
    cardTrashElements.forEach(function(element){
        element.addEventListener('click', deleteCard);
    });
}

function cardPhotoListener(photoList) {
    const cardPhotoElements = photoList.querySelectorAll('.card__photo');
    cardPhotoElements.forEach(function(element){
        element.addEventListener('click', openPopupPhoto);
    });
}

function cardLikeListener(likeList) {
    const cardLikeElements = likeList.querySelectorAll('.card__like');
      cardLikeElements.forEach(function(element){
        element.addEventListener('click', likeCard);
    });
}
