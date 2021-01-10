/* eslint camelcase: "off" */
import { extend, setInteractionMode } from 'vee-validate';
import dayjs from 'dayjs';
import {
  required,
  email,
  alpha_num,
  min,
  max,
  confirmed,
  image,
} from 'vee-validate/dist/rules';

setInteractionMode('eager');

extend('required', {
  ...required,
  message: 'Ce champ est obligatoire',
});

extend('email', {
  ...email,
  message: 'Indiquez une adresse mail au bon format',
});

extend('alpha_num', {
  ...alpha_num,
  message: 'Indiquez votre {_field_} au bon format',
});

extend('min', {
  ...min,
  message: 'Le {_field_} doit contenir au moins {length} caractères',
});

extend('max', {
  ...max,
  message: 'Le {_field_} doit contenir au maximum {length} caractères',
});

extend('strongPassword', {
  validate: (value) => {
    const regex = new RegExp(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/);
    return regex.test(value);
  },
  message: 'Votre mot de passe doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 charactère spécial',
});

extend('url', {
  validate: (value) => {
    const regex = new RegExp(/^(http|ftp|https)?(:\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^!=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])+$/);
    return regex.test(value);
  },
  message: 'Vueillez remplir une url valide',
});

extend('confirmed', {
  ...confirmed,
  message: 'Confirmez votre {_field_}',
});

extend('image', {
  ...image,
  message: 'Il semble que ce fichier n\'est pas au bon format',
});

extend('isDate', {
  validate: (value) => dayjs(value).isValid(),
  message: 'Veuillez entrer une date au bon format ',
});

extend('isPast', {
  validate: (value) => dayjs() > dayjs(value),
  message: 'Vous n\'êtes pas encore née',
});
