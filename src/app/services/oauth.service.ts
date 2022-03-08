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
    icon: 'fa-facebook',
    color: '#3b5998',
  },
  {
    id: 'vk',
    name: 'VK',
    icon: 'fa-vk',
    color: '#43648c',
  },
  {
    id: 'google-plus',
    name: 'Google+',
    icon: 'fa-google',
    color: '#dd4b39',
  },
  /*{
    id: 'twitter',
    name: 'Twitter',
    icon: 'fa-twitter',
    color: '#55acee',
  },
  {
    id: 'github',
    name: 'Github',
    icon: 'fa-github',
    color: '#000000',
  }*/
];
