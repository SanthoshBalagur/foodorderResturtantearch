 document.addEventListener('DOMContentLoaded', generatebyview)
 var showfavoritebutton_hide =document.getElementsByClassName('listofitems')
var showallitembutton_show= document.getElementsByClassName('listofitem')

var hidden = false;
let fetchdata;
let search_terms = "";

// Fetch data from api
const getdata = async() =>{
  fetchdata =await fetch('food.json').then(res=>res.json());

};

//generate one card

function getcard(photo,name,location,rating,ETA,Tags,id){
  return `
   <div class="card">
   <img src="${photo}"width="250" height="200">
   <ul>
   <li> Resturtant: ${name}</li>
   <li> Location :${location}</li>
   <li> Rating:${rating}</li>
   <li> ETA:${ETA}</li>
   <li> Tags:${Tags}</li>
   </ul>
   <button class ="hide_element" id ="${id}" onClick ="Savefavorite('${id}');disabled=true;"> Mark as Favorite </button>
  </div> `

}

// generate all card 

  function generateallcard(getinputparameter){
  
  var rendercard = getinputparameter.map(food => getcard(food.photo,food.name,food.location,food.rating,food.ETA,food.Tags,food.id)).join('');
  document.getElementById('card').innerHTML= rendercard;
}


//generate the all card on page load 

async function generatebyview(){
  await getdata();
  var searchbyname = fetchdata.filter(food =>food.name.toLowerCase().includes(search_terms.toLowerCase())) 
  generateallcard(searchbyname)





}


// search by name functionality
const input = document.getElementById('filterInput');
input.addEventListener('input',searchbyname)

async function searchbyname(e){
 await getdata();  
  search_terms = e.target.value;
  generatebyview();

}


//Sort by selection of list Rating and ETA

async function sortby(label){
  await getdata();
  if(label.value =='rating'){
    var ratinglist = fetchdata.filter(food => food.rating)
      var sortlistbyrating = _.orderBy(ratinglist,function(item){
        return item.rating
      },['desc'])
      generateallcard(sortlistbyrating)
 }
 if(label.value =='ETA'){
  var ETAlist = fetchdata.filter(food => food.ETA)
  var sortlistbyETA = _.orderBy(ETAlist,function(item) {
      return item.ETA   
  },['desc'])
  generateallcard(sortlistbyETA)
 }

}

// filter by tags

async function filter(tag){
let taglist;
let filterbytag;
  await getdata();
  for(var i =0;i<fetchdata.length;i++){
    let taglength =fetchdata[i].Tags.length;
for(var j=0;j<taglength;j++){
  taglist = fetchdata[i].Tags[j];
  if(tag.value == taglist ){
   filterbytag  = _.filter(fetchdata, function(item) {
      return item.Tags[j] == taglist
  });
  }
    }
  }
  generateallcard(filterbytag)

  }
  
  //Save favorite 
  let multipleitems =[];

  async function Savefavorite (id) {
    await getdata()
    var filterbyid = _.filter(fetchdata,function(item){
      return item.id == id
      
    })
    multipleitems.push(filterbyid)
  
 var Mark_as_fav = JSON.stringify(multipleitems)

   localStorage.setItem('store',Mark_as_fav)
}
  

var  showfavoritebutton_hide;
var showallitembutton_show ;
  //  show the list of favorite items!
function showfavorite(){

  

  
  
var storeditem = localStorage.getItem('store');
var show_all_items = JSON.parse(storeditem);
var list_fav_items = Array.prototype.concat.apply([],show_all_items)
console.log(list_fav_items)


generateallcard(list_fav_items)



// hide a Mark as favorite button  once show favorite button clicked


for(i=0;i<list_fav_items.length;i++){
var elem = document.querySelector('.hide_element');
elem.parentNode.removeChild(elem);

}

}



  




  









 



