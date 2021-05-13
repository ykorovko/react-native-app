export default {
  // Screens
  screens: {
    root: {
      title: 'Добро пожаловать!',
      subtitle: 'Нужно войти / зарегистрироваться чтобы получить доступ.',
      signin: 'Войти',
      signup: 'Зарегистрироваться'
    },
    signin: {
      title: 'Войти',
      email: 'Ваша почта',
      password: 'Ваш пароль'
    },
    signup: {
      title: 'Зарегистрироваться',
      fullname: 'Ваше имя',
      phone: 'Ваш телефон',
      email: 'Ваша почта',
      password: 'Ваш пароль',
      passwordConfirm: 'Потвердите ваш пароль'
    },
    verify: {
      title: 'Введите код',
      code: 'Код'
    },

    home: {
      balance: 'Баланс в долларах:',

      executed: 'Выполненные',
      forSignature: 'На подпись',
      processing: 'В обработке',
      rejected: 'Отклоненные',

      fingerprintSignin: 'Установить вход по отпечатку пальца?'
    },

    more: {
      title: 'Еще',
      fullname: 'Полное имя',
      phone: 'Номер телефона',
      auth: '2 факторная аутентификация',
      language: 'Язык',
      logout: 'Выйти'
    }
  },

  // Navigators
  navigators: {
    home: 'Главная',
    payments: 'Платежи',
    messages: 'Сообщения',
    more: 'Еще'
  },

  // Buttons
  buttons: {
    submit: 'Отправить',
    cancel: 'Отмена',
    yes: 'да'
  },

  // Components
  components: {
    LanguageSwitcher: {
      en: 'Англ',
      ru: 'Рус'
    },
    LocalAuthModal: {
      title: 'Аутентифицировать',
      label: 'Прикоснитесь к датчику отпечатков пальцев'
    },
    TransactionsList: {
      noData: 'Нет данных'
    }
  },

  // Validations
  validations: {
    required: 'Обязательное поле',
    email: 'Должен быть валидный email',
    min6: 'Должно быть не менее 6 символов',
    passwordsMatch: 'Пароли должны совпадать'
  }
}
