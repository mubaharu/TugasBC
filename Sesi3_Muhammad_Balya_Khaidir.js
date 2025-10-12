// Membuat segitiga dengan bintang
// Muhammad Balya Khaidir - Sesi 3

let bintang = "*"
let jarak = " "
let x = 0
let tambahBintang = ""
let tambahJarak = ""

console.log("Menggunakan While\n")
while(x<=2){
    tambahBintang += bintang
    tambahJarak += jarak
    if(x==0){
        tambahJarak += jarak
        console.log(tambahJarak,tambahBintang)
        tambahBintang += bintang
        x++
    }
    else if(x==1){       
        console.log(jarak,tambahBintang)
        tambahBintang += bintang
        tambahBintang += bintang
        x++
    }
    else{      
        tambahBintang += bintang
        console.log(tambahBintang)
        x++
    }   
}
console.log("\nMenggunakan For\n")
x = 0
tambahBintang = tambahBintang.replace("*******", "")

for(x;x<=3;x++) {
    tambahBintang += bintang
    console.log(tambahBintang)
}