export interface ProfessionalDirectoryModel {
  selectedButton: string;
  buttons: Array<string>;
  professionalDirectory: Array<DirectoryModel>;
}

interface DirectoryModel{
  name: string;
  image: string;
  role: string;
  number: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    linkedin: string;
    twitter: string;
    world: string;
  };
}
