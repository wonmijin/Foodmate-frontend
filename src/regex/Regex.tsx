export const emailRegExp = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

export const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

export const nickNameRegExp = /^(?!.*[ㄱ-ㅎㅏ-ㅣ]).{2,5}$/; //영문자, 한글, 또는 숫자로 이루어진 2자 이상 5자 이하, 초성만으로는 안됨
