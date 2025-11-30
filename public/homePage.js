// Выход из личного кабинета
const logoutButton = new LogoutButton();
logoutButton.action = function() {
  ApiConnector.logout((response) => {
    if (response.success) {
      location.reload();
    }
  });
};

// Получение информации о пользователе
ApiConnector.current((response) => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
});

// Получение текущих курсов валюты
const ratesBoard = new RatesBoard();
const updateRates = () => {
  ApiConnector.getRates((response) => {
    if (response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    }
  });
};
updateRates();
setInterval(updateRates, 60000); // Обновление раз в минуту

// Операции с деньгами
const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = function(data) {
  ApiConnector.addMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      setMessage("Баланс успешно пополнен.", true); // true - признак успеха
    } else {
      setMessage(response.error, false); // false - признак ошибки
    }
  });
};

moneyManager.conversionMoneyCallback = function(data) {
  ApiConnector.convertMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      setMessage("Валюта успешно конвертирована.", true);
    } else {
      setMessage(response.error, false);
    }
  });
};

moneyManager.sendMoneyCallback = function(data) {
  ApiConnector.transferMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      setMessage("Перевод успешно выполнен.", true);
    } else {
      setMessage(response.error, false);
    }
  });
};

// Работа с избранным
const favoritesWidget = new FavoritesWidget();

const updateFavorites = () => {
  ApiConnector.getFavorites((response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      favoritesWidget.updateUsersList(response.data);
    }
  });
};

updateFavorites();

favoritesWidget.addUserCallback = function(data) {
  ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success) {
      updateFavorites();
      setMessage("Пользователь успешно добавлен в избранное.", true);
    } else {
      setMessage(response.error, false);
    }
  });
};

favoritesWidget.removeUserCallback = function(data) {
  ApiConnector.removeUserFromFavorites(data, (response) => {
    if (response.success) {
      updateFavorites();
      setMessage("Пользователь успешно удален из избранного.", true);
    } else {
      setMessage(response.error, false);
    }
  });
};
