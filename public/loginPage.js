// Создаем экземпляр класса UserForm. Предполагается, что класс UserForm уже определен.
const userForm = new UserForm();

// Определяем функцию обратного вызова для формы входа.
userForm.loginFormCallback = function(data) {
  // Функция, которая будет вызвана после выполнения запроса авторизации.
  const loginCallback = (response) => {
    // Логируем ответ сервера в консоль для отладки.
    console.log("Ответ сервера на запрос авторизации:", response);

    // Проверяем, был ли запрос успешным (предполагаем, что в ответе есть свойство 'success').
    if (response.success) {
      // Если авторизация прошла успешно, перезагружаем страницу.
      location.reload();
    } else {
      // Если авторизация не удалась, отображаем сообщение об ошибке.
      // Предполагается, что у нас есть элемент с id 'error-message' для вывода ошибок.
      document.getElementById('error-message').textContent = response.message || "Ошибка авторизации.";
    }
  };

  // Выполняем запрос на сервер для авторизации, используя ApiConnector.login.
  // Передаем данные формы и функцию обратного вызова.
  ApiConnector.login(data, loginCallback);
};

// Аналогично поступаем с формой регистрации.
userForm.registerFormCallback = function(data) {
  const registerCallback = (response) => {
    console.log("Ответ сервера на запрос регистрации:", response);

    if (response.success) {
      location.reload();
    } else {
      document.getElementById('error-message').textContent = response.message || "Ошибка регистрации.";
    }
  };

  // Выполняем запрос на сервер для регистрации, используя ApiConnector.register.
  ApiConnector.register(data, registerCallback);
};
