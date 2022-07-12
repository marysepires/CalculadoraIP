"use string"      
var cont=0;

function vTam (object) {
if (object.value.length > object.maxLength){
    object.value = object.value.slice(0, object.maxLength);
    }
}

function guarda()
{
    localStorage.setItem(cont, oc1.value*1000000000 + oc2.value*1000000 + oc3.value*1000 + oc4.value*1);
    cont=cont+1;
    alert("Item adicionado.");
    oc1.value = oc2.value = oc3.value = oc4.value = "";
}

function resultado()
{
    var rede
    var host;
    
    if(oc1.value < 128){
        classe.value = "A";
        rede = oc1.value;
        host = oc2.value + "." + oc3.value + "." + oc4.value;
        mascara.value = "255" + "." + host;
        endRede.value = rede + "." + "0" + "." + "0" + "." + "0";
        broadcast.value = rede + "." + "255.255.255";
        end1.value = rede + "." + "0" + "." + "0" + "." + "1";
        endFin.value = rede + "." + "255" + "." + "255" + "." + "254";
    }
    else if (oc1.value < 192){
        classe.value = "B";
        rede = oc1.value + "." + oc2.value;
        host = oc3.value + "." + oc4.value;
        mascara.value = "255.255" + "." + host;
        endRede.value = rede + "." + "0" + "." + "0";
        broadcast.value = rede + "." + "255.255";
        end1.value = rede + "." + "0" + "." + "1";
        endFin.value = rede + "." + "255" + "." + "254";
    }
    else if (oc1.value < 224){
        classe.value = "C";
        rede = oc1.value + "." + oc2.value + "." + oc3.value;
        host = oc4.value;
        mascara.value = "255.255.255" + "." + host;
        endRede.value = rede + "." + "0";
        broadcast.value = rede + "." + "255";
        end1.value = rede + "." + "1";
        endFin.value = rede + "." + "254";
    }
    else alert("QQ TU TÁ APRONTANDO??");
    
    bina.value = dec_bin(oc1.value) + dec_bin(oc2.value) + dec_bin(oc3.value) + dec_bin(oc4.value);
}

function dec_bin(octeto)
{
    var w = 1, x = 128;
    var bin = "";
    var oc = octeto;
    
    while(w < 9){
        if(oc >= x){
            bin = bin + "1";
            oc = oc - x;
        }
        else    bin = bin + "0";
        
        x = x / 2;
        w = w + 1;
    }
    return bin + ".";
}
