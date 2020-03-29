'use strict';

/*
    TV: Телевизор,
    Laptop: Ноутбук,
    Smartphone: Смартфон,
    Fridge: Холодильник,
    Boiler: Бойлер,
    Stove: Печь,
    Washing Machine: Стиральная машина,
    Vacuum Cleaner: Пылесос,
    Conditioner: Кондиционер,
    Iron: Утюг,
    Teapot: Чайник,
    Electric Shaver: Электро-бритва,
    Toaster: Тостер,
    Coffee Machine: Кофемашина
*/

var jsonProducts = '[{"category":"TV","price":1500,"manufacturer":"Sony","createdAt":"2019-05-28T17:55:29.945Z"},{"category":"TV","price":1500,"manufacturer":"Sony","createdAt":"2019-05-28T17:55:29.945Z"},{"category":"Laptop","price":1200,"manufacturer":"Acer","createdAt":"2019-05-28T19:55:29.946Z"},{"category":"Smartphone","price":750,"manufacturer":"Apple","createdAt":"2018-03-08T10:45:00.000Z"},{"category":"Fridge","price":1850,"manufacturer":"Vestfrost","createdAt":"2018-05-28T17:55:29.946Z"},{"category":"Boiler","price":500,"manufacturer":"Indesit","createdAt":"2014-12-25T08:30:00.000Z"},{"category":"Stove","price":700,"manufacturer":"Gorenje","createdAt":"2018-09-17T11:00:00.000Z"},{"category":"Washing Machine","price":850,"manufacturer":"Electrolux","createdAt":"2019-05-28T18:55:29.946Z"},{"category":"Vacuum Cleaner","price":450,"manufacturer":"Samsung","createdAt":"2019-05-13T17:55:29.946Z"},{"category":"Conditioner","price":1000,"manufacturer":"Toshiba","createdAt":"2017-07-01T00:00:00.000Z"},{"category":"Iron","price":320,"manufacturer":"Philips","createdAt":"2013-11-18T07:20:00.000Z"},{"category":"Teapot","price":400,"manufacturer":"Bosch","createdAt":"2016-10-03T09:45:00.000Z"},{"category":"Electric Shaver","price":440,"manufacturer":"Braun","createdAt":"2019-05-29T03:55:29.946Z"},{"category":"Toaster","price":620,"manufacturer":"Tefal","createdAt":"2015-05-29T03:55:29.946Z"},{"category":"Coffee Machine","price":1300,"manufacturer":"Delonghi","createdAt":"2019-05-28T02:55:29.946Z"}]';
var productBase = JSON.parse(jsonProducts, function(key, value){
    if (key === "createdAt"){
        return new Date(value)
    }
    return value
});

var filteredGoods = []
var turnedFilters = [];
var turnedSort =[];
var newArr =[]
productBase.forEach(function(product){
            for(var key in product){
                product.date = product.createdAt.toLocaleString() 
            }});



showMainMenu()
function showMainMenu() {
    let isNotOver = true;
    while(isNotOver){
        if (filteredGoods.length > 0){
            for (let elem of turnedFilters){
                newArr.push(elem.type)
            }
            var addF = [...newArr]
            addF.join(",")
            newArr=[]
            }
        else if(filteredGoods.length === 0){
            var addF = `filters disabled`}
        if (turnedSort.length >0){
            var addSort = turnedSort[0].name
        } 
        else{
            var addSort = `sort disabled`}
        var addedFilters =`Added filters : ${addF}
        Added sort: ${addSort} `

    let selectedOption = prompt(`
        ____Main menu:____
        a) Show product list
        b) Set filters
        c) Sort products
        q) Quit 

        ${addedFilters} `)
    switch(selectedOption){
        case "a":
        case "A":
        case "Show product list":
        case "show product list":
            showProductList()
            isNotOver = true
            break;

        case "b":
        case "B":
        case "Set filters":
        case "set filters":
            showFilterMenu()
            isNotOver = true
            break;

        case "c":
        case "C":
        case "Sort products":
        case "Sort products":
            sortProducts()
            isNotOver = true
            break;

        case "q":
        case "Q":
        case "quit":
        case "Quit":
            isNotOver = false
            break;

        default: 
            alert("Select right option")
            isNotOver = true;
            break;
    }
}};


// показ списка товаров

function showDetails(item){
    var initialValue = {
    price: 0,
    count: 0,
    averageValue: 0
    };
     let a = item.reduce((result,elem)=> {
        result.price += elem.price;
        result.count +=1;
        result.averageValue = result.price / result.count ;
         return result
        },initialValue)
     return a};



function showProductList(){
    if(filteredGoods.length === 0){
        if(turnedSort.length === 0){
            console.table(productBase,["category","price","manufacturer","date"]);
            console.table(showDetails(productBase))
        }
        else{
            turnedSort[0].sortGoods(productBase);
            console.table(productBase,["category","price","manufacturer","date"]);
            console.table(showDetails(productBase))
        }
    }
    else { 
        if(turnedSort.length === 0){
            console.table(filteredGoods,["category","price","manufacturer","date"]);
            console.table(showDetails(filteredGoods))
        }
        else{
            turnedSort[0].sortGoods(filteredGoods)
            console.table(filteredGoods,["category","price","manufacturer","date"]);
            console.table(showDetails(filteredGoods))
        }      
    }
}
//показ меню фильтров
function showFilterMenu(){
    let isNotOver = true;
    while(isNotOver){
        let selectedOption = prompt("____Filter menu:____\na) Category filter\nb) Price filter\nc) Manufacturer filter\nd) Date filter\ne) Apply filters\nf) Reset filters\nq) Quit ")
        switch(selectedOption){
            case "a":
            case "A":
            case "category filter":
            case "Category filter":
                showCategoryFilterMenu()
                isNotOver = true;
                break;
            case "b":
            case "B":
            case "price filter":
            case "Price filter":
                addPriceFilter("price")
                alert("Filter added")
                isNotOver = true;
                break;
            case "c":
            case "C":
            case "manufacturer filter":
            case "Manufacturer filter":
                showManufacturerFilterMenu()
                isNotOver = true;
                break;
            case "d":
            case "D":
            case "date filter":
            case "Date filter":
                addDateFilter("date");
                alert("Filter added");
                isNotOver = true;
                break;
            case "e":
            case "E":
            case "apply filters":
            case "Apply filters":
                applyFilters()
                alert("Filters was applied!")
                console.table(turnedFilters)
                isNotOver = true;
                break;
            case "f":
            case "F":
            case "reset filters":
            case "Reset filters":
                resetFilters()
                isNotOver = true;
                break;
            case "q":
            case "Q":
            case "quit":
            case "Quit":
                isNotOver = false;
                break;
            default: 
                alert("Select right option")
                isNotOver = true;
                break;
        }

    }

}

//меню фильтра категории
function showCategoryFilterMenu(){
    let isNotOver = true;
    while(isNotOver){
        let selectedOption = prompt("___Category filter menu___\na) Add new category \nb) All exept selected \nq) Quit\n(selected category see in console)") 
        switch(selectedOption){
            case "a":
            case "A":
            case "add new category":
            case "Add new category":
                addFilter("category",false)
                alert("Filter added");
                isNotOver = true;
                break;
            case "b":
            case "B":
            case "all exept selected":
            case "All exept selected":
                addFilter("category",true)
                alert("Filter added")
                isNotOver = true;
                break;
            case "q":
            case "Q":
            case "quit":
            case "Quit":
                isNotOver = false;
                break;
            default: 
                alert("Select right option")
                isNotOver = true;
                break;       
        }
    }
}

function filterIndex(filterName){
    var xxx = turnedFilters.findIndex(function(e){
        return e.type === filterName  
        })
    return xxx}

function addFilter(filterName,isExepted){
    
    let index = filterIndex(filterName);
    let i = list(filterName)
    console.table(i);
    let catIndex = prompt("Enter the index of category(see indexes in console)","").split(",")
//фильтр значений которые больше
    catIndex = catIndex.filter(elem=> {
    return elem < newArr.length 
})
//получение массива значений
    let added = catIndex.map(elem=>{
        return newArr[elem] 
    })
    if (index !==-1){
        turnedFilters.splice(index,1)
        let filter = new Filter(filterName,isExepted,added)
        turnedFilters.push(filter)}
    else{
        let filter = new Filter(filterName,isExepted,added)
        turnedFilters.push(filter)
    }
}

function Filter(type,isExept,name){
    this.type= type,
    this.isExept = isExept,
    this.name = name
}

function FilterForDate(type,min,max){
    this.type= type,
    this.min = new Date(...min)  ,
    this.max = new Date(...max) 
}
function FilterForPrice(type,min,max){
    this.type= type,
    this.min = min,
    this.max = max
}


function addDateFilter(filterName) {
    var x = function getMinAndMaxDate(){
    var initialValue ={
        maxDate:new Date(0),
        minDate:new Date(2050,12)
    }
    var dates = productBase.reduce((result,date)=>{
    if (result.maxDate < date.createdAt) {
        result.maxDate = date.createdAt;   
    }
    if (result.minDate >date.createdAt) {
        result.minDate = date.createdAt;   
    }
     return result
    },initialValue)
   return dates
   } 
    let yyy = `${x().maxDate.getFullYear()}-${x().maxDate.getMonth() + 2}`
    let xxx = `${x().minDate.getFullYear()}-${x().minDate.getMonth() + 1}`


    let index = filterIndex(filterName)
    let min = prompt("Enter min date",xxx).split("-");
    let max = prompt("Enter max date",yyy).split("-");
    if (index !==-1){
        turnedFilters.splice(index,1);
        let filter = new FilterForDate(filterName,min,max);
        turnedFilters.push(filter)}
    else{
        let filter = new FilterForDate(filterName,min,max);
        turnedFilters.push(filter)
    }

}

function addPriceFilter(filterName) {
    var x = function getMinAndMaxPrice(){
    var initialValue ={
        maxPrice:0,
        minPrice:1000000
    }
    var prices = productBase.reduce((result,price)=>{
    if (result.maxPrice < price.price) {
        result.maxPrice = price.price;   
    }
    if (result.minPrice >price.price) {
        result.minPrice = price.price;   
    }
     return result
    },initialValue)
   return prices
   } 
   let yyy = x().maxPrice
   let xxx = x().minPrice
    let index = filterIndex(filterName);
    let min = prompt("Enter min price",xxx);
    let max = prompt("Enter max price",yyy);
    if (index !==-1){
        turnedFilters.splice(index,1);
        let filter = new FilterForPrice(filterName,min,max);
        turnedFilters.push(filter)}
    else{
        let filter = new FilterForPrice(filterName,min,max);
        turnedFilters.push(filter)
    }
}

function showManufacturerFilterMenu(){
    let isNotOver = true;
    while(isNotOver){
        let selectedOption = prompt("___Category filter menu___\na) Add new manufacturer \nb) All exept selected \nq) Quit\n (selected category see in console)") 
        switch(selectedOption){
            case "a":
            case "A":
            case "add new manufacturer":
            case "Add new manufacturer":
                addFilter("manufacturer",false);
                alert("Filter added");
                isNotOver = true;
                break;
            case "b":
            case "B":
            case "all exept selected":
            case "All exept selected":
                addFilter("manufacturer",true);
                alert("Filter added");
                isNotOver = true;
                break;
            case "q":
            case "Q":
            case "quit":
            case "Quit":
                isNotOver = false;
                break;
            default: 
                alert("Select right option")
                isNotOver = true;
                break;       
        }
    }
}

//список выбора
function list(item){
    let index = turnedFilters.findIndex(function(e){
        return e.type === item
    let newArr=[]
    })
    productBase.forEach(elem=>{
        if(!newArr.includes(elem[item])){
            newArr.push(elem[item]);
            }
        })


    return newArr
}
//применение фильтров
function applyFilters(){
    filteredGoods = productBase;
    for (var i = 0; i < turnedFilters.length; i++){    
        filteredGoods = filteredGoods.filter(elem=>{
            if (turnedFilters[i].type === "category" || turnedFilters[i].type === "manufacturer"){
                if (!turnedFilters[i].isExept){
                return turnedFilters[i].name.includes(elem[turnedFilters[i].type])
                }
                else if(turnedFilters[i].isExept ){
                    return !turnedFilters[i].name.includes(elem[turnedFilters[i].type])
                }
            } 
            else if ( turnedFilters[i].type === "date") {
                return elem.createdAt > turnedFilters[i].min && elem.createdAt < turnedFilters[i].max
            } 

            else if ( turnedFilters[i].type === "price") {
                return elem.price>turnedFilters[i].min && elem.price<turnedFilters[i].max
            }      
        }) 
        
    }
    newArr = []
}

//сброс фильтров
function resetFilters(){
    turnedFilters = [];
    filteredGoods = [];
    alert("Filters was deleted")
}

//меню сортировки
function sortProducts(){
    let isNotOver = true;
    while(isNotOver){
        let turnedType = prompt("Enter the type of sort\na) Category\nb) Price\nc) Manufacturer\nd) Date\ne) Reverse sort\nq) Main menu")
        switch(turnedType){
            case "a":
            case "A":
            case "Category":
            case "category":
                addCategorySort();
                isNotOver = true
                break;
            case "b":
            case "B":
            case "Price":
            case "price":
                addPriceSort()
                isNotOver = true
                break;
            case "c":
            case "C":
            case "Manufacturer":
            case "manufacturer":
                addManufacturerSort()
                isNotOver = true
                 break;
            case "d":
            case "D":
            case "Date":
            case "date":
                addDateSort() 
                isNotOver = true
                break;
            case "e":
            case "E":
            case "Reverse sort":
            case "reverse sort":
                reverseSort()
                isNotOver = true
                break;
            case "q":
            case "Q":
            case "Main menu":
            case "main menu":
                isNotOver = false
                break;
            default: 
                alert("Select right option")
                isNotOver = true
                break;
        }
    }
}

//сортировка по категории
function categorySort(){
    this.name = "category",
    this.reverse = false,
    this.sortGoods = function(base){
        if(this.reverse){
            base.sort(function(a,b){
                let nameA=a.category.toLowerCase(), nameB=b.category.toLowerCase()
                if (nameA < nameB) return 1
                if (nameA > nameB) return -1
                return 0
            })
        }
        else{
            base.sort(function(a,b){
                let nameA=a.category.toLowerCase(), nameB=b.category.toLowerCase()
                if (nameA < nameB) return -1
                if (nameA > nameB) return 1
                return 0
        })
        }
    }
 }

function addCategorySort(){
    let sort = new categorySort;
    turnedSort = [];
    turnedSort.push(sort);
}
//сортировка по цене
function priceSort(){
    this.name = "price",
    this.reverse = false,
    this.sortGoods = function(base){
        if(this.reverse){
            base.sort(function(a,b){
                return a.price - b.price
            })
        }
        else{
            base.sort(function(a,b){
                return b.price - a.price
            })
        }
    }
 }
function addPriceSort(){
    let sort = new priceSort;
    turnedSort = [];
    turnedSort.push(sort);
}
//сортировка по производителю
function manufacturerSort(){
    this.name = "manufacturer",
    this.reverse = false,
    this.sortGoods = function(base){
        if(this.reverse){
            base.sort(function(a,b){
                let nameA=a.manufacturer.toLowerCase(), nameB=b.manufacturer.toLowerCase()
                if (nameA < nameB) return 1
                if (nameA > nameB) return -1
                return 0
            })
        }
        else{
            base.sort(function(a,b){
                let nameA=a.manufacturer.toLowerCase(), nameB=b.manufacturer.toLowerCase()
                if (nameA < nameB) return -1
                if (nameA > nameB) return 1
                return 0
            })
        }
    }
 }
function addManufacturerSort(){
    let sort = new manufacturerSort;
    turnedSort = [];
    turnedSort.push(sort);
}
// сортировка по дате
function dateSort(){
    this.name = "date"
    this.reverse = false,
    this.sortGoods = function(base){
        if(this.reverse){
            base.sort(function(a,b){
                return a.createdAt - b.createdAt
            })
        }
        else{
            base.sort(function(a,b){
                return b.createdAt - a.createdAt
            })
        }
     }
 }
function addDateSort(){
    let sort = new dateSort;
    turnedSort = [];
    turnedSort.push(sort);
}
//обратная сортировка
function reverseSort(){
    if(turnedSort.length === 0){
        alert("Choose type of sort");
        sortProducts()
    }
    else{
        turnedSort[0].reverse = !turnedSort[0].reverse;
        if (turnedSort[0].reverse){
            alert("Sorted by descending")
        }
        else{
            alert("Sorted by ascending")
        }
    }

}