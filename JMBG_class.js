"use strict";
class Validacija {
    constructor(jmbg) {
        this.jmbg = jmbg;
    }
    datum() {
        let dat = $('input:eq(1)').val();
        let datCeo = dat[8] + dat[9] + dat[5] + dat[6] + dat[1] + dat[2] + dat[3];
        let jmbgD = (this.jmbg.val()).slice(0, 7);
        return jmbgD === datCeo;
    };
    grad() {
        let mesto = $('#odabir').val();
        let jmbgG = (this.jmbg.val()).slice(7, 9);
        return jmbgG === mesto;
    };
    pol() {
        let polZ = $("input:eq(2):checked").val() ? true : false;
        let polM = $("input:eq(3):checked").val() ? true : false;
        let jmbgP = (this.jmbg.val()).slice(9, 10);
        if (polZ === true) {
            return jmbgP >= 5 && jmbgP <= 9;
        } else if (polM === true) {
            return jmbgP >= 0 && jmbgP <= 4;
        } else {
            return false;
        }
    };
    kontrolnaCifra() {
        let a = this.jmbg.val();
        const K = 11 - ((7 * ((+a[0]) + (+a[6])) + 6 * ((+a[1]) + (+a[7])) + 5 * ((+a[2]) + (+a[8])) + 4 * ((+a[3]) + (+a[9])) + 3 * ((+a[4]) + (+a[10])) + 2 * ((+a[5]) + (+a[11]))) % 11);
        if (K >= 1 && K <= 9) {
            return K === Number(a[12]);
        } else if (K > 9) {
            K = 0;
            return K === Number(a[12]);
        }
    };
    userName(ime) {
        const validIme = /^[A-ZŠČĆĐŽ]{1}[a-zščćđžA-Z]+[ ][A-ZŠČĆĐŽ]{1}[a-zščćđž]+$/;
        if (!(validIme.test(ime))) {
            alert("Nevalidan unos imena i prezimena!");
        }
    };
    duzinaJmbg() {
        const validacija = /^\d{13}$/;
        return validacija.test(this.jmbg.val());
    };
    print() {
        let status = $('#rez');
        if (this.datum() === true && this.grad() === true && this.pol() === true && this.kontrolnaCifra() === true) {
            status.html('Validan JMBG');
            status.css('color', 'lightgreen');
            this.jmbg.css('background', 'lightgreen');
        } else {
            status.html('Nevalidan JMBG');
            status.css('color', 'red');
            this.jmbg.css('background', 'red');
            alert(`JMBG:${this.datum() === false ? "\n- Nevalidan datum" : ""}${this.grad() === false ? "\n- Nevalidno odabran grad" : ""}${this.pol() === false ? "\n- Nevalidno odabran pol" : ""}${this.kontrolnaCifra() === false ? "\n- Nevalidna kontrolna cifra" : ""}`);
        }
    };
}

let jmbg = $('input:eq(4)');
const valid = new Validacija(jmbg);

$('.input:eq(0)').blur(function () {
    let ime = $('.input:eq(0)').val();
    valid.userName(ime);
});
$('button').click(function () {
    if (valid.duzinaJmbg() === false) {
        alert("Nevalidan unos JMBG-a!\nJMBG mora biti broj od 13 cifara!");
    } else {
        valid.print();
    }
});