type ExternalLoginService = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

export const externalLoginServices: ExternalLoginService[] = [
  {
    id: 'facebook',
    name: 'Facebook',
    icon: 'bi-facebook',
    color: '#3b5998',
  },
  {
    id: 'google-plus',
    name: 'Google+',
    icon: 'bi-google',
    color: '#dd4b39',
  },
  /*{
    id: 'twitter',
    name: 'Twitter',
    icon: 'bi-twitter',
    color: '#55acee',
  },
  {
    id: 'github',
    name: 'Github',
    icon: 'bi bi-github',
    color: '#000000',
  }*/
];
