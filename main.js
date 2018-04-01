function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function draw(arrayOfUsers){
    var list="<ul id='usersList'>";
    var card="";
    for (var i in arrayOfUsers){
        var user = arrayOfUsers[i];
        var userName = user.name;
        var userPicture = user.picture;
        var userLocation = user.location;
        list += "<li onclick = showCard('id" + i + "')><div><img src=" + userPicture.medium + " alt='Photo'><p>" + 
        capitalize(userName.title) + ". " + capitalize(userName.first) + " " + capitalize(userName.last) + 
        "</p><p class='forSort'>" + userName.first + " " + userName.last + "</p></div></li>";
        card += "<div class='renderedCard' id=id" + i + "><img src=" + userPicture.large + " alt='Photo'><p class='userName'>" 
        + capitalize(userName.title) + ". " + capitalize(userName.first) + " " + capitalize(userName.last) + "</p><p>"
        + "<b>Location</b>:" + userLocation.street + ",<br>" + capitalize(userLocation.city) + ", " + capitalize(userLocation.state) + " " + userLocation.postcode + "</p><p>"
        + "<b>Email</b>: " + user.email + "</p><p>"
        + "<b>Phone</b>: " + user.phone + "</p></div>";
    }
    list += "</ul>"
    document.getElementById("usersListDiv").innerHTML = list;
    document.getElementById("usersCardsDiv").innerHTML = card;
}

function getData(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            var responseObject = JSON.parse(this.responseText);
            var arrayOfUsers = responseObject.results;
            draw(arrayOfUsers);
        }
    }
    xmlhttp.open("GET", "https://api.randomuser.me/1.0/?results=50&nat=gb,us&inc=gender,name,location,email,phone,picture", true);
    xmlhttp.send();
}

function displayState(element, state){
    element.style.display = state;
}

function showCard(idX){
    var card = document.getElementById(idX);
    displayState(card, "block");
    displayState(document.getElementById("shade"), "block");
    card.setAttribute("active","true");
}

function hideCard(){
    var card = document.querySelector("[active]");
    displayState(card, "none");
    displayState(document.getElementById("shade"), "none");
    card.removeAttribute("active");
}

function sortList(order){
    var list, switching, sortElement, shouldSwitch;
    list = document.getElementById("usersList");
    switching = true;
    while (switching){
        switching =false;
        sortElement = list.getElementsByClassName("forSort");
        for (var i = 0; i < (sortElement.length - 1); i++){
            shouldSwitch = false;
            if (((order == "Asc") && (sortElement[i].innerHTML > sortElement[i+1].innerHTML)) ||
            ((order == "Desc") && (sortElement[i].innerHTML < sortElement[i+1].innerHTML))) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch){
            var sortLi = sortElement[i].parentNode.parentNode;
            sortLi.parentElement.insertBefore(sortElement[i+1].parentNode.parentNode, sortLi);
            switching = true;
        }
    }
}

function selectSort(select){
    if (select.value == "AZ"){
        sortList("Asc");
    };
    if (select.value == "ZA"){
        sortList("Desc");
    };
}