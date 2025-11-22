/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


export interface Program {
  id: string;
  title: string;
  category: string;
  image: string;
  highlight: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum Section {
  HERO = 'hero',
  ACADEMIC = 'academic',
  ABOUT = 'about',
  CONTACT = 'contact',
}