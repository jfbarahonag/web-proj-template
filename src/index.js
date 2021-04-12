/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/
const URL_BASE = 'https://platzi-avo.vercel.app'

const ASYNC = 0;
const PROMISE = 1;

const containerNode = document.querySelector('#container')

const formatPrice = (price) => {
    
    const newPrice = new window.Intl.NumberFormat('en-EN', {
        style: 'currency',
        currency: 'USD'
    }).format(price)
    
    return newPrice
}

/**
 * 
 * Add image, title and price as a item 
 */
function addItem(item) {
    //create image
    const img = document.createElement('img')
    img.src = URL_BASE + item.image
    img.className = 'container-item_image'

    //create title
    const title = document.createElement('h2')
    title.textContent = item.name
    title.className = 'w-16 md:w-32 lg:w-48 text-gray-600'

    //create price (no HTML associated)
    const price = document.createElement('div')
    price.textContent = formatPrice(item.price)
    
    //create info div
    const info = document.createElement('div')
    info.className = 'container-item_info text-white'
    info.append(title, price)

    //container
    const container = document.createElement('div')
    container.append(img, info)
    container.className = 'container-item bg-gray-200 bg-opacity-25 hover:bg-gray-300 rounded-lg'

    return container
}

/**
 * 
 * Request to an URL and handling it through async await
 */
async function requestAsync(url_base) {

    const response = await fetch(`${url_base}/api/avo`);
    const responseJSON = await response.json()
    const allItems = []
    responseJSON.data.forEach(element => 
        //console.log(element.name)
        allItems.push(addItem(element))
    );
    containerNode.append(...allItems);
}

/**
 * Request to an URL and handling it through promise
 * 
 * Steps:
 *  1. Connect to the server
 *  2. Process the response and convert it to JSON
 *  3. JSON -> Data -> Render data to the browser
 */
function requestPromise(url_base) {
    //step 1
    window.fetch(`${url_base}/api/avo`)
    //step 2
    .then(response => response.json())
    //step 3
    .then(JSONResponse => {
        const allItems = []
        JSONResponse.data.forEach(element => {
            //console.log(element.name);
            allItems.push(addItem(element))
        });
        containerNode.append(...allItems);
    })
}

/**
 * 
 * Execute a request selecting the method to
 * handle it
 */
let request = (method) => {
    if (method == PROMISE) {
        console.log('PROMISE');
        requestPromise(URL_BASE)
    }
    else {
        console.log('ASYNC');
        requestAsync(URL_BASE)
    }
}

request(ASYNC)
