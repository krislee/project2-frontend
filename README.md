## Project Description

This project showcases a travel diary of an author who displays his/her travel experiences. The blog author has access to all his/her blogs and can create, update, and delete blogs from the navigation bar. 

To render the data from the travel journal API I built on the back-end, jQuery is utilized to work in conjuntion with the API to create a friendly one-user blog. The project is hosted on Netlify platform, and can be viewed [here](https://klee-ga-project02.netlify.app/).

## Overview of the Functions
On the website, there will be a display of all the blog posts' titles in the dropdown of the navigation menu. To do this, the getAll function fetches the data from the first GET route, which will return all the documents of the heading collection. Each of the heading documents also contains the content documents in its content property due to the referenced ObjectId and populate method that uses the ObjectId to fill in information in the content property. We will loop through the JSON data returned back from the API and make an anchor tag that will contain the following information: 
	• an id equivalent to the heading ObjectId 
	• a dropdown-item class to be part of the dropdown
	• text with the title from the destination property of heading collection

When these blog titles are clicked, several things will happen:

1. The id of the anchor tag will be used for the showOneBlog function. 
    • When the blog title is clicked, that blog will be displayed through the showOneBlog function. The showOneBlog function uses the ObjectId of the heading document stored in the id of the anchor tag as the parameter of the URL to go to for the GET one blog route. When the JSON information is sent back, it will be the heading document with the content information inside it. We will make div containers, paragraphs, headings, and lists from this information. We will also empty out the div that contains all these divs, paragraphs, headings, and lists before appending the information to the HTML to avoid multiple blog posts appearing on the screen. 

2. The global variables, called editContent, editHeading, and deleteHeading that initially have the values of null, will be updated to contain the ObjectId number of either the heading document that was clicked, or the ObjectId number of the content document that is inside the clicked heading document. These variables will be used for the parameters of the URL. 
    • Recall to edit the content and heading, there are 2 different PUT routes, therefore we need 2 different ObjectIds, one is of the heading document and the other is of the content document. The ObjectId of the content document can be obtained from the content property of the heading document. Once we send the server with the updated information, we want to display the updated blog by calling on the showOneBlog function which will use the same ObjectId since it is the same heading document but with updated information. We also want to update the dropdown anchor tag text if the title was updated by calling the getAll function. 

    • To delete the heading and content, there was one DELETE route and only required the heading ObjectId. Therefore, the editHeading and deleteHeading variable values are the same (but were declared for semantic purposes). After deleting, we again call the getAll function to update the dropdown containing the titles, and showOneBlog function, which has the ObjectId of the last created post to display the last created post.

3. The editBlog function is invoked so that the input fields of the edit/delete modal will be populated. This function works by also getting the ObjectId from the clicked anchor tag id CSS selector so that the GET one request can send back the JSON information of the heading document with that ObjectId. We can take the equate each input field values to each of its corresponding information from the heading document and the referenced content document inside the heading document. 

To create a new post, the values from the create modal are grabbed and sent to the server. Since the PUT route of the API will send back the newly created post, we can grab the ObjectId from it and call on showOneBlog function to display the newly created post.

## Future Implementations
- Create a log-in component. Once user logs in, the blog posts stored for that user are shown.
- After deleting a blog post, show the most updated post rather than the last created post.
- Currently the homepage is empty aside from the navigation bar. Therefore, display the last created blog as the landing page without having to first click on a title to view a post. 

