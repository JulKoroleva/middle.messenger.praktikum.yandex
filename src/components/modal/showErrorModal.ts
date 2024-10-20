import Modal from "./modal"; 

function showErrorModal(errorMessage: string) {
  const errorModal = new Modal({
    visibility: "visible",
    modalClassName: "modal__error modal_min modal_min-top-right",
    errorMessage: errorMessage,
  });

  // Рендерим модальное окно в body или нужный контейнер
  const appElement = document.querySelector("#app");  // Или другой элемент
  let modalContent: HTMLElement | null = null;

  if (appElement) {
    // Получаем содержимое модального окна
    modalContent = errorModal.getContent();

    // Проверяем, что оно не null перед добавлением
    if (modalContent) {
      // Добавляем модальное окно в конец содержимого #app, чтобы оно было поверх
      appElement.appendChild(modalContent);
    } else {
      console.error("Ошибка: не удалось получить содержимое модального окна.");
    }
  }

  // Можно добавить таймер для автоматического скрытия модального окна через несколько секунд
  setTimeout(() => {
    errorModal.setProps({ visibility: "hidden" });
    // Удаляем модальное окно из DOM после того, как оно скрыто
    if (modalContent && modalContent.parentNode) {
      modalContent.parentNode.removeChild(modalContent);
    }
  }, 500000);  // Через 5 секунд скрыть модалку
}

export default showErrorModal;
