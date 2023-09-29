// pomocné proměné
let number1 = "0";
let number2 = "";
let operation ="";
let isNumberResult = false;
const accetableCharakters = ["1","2","3","4","5","6","7","8","9","0",".","+","-","*","/","Enter"];

// Přídání eventlisteneru pro zadávání čísel pomocí klávesnice
document.addEventListener("keydown",function(event){
    if(accetableCharakters.includes(event.key)){
        if(event.key == "."){
            appendDecimalSeparator();
        }
        else if(event.key == "/" || event.key == "*" || event.key == "+" || event.key == "-"){
            setOperation(event.key);
        }
        else if(event.key == "Enter"){
            calculate();
        }
        else{
            appendNumber(event.key);
        }   
    }
});


function appendDecimalSeparator(){
    //kontrola před vložením desetinné čárky => bez podmínky by vznikaly čísla jako .03 ..3. 
    if(!number1.includes(".") && operation == ""){ 
        number1+=".";
        updateResultWindow();
    }
    else if(!number2.includes(".") && operation != ""){ 
        number2+=".";
        updateResultWindow();
    }
}

function appendNumber(x){
    // pokud je number1 výsledek a nebyla rovnou zadána navazující početní operace => výsledek se přepíše na nové číslo
    if(isNumberResult && operation == ""){
        number1 = x;
        isNumberResult = false;
        updateResultWindow();
    }
    // použil jsem ternární výraz aby nezvynikala čísla jako 002 + 04
    else if(operation != ""){
        number2 = (number2 == "0")? number2 = x : number2 += x;
        updateResultWindow();
    }
    else{
        number1 = (number1 == "0")? number1 = x : number1 += x;
        updateResultWindow();
    }
}

function setOperation(op){
    operation = op;
    updateResultWindow();
}

// Nastavené výchozího nastavení
function clean(){
    number1 = "0";
    number2 = "";
    operation = "";
    isNumberResult = false;
    updateResultWindow();
}

function calculate(){
    let result = "";
    // pokud bylo zadáno jen jedno číslo je to zároveň i výsledek
    if(operation == ""){
        result = number1;
        clean();
        setResult(result);
    }
    else{
        switch(operation){            
            case "/":
                if(number2 == "0"){
                    clean();
                    document.getElementById("resultwindow").value = ("value","Nulou nelze dělit");
                }
                else{
                    result = devine(number1,number2);
                    clean();
                    setResult(result);
                }    
            break;

            case "*":
                result = multiplication(number1,number2);
                clean();
                setResult(result);
            break;

            case "+":
                result = sum(number1,number2);
                clean();
                setResult(result);
            break;

            case "-":
                result = difference(number1,number2);
                clean();
                setResult(result);
            break;
            // pokud se něco pokazí kalkulačka se vrátí do výchozího nastavení
            default: clean();

        }
    }
    
}

// pomocné funkce pro zobrazení výsledku a výpočetní operace

function setResult(num){
    number1 = num.toString();
    isNumberResult = true;
    updateResultWindow();
}

function updateResultWindow(){
    document.getElementById("resultwindow").value = number1 + operation + number2; 
}

function devine(num1,num2){
    return num1 / num2;
}

function multiplication(num1,num2){
    return num1 * num2;
}

function sum(num1,num2){
    // u sčítání je potřeba převést hodnoty na čísla jinak se pouze zřetězí znaky
    num1 = Number(num1);
    num2 = Number(num2);
    return num1 + num2;
}

function difference(num1,num2){
    return num1 - num2;
}

// změní známenko prvního čísla pouze dokud se nezadá početní operace
function changeToNegativeOrPossitive(){
    if(operation == ""){
        number1 = (Number(number1) * -1).toString();
        updateResultWindow();
    }  
}

