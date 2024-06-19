let zandaka = document.getElementById("zandaka");
let zandaka_num = 10000;
let num = 0;

num = localStorage.getItem("zandaka");

if (num != null) {
  zandaka_num = num;
}

if (zandaka_num > 999999999999) {
  zandaka_num.textContent = "999999999999+";
}
else{
    zandaka.textContent = zandaka_num;
}

localStorage.setItem("zandaka", zandaka_num);
