
function generateFields() {

    const field = document.querySelector("field-parts"); //récupérer une balise



    for (let i = 0; i < 25; ++i) {

        const champ = document.createElement("field-part"); // créer la balise
        champ.classList.add("grass");   //ajout la classe css
        field.appendChild(champ);   // ajoute sur la page html
        champ.addEventListener("click", utilisation);



    }
    setTimeout(grow, 1000);
    setTimeout(secheresse, 1000);
    setTimeout(grass_regrow, 1000);

}

window.addEventListener("load", generateFields());


function attachToolsEvent() {


    const click = document.querySelectorAll("tool"); //on selectionne les outils
    for (let i = 0; i < click.length; ++i) {


        outil = click.item(i);
        outil.addEventListener("click", enable); // les event listener c'est pour écouter un évènement 
    }





}
window.addEventListener("load", attachToolsEvent());

function enable(event) {
    const selection = event.target;

    const tools = document.querySelectorAll("tool");
    for (let i = 0; i < tools.length; ++i) {

        tools[i].classList.remove("active")
    }
    selection.classList.add("active");






}

function utilisation(event) {

    const outil = document.querySelector("tool.active");
    const field = event.target;

    if (outil === null)
        return;

    if (outil.id == "tool-hoe")
        labourer(field);
    else if (outil.id == "tool-sow")
        semer(field);
    else if (outil.id == "tool-water")
        arroser(field);
    else if (outil.id == "tool-harvest")
        moissonner(field);

}


function labourer(field) {

    //    let active_tool = document.querySelector("tool.active")

    const champ = field;

    champ.classList.add("farmland");


}

function arroser(field) {

    const champ = field;

    if (champ.classList.contains("farmland")){
        champ.classList.add("hydrated");
        champ.dataset.dryness = 1;
    }

}


function semer(field) {

    const champ = field;

    if (champ.classList.contains("farmland"))
        champ.dataset.seed = 1;

}


function moissonner(field) {

    const champ = field;

    const stock = document.querySelector("stock");
    if (champ.dataset.seed == 7) //pourquoi == et pas === ?
        stock.innerHTML = parseInt(stock.innerHTML) + 1;


    champ.dataset.seed = 0;




}


function grow() {

    const field = document.querySelectorAll("field-part");
    field.forEach(element => {

        const alea = Math.floor(Math.random()*100);



        if (element.dataset.seed < 7 && element.dataset.seed >0){
            
            if(element.classList.contains("hydrated") && alea < 30)
                element.dataset.seed = parseInt(element.dataset.seed) + 1;
            else if (alea < 5)
                element.dataset.seed = parseInt(element.dataset.seed) + 1;


        }
    });



    setTimeout(grow, 1000);

}


function secheresse(){

        const field = document.querySelectorAll("field-part");
        
        
        field.forEach (ele => {

            if (ele.dataset.dryness <10 && ele.dataset.dryness >0){


                ele.dataset.dryness = parseInt(ele.dataset.dryness)+1;
            }
            if(ele.dataset.dryness >=10){


                ele.dataset.dryness = 0;
                ele.classList.remove("hydrated");
            }




        });



    setTimeout(secheresse, 1000);
}


function grass_regrow(){

    const field = document.querySelectorAll("field-part");
    field.forEach (ele => { 

        const alea = Math.floor(Math.random()*100);

        if(!ele.classList.contains("hydrated") 
            && (ele.dataset.seed ==0 || ele.dataset.seed == null)
            && alea == 1){

            ele.classList.remove("farmland");





        }




    
    });


    setTimeout(grass_regrow, 1000);

}

