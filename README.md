# Project iCollect

This project is a term project as part of the internship

## Deploy

https://icollect.onrender.com/

## Technologies

Project is created with MERN:
* Mongo DB
* Express
* React
* Node

## Description

Wep Application for managing personal collections

For unauthorized user site is available in read-only mode with disabled ability to see likes and comments

Every unblocked authenticated user can create and manage collections on their profile page

The site administrators can create and manage collections both from his profile and from the profile of any user, and has access to the page with a table for user management

The main page contains the latest added items, the largest collections, as well as a tag cloud

## Features

### UI
The project is made using **Material UI** components

### Forms
The forms in the project are controlled by **react-hook-form**

The project has forms:
* Registration, login
  Forms consist of text fields
* Create collection
  The form is implemented in a modal window in the user profile
  The form consists of:
  * Text field for input the title of the collection
  * Field to add a picture and view it after uploading to the cloud
  * Field for selecting a collection subject with a fixed set options
  * Field for input the description with the possibility of styling the text by the user
  * And optional extra fields for collection customization, which allow you to select future fields (by specifying the field name and data type) that will be displayed when you create collection items
* Create item
  The form is implemented in a modal window on the collection page
  The form consists of:
  * Text field for input the title of the item
  * Field for entering tags that is a *React Autocomplete component*, with the ability to select tags from those previously entered on the site when creating other items
  * Extra fields that are created depending on the data passed by the user when creating the collection. 
    * There are 5 types of extra fields: 
      * number
      * string
      * text (with the possibility of styling the text by the user)
      * date
      * checkbox

### Image upload

Images uploaded by the user are stored in **Firebase** cloud. An image url is saved to the database when the collection creation form is submitted

### MarkDowm

Using **react-draft-wysiwyg** it is possible to stylize user-entered text (**bold**, *italic*, underline, strikethrough, monospace, superscript and subscript)

Using **markdown-to-jsx** the formatted text is displayed in the interface

Using **html-to-text** these fields appear as plain text in the table on the collection page

### Full-text search

The full-text search is done with the help of **minisearch** on server side and the result is a list of items

### Dark mode

Switching the theme of the site is done by clicking on the button in the header 
Implemented based on MUI **createTheme** and **ThemeProvider**

### Locales

Site localization can be switched by selecting a language in the header
Implemented based on **react-intl**

### Export to .csv

Implemented possible to save a list of items of a particular collection in csv format using **react-json-to-csv**