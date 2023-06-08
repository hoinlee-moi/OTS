export const REGULAR = {
    regPs: new RegExp(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#])[\da-zA-Z!@#]{8,14}(?!\s)$/
    ),
    regEmail: new RegExp(/^(?!.*\s)[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/),
    
    regNickname: new RegExp(/^(?=.*[a-z0-9가-힣])[a-z0-9가-힣-_]{2,12}$/),
  };