# Web App "iCollect"

This project is a term project as part of the internship

## Deploy

https://icollect.onrender.com/

## Technologies

Project is created with MERN:

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)


## Description

Wep Application for managing personal collections

For unauthorized user site is available in read-only mode with disabled ability to see likes and comments

Every unblocked authenticated user can create and manage collections on their profile page

The site administrators can create and manage collections both from his profile and from the profile of any user, and has access to the page with a table for user management

The main page contains the latest added items, the largest collections, as well as a tag cloud

## Features

<details>
<summary>UI</summary>

The project is made using **Material UI** components

</details>

<details>
<summary>Forms</summary>

The forms in the project are controlled by **react-hook-form**

The project has forms:

* *Registration, login*

  Forms consist of text fields

* *Collection creation*

  The form is implemented in a modal window in the user profile

  The form consists of:<br>
  * Text field for input the title of the collection
  * Field to add a picture and view it after uploading to the cloud
  * Field for selecting a collection subject with a fixed set options
  * Field for input the description with the possibility of styling the text by the user
  * And optional extra fields for collection customization, which allow you to select future fields (by specifying the field name and data type) that will be displayed when you create collection items

* *Item creation*

  The form is implemented in a modal window on the collection page

  The form consists of:<br>
  * Text field for input the title of the item
  * Field for entering tags that is a *React Autocomplete component*, with the ability to select tags from those previously entered on the site when creating other items
  * Extra fields that are created depending on the data passed by the user when creating the collection.<br>
  There are 5 types of extra fields: 
      1. Number
      2. String
      3. Text (with the possibility of styling the text by the user)
      4. Date
      5. Checkbox

</details>

<details>
<summary>Image uploading</summary>

Images uploaded by the user are stored in **Firebase** cloud. An image url is saved to the database when the collection creation form is submitted

</details>

<details>
<summary>MarkDown</summary>

Using **react-draft-wysiwyg** it is possible to stylize user-entered text (**bold**, *italic*, <u>underline</u>, ~~strikethrough~~, ``monospace``, superscript<sup>superscript</sup> and subscript<sub>subscript</sub>)

Using **markdown-to-jsx** the formatted text is displayed in the interface

Using **html-to-text** these fields appear as plain text in the table on the collection page

</details>

<details>
<summary>Real-time comments & likes</summary>

On the page of each item is implemented comments block and likes, which are updated in real-time mode using **Pusher**. 

Comments block and likes is available only to authorized users

</details>

<details>
<summary>Full-text search</summary>

The full-text search is done with the help of **MiniSearch** on server side and the result is a list of items

</details>

<details>
<summary>Dark mode</summary>

Switching the theme of the site is done by clicking on the button in the header

Implemented based on MUI **createTheme** and **ThemeProvider**

</details>

<details>
<summary>Locales</summary>

Site localization can be switched by selecting a language in the header

Implemented based on **react-intl**

</details>

<details>
<summary>Export to .csv</summary>

Implemented possible to save a list of items of a particular collection in csv format using **react-json-to-csv**

</details>