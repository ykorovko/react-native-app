export default {
  // Screens
  screens: {
    root: {
      title: 'Welcome!',
      subtitle: 'You must sign in / sign up to gain access',
      signin: 'Signin',
      signup: 'Signup'
    },
    signin: {
      title: 'Signin',
      email: 'Your email',
      password: 'Your password'
    },
    signup: {
      title: 'Signup',
      fullname: 'Your fullname',
      phone: 'Your phone',
      email: 'Your email',
      password: 'Your password',
      passwordConfirm: 'Confirm your password'
    },
    verify: {
      title: 'Enter the code',
      code: 'Code'
    },

    home: {
      balance: 'Balance in dollars:',

      executed: 'Executed',
      forSignature: 'For signature',
      processing: 'Processing',
      rejected: 'Rejected',

      fingerprintSignin: 'Set fingerprint sign in?'
    },

    more: {
      title: 'More',
      fullname: 'Fullname',
      phone: 'Phone number',
      auth: '2 Factor Auth',
      language: 'Language',
      logout: 'Logout'
    }
  },

  // Navigators
  navigators: {
    home: 'Home',
    payments: 'Payments',
    messages: 'Messages',
    more: 'More'
  },

  // Buttons
  buttons: {
    submit: 'Submit',
    cancel: 'Cancel',
    yes: 'Yes'
  },

  // Components
  components: {
    LanguageSwitcher: {
      en: 'Eng',
      ru: 'Rus'
    },
    LocalAuthModal: {
      title: 'Authenticate',
      label: 'Touch the fingerprint sensor'
    },
    TransactionsList: {
      noData: 'No data'
    }
  }
}
