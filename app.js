// const deployedURL = "https://ga-project02.herokuapp.com"
const deployedURL = null
const URL = deployedURL ? deployedURL : "http://localhost:3000"


/////// DISPLAY ALL ///////

const getAll = async () => {
    const response = await fetch(`${URL}/travel`) /*Fetch data from database, the data will be returned as a promise
    If the fetch was successful, then the promise is resolved. The value of the resolved promise (which is the data) 
    will be stored in response */
    const data = await response.json()
    console.log(data)
    data.forEach((blog) => {
        const $placediv = $('<div>')
        .attr({'id': blog._id, 'class': 'placeDiv'})
        .text(`${blog.destination}`)
        .on('click', showOneBlog)
        .on('click', editBlog)
    $('#listAllBlogs').append($placediv)
    })
}

  
/* 
Click on the div which is assigned w/ heading objectID when we make new divs for 
each of the get all blog posts. Click on the div and it will run the function. 
Inside the function, there will be a .fetch request to show one only, 
so the response data retrieved back will have input.val(data.someProperty), 
and one of the outside url parameter variable will be assigned to the 
heading.content.place value (don’t know if this is necessary but will also assign 
the edit button id to have the same id as div (event.target.id)). 
And then click on edit button to have the modal pop up with fields already populated. 
Then also, with the response data back 
Also the second outside url parameter variable will get assigned to the 
div id attribute value (event.target.id) inside the function separate from fetch function

Then when you click on edit button, take the outside url parameter for the put endpoint */

// POPULATE THE INPUT FIELDS WHEN BLOG IS CLICKED
const editBlog = async(event) => {
    // $('.populate').attr('id', `${event.target.id}`)
    const response = await fetch(`${URL}/travel/${event.target.id}`)
    const data = await response.json()
    console.log(data.content[0].landmark)
    $('#name-edit').val(`${data.name}`)
    $('#destination-edit').val(`${data.destination}`)
    $('#image-edit').val(`${data.image}`)
    $('#favoriteMemory').val(`${data.content[0].favoriteMemory}`)
    $('#leastFavoriteMemory').val(`${data.content[0].leastFavoriteMemory}`)
    $('#rating').val(`${data.content[0].rating}`)
    data.content[0].landmark.forEach((land,index) => {
        if(index === 0) {
            $('#landmark-edit1').val(land)
        } else if (index === 1){
            $('#landmark-edit2').val(land)
        } else {
            $('#landmark-edit3').val(land)
        }
    })
    data.content[0].restaurant.forEach((eat, index) => {
        if(index === 0) {
            $('#restaurant-edit1').val(eat)
        } else if (index === 1){
            $('#restaurant-edit2').val(eat)
        } else {
            $('#restaurant-edit3').val(eat)
        }
    })
}


// OPEN MODAL WITH INPUT FIELDS ALREADY POPULATED WHEN YOU CLICK ON EDIT BUTTON
$('.populate').on('click', (event) => {
    $('.modal').modal()
})

// SHOW CONTENT OF CLICKED BLOG NAME
const showOneBlog = async () => {
    const response = await fetch(`${URL}/travel/${event.target.id}`)
    const data = await response.json()

    $('#listOneBlog').empty()

    const $oneBlog = $('<div>').attr({'id': data._id, 'class': 'oneBlog'})
    const $title = $('<h1>').attr('class', 'headingTitle').text(`${data.destination}`)
    const $imageCover = $('<img>').attr({'src': `${data.image}`, 'class': 'image-cover'})
    
    const $contentParaDiv = $('<div>')
    .attr('id', 'paraDiv')
    .html(
        `<p>
        <span class="favoriteHeading">Favorite Memory: </span>
        ${data.content[0].favoriteMemory} </br> </br> <span class="leastFavoriteHeading"> Least Favorite Memory: </span>
        ${data.content[0].leastFavoriteMemory}
        </p>
        `
    )
    
    // $landRestDiv is the flex div to make $landmarkDiv and $restaurantDiv in rows
    const $landRestDiv = $('<div>').attr('class', 'landRestDiv')

    // LANDMARK DIV, HEADING, UL, LI
    const $landmarkDiv = $('<div>').attr('id', 'landmarkDiv')
    const $landmarkHeading = $('<h3>').text('Landmark').attr('class', 'landmarkHeading')
    $landmarkDiv.append($landmarkHeading)
    $listLandmarkContainer = $('<ul>').attr('id', 'listLandmarkContainer')
    data.content[0].landmark.forEach(landmark => {
        const $landmarkList = $('<li>').text(`${landmark}`)
        $listLandmarkContainer.append($landmarkList)
    })
    $landmarkDiv.append($listLandmarkContainer)

    // RESTAURANT DIV, HEADING, UL, LI
    const $restaurantDiv = $('<div>').attr('id', 'restaurantDiv')
    const $restaurantHeading = $('<h3>').text('Restaurant').attr('class', 'restaurantHeading')
    $restaurantDiv.append($restaurantHeading)
    $listRestaurantContainer = $('<ul>').attr('id', 'listRestaurantContainer')
    data.content[0].restaurant.forEach(restaurant => {
        const $restaurantList = $('<li>').text(`${restaurant}`)
        $listRestaurantContainer.append($restaurantList)
    })
    $restaurantDiv.append($listRestaurantContainer)

    // RATINGS
    const $ratingDiv = $('<div>')
    .attr('class', 'ratingDiv')
    .html(`<span class="ratingHeading"> Rating: </span> ${data.content[0].rating}`)
    
    $landRestDiv.append($landmarkDiv).append($restaurantDiv)
    $oneBlog.append($title).append($imageCover).append($contentParaDiv).append($landRestDiv).append($ratingDiv)
    $('#listOneBlog').append($oneBlog)
    console.log(data)

}   


getAll()
















////// NAVIGATION BAR //////
let $burger = $('.burger')
$burger.on('click', function(e) {
    let $right = $('.right-burger');
    $right.toggleClass('show');
    $('.burger').toggleClass('xcross')
})

$(window).resize (function(e) {
   if($(window).width()>600){
       $('.right-burger').removeClass('show')
       $('.burger').removeClass('xcross')
   }
})

// $('.modal').modal()