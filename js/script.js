const validate = (array) => {
    let isValid = true;
    array.forEach((input) => {
        const value = parseInt(input)
        if (isNaN(value)){
            isValid = false;
        }
    })
    return isValid
}

const calculate = () => {
    const a = parseInt(document.getElementById("number-1").value)
    const b = parseInt(document.getElementById("number-2").value)
    const c = parseInt(document.getElementById("number-3").value)

    const isInputCorrect = validate([a,b,c])

    if (isInputCorrect) {
        calculateEuclidean(a,b,c)
    } else {
        alert("Błędne parametry.");
    }
}

const nwdFor2Numbers = (a, b) => {
    let x = 0;
    let y = 1;
    let lastx = 1;
    let lasty = 0;
    while (b !== 0) {
        let q = a / b;
        let r = a % b;

        a = b;
        b = r;

        let temp = x;
        x = lastx - (q * x);
        lastx = temp;

        temp = y;
        y = lasty - (q * y);
        lasty = temp;
    }

    return {
        nwd: parseInt(a),
        x: parseInt(lastx),
        y: parseInt(lasty)
    }
}

const nwdFor3Numbers = (a, b, c) => {
    if(a === 0 || b === 0 || c === 0) {
        alert("Każda liczba powinna być większa od 0.");
    }
    else {
        let xy0 = nwdFor2Numbers(b, c)
        let xy1 = nwdFor2Numbers(a, xy0.nwd)
        let y = (xy1.y * xy0.x)
        let z = (xy1.y * xy0.y)

        return {
            nwd: xy1.nwd,
            x: xy1.x,
            y: y,
            z: z
        }
    }
}

const calculateEuclidean = (a,b,c) => {
    const result = nwdFor3Numbers(a,b,c);
    displayResult(a, b, c, result.nwd, result.x, result.y, result.z)
}

const displayResult = (a,b,c, nwd, x, y, z) =>  {
    document.getElementById("NWD").innerHTML = "NWD(" + a + " , " + b + " , " + c + ") = " + nwd
    document.getElementById("values").innerHTML = "x = " + x + ", " + "y = " + y + ", " + "z = " + z
    document.getElementById("equation").innerHTML = a + ' × <strong>' + x + '</strong> + ' + b + " × <strong>" + y + "</strong> + " + c + " × <strong>" + z + "</strong> = " + nwd
}
