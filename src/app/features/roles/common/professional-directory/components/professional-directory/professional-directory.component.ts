import { Component, OnInit} from '@angular/core';
import {ProfessionalDirectoryModel} from '../../models/directory.model';
@Component({
  selector: 'app-professional-directory',
  templateUrl: './professional-directory.component.html',
  styleUrls: ['./professional-directory.component.scss']
})
export class ProfessionalDirectoryComponent implements OnInit {
  directory: ProfessionalDirectoryModel = {} as ProfessionalDirectoryModel;
  constructor() { }

  ngOnInit(): void {
    this.directory.professionalDirectory = [
      {image: 'https://img-cdn.tid.al/o/4858a4b2723b7d0c7d05584ff57701f7b0c54ce3.jpg', name: 'Daniel Kevin', role: 'Real Estate Agent', number: '+923 24 4 1276', socialMedia: {facebook: 'https://www.google.com/', instagram: 'https://www.google.com/', linkedin: 'https://www.google.com/', twitter: 'https://www.google.com/', world: 'https://www.google.com/'}},
      {image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHPzYd8Zq8A3IXMaeSeTyfaSTce2CLi0NZ-Q&usqp=CAU', name: 'Tom Holland', role: 'Real Estate Agent', number: '+923 24 4 1276', socialMedia: {facebook: 'https://www.google.com/', instagram: 'https://www.google.com/', linkedin: 'https://www.google.com/', twitter: 'https://www.google.com/', world: 'https://www.google.com/'}},
      {image: 'https://alicepropertymanagement.com/images/temp-profile.jpg', name: 'Sean Paul', role: 'Real Estate Agent', number: '+923 24 4 1276', socialMedia: {facebook: 'https://www.google.com/', instagram: 'https://www.google.com/', linkedin: 'https://www.google.com/', twitter: 'https://www.google.com/', world: 'https://www.google.com/'}},
      {image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6zes53m4a_2VLTcmTn_bHk8NO5SkuWfcQbg&usqp=CAU', name: 'Trevor Owen', role: 'Real Estate Agent', number: '+923 24 4 1276', socialMedia: {facebook: 'https://www.google.com/', instagram: 'https://www.google.com/', linkedin: 'https://www.google.com/', twitter: 'https://www.google.com/', world: 'https://www.google.com/'}},
      {image: 'https://img-cdn.tid.al/o/4858a4b2723b7d0c7d05584ff57701f7b0c54ce3.jpg', name: 'Daniel Ho', role: 'Real Estate Agent', number: '+923 24 4 1276', socialMedia: {facebook: 'https://www.google.com/', instagram: 'https://www.google.com/', linkedin: 'https://www.google.com/', twitter: 'https://www.google.com/', world: 'https://www.google.com/'}},
      {image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHPzYd8Zq8A3IXMaeSeTyfaSTce2CLi0NZ-Q&usqp=CAU', name: 'Tom Holland', role: 'Real Estate Agent', number: '+923 24 4 1276', socialMedia: {facebook: 'https://www.google.com/', instagram: 'https://www.google.com/', linkedin: 'https://www.google.com/', twitter: 'https://www.google.com/', world: 'https://www.google.com/'}},
      {image: 'https://alicepropertymanagement.com/images/temp-profile.jpg', name: 'Sean Paul', role: 'Real Estate Agent', number: '+923 24 4 1276', socialMedia: {facebook: 'https://www.google.com/', instagram: 'https://www.google.com/', linkedin: 'https://www.google.com/', twitter: 'https://www.google.com/', world: 'https://www.google.com/'}},
      {image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6zes53m4a_2VLTcmTn_bHk8NO5SkuWfcQbg&usqp=CAU', name: 'Trevor Owen', role: 'Real Estate Agent', number: '+923 24 4 1276', socialMedia: {facebook: 'https://www.google.com/', instagram: 'https://www.google.com/', linkedin: 'https://www.google.com/', twitter: 'https://www.google.com/', world: 'https://www.google.com/'}},
      {image: 'https://img-cdn.tid.al/o/4858a4b2723b7d0c7d05584ff57701f7b0c54ce3.jpg', name: 'Daniel Ho', role: 'Real Estate Agent', number: '+923 24 4 1276', socialMedia: {facebook: 'https://www.google.com/', instagram: 'https://www.google.com/', linkedin: 'https://www.google.com/', twitter: 'https://www.google.com/', world: 'https://www.google.com/'}},
      {image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHPzYd8Zq8A3IXMaeSeTyfaSTce2CLi0NZ-Q&usqp=CAU', name: 'Tom Holland', role: 'Real Estate Agent', number: '+923 24 4 1276', socialMedia: {facebook: 'https://www.google.com/', instagram: 'https://www.google.com/', linkedin: 'https://www.google.com/', twitter: 'https://www.google.com/', world: 'https://www.google.com/'}},
      {image: 'https://alicepropertymanagement.com/images/temp-profile.jpg', name: 'Sean Paul', role: 'Real Estate Agent', number: '+923 24 4 1276', socialMedia: {facebook: 'https://www.google.com/', instagram: 'https://www.google.com/', linkedin: 'https://www.google.com/', twitter: 'https://www.google.com/', world: 'https://www.google.com/'}},
      {image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6zes53m4a_2VLTcmTn_bHk8NO5SkuWfcQbg&usqp=CAU', name: 'Trevor Owen', role: 'Real Estate Agent', number: '+923 24 4 1276', socialMedia: {facebook: 'https://www.google.com/', instagram: 'https://www.google.com/', linkedin: 'https://www.google.com/', twitter: 'https://www.google.com/', world: 'https://www.google.com/'}},
      {image: 'https://img-cdn.tid.al/o/4858a4b2723b7d0c7d05584ff57701f7b0c54ce3.jpg', name: 'Daniel Ho', role: 'Real Estate Agent', number: '+923 24 4 1276', socialMedia: {facebook: 'https://www.google.com/', instagram: 'https://www.google.com/', linkedin: 'https://www.google.com/', twitter: 'https://www.google.com/', world: 'https://www.google.com/'}},
      {image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHPzYd8Zq8A3IXMaeSeTyfaSTce2CLi0NZ-Q&usqp=CAU', name: 'Tom Holland', role: 'Real Estate Agent', number: '+923 24 4 1276', socialMedia: {facebook: 'https://www.google.com/', instagram: 'https://www.google.com/', linkedin: 'https://www.google.com/', twitter: 'https://www.google.com/', world: 'https://www.google.com/'}},
      {image: 'https://alicepropertymanagement.com/images/temp-profile.jpg', name: 'Sean Paul', role: 'Real Estate Agent', number: '+923 24 4 1276', socialMedia: {facebook: 'https://www.google.com/', instagram: 'https://www.google.com/', linkedin: 'https://www.google.com/', twitter: 'https://www.google.com/', world: 'https://www.google.com/'}},
      {image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6zes53m4a_2VLTcmTn_bHk8NO5SkuWfcQbg&usqp=CAU', name: 'Trevor Owen', role: 'Real Estate Agent', number: '+923 24 4 1276', socialMedia: {facebook: 'https://www.google.com/', instagram: 'https://www.google.com/', linkedin: 'https://www.google.com/', twitter: 'https://www.google.com/', world: 'https://www.google.com/'}},

    ];
    this.directory.buttons = ['Agents', 'Lenders', 'Attorney', 'Inspectors', 'Insurance'];
    this.directory.selectedButton = this.directory.buttons[0];

  }

  listClick(value): void {
    console.log(value)
    this.directory.selectedButton = value;
  }
}
