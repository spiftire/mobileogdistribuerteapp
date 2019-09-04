// Handels all tasks related to making a new sales post
class SalesPostHandler {
    // Deletes the previous used picture preview element if any
    static deletePreveousPreview() {
        const imagesHolder = document.querySelector('.imagesHolder');
        if (imagesHolder) {
            imagesHolder.parentElement.removeChild(imagesHolder);
        }
    }
    // Show the preview pictures in the ui
    // todo should this be moved to UI class?
    static showPreviewPicture(event) {
        SalesPostHandler.deletePreveousPreview();
        const files = event.target.files;
        const placeUnderThisElement = document.querySelector('textarea#description');
        const imagesHolder = document.createElement('div');
        imagesHolder.classList.add('imagesHolder');
        // placeing the image holder in the DOM
        placeUnderThisElement.parentElement.insertBefore(imagesHolder, placeUnderThisElement.nextSibling);
        // Creatng the deleteImagesButton
        const deleteImagesButton = SalesPostHandler.createDeleteButton();
        // Adding delete images button after the add images button
        const addImageButton = document.querySelector('input#picture');
        if (!document.querySelector('button#deleteImages')) {
            addImageButton.parentElement.insertBefore(deleteImagesButton, addImageButton);
        }
        // Loop through all the files 
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onload = () => {
                const img = document.createElement('img');
                img.classList.add('previewPicture');
                //Setting unique id for picture
                img.id = i;
                //Setting  the src of the image
                img.src = reader.result;
                //placing the image in the imageholder
                imagesHolder.appendChild(img);
                SalesPostHandler.addClickEventToImage(img);
            };
            reader.readAsDataURL(files[i]);
        }
    }
    // Delete button
    static createDeleteButton() {
        const deleteImagesButton = document.createElement('button');
        deleteImagesButton.innerHTML = 'Delete images';
        deleteImagesButton.classList.add('button-small', 'button');
        deleteImagesButton.id = 'deleteImages';
        deleteImagesButton.setAttribute('disabled', '');
        // Add delete event 
        deleteImagesButton.addEventListener('click', () => {
            SalesPostHandler.deleteImages();
            SalesPostHandler.imagesHolderNeeded();
            SalesPostHandler.toggleDeleteImageButton();
        });
        return deleteImagesButton;
    }
    // Checks if there is a need for a imageHolder. REmoves it of there are no images
    static imagesHolderNeeded() {
        if (document.querySelectorAll('img.previewPicture').length == 0) {
            document.querySelector('div.imagesHolder').remove();
        }
    }
    // Click event for preview pictures
    static addClickEventToImage(img) {
        img.addEventListener('click', () => {
            img.classList.toggle('selected');
            SalesPostHandler.toggleDeleteImageButton();
        });
    }
    // Toggle the disabled attribute on the delete images button. Enabled if images is selected, disabled if no images selected
    static toggleDeleteImageButton() {
        const selected = document.querySelectorAll('img.selected');
        const deleteButton = document.querySelector('button#deleteImages');
        if (selected.length > 0 && deleteButton.hasAttribute('disabled')) {
            deleteButton.toggleAttribute('disabled');
        }
        if (selected.length == 0 && !deleteButton.hasAttribute('disabled')) {
            deleteButton.toggleAttribute('disabled');
        }
    }
    // Delete all the selected images from the DOM
    static deleteImages() {
        const images = document.querySelectorAll('img.selected');
        for (let i = 0; i < images.length; i++) {
            const image = images[i];
            image.remove();
        }
    }
    // Validate form
    static validateSalesItemForm(form) {
        const title = form.querySelector('#title').value;
        const price = form.querySelector('#price').value;
        const description = form.querySelector('#description').value;
        const imagesHolder = form.querySelector('div.imagesHolder');
        const pictures = [];
        for (let i = 0; i < imagesHolder.childNodes.length; i++) {
            const pictureData = imagesHolder.childNodes[i].src;
            pictures.push(pictureData);
        }
        const salesItem = new SalesItem(title, price, description, pictures);
        SalesItemsRegistry.submitToLocalStorage(salesItem);
    }
}