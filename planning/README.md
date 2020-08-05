# Project Overview

## Project Schedule

|  Day | Deliverable | Status
|---|---| ---|
|Day 1| Project Description | Complete
|Day 1| Wireframes / Priority Matrix / Timeline `backend` and `frontend`| Complete
|Day 2| Working RestAPI | Complete
|Day 3| Core Application Structure (HTML, CSS, etc.) | Complete
|Day 4| MVP & Bug Fixes | Complete
|Day 5| Final Touches and Present | Incomplete

## Project Description
This project showcases a travel diary of an author who displays his/her travel experiences. The blog author has access to all his/her blogs and can create and update blogs in the navigation bar. 

To render the data from the travel journal API I built on the back-end, jQuery is utilized to work in conjuntion with the API to create a friendly one-user blog. The project is hosted on Netlify platform, and can be viewed [here](https://klee-ga-project02.netlify.app/).

## User Stories
- User is able to view all travel posts by title
- User is able to view one clicked travel post
- User can edit and delete each travel post
- User can create new travel post and view the newly created post

## Backend Repo
View back-end repo [here](https://github.com/krislee/project2-backend)

## Google Sheet

[Google Sheet](https://docs.google.com/spreadsheets/d/1DRhpnHYU-LVnRYKSALXm_xbMCZ3FsTs6Zl-VJ1MU49E/edit#gid=0) 

## Wireframes

- [Mobile](https://res.cloudinary.com/dhiwn0i0g/image/upload/v1596169417/IMG_0103_eukewy.png)
- [Tablet](https://res.cloudinary.com/dhiwn0i0g/image/upload/v1596169416/IMG_0102_oxoxnb.png)
- [Desktop](https://res.cloudinary.com/dhiwn0i0g/image/upload/v1596169416/IMG_0102_oxoxnb.png)


## Time/Priority Matrix 

[Time Matrix](https://res.cloudinary.com/dhiwn0i0g/image/upload/v1596169416/IMG_0106_bant2d.png) 

### MVP/PostMVP - 5min 

#### MVP (examples)

- Make GetAllBlogs function
- Make GetOneBlog function
- Make CreateBlog function
- Make UpdateBlog function
- Make DeleteBlog function
- Responsive Layout
- Navigation Bar
- Hamburger Menu Icon


#### PostMVP 

- Make a login function 
- Explore and use BootStrap
- Animation effects

## Functional Components

#### MVP
| Component | Priority | Estimated Time | Time Invetsted | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| GetAllBlog Function | H | 1hr | 2hr | 2hr|
| ShowOneBlog Function | H | 3hr | 1.5hr | 1.5hr|
| CreateBlog Function | H | 3hr | 2hr | 2hr|
| UpdateBlog Function | H | 3hr| 5.5hr | 5.5hr |
| DeleteBlog Function| H | 2hr | 1hr | 1hr|
| Desktop Layout | H | 3hrs| 4hr | 4hr |
| Tablet Layout | H | 4hr | 0hr | 0hr|
| Mobile Layout | H| 2hr | 4hr | 4hr|
| Navigation Bar | L | 2hr | 5hr | 5hr|
| Total | H | 25hrs| 25hrs | 25hrs |

#### PostMVP
| Component | Priority | Estimated Time | Time Invetsted | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Login Function | M | 3hr | -hr | -hr|
| Animation effects| M | 4hr | -hr | -hr|
| Bootstrap | H | 10hr | 10hr | 10hr|
| Total | H | 17hrs| 10hrs | 10hrs |

## Additional Libraries
Bootstrap was used to format the design of the website. In particular, the modals and responsive navigation bar were from Bootstrap.

jQuery was used to create DOMs for the website.

## Code Snippet
To edit the blog post, required 2 separate functions. One was to populate the input fields of the edit modal, and the other function was needed to actually send a PUT request to the server to update the blog post. To populate the input field, the id of the title that was clicked in the drop down was used in the GET one request. To update the blog post, the ids needed to come from the global variables being set to the heading and content ObjectId values during the getAll function (the heading ObjectId couldn't come from the id of the clicked title, see below in Issues and Resolutions).

PASTE SNIPPET

## Issues and Resolutions

**ERROR**: The submit button id was not reflecting the actual ObjectId of the heading document, even though the submit button id was assigned to the event target id of the title when clicking upon the title. The event target id is the same ObjectId of the heading document.
**RESOLUTION**: Used a global variable and updated it explicity to the ObjectId of the heading document inside the click title function during the looping of the fetch response data.

## Previous Project Worksheet
 - [Readme's](https://github.com/jkeohan/fewd-class-repo/tree/master/final-project-worksheet/project-worksheet-examples)
 - [Best of class readme](https://github.com/jkeohan/fewd-class-repo/blob/master/final-project-worksheet/project-worksheet-examples/portfolio-gracie.md)
