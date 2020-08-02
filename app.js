// const deployedURL = "https://ga-project02.herokuapp.com"
const deployedURL = null
const URL = deployedURL ? deployedURL : "http://localhost:3000"

let editContent = null
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
        .on('click', () => {
            showOneBlog(event.target.id)
        })
        .on('click', (event) => {
            editContent = blog.content[0]._id
        })
        .on('click', editBlog)
        .on('click', (event) => {
           console.log(event.target.id)
           $('#submit-edit').attr('id', `${blog._id}`)
        })
    $('#listAllBlogs').append($placediv)
    })
}

// POPULATE THE INPUT FIELDS WHEN BLOG IS CLICKED
const editBlog = async(event) => {
    // $('.populate').attr('id', `${event.target.id}`)
    const response = await fetch(`${URL}/travel/${event.target.id}`)
    const data = await response.json()
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


$('#submit-edit').on('click', async(event) => {
 const updatedHeading = {
    name: $('#name-edit').val(),
    createdOn: new Date(),
    destination: $('#destination-edit').val(),
    image: $('#image-edit').val()
 }
 const updatedContent = {
     favoriteMemory: $('#favoriteMemory').val(),
     leastFavoriteMemory: $('#leastFavoriteMemory').val(),
     rating: $('#rating').val(),
     landmark: [$('#landmark-edit1').val(), $('#landmark-edit2').val(), $('#landmark-edit3').val()],
     restaurant: [$('#restaurant-edit1').val(), $('#restaurant-edit2').val(), $('#restaurant-edit3').val()]
 }

 console.log(event.target.id)
// const headingUpdate = async () => {
    await fetch(`${URL}/travel/heading/${event.target.id}`, {
        method: "put",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(updatedHeading)
    })
// }

// const contentUpdate = async () => {
    await fetch(`${URL}/travel/content/${editContent}`, {
        method: "put",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(updatedContent)
    })
// }

// headingUpdate()
// contentUpdate()
 $('.modal').modal('hide')

// const one = async() => {
//     const response = await fetch(`${URL}/travel/${event.target.id}`)
//     console.log(response.json())
// }
// one()

//  function refreshPage(){
//     window.location.reload();
//  }
// refreshPage()
$('#listAllBlogs').empty()
$('#listOneBlog').empty()
getAll()
showOneBlog(event.target.id)
})


// SHOW CONTENT OF CLICKED BLOG NAME
const showOneBlog = async (someId) => {
    const response = await fetch(`${URL}/travel/${someId}`)
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
    // console.log(data)

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