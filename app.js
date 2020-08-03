const deployedURL = "https://ga-project02.herokuapp.com"
// const deployedURL = null
const URL = deployedURL ? deployedURL : "http://localhost:3000"

let editContent = null
let editHeading = null
let deleteHeading = null

/////// DISPLAY ALL POST NAMES ON THE SITE///////
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
            editHeading = blog._id
            console.log(editHeading)
            deleteHeading = blog._id
        })
        .on('click', editBlog)
        // EVENT TARGET ID DID NOT UPDATE 
        // .on('click', (event) => {
        //    console.log(event.target.id)
        //    $('#submit-edit').attr('id', `${blog._id}`) //need to assign an id to the the submit button to put the id in the url put request
        // })
        $('#listAllBlogs').append($placediv)
    })
}

/////// POPULATE THE INPUT FIELDS WHEN BLOG NAME ON THE SIDE IS CLICKED ///////
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
    $('#landmark-edit1').val('')
    $('#landmark-edit2').val('')
    $('#landmark-edit3').val('')
    $('#restaurant-edit1').val('')
    $('#restaurant-edit2').val('')
    $('#restaurant-edit3').val('')
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

////// CLICK ON SUBMIT BUTTON TO SEND PUT REQUEST AND REFRESH PAGE WITH UPDATED POST ////////
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

//  console.log(editHeading)

    await fetch(`${URL}/travel/heading/${editHeading}`, {
        method: "put",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(updatedHeading)
    })

    await fetch(`${URL}/travel/content/${editContent}`, {
        method: "put",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(updatedContent)
    })

$('#editModal').modal('hide')

$('#listAllBlogs').empty()
$('#listOneBlog').empty()
getAll()
await showOneBlog(editHeading)
editHeading = null
})


/////// SHOW CONTENT OF CLICKED BLOG NAME ////////
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

////// CREATE NEW POSTS /////
$('#submit-create').on('click', async(event) =>{
    $('.form-group').each((input) => {
        input.val('')
    })
    const newHeading = {
        name: $('#name-create').val(),
        createdOn: new Date(),
        destination: $('#destination-create').val(),
        image: $('#image-create').val()
    }
    const newContent = 
    {
        landmark: [$('#landmark-create1').val(), $('#landmark-create2').val(), $('#landmark-create3').val()],
        restaurant: [$('#restaurant-create1').val(), $('#restaurant-create2').val(), $('#restaurant-create3').val()],
        favoriteMemory: $('#createFavoriteMemory').val(),
        leastFavoriteMemory: $('#createLeastFavoriteMemory').val(),
        rating: $('#createRating').val()
    }
    const newPost = [newHeading, newContent]

    const response = await fetch(`${URL}/travel`, {
        method: "post",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newPost)
    })
    const data = await response.json()
 
    $('#createModal').modal('hide')
    $('#listAllBlogs').empty()
    $('#listOneBlog').empty()
    getAll()
    showOneBlog(data._id)
})

///// DELETE POST /////
$('#submit-delete').on('click', async() => {
    const response = await fetch(`${URL}/travel/${deleteHeading}`, {
        method: "delete"
    })
    const data = await response.json()

    $('#editModal').modal('hide')
    $('#listAllBlogs').empty()
    $('#listOneBlog').empty()
    getAll()

    data.forEach((eachData,index,data) => {
        if(index === data.length-1){
            showOneBlog(eachData._id)
        }
    })
})



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

