import { Storage }  from "../app/LocalStorageService.js";


document.addEventListener("DOMContentLoaded", ()=>{
    
    const user = Storage.get("currentUser");
    


    const nameUser = document.getElementById("user-name");

    const firstName = user.name.split(" ")[0];

    nameUser.textContent = firstName;



    const accountNumber = document.getElementById("account-number");
    const account = user.account.accountNumber;
    accountNumber.textContent = "****-****-****-" + account.slice(-4);
    let accountVisible = true;

    const accountButton = document.querySelector(".account-visibility");

    accountButton.addEventListener("click", ()=>{
        if(accountVisible){
            accountNumber.textContent = account;
            accountVisible = false;
        }else{
            accountNumber.textContent = "****-****-****-" + account.slice(-4);
            accountVisible = true;
        };
    });



    const balanceUser = document.getElementById("saldo-actual");
    const balance = user.account.balance
    balanceUser.textContent = "****.**";
    let balanceVisible = true;

    const balanceButton = document.querySelector(".balance-visibility");
    balanceButton.addEventListener("click", ()=>{
        if(balanceVisible){
            balanceUser.textContent = balance.toFixed(2).replace(".", ",");
            balanceVisible = false;
        }else{
            balanceUser.textContent = "****.**";
            balanceVisible = true;
        };
    });

    const logionOutButton = document.querySelector(".logout");
    logionOutButton.addEventListener("click", ()=>{
        Storage.delete("currentUser");
        window.location.href = "login.html";
    });

});

