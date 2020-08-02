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
        .on('click', removeDisplayedBlog)
    $('#listAllBlogs').append($placediv)
    })
}

const showOneBlog = async () => {
    const response = await fetch(`${URL}/travel/${event.target.id}`)
    const data = await response.json()
    
    const $oneBlog = $('<div>').attr({'id': data._id, 'class': 'oneBlog'})
    const $title = $('<h1>').attr('class', 'headingTitle').text(`${data.destination}`)
    const $imageCover = $('<img>').attr({'src': `${data.image}`, 'class': 'image-cover'})
    
    const $contentDiv = $('<div>').html(`<p><span class="favoriteHeading">Favorite Heading</span>${data.content[0].favoriteMemory}</p>`)

    $oneBlog.append($title).append($imageCover).append($contentDiv)
    $('#listOneBlog').append($oneBlog)
    console.log(data)

}   

// const removeDisplayedBlog = () => {
//     if (event.target.id !== )
// }
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