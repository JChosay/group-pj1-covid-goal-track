var stateCounts =[];
var statesTotal =0;
const apiKey = "";
var indexNum = 1400
var zipGlobal;

function landingScreen(){
    var container = document.getElementById('main');
    var landscreenHeadTag = document.createElement('h2');
    var landscreenHeadText = document.createTextNode('Minnesota COVID-19 Goal Tracker');
    landscreenHeadTag.appendChild(landscreenHeadText);
    container.appendChild(landscreenHeadTag);

    getApiState();
}

landingScreen();

function getApiState() {
    //   let searchEntry = $('#search-field').val();
      let requestUrl2 = `https://api.covidactnow.org/v2/states.json?apiKey=6b5476d41dfb418d82fbaf1cfaa0071c`;
      fetch(requestUrl2)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          console.log(data)
            for (var i=0; i<53; i++){
                // console.log(data[i]);
                statesTotal += data[i].actuals.vaccinationsCompleted
                // console.log(statesTotal);
                }

                var pctCalc = (statesTotal/331000000)*100;
                // console.log(pctCalc);

                var totalUS = Math.round(pctCalc);
                // console.log(totalUS);

                var displayTest = document.getElementById('main');
                
                var blurbTag = document.createElement('p');
                var blurbText = document.createTextNode('President Biden’s goal was to have 70% of adults in the US receive COVID-19 vaccinations by the Fourth of July. At the current rate of vaccinations being administered, the country will fall slightly short of this goal. To enjoy a summer of closeness with one another amid the rise of the Delta variant, states around the country are campaigning to get as many people vaccinated as quickly as possible. This API will track the number of vaccinations being administered throughout Minnesota daily.');
                blurbTag.appendChild(blurbText);
                
                var p1Tag = document.createElement('p');
                var p1Text =document.createTextNode("Currently, "+totalUS+" percent of Americans are vaccinated. And ugly.");
                p1Tag.appendChild(p1Text);

                var shortfall = 160000000-statesTotal
                var totalShare = shortfall*0.017047322;
                
                var totalShareRound = Math.round(totalShare);
                var totalShareRoundCommas = Math.round(totalShareRound);

                var infoTag = document.createElement('p');
                var infoText = document.createTextNode(shortfall+" Americans need to be vaccinated by the 4th or President Biden will cry. And he's such a sweet old guy; what is WRONG with you?");
                infoTag.appendChild(infoText);

                var increaseTag = document.createElement('p');
                var increaseText = document.createTextNode("Minnesota's share of this total is "+totalShareRound+" people.");
                increaseTag.appendChild(increaseText);

                var delendaTag = document.createElement('p');
                var delendaText = document.createTextNode("(Ohio must be destroyed, and Urban Meyer is a cunt. Flush twice: it is a LOOOONG way to Columbus.)");
                delendaTag.appendChild(delendaText);

                infoTag.appendChild(infoText);
                increaseTag.appendChild(increaseText);

                var mainScreen = document.getElementById('main');

                mainScreen.appendChild(blurbTag);
                mainScreen.appendChild(p1Tag);
                mainScreen.appendChild(infoTag);
                mainScreen.appendChild(increaseTag);
                mainScreen.appendChild(delendaTag);
                loadForm();
        })
}

function loadForm(){
    var formContainer = document.getElementById('main');
    var formDeclare = document.createElement('form');
    var formtextTag = document.createElement('h2');
    var formtextText = document.createTextNode('Please enter your ZIP code:')
    formtextTag.appendChild(formtextText);
    var zipEntry = document.createElement('input');
    zipEntry.setAttribute('type','text');
    zipEntry.setAttribute('maxLength',5);
    zipEntry.setAttribute('id','zipInput')
    var submitButton = document.createElement('input');
    submitButton.setAttribute('type','button');
    submitButton.setAttribute('id', 'code');
    submitButton.setAttribute('cols',10);
    submitButton.setAttribute('rows',1);
    submitButton.setAttribute('value','submit');
    submitButton.addEventListener("click",submitZIP);
    formDeclare.appendChild(zipEntry);
    formDeclare.appendChild(submitButton);
    formContainer.appendChild(formtextTag);
    formContainer.appendChild(formDeclare);

   
}

function submitZIP(){
  var zipInput = document.getElementById('zipInput');
  zipGlobal = zipInput.value;
  var userZIP = zipInput.value;
  console.log(userZIP);
  zipInput.value ="";

  var formAdd = document.getElementById('main');
  formAdd.innerHTML="";

  var h1Tag = document.createElement('h1');
  h1Tag.setAttribute('id','zipLoad');
  var h1Text = document.createTextNode(userZIP);
  h1Tag.appendChild(h1Text);
  formAdd.appendChild(h1Tag);
  zipLookup();
}

function yesResponse(){
  console.log("Yes response recorded.")
  
  var userZip = document.getElementById('zipInput');
  console.log(userZip);
  var containerF = document.getElementById('main');
  containerF.innerHTML ="";

  var yesLandingTag = document.createElement('h1')
  var yesLandingText = document.createTextNode("Word? Nice! Thanks a million! Ohio State Delenda Est!");
  yesLandingTag.appendChild(yesLandingText);
  containerF.appendChild(yesLandingTag);

  var linkIntroTag = document.createElement('p');
  var linkIntroText = document.createTextNode('Minnesota offers a variety of incentives for resident vaccinations. Claim yours today at:')
  linkIntroTag.appendChild(linkIntroText);
  containerF.appendChild(linkIntroTag);

  var linkTag = document.createElement('a');
  linkTag.setAttribute('href','https://mn.gov/covid19/vaccine-rewards/index.jsp');
  var linkText = document.createTextNode('https://mn.gov/covid19/vaccine-rewards/index.jsp');
  linkTag.appendChild(linkText);
  containerF.appendChild(linkTag);

  let request4 = `https://api.openbrewerydb.org/breweries?by_postal=${userZip}`;
  fetch(request4)
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    console.log(data);
  })

}

function noResponse(){
  console.log(zipGlobal);
  let request5 = `https://app.zipcodebase.com/api/v1/radius?apikey=1578b6e0-d5ef-11eb-b9b2-2b8eceeea297&code=${zipGlobal}&radius=20&country=us&unit=miles`;
  fetch(request5)
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    console.log(data);
    var beerList = data.results;
    console.log(beerList);
    for(var i=0; i<beerList.length; i++){
      console.log(beerList[i].code);
      
    }
  })

  


}